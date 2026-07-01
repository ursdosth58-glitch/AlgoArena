const fs = require("fs");
const path = require("path");
const { exec, execFile } = require("child_process");

const executeCpp = (code, input = "") => {
  return new Promise((resolve, reject) => {

    const tempDir = path.join(__dirname, "..", "temp");

    const jobId = Date.now();

    const cppPath = path.join(
      tempDir,
      `code_${jobId}.cpp`
    );

    const exePath = path.join(
      tempDir,
      `code_${jobId}.exe`
    );

    const inputPath = path.join(
      tempDir,
      `input_${jobId}.txt`
    );

    const safeDelete = (filePath) => {

      if (fs.existsSync(filePath)) {

        try {

          fs.unlinkSync(filePath);

        } catch (err) {

        }

      }

    };

    fs.writeFileSync(inputPath, input);

    fs.writeFileSync(cppPath, code);

    const compileCommand =
      `g++ "${cppPath}" -o "${exePath}"`;

    exec(compileCommand, (compileError, stdout, stderr) => {

      if (compileError) {

        fs.unlinkSync(cppPath);

        return reject({
          type: "Compilation Error",
          message: stderr,
        });

      }

      exec(`"${exePath}" < "${inputPath}"`,{timeout: 2000}, (runError, runStdout, runStderr) => {

        setTimeout(() => {
          safeDelete(cppPath);
        }, 5000);

        if (fs.existsSync(exePath)) {
          setTimeout(() => {
            safeDelete(exePath);
          }, 5000);
        }

        if (fs.existsSync(inputPath)) {
          setTimeout(() => {
            safeDelete(inputPath);
          }, 5000);
        }

        if (runError) {

          if (runError.killed) {

            return reject({
              type: "Time Limit Exceeded",
              message: "Execution exceeded 2 seconds",
            });

          }

          return reject({
            type: "Runtime Error",
            message: runStderr,
          });

        }

        resolve(runStdout);

      });

    });

  });
};

module.exports = executeCpp;