"use client";
import React, { useState } from "react";

// Dummy API_URL
const API_URL = "http://localhost:3000/";

export function addQuestion(CourseId = "CS101", AssignmentId = "A1", StudentId = "joey", Question = "Hello, help me please.") {
  return fetch(`${API_URL}add_question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ CourseId, AssignmentId, StudentId, Question }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    try {
      // Add the new user message to the chat
      setMessages([...messages, { type: "user", content: currentMessage }]);

      // Call addQuestion function to send the question
      await addQuestion("CS101", "A1", "joey", currentMessage);

      // Simulate a bot response (In a real application, this should be the response from the server)
      setMessages([...messages, { type: "user", content: currentMessage }, { type: "bot", content: "How can I assist you?" }]);

      // Clear the input field
      setCurrentMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <main className="">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div className={`message ${message.type}`} key={index}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
};

export default Chat;
