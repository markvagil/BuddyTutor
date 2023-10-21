import React, { useEffect, useState } from "react";
import { getAllAssignments } from "../../../api/api_service";
import "./CourseDetailPage.css"; // Import your CSS file for styling

export const CourseDetailPage = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    </div>
  );
};

export default CourseDetailPage;
