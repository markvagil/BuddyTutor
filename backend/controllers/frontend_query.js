// This fill will have the functions to update the mongodb database with the frontend queries which contain
// the users question, the chatbot's response, and the student id which will then update the database

// This will be the middleware that will be used to call the chatbot API called chatgpt.js in the same folder
const express = require('express');
const { chatController } = require('./chatgpt.js');

const router = express.Router();

// Function to handle requests to the chat endpoint
const handleChatRequest = async (req, res) => {
    const { question, courseId, studentId } = req.body;  
    console.log(question, courseId, studentId)
    if (!question || !courseId) {
      res.status(400).send({ error: "Both question and course-id are required." });
      return;
    }
  

  // Create a system message to instruct GPT-3.5 Turbo
  const systemMessage = {
    role: "system",
    content: `You are a helpful assistant that will help students complete assignments without giving them the complete answer, guided learning no matter what pertaining to document ID ${courseId}.`
  };

  // Call the chatController to get a response from OpenAI
  const chatResponse = await chatController(question, systemMessage);
  
  if (chatResponse.error) {
    res.status(500).send({ error: chatResponse.error });
  } else {
    res.send({ message: chatResponse.message });
  }
};

// Route to handle chat requests

module.exports = {handleChatRequest};
