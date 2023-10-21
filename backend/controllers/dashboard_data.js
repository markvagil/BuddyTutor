// This file will contain routes to obtain information from mongodb and send it to the frontend
const { chatController } = require('./chatgpt.js');
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

    const getAnalytics = async(req, res) => {
        // This will be used to get the analytics for an assignment in the course, 
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

            const questionAnswerPairs = assignment.prompts.map((prompt) => {
                return {question: prompt.question, answer: prompt.response}
            })

            // send the questions to chat gpt to get the most common questions asked
            const systemMessage = {
                role: "system",
                content: `
                    Only print the most common questions asked, and the most common responses given, you can keep it short but if many questions are fed to you, give more common questions and answers, only reply in the format is as follows with no other text besides it and other <question><response> pairs:
                    <question><response>
                    <question><response>
                    <question><response>
                    <question><response>
                    
                    Document ID: ${courseId}
                `
            };
           // console.log(assignment.assignmentData)

          const assignmentDataString =questionAnswerPairs.reduce((acc, curr) => {
              return acc + curr.question + curr.answer
              }, assignment.assignmentData);
            // Call the chatController to get a response from OpenAI
            const chatResponse = await chatController(assignmentDataString, systemMessage);


            res.status(200).send({chatResponse: chatResponse});
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: `An error occurred while processing your request: ${err.message}` });
                return;
              }
    }

    module.exports = { getAssignmentData, getAllAssignments, getAnalytics };
    
    
