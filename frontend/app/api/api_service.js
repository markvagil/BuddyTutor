const API_URL = "http://localhost:3000/";

export function getCourses() {
  return fetch(`${API_URL}allCourses`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })

    .then((data) => {
      return data;
    })

    .catch((error) => {
      console.error("Error:", error);

      throw error; // propagate the error so that it can be caught in the calling function
    });
}
export function getAllAssignments(courseId) {
  // Decode the URL-encoded courseId back to its original form
  const decodedCourseId = decodeURIComponent(courseId);

  // Prepare the request body
  const requestBody = JSON.stringify({
    courseId: decodedCourseId,
  });

  return fetch(`${API_URL}getAllAssignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // propagate the error so that it can be caught in the calling function
    });
}

export function getAssignmentData(CourseId, AssignmentId) {
  return fetch(`${API_URL}get_assignment_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ CourseId, AssignmentId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // propagate the error so that it can be caught in the calling function
    });
}

export function getAnalytics(CourseId, AssignmentId) {
  return fetch(`${API_URL}getAnalytics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  "courseId": CourseId, "assignmentId": AssignmentId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // propagate the error so that it can be caught in the calling function
    });
}

//router.post('/add_question', frontendQuery.addQuestion);
/*  "courseId": "CS101",
  "assignmentId": "A1",
  "studentId": "joey",
  "question": "hello, what is 100 * 100"*/

export function addQuestion(
  CourseId = "CS101",
  AssignmentId = "A1",
  StudentId = "joey",
  Question = "Hello, help me please.",
  messagesJSON
) {
  return fetch(`${API_URL}add_question`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      courseId: CourseId,

      assignmentId: AssignmentId,

      studentId: StudentId,

      question: Question,

      messagesJSON: messagesJSON,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response;
    })

    .catch((error) => {
      console.error("Error:", error);

      throw error;
    });
}
