const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  inputFormat: {
    type: String,
  },

  outputFormat: {
    type: String,
  },

  constraints: {
    type: String,
  },

  sampleInput: {
    type: String,
  },

  sampleOutput: {
    type: String,
  },

  starterCode: {
    type: String,
  },

  tags: [String],

  sampleTestCases: [
    {
      input: String,
      output: String,
    }
  ],

  testCases: [
    {
      input: String,
      output: String,
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model(
  "Problem",
  problemSchema
);