import { NextApiRequest, NextApiResponse } from "next";

interface Message {
  role: string;
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const messages: Message[] = JSON.parse(req.body);
  const prompt =
    messages.map((msg) => `${msg.role}: ${msg.message}`).join("\n") + "\nAI:";

  const apiKey = process.env.OPENAI_API_KEY || "";
  const apiResponse = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    }),
  });

  const apiData = await apiResponse.json();
  const aiMessage =
    apiData.choices[0]?.text.trim() || "Error generating message";

  res.status(200).json({ message: aiMessage });
};

export default handler;
