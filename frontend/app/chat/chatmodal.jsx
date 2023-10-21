import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../api/api_service";
import "./chat.css"; // Import your CSS file for styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export const ChatModal = ({ assignment, onClose, courseId, professor = "professor" }) => {
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
            const response = await addQuestion(courseId, assignment.assignmentId, professor, currentMessage, messagesJSON);
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
          <div className="mini-chat-modal">
            <div className="mini-chat-header">
              <h3>BuddyTutor</h3>
              <button className="close-button" onClick={onClose}>X</button>

            </div>
            <div ref={chatWindowRef} className="mini-chat-window">
                {/* Display chat messages as you did in the original Chat component */}
                {messages.map((message, index) => (
          <div key={index} className={`message mb-2 flex items-end ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className="mini-chat-input">
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
  {loading ? "Loading..." : <FontAwesomeIcon icon={faPaperPlane} />}
</button>
              </div>
            </div>
          );
        };
        
        export default ChatModal;