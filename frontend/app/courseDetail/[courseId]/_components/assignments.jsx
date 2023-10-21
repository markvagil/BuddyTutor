import React, { useEffect, useState } from "react";
import { getAllAssignments } from "../../../api/api_service";

export const CourseDetailPage = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state

  useEffect(() => {
    // Inside the useEffect, setIsLoading can be used
    setIsLoading(true);
    console.log(`Course ID passed to CourseDetailPage is ${courseId}`);

    getAllAssignments(courseId)
      .then((response) => {
        if (response && response.courses && Array.isArray(response.courses)) {
          setCourseDetails(response.courses);
        } else {
          console.warn("Unexpected API response structure.");
        }
      })
      .catch((err) => {
        console.error("An error occurred while fetching course data:", err);
        // Handle error state if necessary
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after data fetching is done
      });
  }, [courseId]); // Include courseId as a dependency to re-run the effect when courseId changes

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : courseDetails ? (
        <div>
          <h1>{`Course ID: ${courseDetails.courseId}`}</h1>
          <p>{`Description: ${courseDetails.courseDescription}`}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default CourseDetailPage;
