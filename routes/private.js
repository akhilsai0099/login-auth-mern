const express = require("express");
const router = express.Router();
const { privateRoute } = require('../controllers/privateRoute');
const { protect } = require("../middleware/auth");


router.route('/').get(protect, privateRoute);

module.exports = router