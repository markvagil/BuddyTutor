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