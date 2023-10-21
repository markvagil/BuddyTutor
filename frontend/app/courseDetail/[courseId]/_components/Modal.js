import React from 'react';
import './Modal.css';  // Import your CSS for the modal

const Modal = ({ assignment, closeModal }) => {
  console.log("Modal assignment:", assignment);  // Debugging log
  
  return (
    <div className="modal">
      {assignment ? (
        <>
          <h2>{assignment.assignmentId}</h2>
        
          <ul>
            {assignment.prompts ? assignment.prompts.map((prompt, index) => (
              <li key={index}>
                <strong className="question">Question: </strong>{prompt.question}
                <br />
                <strong className="response">Response: </strong>{prompt.response}
                <br />
                <strong className="student-id">Student ID: </strong>{prompt.studentId}
              </li>
            )) : <p>No prompts available for this assignment.</p>}
          </ul>
        </>
      ) : <p>No assignment data available.</p>}
     <button onClick={closeModal} className='close-button'>X</button>
    </div>
  );
};

export default Modal;
