const Submission = require("../models/Submission");
const Problem = require("../models/Problems");
const User = require("../models/User");
const judgeCpp = require("../utils/judgeCpp");

const createSubmission = async (req, res) => {

  try {

    const { problem, code, language} = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    const problemDoc = await Problem.findById(problem);

    if (!problemDoc) {

      return res.status(404).json({
        message: "Problem not found",
      });

    }
    const result = await judgeCpp(code,problemDoc.testCases);


    const submission = await Submission.create({

      user: userId,

      problem,

      code,

      language,

      verdict: result.verdict,

      runtime: result.runtime,

    });


    if (result.verdict === "Accepted") {

      const alreadySolved = user.solvedProblems.includes(problem);

      if (!alreadySolved) {

        user.solvedProblems.push(problem);

        await user.save();

      }

    }

    res.status(201).json(submission);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};

const getMySubmissions = async (req, res) => {

  try {

    const submissions = await Submission.find({

      user: req.user.id,

    })

    .populate("problem", "title difficulty")

    .sort({ createdAt: -1 });

    res.json(submissions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};

module.exports = {
  createSubmission,
  getMySubmissions,
};