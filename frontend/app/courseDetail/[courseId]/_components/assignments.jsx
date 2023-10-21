import React, { useEffect, useState } from "react";
import { getAllAssignments } from "../../../api/api_service";
import "./CourseDetailPage.css"; // Import your CSS file for styling
import Modal from "./Modal";  // Import the Modal component, which we will define later
import ChatModal from "../../../chat/chatmodal";  // Import the ChatModal component, which we will define later
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
export const CourseDetailPage = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);  // New state to track selected assignment
  const [showModal, setShowModal] = useState(false);  // New state to control Modal visibility
  const [showChat, setShowChat] = useState(false);  // New state to control Chat visibility
  const [currentOpenWindow, setCurrentOpenWindow] = useState(null);  // New state

  const openModal = (assignment) => {
    setCurrentOpenWindow('modal');  // Update the current open window
    setSelectedAssignment(assignment);
    setShowModal(true);
    setShowChat(false);  // Close chat if open
  };

  const openChat = (assignment) => {
    setCurrentOpenWindow('chat');  // Update the current open window
    setSelectedAssignment(assignment);
    setShowChat(true);
    setShowModal(false);  // Close modal if open
  };

  const closeWindows = () => {
    setCurrentOpenWindow(null);  // Reset the current open window
    setShowModal(false);
    setShowChat(false);
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
      <li key={assignment._id}>
        <div className="assignment-card" onClick={() => openModal(assignment)}>
          <h2>{assignment.assignmentId}</h2>
          <p>{assignment.assignmentData}</p>
        </div>
        <button className="chat-bubble" onClick={() => openChat(assignment)}> <FontAwesomeIcon icon={faCommentAlt} /></button> {/* Added this line */}
      </li>
    ))}
        </ul>
      ) : (
        <p>No assignments available for this course.</p>
      )}

      {/* Modal Component */}
     {showModal && <Modal assignment={selectedAssignment} closeModal={closeWindows} courseId={courseId} />}
     {showChat && <ChatModal assignment={selectedAssignment} onClose={closeWindows} courseId={courseId} />} 


    </div>
  );
};