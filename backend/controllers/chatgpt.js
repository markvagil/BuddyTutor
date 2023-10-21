const axios = require('axios');

const chatController = async (req, res) => {
  const user_input = req.query.prompt || "What is your favorite color?"; // Get prompt from query parameter or use default
  
  const messageList = [
    { role: "user", content: user_input },
    { role: "system", content: "You are a helpful assistant that will help students complete assignments without giving them the complete answer, guided learning no matter what pertaining to the document." } // System instruction for GPT-3.5 Turbo
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
    res.send({ message: output_text });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: `An error occurred while processing your request: ${err.message}` });
  }
};

module.exports = { chatController };
