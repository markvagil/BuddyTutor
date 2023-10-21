import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../api/api_service";

export const ChatModal = ({ onClose }) => {
        const [messages, setMessages] = useState([
          {
            type: "bot",
            content: "Welcome to the chat! How can I assist you with the assignment?",
          },
        ]);
        const [currentMessage, setCurrentMessage] = useState("");
        const [loading, setLoading] = useState(false);
        const chatWindowRef = useRef(null);
      
        const addMessage = (type, content) => {
          setMessages((prevMessages) => [...prevMessages, { type, content }]);
        };
      
        const handleKeyDown = (e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        };
      
        const sendMessage = async () => {
          if (currentMessage.trim() === "") return;
      
          setLoading(true);
          try {
            addMessage("user", currentMessage);
            const messagesJSON = JSON.stringify(messages);
            const response = await addQuestion("CS101", "A1", "joey", currentMessage, messagesJSON);
            const responseData = await response.json();
            addMessage("bot", responseData.response || "How can I assist you?");
            setCurrentMessage("");
          } catch (error) {
            console.error("Failed to send message:", error);
            addMessage("bot", "Error sending message.");
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => {
          if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
          }
        }, [messages, loading]);

        return (
            <div className="chat-modal">
              <div className="chat-header">
                <h3>Welcome to the Chat</h3>
                <button onClick={onClose}>Close</button> {/* Add a close button */}
              </div>
              <div ref={chatWindowRef} className="chat-window bg-white rounded-lg p-4 flex-grow overflow-y-auto shadow-lg">
                {/* Display chat messages as you did in the original Chat component */}
                {messages.map((message, index) => (
          <div key={index} className={`message mb-2 flex items-end ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`p-2 rounded-lg ${message.type === "user" ? "bg-indigo-600 text-white" : "bg-indigo-300 text-black"}`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
            <div className="message mb-2 flex items-end flex-row">
                <div className="p-2 rounded-lg bg-gray-400 text-white">
                    Loading...
                </div>
            </div>
        )}
    </div>
    <div className="chat-input mt-4 flex items-center">
        <input
            className="rounded-lg border-2 border-indigo-400 flex-1 mr-2 p-2"
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about the assignment"
        />
        <button className="bg-indigo-600 text-white p-2 rounded-lg" onClick={sendMessage} disabled={loading}>
                  {loading ? "Loading..." : "Send"}
                </button>
              </div>
            </div>
          );
        };
        
        export default ChatModal;