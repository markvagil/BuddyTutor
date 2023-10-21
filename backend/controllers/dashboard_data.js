// This file will contain routes to obtain information from mongodb and send it to the frontend

// The user will be authenticated as a course instructor to access this data
const Course = require('../schemas/courses.js');
const getAssignmentData = async (req, res) => {
    const { courseId, assignmentId } = req.body;
    if (!courseId || !assignmentId ) {
        res.status(400).send({ error: "All fields are required." });
        return;
      }
      try {
        console.log(`Searching for course with courseId: ${courseId}`);
        const course = await Course.findOne({ courseId });
        console.log('Query result:', course ? JSON.stringify(course, null, 2) : 'No course found');
    
        if (!course) {
          res.status(404).send({ error: "Course not found." });
          return;
        }
    
        // Find the assignment within the course
        const assignment = course.assignments.find(
          assignment => assignment.assignmentId === assignmentId
        );
    
        if (!assignment) {
          res.status(404).send({ error: "Assignment not found." });
          return;
        }
        res.status(200).send({assignmentData: assignment.assignmentData, prompts: assignment.prompts});
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: `An error occurred while processing your request: ${err.message}` });
            return;
          }
        }
          

    const getAllAssignments = async (req, res) => {
        const { courseId } = req.body;
        // find the course id, then return the entire object

        if (!courseId) {
            res.status(400).send({ error: "All fields are required." });
            return;
          }
            try {
                console.log(`Searching for course with courseId: ${courseId}`);
                const course = await Course.findOne({ courseId });
                console.log('Query result:', course ? JSON.stringify(course, null, 2) : 'No course found');
            
                if (!course) {
                res.status(404).send({ error: "Course not found." });
                return;
                }
                res.status(200).send({assignments: course.assignments});
                }
                catch (err) {
                    console.error(err);
                    res.status(500).send({ error: `An error occurred while processing your request: ${err.message}` });
                    return;
                }
                }
    

    module.exports = { getAssignmentData, getAllAssignments };
    
    
