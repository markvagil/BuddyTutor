// create a route for chatController in controllers/chatgpt.js:
const express = require('express');
const chatController = require('../controllers/chatgpt.js');
const frontendQuery = require('../controllers/frontend_query.js');

const router = express.Router();

const checkAuthStatus = (req, res, next) => { // This is the middleware that will be used to check if the user is authenticated
    if (req.oidc.isAuthenticated()) {
        return next();
    }
    res.redirect('http://localhost:3000/login');
}


router.post('/chat', chatController.chatController);

router.post('/frontend_query', frontendQuery.handleChatRequest);


module.exports = router
