const axios = require('axios');

const chatController = async (userInput, systemMessage) => {
  const messageList = [
    { role: "user", content: userInput },
    systemMessage  // Use the passed system message
  ];

  try {
    const GPTOutput = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: messageList,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`
        }
      }
    );
    
    const output_text = GPTOutput.data.choices[0].message.content.trim();
    return { message: output_text };  // Return the output as an object
  } catch (err) {
    console.error(err);
    return { error: `An error occurred while processing your request: ${err.message}` };  // Return the error as an object
  }
};


module.exports = { chatController };
