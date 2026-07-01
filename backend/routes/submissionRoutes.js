const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSubmission,
  getMySubmissions,
} = require("../controllers/submissionController");

router.post("/",protect,createSubmission);
router.get("/my",protect,getMySubmissions);

module.exports = router;