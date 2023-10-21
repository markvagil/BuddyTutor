// create a route for chatController in controllers/chatgpt.js:
const express = require("express");
const chatController = require("../controllers/chatgpt.js");
const frontendQuery = require("../controllers/frontend_query.js");
const dashboardData = require("../controllers/dashboard_data.js");

const router = express.Router();

const checkAuthStatus = (req, res, next) => {
  // This is the middleware that will be used to check if the user is authenticated
  if (req.oidc.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:3000/login");
};

router.post("/add_question", frontendQuery.addQuestion);

router.get("/get_assignment_data", dashboardData.getAssignmentData);

router.post("/getAllAssignments", dashboardData.getAllAssignments);

router.get("/getAnalytics", dashboardData.getAnalytics);

router.get("/allCourses", dashboardData.getAllCourseInfo);

module.exports = router;
