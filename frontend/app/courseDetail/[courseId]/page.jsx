"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../_components/navbar";
import { CourseDetailPage } from "./_components/assignments";

export const CoursePage = () => {
  const [lastSegment, setLastSegment] = useState(null);

  useEffect(() => {
    function getLastSegmentOfURL() {
      return new Promise((resolve, reject) => {
        try {
          // Get the current URL of the webpage
          const currentURL = window.location.href;

          // Find the last occurrence of "/" in the URL
          const lastSlashIndex = currentURL.lastIndexOf("/");

          // Extract the portion of the URL after the last "/"
          const lastSegment = currentURL.substring(lastSlashIndex + 1);

          resolve(lastSegment);
        } catch (error) {
          reject(error);
        }
      });
    }

    // Usage example:
    getLastSegmentOfURL()
      .then((lastSegment) => {
        setLastSegment(lastSegment);
        console.log("String after the last /:", lastSegment);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, []); // Empty dependency array ensures this runs only once after the first render

  return (
    <main className="">
      <div className="relative h-[128px] w-full">
        <Navbar />
      </div>
      <div>{lastSegment && <CourseDetailPage courseId={lastSegment} />}</div>
    </main>
  );
};

export default CoursePage;
