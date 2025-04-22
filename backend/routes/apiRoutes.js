const express = require("express");
const cors = require("cors");

const {
  createSingleProductDescription,
  createBulkProductDescriptions,
  createAdCopy,
  fetchBulkProductDescriptions,
  createSocialMediaCaption,
  createProductName,
  createAboutUs,
  fetchSingleDescriptions,
} = require("../controllers/openAIController");

const {
  updateUserStoreInfo,
  loginAndRegisterAuthZero,
  findDBUser,
  protect,
  updateBillingStatus,
} = require("../controllers/userController");

const router = express.Router();

router.route("/auth/loginOrRegisterAuthZero").post(loginAndRegisterAuthZero);

// Protect all routes after this middleware
router.use(protect);
router.route("/users/updateUserStoreInfo").post(updateUserStoreInfo);
router.get("/auth/findDBUser", cors(), findDBUser);
router.post("/auth/updateBillingStatus", cors(), updateBillingStatus);

router
  .route("/createSingleProductDescription")
  .post(createSingleProductDescription);

router.route("/fetchSingleDescriptions").get(fetchSingleDescriptions);

router
  .route("/createBulkProductDescriptions")
  .post(createBulkProductDescriptions);

router.route("/fetchBulkProductDescriptions").get(fetchBulkProductDescriptions);

router.route("/createAdCopy").post(createAdCopy);
router.route("/createProductName").post(createProductName);
router.route("/createSocialMediaCaption").post(createSocialMediaCaption);
router.route("/createAboutUs").post(createAboutUs);

module.exports = router;
