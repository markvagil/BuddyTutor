import React, { useState, useEffect, useRef } from "react";

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: "AI", message: "Hello! How can I assist you?" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage) return;

    const newMessage = { role: "User", message: userMessage };
    setMessages([...messages, newMessage]);

    // Fetch AI response from your API route
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const data = await response.json();

    setMessages([
      ...messages,
      newMessage,
      { role: "AI", message: data.message },
    ]);
    setUserMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>{`${msg.role}: ${msg.message}`}</div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <input type="text" value={userMessage} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default AIChatbot;
