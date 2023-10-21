import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { getCourses } from "../api/api_service";

export const CourseCard = () => {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getCourses()
      .then((response) => {
        if (response && response.courses && Array.isArray(response.courses)) {
          setCourseData(response.courses);
        } else {
          console.warn("Unexpected API response structure.");
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching course data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {isLoading && (
        <div className="m-4 p-4 bg-blue-600 text-white rounded">
          <h1>Loading Courses...</h1>
        </div>
      )}
      {error && (
        <div className="m-4 p-4 bg-red-600 text-white rounded">
          <h1>{error}</h1>
        </div>
      )}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseData.length > 0 ? (
            courseData.map((course, index) => (
              <Link
                href={`/courseDetail/${course.courseId}`}
                key={index}
                passHref
              >
                <div className="bg-white rounded shadow-md p-4 cursor-pointer">
                  <CardHeader>
                    <CardTitle>{course.courseId}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {course.courseDescription}
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </div>
              </Link>
            ))
          ) : (
            <div className="m-4 p-4 bg-yellow-600 text-white rounded">
              <h1>No Courses Available</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
