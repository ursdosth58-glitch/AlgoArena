const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

  createContest,

  getContests,

  getContestById,

} = require("../controllers/contestController");


/* ================= ROUTES ================= */

router.post("/", protect, createContest);

router.get("/", getContests);

router.get( "/:id", getContestById);

module.exports = router;