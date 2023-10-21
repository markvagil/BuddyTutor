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
