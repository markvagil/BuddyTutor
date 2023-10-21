"use client";
import AIChatbot from "../_components/AIChatbot";
import Navbar from "../_components/navbar";

export const Chatbot: React.FC = () => {
  return (
    <main className="">
      <h1>GPT-3 Chatbot</h1>
      <AIChatbot />
    </main>
  );
};

export default Chatbot;
