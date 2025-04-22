const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const htmlToText = require("html-to-text");

const sendNodeMail = async (mailOptions) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_PRIVATE_KEY,
      domain: "mg.copywritingrobot.com",
    },
  };

  let transporter = nodemailer.createTransport(mg(auth));

  await transporter.sendMail(mailOptions);
};

const createAndSendEmail = async (
  email,
  description,
  title,
  metaDescription
) => {
  try {
    const updatedHTML = `
    <div>
    <p>🎉 Your generated description, meta title, and meta description are below:</p>    
    </br>
    </br>
    <p>______</p>
    <p style="font-weight: bold;">Description: </p>
    <p>${description}</p>
    </br>
    </br>
    <p style="font-weight: bold;">Meta Title: </p>
    <p>${title}</p>
    </br>
    </br>
    <p style="font-weight: bold;">Meta Description: </p>
    <p>${metaDescription}</p>
    <p>______</p>
    </br>
    </br>
    <p>Want to generate more? Choose your plan here <a href="https://copywritingrobot.com/auth/chooseplan" rel="noopener noreferrer" target="_blank">here</a>
    </p>
    </div>
    `;
    const mailOptions = {
      from: "jamie@copywritingrobot.com",
      to: email,
      subject: `Your Description Is Ready! `,
      html: updatedHTML,
      text: htmlToText.convert(updatedHTML),
    };

    await sendNodeMail(mailOptions);
  } catch (err) {
    console.log(err);

    return "error";
  }
};

exports.createAndSendEmail = createAndSendEmail;
