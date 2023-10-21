// This fill will have the functions to update the mongodb database with the frontend queries which contain
// the users question, the chatbot's response, and the student id which will then update the database

// This will be the middleware that will be used to call the chatbot API called chatgpt.js in the same folder
const express = require('express');
const { chatController } = require('./chatgpt.js');
const Course = require('../schemas/courses.js');
const router = express.Router();
const addQuestion = async (req, res) => {
  const { courseId, assignmentId, studentId, question } = req.body;

  if (!courseId || !assignmentId || !studentId || !question) {
    res.status(400).send({ error: "All fields are required." });
    return;
  }

  try {
    console.log(`Searching for course with courseId: ${courseId}`);
    const course = await Course.findOne({ courseId });
    console.log('Query result:', course ? JSON.stringify(course, null, 2) : 'No course found');

    if (!course) {
      res.status(404).send({ error: "Course not found." });
      return;
    }

    // Find the assignment within the course
    const assignment = course.assignments.find(
      assignment => assignment.assignmentId === assignmentId
    );

    if (!assignment) {
      res.status(404).send({ error: "Assignment not found." });
      return;
    }

    // Create a system message to instruct GPT-3.5 Turbo
    const systemMessage = {
      role: "system",
      content: `
          You are a helpful assistant aiding students in completing assignments. Your role is to provide guidance, ensuring they grasp the concepts, without providing direct solutions. Avoid behaviors or responses that waste time or consume excessive tokens. Always maintain an empathetic tone.
          Document ID: ${courseId}
          Assignment Data: ${assignment.assignmentData}
      `
  };
  

    // Call the chatController to get a response from OpenAI
    const chatResponse = await chatController(question, systemMessage);

    if (chatResponse.error) {
      res.status(500).send({ error: chatResponse.error });
      return;
    }

    // Add the new question and the chat response to the assignment's prompts array
    assignment.prompts.push({
      question,
      response: chatResponse.message,  
      studentId
    });

    // Mark the assignments array as modified
    course.markModified('assignments');

    // Save the updated course document
    await course.save();

    res.send({ message: "Question and response added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error." });
  }
};

module.exports =  {addQuestion};
