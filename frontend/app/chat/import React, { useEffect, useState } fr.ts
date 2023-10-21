import React, { useEffect, useState } from "react";
import { getAllAssignments } from "../../../api/api_service";
import "./CourseDetailPage.css"; // Import your CSS file for styling
import Modal from "./Modal";  // Import the Modal component, which we will define later

export const CourseDetailPage = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);  // New state to track selected assignment
  const [showModal, setShowModal] = useState(false);  // New state to control Modal visibility
  const [showChat, setShowCHat] = useState(false);  // New state to control Chat visibility
  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAssignment(null);
    setShowModal(false);
  };
  const closeChat = () => {
    setSelectedAssignment(null);
    setShowChat(false);
  }

  const openChat = (assignment) => {
    setSelectedAssignment(assignment);
    setShowChat(true);
  };
  
  useEffect(() => {
    setIsLoading(true);
    console.log(`Course ID passed to CourseDetailPage is ${courseId}`);

    getAllAssignments(courseId)
      .then((response) => {
        if (
          response &&
          response.assignments &&
          Array.isArray(response.assignments)
        ) {
          setAssignments(response.assignments);
        } else {
          console.warn("Unexpected API response structure.");
        }
      })
      .catch((err) => {
        console.error("An error occurred while fetching assignments:", err);
        // Handle error state if necessary
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [courseId]);

  return (
    <div className="assignment-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id} onClick={() => openModal(assignment)}>
              <div className="assignment-card">
                <h2>{assignment.assignmentId}</h2>
                <p>{assignment.assignmentData}</p>
                
                <button onClick={() => openChat(assignment)}>Chat</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments available for this course.</p>
      )}

      {/* Modal Component */}
     {showModal && <Modal assignment={selectedAssignment} closeModal={closeModal} courseId={courseId} />}
      {showChat && <Modal assignment={selectedAssignment} closeModal={closeChat} courseId={courseId} />}


    </div>
  );
};


import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../api/api_service";


export const ChatModal = ({ assignment, onClose, courseId }) => {
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