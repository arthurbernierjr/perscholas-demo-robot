const User = require("../models/UserModel");
const uniqid = require("uniqid");
const { promisify } = require("util");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const updateUserStoreInfo = async (req, res) => {
  try {
    const { storeName, aboutStore, language } = req.body;

    await User.findOneAndUpdate(
      { userID: req.user.userID },
      { stores: [{ storeName, aboutStore }], language }
    );

    res.status(200).json({ data: { status: "success" } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: { status: "error" } });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const createSendFoxUser = async (email) => {
  // --- DEMO MODE ---
  if (process.env.NODE_ENV === 'demo') {
    console.log(`DEMO MODE: Skipping SendFox user creation for ${email}`);
    return;
  }
  // --- END DEMO MODE ---
  try {
    // Replace YOURLISTNUMBER with the actual list ID or make it an env variable
    const listId = process.env.SENDFOX_LIST_ID_NON_SUBSCRIBED || 'YOURLISTNUMBER';
    await axios({
      method: "POST",
      // Correctly format query parameters
      url: `https://api.sendfox.com/contacts`,
      headers: { Authorization: `Bearer ${process.env.SENDFOX_TOKEN}` },
      params: { // Use params for query string
        'lists[]': listId,
        email: email
      }
    });
     console.log(`Added ${email} to SendFox list ${listId}`);
  } catch (err) {
    // Log specific SendFox errors if possible
    console.error("SendFox API Error in createSendFoxUser:", err.response ? err.response.data : err.message);
  }
};

const loginAndRegisterAuthZero = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return resError(res, 401, "Please provide email and password!");
    }

    const existingUser = await User.findOne({
      email,
    });

    let user;

    if (!existingUser) {
      const userID = uniqid();
      user = await User.create({
        email,
        userID,
        isSubscribed: false,
        descriptionCount: 1,
        planType: 'free_tier'
      });

      await createSendFoxUser(email);
    } else {
      user = existingUser;
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  } catch (err) {
    console.error("Error in loginAndRegisterAuthZero:", err);
    res.status(500).json({ status: "error", message: "An internal error occurred during login/registration." });
  }
};

const findDBUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ data: { status: "User is not logged in" } });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ data: { status: "User is not logged in" } });
  }
};

const updateBillingStatus = async (req, res) => {
  try {
    const { planType } = req.body;

    const formattedPlanType = planType.replace("?", "");

    let descriptionCount = 0;

    if (formattedPlanType === "starter") {
      descriptionCount = 100;
    } else if (formattedPlanType === "growth") {
      descriptionCount = 500;
    } else if (formattedPlanType === "business") {
      descriptionCount = 2000;
    }
    await User.findOneAndUpdate(
      { userID: req.user.userID },
      { isSubscribed: true, descriptionCount, planType: formattedPlanType }
    );

    const email = req.user.email;

    // --- DEMO MODE ---
    if (process.env.NODE_ENV !== 'demo') {
      console.log(`Attempting SendFox list update for ${email}`);
      // Add remove from one sendfox list and add to another
      try {
        const sendFoxResponse = await axios({
          method: "GET",
          url: `https://api.sendfox.com/contacts?email=${email}`,
          headers: { Authorization: `Bearer ${process.env.SENDFOX_TOKEN}` },
        });

        if (
          sendFoxResponse &&
          sendFoxResponse.data &&
          sendFoxResponse.data.data &&
          sendFoxResponse.data.data.length
        ) {
          const userID = sendFoxResponse.data.data[0].id;
          const oldListId = process.env.SENDFOX_LIST_ID_NON_SUBSCRIBED || '393430';
          const newListId = process.env.SENDFOX_LIST_ID_SUBSCRIBED || '403412';

          if (userID) {
             console.log(`Removing SendFox contact ${userID} from list ${oldListId}`);
            await axios({
              method: "DELETE",
              url: `https://api.sendfox.com/lists/${oldListId}/contacts/${userID}`,
              headers: { Authorization: `Bearer ${process.env.SENDFOX_TOKEN}` },
            });
          }

          console.log(`Adding SendFox contact ${email} to list ${newListId}`);
          await axios({
            method: "POST",
            url: `https://api.sendfox.com/contacts`,
            headers: { Authorization: `Bearer ${process.env.SENDFOX_TOKEN}` },
            params: {
                'lists[]': newListId,
                email: email
            }
          });
        } else {
            console.log(`SendFox contact not found for email: ${email}`);
        }
      } catch (err) {
        console.error("SendFox API Error in updateBillingStatus:", err.response ? err.response.data : err.message);
      }
    } else {
        console.log("DEMO MODE: Skipping SendFox list update.");
    }
    // --- END DEMO MODE ---

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("Error updating billing status:", err);
    res.status(500).json({ status: "error", message: "Failed to update billing status." });
  }
};

const getDescriptionCount = (planType) => {
  let descriptionCount = 50;
  if (planType === "unlimited") {
    descriptionCount = 10000;
  } else if (planType === "business") {
    descriptionCount = 2000;
  } else if (planType === "growth") {
    descriptionCount = 250;
  } else if (planType === "starter") {
    descriptionCount = 100;
  }

  return descriptionCount;
};

const updateDescriptionCountsMonthly = async () => {
  try {
    const allSubscribedUsers = await User.find({ isSubscribed: true });

    await Promise.all(
      allSubscribedUsers.map(async ({ planType, email }) => {
        const updatedDescriptionCount = getDescriptionCount(planType);

        await User.findOneAndUpdate(
          { email },
          { descriptionCount: updatedDescriptionCount }
        );
      })
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserStoreInfo = updateUserStoreInfo;
exports.loginAndRegisterAuthZero = loginAndRegisterAuthZero;
exports.findDBUser = findDBUser;
exports.protect = protect;
exports.updateBillingStatus = updateBillingStatus;
exports.updateDescriptionCountsMonthly = updateDescriptionCountsMonthly;
