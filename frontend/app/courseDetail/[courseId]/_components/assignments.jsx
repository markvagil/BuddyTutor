import React, { useEffect, useState } from "react";
import { getAllAssignments } from "../../../api/api_service";
import "./CourseDetailPage.css"; // Import your CSS file for styling
import ChatModal from "../../../chat/chatmodal";

export const CourseDetailPage = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assignmentChatVisibility, setAssignmentChatVisibility] = useState({});


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

  useEffect(() => {
    const inititialAssignmentChatVisibility = {};
    assignments.forEach((assignment) => {
      inititialAssignmentChatVisibility[assignment._id] = false;
    });
    setAssignmentChatVisibility(inititialAssignmentChatVisibility);
  }, [assignments]);

  const toggleChatModal = (assignmentId) => {
    setAssignmentChatVisibility((prevAssignmentChatVisibility) => ({
      ...prevAssignmentChatVisibility,
      [assignmentId]: !prevAssignmentChatVisibility[assignmentId],
    }));
  };

  return (
    <div className="assignment-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id}>
              <div className="assignment-card">
                <h2>{assignment.assignmentId}</h2>
                <p>{assignment.assignmentData}</p>
                <button onClick={() => toggleChatModal(assignment._id)}>Open Chat</button>
              </div>
              {assignmentChatVisibility[assignment._id] && (
                <ChatModal onClose={() => toggleChatModal(assignment._id)}/>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments available for this course.</p>
      )}
    </div>
  );
};

export default CourseDetailPage;
