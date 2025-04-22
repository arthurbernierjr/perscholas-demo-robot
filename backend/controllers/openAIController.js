const { Configuration, OpenAIApi } = require("openai");
const User = require("../models/UserModel");
const BulkDescriptions = require("../models/BulkDescriptionModel");
const SingleDescriptions = require("../models/SingleDescriptionModel");
const uniqid = require("uniqid");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const updateDescriptionCount = async (userID, updatedCount) => {
  await User.findOneAndUpdate(
    { userID },
    {
      descriptionCount: updatedCount,
    }
  );
};

const createOpenAPIRequest = async (prompt, openai) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 1,
      max_tokens: 500,
    });

    if (
      completion &&
      completion.data &&
      completion.data.choices &&
      completion.data.choices.length &&
      completion.data.choices[0].text
    ) {
      const unformattedOpenAIText = completion.data.choices[0].text;

      if (unformattedOpenAIText) {
        const formattedText = unformattedOpenAIText
          .replaceAll("Answer:", "")
          .replaceAll(/["']/g, "")
          .trim();

        return formattedText;
      }
    } else {
      return "Error";
    }
  } catch (err) {
    console.log(err);
    return "Error";
  }
};

const createOpenAPIRequestWithQuotes = async (prompt, openai) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 1,
      max_tokens: 500,
    });

    if (
      completion &&
      completion.data &&
      completion.data.choices &&
      completion.data.choices.length &&
      completion.data.choices[0].text
    ) {
      const unformattedOpenAIText = completion.data.choices[0].text;

      if (unformattedOpenAIText) {
        const formattedText = unformattedOpenAIText
          .replaceAll("Answer:", "")
          .trim();

        return formattedText;
      }
    } else {
      return "Error";
    }
  } catch (err) {
    console.log(err);
    return "Error";
  }
};

const createSingleProductDescription = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productDetails,
      colors,
      type,
      includeBenefits,
    } = req.body;
    const userID = req.user.userID;

    const openai = new OpenAIApi(configuration);

    const { stores, language, descriptionCount } = await User.findOne({
      userID,
    });

    let colorPrompt = `Colors: ${colors}`;
    let categoryPrompt = `Product Category: ${productCategory}`;
    let benefitsPrompt = ``;

    if (type === "simple") {
      colorPrompt = "";
      categoryPrompt = "";
    }

    if (includeBenefits === "true") {
      benefitsPrompt =
        "Also include 3 bullet points about the benefits of the product. Each bullet point should have one unique emoji.";
    }

    if (stores.length) {
      const { storeName, aboutStore } = stores[0];

      const productDescriptionPrompt = `
            Language: ${language}

            Write a creative product description for the following product. ${benefitsPrompt} With a call to action at the end to buy the item. Include line breaks for better readability.

            Brand name: ${storeName}
            About the brand: ${aboutStore}
            Product Name: ${productName}
            Product details: ${productDetails}
            ${colorPrompt}
            ${categoryPrompt}
          `;

      const seoTitleTagPrompt = `
        Language: ${language}

        Write an optimized SEO title tag using the product info and the brand name at the end.
          Brand name: ${storeName}
          About the brand: ${aboutStore}
          Product Name: ${productName}
          Product details: ${productDetails}
          ${colorPrompt}
          ${categoryPrompt}
        `;

      const seoDescriptionPrompt = `
        Language: ${language}

        Write an optimized SEO description using the product info and the brand name at the end.
        Brand name: ${storeName}
        About the brand: ${aboutStore}
        Product Name: ${productName}
        Product details: ${productDetails}
        ${colorPrompt}
        ${categoryPrompt}
      `;

      const [
        newProductDescription,
        newSEOTitle,
        newSEODescription,
      ] = await Promise.all([
        createOpenAPIRequestWithQuotes(productDescriptionPrompt, openai),
        createOpenAPIRequestWithQuotes(seoTitleTagPrompt, openai),
        createOpenAPIRequestWithQuotes(seoDescriptionPrompt, openai),
      ]);

      const updatedCount = descriptionCount - 1;

      try {
        await Promise.all([
          updateDescriptionCount(userID, updatedCount),
          await SingleDescriptions.create({
            description: newProductDescription,
            userID: userID,
          }),
        ]);
      } catch (err) {
        console.log(err);
      }

      res.status(200).json({
        status: "success",
        data: { newProductDescription, newSEOTitle, newSEODescription },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          newProductDescription:
            "Please update your store information under Settings",
          newSEOTitle: "Please update your store information under Settings",
          newSEODescription:
            "Please update your store information under Settings",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "success",
      data: {
        newProductDescription:
          "Please update your store information under Settings",
        newSEOTitle: "Please update your store information under Settings",
        newSEODescription:
          "Please update your store information under Settings",
      },
    });
  }
};

const fetchBulkDescription = async (
  bulkDataArr,
  stores,
  openai,
  userID,
  language,
  descriptionCount
) => {
  const masterArr = [["Product Description", "SEO Title", "SEO Description"]];

  if (stores.length && descriptionCount > 0) {
    const { storeName, aboutStore } = stores[0];

    let counter = 0;

    while (counter < bulkDataArr.length) {
      const {
        productName,
        productCategory,
        productDetails,
        colors,
      } = bulkDataArr[counter];

      const productDescriptionPrompt = `
          Language: ${language}

          Write a creative product description for the following product. Write a 3 benefit list. With a call to action at the end to buy the item. Include line breaks every 3 lines.
          Brand name: ${storeName}
          About the brand: ${aboutStore}
          Product Category: ${productCategory}
          Product Name: ${productName}
          Product details: ${productDetails}
          Colors: ${colors}
        `;

      const seoTitleTagPrompt = `
        Language: ${language}

        Write an optimized SEO title tag using the product info and the brand name at the end.
          Brand name: ${storeName}
          About the brand: ${aboutStore}
          Product Category: ${productCategory}
          Product Name: ${productName}
          Product details: ${productDetails}
          Colors: ${colors}
        `;

      const seoDescriptionPrompt = `
          Language: ${language}

          Write an optimized SEO description using the product info and the brand name at the end.
          Brand name: ${storeName}
          About the brand: ${aboutStore}
          Product Category: ${productCategory}
          Product Name: ${productName}
          Product details: ${productDetails}
          Colors: ${colors}
          `;

      const newProductDescription = await createOpenAPIRequest(
        productDescriptionPrompt,
        openai
      );

      const newSEOTitle = await createOpenAPIRequest(seoTitleTagPrompt, openai);

      const newSEODescription = await createOpenAPIRequest(
        seoDescriptionPrompt,
        openai
      );

      masterArr.push([newProductDescription, newSEOTitle, newSEODescription]);

      counter += 1;

      // Wait so don't go over limit
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    const today = new Date();
    const newID = uniqid();

    await BulkDescriptions.create({
      userID,
      bulkDescriptions: masterArr,
      storeName,
      bulkDescriptionID: newID,
      date: today,
    });

    const updatedCount = descriptionCount - counter;
    await updateDescriptionCount(userID, updatedCount);
  }
};

const createBulkProductDescriptions = async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);

    const bulkDataArr = req.body;

    const { stores, language, descriptionCount } = await User.findOne({
      userID: req.user.userID,
    });

    res.end("200", async () => {
      await fetchBulkDescription(
        bulkDataArr,
        stores,
        openai,
        req.user.userID,
        language,
        descriptionCount
      );
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      data: {},
    });
  }
};

const fetchBulkProductDescriptions = async (req, res) => {
  try {
    const bulkDescriptionsFromDatabase = await BulkDescriptions.find(
      {
        userID: req.user.userID,
      },
      {
        date: 1,
        bulkDescriptions: 1,
        storeName: 1,
      }
    ).sort({ date: -1 });

    //

    res.status(200).json({ data: { bulkDescriptionsFromDatabase } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: {},
    });
  }
};

const createAdCopy = async (req, res) => {
  try {
    // Sale and colors are two other options to add in.
    const openai = new OpenAIApi(configuration);

    const {
      problem,
      solution,
      productName,
      productDetails,
      audienceNiche,
      platform,
    } = req.body;

    const { language } = await User.findOne({
      userID: req.user.userID,
    });

    const adCopyPrompt = `
      Language: ${language}

      Write ad copy for ${platform} using the info. Create a call to action at the end to purchase the product.

      Problem: ${problem}
      Solution: ${solution}
      Product Name: ${productName}
      Product details: ${productDetails}
      Audience niche: ${audienceNiche}
      `;
    const newAdCopy = await createOpenAPIRequest(adCopyPrompt, openai);

    res.status(200).json({
      data: { newAdCopy },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      data: {
        newAdCopy: "There was an error. Please try again.",
      },
    });
  }
};

const createProductName = async (req, res) => {
  try {
    // Sale and colors are two other options to add in.
    const openai = new OpenAIApi(configuration);

    const { language } = await User.findOne({
      userID: req.user.userID,
    });

    const { niche, productDetails } = req.body;

    const productNamePrompt = `
    Language: ${language}

    Generate a unique product name using the follow information:

      Niche: ${niche}
      Product details: ${productDetails}
      `;
    const newProductName = await createOpenAPIRequest(
      productNamePrompt,
      openai
    );

    res.status(200).json({
      data: { newProductName },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      data: {
        newProductName: "There was an error. Please try again.",
      },
    });
  }
};

const createSocialMediaCaption = async (req, res) => {
  try {
    // Sale and colors are two other options to add in.
    const openai = new OpenAIApi(configuration);

    const { subject, platform } = req.body;

    const { language } = await User.findOne({
      userID: req.user.userID,
    });

    const socialMediaCaptionPrompt = `
      Language: ${language}

      Write a social media caption for ${platform}:

      subject: ${subject}
      
      `;
    const newSocialMediaCaption = await createOpenAPIRequest(
      socialMediaCaptionPrompt,
      openai
    );

    res.status(200).json({
      data: { newSocialMediaCaption },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      data: {
        newSocialMediaCaption: "There was an error. Please try again.",
      },
    });
  }
};

const createAboutUs = async (req, res) => {
  try {
    // Sale and colors are two other options to add in.
    const openai = new OpenAIApi(configuration);

    const { whyCreated, uniqueReason } = req.body;

    const { language, stores } = await User.findOne({
      userID: req.user.userID,
    });

    if (stores.length) {
      const { storeName, aboutStore } = stores[0];

      const aboutUsPrompt = `
        Language: ${language}

        Write an about us page for an ecommerce store. Including a call to action at the end. 
  
        Why was the store created: ${whyCreated}
        Unique Reason why store exists: ${uniqueReason}
        Store Name: ${storeName}
        About the store: ${aboutStore}
        `;
      const newAboutUs = await createOpenAPIRequest(aboutUsPrompt, openai);

      res.status(200).json({
        data: { newAboutUs },
      });
    } else {
      res.status(200).json({
        data: {
          newAboutUs: "Please update your store info on the settings pages",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      data: {
        newSocialMediaCaption: "There was an error. Please try again.",
      },
    });
  }
};

const fetchSingleDescriptions = async (req, res) => {
  try {
    const allUserSingleDescriptions = await SingleDescriptions.find({
      userID: req.user.userID,
    });

    res.status(200).json({
      status: "success",
      data: {
        allUserSingleDescriptions,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createSingleProductDescription = createSingleProductDescription;
exports.createAdCopy = createAdCopy;
exports.createProductName = createProductName;
exports.createSocialMediaCaption = createSocialMediaCaption;
exports.createAboutUs = createAboutUs;
exports.createBulkProductDescriptions = createBulkProductDescriptions;
exports.fetchBulkProductDescriptions = fetchBulkProductDescriptions;
exports.fetchSingleDescriptions = fetchSingleDescriptions;
