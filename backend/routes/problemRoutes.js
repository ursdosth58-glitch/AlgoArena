const express = require("express");

const Problem = require("../models/Problems");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = 12;

    const skip = (page - 1) * limit;

    const totalProblems = await Problem.countDocuments();

    const problems = await Problem.find()

      .skip(skip)

      .limit(limit);

    res.json({

      problems,

      currentPage: page,

      totalPages: Math.ceil(
        totalProblems / limit
      ),

    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

});

router.post("/", protect, adminOnly, async (req, res) => {

  try {

    const problem = await Problem.create(
      req.body
    );

    res.status(201).json(problem);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

});

router.get("/:id", async (req, res) => {

  try {

    const problem = await Problem.findById(
      req.params.id
    );

    res.json(problem);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

});

module.exports = router;