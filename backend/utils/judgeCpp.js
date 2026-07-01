const executeCpp = require("./executeCpp");

const judgeCpp = async (code, testCases) => {

  let runtime=0;

  for (const testCase of testCases) {

    try {

      const start = Date.now();

      const output = await executeCpp(code,testCase.input);

      const end = Date.now();

      runtime += end - start;

      const expected = testCase.output.trim();

      const actual = output.trim();


      if (expected !== actual) {

        return {
          verdict: "Wrong Answer",
          input: testCase.input,
          expected,
          actual,
        };

      }

    } catch (error) {

      return {
        verdict: error.type || "Runtime Error",
        message: error.message,
      };

    }

  }

  return {
    verdict: "Accepted",
    runtime: `${runtime/testCases.length} ms`
  };

};

module.exports = judgeCpp;