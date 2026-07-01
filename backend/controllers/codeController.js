const Problem = require("../models/Problems");
const executeCpp = require("../utils/executeCpp");

const runCode = async (req, res) => {

  try {

    const { code, problemId } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const results = [];

    for (let i = 0; i < problem.sampleTestCases.length; i++) {

        const testcase = problem.sampleTestCases[i];

        try {
            const actualOutput = await executeCpp(code,testcase.input);

            const expectedOutput = testcase.output.trim();

            const actual = actualOutput.trim();

            const verdict = actual === expectedOutput ? "Accepted" : "Wrong Answer";

            results.push({
                caseNumber: i + 1,
                input: testcase.input,
                expected: expectedOutput,
                actual,
                verdict,
            });

        } catch (error) {
            results.push({
                caseNumber: i + 1,
                input: testcase.input,
                expected: testcase.output,
                actual: "",
                verdict: error.type || "Runtime Error",
                message: error.message,
            });
        }       

    }

    const allPassed = results.every((result) => result.verdict === "Accepted");

    res.json({
      success: true,
      verdict: allPassed
        ? "Accepted"
        : "Wrong Answer",
      results,
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      success: false,
      error: error.type || "Execution Error",
      message: error.message,
    });

  }

};

module.exports = {
  runCode,
};