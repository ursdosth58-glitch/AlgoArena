const Contest = require("../models/Contest");


/* ================= CREATE CONTEST ================= */

const createContest = async (req, res) => {

  try {

    const {
      title,
      description,
      startTime,
      endTime,
      problems,
    } = req.body;

    const contest = await Contest.create({

      title,

      description,

      startTime,

      endTime,

      problems,

      createdBy: req.user.id,

    });

    res.status(201).json(contest);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};


/* ================= GET ALL CONTESTS ================= */

const getContests = async (req, res) => {

  try {

    const contests = await Contest.find()

      .populate("problems", "title difficulty")

      .sort({ startTime: 1 });

    res.json(contests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};


/* ================= GET SINGLE CONTEST ================= */

const getContestById = async (req, res) => {

  try {

    const contest = await Contest.findById(
      req.params.id
    )

    .populate(
      "problems",
      "title difficulty tags"
    );

    if (!contest) {

      return res.status(404).json({
        message: "Contest not found",
      });

    }

    res.json(contest);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};


module.exports = {

  createContest,

  getContests,

  getContestById,

};