import React, { useEffect, useState } from 'react';
import './Modal.css';
import { getAnalytics } from '../../../api/api_service';

const Modal = ({ assignment, closeModal, courseId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('idle'); // idle, loading, loaded, error

  useEffect(() => {
    if (courseId && assignment?.assignmentId) {
      setLoadingStatus('loading');
      getAnalytics(courseId, assignment.assignmentId)
        .then((data) => {
          // each new line should be split, so an array of strings
           data.chatResponse.message = data.chatResponse.message.split('\n');


          setAnalyticsData(data);  // Update the state to hold analytics data
          setLoadingStatus('loaded');
        })
        .catch((error) => {
          console.error(error);
          setLoadingStatus('error');
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
          <div className="analytics-side-pane">
            <h2>Analytics on Common Questions</h2>
            {loadingStatus === 'loading' && <p>Loading Analytics on most common questions...</p>}
            {loadingStatus === 'loaded' && analyticsData && analyticsData.chatResponse && (
              <ul>
                {analyticsData.chatResponse.message.map((message, index) => (
                  <li key={index}>
                    {message}
                  </li>
                ))}
              </ul>
            )}
            {loadingStatus === 'error' && <p>Analytics will be loaded when students ask questions on this assignment.</p>}
          </div>
        </>
      ) : <p>No assignment data available.</p>}
      <button onClick={closeModal} className='close-button'>X</button>
    </div>
  );
};

export default Modal;
