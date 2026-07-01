import Editor from "@monaco-editor/react";
import axios from "axios";
import "./ProblemDetailsPage.css";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

function ProblemDetailsPage() {

  const { id } = useParams();

  const [problem, setProblem] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    const fetchProblem = async () => {
      try {
        const response = await API.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblem();

  }, [id]);

  useEffect(() => {
    if(problem?.starterCode){
      setCode(problem.starterCode);
    }
  }, [problem]);

  const [customInput, setCustomInput] = useState("");

  const [output, setOutput] = useState("");
  const [runResults, setRunResults] = useState([]);

  const [activeTab, setActiveTab] = useState("testcase");
  const [selectedCase, setSelectedCase] = useState(0);

  const [code, setCode] = useState(problem?.starterCode || "");

  const runCode = async () => {

    try {

      setOutput("Running...");
      setIsRunning(true);

      const response = await API.post(
        "/code/run",
        {
          code,
          problemId: problem._id,
        }
      );

      

      setRunResults(response.data.results || []);

    } catch (error) {

      console.log(error);

      setRunResults([
        {
          verdict: "Execution Error",
          actual: "Execution Failed",
        },
      ]);

    } finally {
      setActiveTab("output");
      setIsRunning(false);
    }

  };

  const submitCode = async () => {

    try {

      setOutput("Submitting...");
      setIsSubmitting(true);


      const response = await API.post("/submissions",
        {
          problem:problem._id,
          code,
          language:"cpp",
        },

        {
          headers: {
            Authorization:
          `Bearer ${localStorage.getItem("token")}`,
          },
        },

      );

      setRunResults([
        {
          verdict: response.data.verdict,
          actual: `Runtime: ${response.data.runtime}`,
        },
      ]);
    } catch(error){
      console.log(error);
      setOutput("Submission Failed");

    } finally {
      setActiveTab("output");
      setIsSubmitting(false);
    }
  };

  if (!problem) {

    return <LoadingScreen />;

  } 

  return (

    <div className="problem-layout page-enter">

      <PanelGroup direction="horizontal">

        {/* LEFT PANEL */}

        <Panel defaultSize={50} minSize={30}>

          <div className="problem-left">

            <h1>{problem.title}</h1>

            <div className="problem-meta">

              <span className="difficulty easy">
                {problem.difficulty}
              </span>

              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag"
                >
                  {tag}
                </span>
              ))}

            </div>

            <div className="problem-description">

              <p>
                {problem.description}
              </p>

            </div>

            <div className="examples">

              <h2>Example 1:</h2>

              <div className="example-box">

                <p>
                  Input: {problem.sampleInput}
                </p>

                <p>
                  Output: {problem.sampleOutput}
                </p>

              </div>

            </div>

            <div className="constraints">

              <h2>Constraints:</h2>

              <ul>
                <li>{problem.constraints}</li>
              </ul>

            </div>

          </div>

        </Panel>

        {/* RESIZE HANDLE */}

        <PanelResizeHandle className="resize-handle" />

        {/* RIGHT PANEL */}

        <Panel defaultSize={50} minSize={30}>

          <div className="problem-right">

            <div className="editor-header">

              <h2>Code Editor</h2>

              <select>

                <option>C++</option>

                <option>Java</option>

                <option>Python</option>

              </select>

            </div>

            <div className="editor-container">

              <Editor
                height="100%"
                defaultLanguage="cpp"
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
              />

            </div>

            <div className="testcase-section">

              <div className="main-tabs">

                <button
                  className={
                    activeTab === "testcase"
                      ? "main-tab active"
                      : "main-tab"
                  }
                  onClick={() => setActiveTab("testcase")}
                >
                  Testcase
                </button>

                <button
                  className={
                    activeTab === "output"
                      ? "main-tab active"
                      : "main-tab"
                  }
                  onClick={() => setActiveTab("output")}
                >
                  Output
                </button>

              </div>

              {activeTab === "testcase" && (

                <div className="testcase-content">

                  <div className="case-tabs">

                    {problem.sampleTestCases?.map((testcase, index) => (

                      <button
                        key={index}
                        className={
                          selectedCase === index
                            ? "case-btn active"
                            : "case-btn"
                        }
                        onClick={() => setSelectedCase(index)}
                      >
                        Case {index + 1}
                      </button>

                    ))}

                  </div>

                  <div className="test-block">

                    <h4>Input</h4>

                    <pre>
                      {problem.sampleTestCases?.[selectedCase]?.input}
                    </pre>

                  </div>

                  <div className="test-block">

                    <h4>Output</h4>

                    <pre>
                      {problem.sampleTestCases?.[selectedCase]?.output}
                    </pre>

                  </div>

                </div>

              )}

              {activeTab === "output" && (

                <div className="output-content">

                  {runResults.length === 0 ? (

                    <p>Run your code to see output.</p>

                  ) : (

                    <>

                      <div className="case-tabs">

                        {runResults.map((result, index) => (

                          <button
                            key={index}
                            className={
                              selectedCase === index
                                ? "case-btn active"
                                : "case-btn"
                            }
                            onClick={() =>
                              setSelectedCase(index)
                            }
                          >

                            Case {index + 1}

                          </button>

                        ))}

                      </div>

                      <div className="test-block">

                        <h4>Input</h4>

                        <pre>
                          {runResults[selectedCase]?.input}
                        </pre>

                      </div>

                      <div className="test-block">

                        <h4>Expected Output</h4>

                        <pre>
                          {runResults[selectedCase]?.expected}
                        </pre>

                      </div>

                      <div className="test-block">

                        <h4>Your Output</h4>

                        <pre>
                          {runResults[selectedCase]?.actual}
                        </pre>

                      </div>

                      <div
                        className={
                          runResults[selectedCase]?.verdict === "Accepted"
                            ? "accepted"
                            : "wrong"
                        }
                      >

                        {runResults[selectedCase]?.verdict === "Accepted"
                          ? "✓ Accepted"
                          : `✗ ${runResults[selectedCase]?.verdict}`}

                      </div>

                    </>

                  )}

                </div>

              )}

            </div>

            <div className="action-buttons">
              <button
                className="run-btn"
                onClick={runCode}
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "Run Code"}
              </button>

              <button
                className="submit-btn"
                onClick={submitCode}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>

        </Panel>

      </PanelGroup>

    </div>
  );
}

export default ProblemDetailsPage;