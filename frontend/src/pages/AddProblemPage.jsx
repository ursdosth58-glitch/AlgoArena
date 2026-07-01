import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AddProblemPage.css";
import API from "../services/api";

function AddProblemPage() {

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    starterCode: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!formData.title) {

      toast.error("Title is required");

      setLoading(false);

      return;
    }

    if (!formData.description) {

      toast.error("Description is required");

      setLoading(false);

      return;
    }

    if (!formData.difficulty) {

      toast.error("Difficulty is required");

      setLoading(false);

      return;
    }

    if (!formData.starterCode) {

      toast.error("Starter Code is required");

      setLoading(false);

      return;
    }

    if (!formData.sampleInput) {

      toast.error("Sample Input is required");

      setLoading(false);

      return;
    }

    if (!formData.sampleOutput) {

      toast.error("Sample Output is required");

      setLoading(false);

      return;
    }

    try {

      const response = await API.post("/problems",
        formData,
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Problem Added Successfully");

      setFormData(
        {
          title: "",
          difficulty: "",
          description: "",
          inputFormat: "",
          outputFormat: "",
          constraints: "",
          sampleInput: "",
          sampleOutput: "",
          starterCode: "",
          tags: "",
        }
      );

      setLoading(false);

    } catch (error) {
      setLoading(false);

      console.log(error);

    }
  };

  return (

    <div className="add-problem-page page-enter">

      <div className="add-problem-container">

        <h1>Create Problem</h1>

        <p>
          Add coding challenges dynamically into AlgoArena
        </p>

        <form
          className="problem-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">
              <label>Problem Title</label>

              <input
                type="text"
                name="title"
                placeholder="Ex: Two Sum"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">

              <label>Difficulty</label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >

                <option value="">
                  Select Difficulty
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Write detailed problem statement..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Input Format</label>

              <textarea
                name="inputFormat"
                placeholder="Describe input format..."
                value={formData.inputFormat}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Output Format</label>

              <textarea
                name="outputFormat"
                placeholder="Describe output format..."
                value={formData.outputFormat}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-group">

            <label>Constraints</label>

            <textarea
              name="constraints"
              placeholder="1 ≤ n ≤ 10^5"
              value={formData.constraints}
              onChange={handleChange}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Sample Input</label>

              <textarea
                name="sampleInput"
                placeholder="2 7 11 15"
                value={formData.sampleInput}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Sample Output</label>

              <textarea
                name="sampleOutput"
                placeholder="0 1"
                value={formData.sampleOutput}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-group">

            <label>Starter Code</label>

            <textarea
              name="starterCode"
              placeholder="#include <bits/stdc++.h>"
              value={formData.starterCode}
              onChange={handleChange}
            />
          
          </div>

          <div className="form-group">

            <label>Tags</label>

            <input
              type="text"
              name="tags"
              placeholder="Array, DP, Graph"
              value={formData.tags}
              onChange={handleChange}
            />

          </div>


          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Problem"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default AddProblemPage;