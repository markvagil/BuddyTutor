const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  question: String,
  response: String,
  studentId: String
});

const assignmentSchema = new mongoose.Schema({
  assignmentId: String,
  moduleId: String,
  assignmentData: String,
  prompts: [promptSchema]
});

const courseSchema = new mongoose.Schema({
  courseId: String,
  assignments: [assignmentSchema]
});
const Course = mongoose.model('Course', courseSchema, 'Courses');

// export the model
module.exports = Course;