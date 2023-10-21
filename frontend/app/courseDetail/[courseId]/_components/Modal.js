import React, { useEffect, useState } from 'react';
import './Modal.css';
import { getAnalytics } from '../../../api/api_service';

const Modal = ({ assignment, closeModal, courseId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (courseId && assignment?.assignmentId) {
      getAnalytics(courseId, assignment.assignmentId)
        .then((data) => {
          setAnalyticsData(data);  // Update the state to hold analytics data
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [courseId, assignment]);

  return (
    <div className="modal">
      {assignment ? (
        <>
          <h2>{assignment.assignmentId}</h2>
          <ul>
            {assignment.prompts ? assignment.prompts.map((prompt, index) => (
              <li key={index}>
                <strong className="question">Question: </strong>{prompt.question ? prompt.question : "No question available."}
                <br />
                <strong className="response">Response: </strong>{prompt.response ? prompt.response : "No response available."}
                <br />
                <strong className="student-id">Student ID: </strong>{prompt.studentId ? prompt.studentId : "No student ID available."}
              </li>
            )) : <p>No prompts available for this assignment.</p>}
          </ul>
          {/* Display analytics if available */}
          {analyticsData && analyticsData.chatResponse ? (
            <div className="analytics-side-pane">
              <h3>Analytics</h3>
              <p>{analyticsData.chatResponse.message}</p>  {/* Access the nested message property */}
            </div>
          ) : null}
        </>
      ) : <p>No assignment data available.</p>}
      <button onClick={closeModal} className='close-button'>X</button>
    </div>
  );
};

export default Modal;

