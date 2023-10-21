"use client";
import React, { useState } from "react";
import { addQuestion } from "../api/api_service"; // Make sure the addQuestion function is correctly imported

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const addMessage = (type, content) => {
    setMessages((prevMessages) => [...prevMessages, { type, content }]);
  };

  const sendMessage = async () => {
    setLoading(true); // Set loading state to true before API call
    try {
      addMessage("user", currentMessage);
      console.log(`Most recent message: ${currentMessage}`);  // Log the most recent message

      // Convert the entire chat history to a JSON-formatted string
      const messagesJSON = JSON.stringify(messages);

      // Call addQuestion function to send the question and the entire chat history
      const response = await addQuestion("CS101", "A1", "joey", currentMessage, messagesJSON); // Adding messagesJSON as a parameter

      // Parse the JSON response to get the actual message content
      const responseData = await response.json();

      addMessage("bot", responseData.response || "How can I assist you?");
      
      // Clear the input field
      setCurrentMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage("bot", "Error sending message.");
    } finally {
      setLoading(false); // Set loading state to false after API call
    }
  };
  return (
    <main className="bg-gray-100 p-4">
      <div className="chat-window bg-white rounded-lg p-4">
        {messages.map((message, index) => (
          <div className={`message ${message.type === "user" ? "text-blue-500" : "text-green-500"} mb-2`} key={index}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input mt-4 flex items-center">
        <input
          className="rounded-lg border-2 border-gray-300 flex-1 mr-2 p-2"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={sendMessage} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </main>
  );
};

export default Chat;
