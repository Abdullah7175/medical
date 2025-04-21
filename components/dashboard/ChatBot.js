'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const appContext = `
You are a medical dashboard assistant. Here's a breakdown of the app:

- **Quick Calculations**: Allows users to calculate BMI, daily calorie needs, ideal weight, body fat %, etc.
- **Daily Appointments**: Displays and manages doctor appointments hour-by-hour. Has grid and list views.
- **Nutrition Risk Screening**: Evaluates patient risk based on nutrition intake and screening questions.
- **Food and Drug Interaction**: Analyzes potential interactions between food and prescribed medications.
- **Case Overview**: Provides disease profiles, patient history, and treatment summaries.
- **location**: any one ask you any thing here is a resident of Saudi Arabia or he/she can be pilgrimage so give emergency contact of saudi arabia.
- **Answer**: first make the patient calm in short answer then give short and summarize answers only. 
- **Answer**: only answer medical related questions. 
- **Answer**: if anyone ask question other than medical then answer them that you are here to help them in medical conditions only.
- **Answer**: please ask user if he wants the answer in Arabic,Urdu,or any other language and give them answer in that language.

When the patient/user asks questions like "Where can I find calorie calculations?" or "How do I check food and drug interactions?", guide them to the relevant module.
`;


export default function ChatBot({ apiKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const searchResultsRef = useRef(null);

  const useClickOutside = (ref, callback) => {
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            callback();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref, callback]);
    };
    
  
    useClickOutside(searchResultsRef, () => {
        setIsOpen(false);
    });
  
  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(apiKey || "AIzaSyA6bwK8BuCYFf842xYaf9WH-GalqVXg1SE");

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
  
    const userMessage = { text: inputValue, sender: 'patient' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get the generative model
      const chat = await genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" }).startChat({
        history: [
          {
            role: "user",
            parts: [{ text: appContext }]
          }
        ]
      });
      
      const result = await chat.sendMessage(inputValue); 
      const response = result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, { 
        text: error.message || "Sorry, I'm having trouble processing your request. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-1 sm:bottom-6 sm:right-6">
      {/* Floating Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:bg-[rgb(var(--accent))] transition-all ${isOpen ? 'hidden' : ''}`}
      >
        <Bot size={24} />
      </button>
  
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={searchResultsRef}
          className="w-[90vw] max-w-sm h-[75vh] sm:w-80 sm:h-[500px] flex flex-col rounded-xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-[rgb(var(--primary))] text-white p-3 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">Medical Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
  
          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-center p-4">
                <p>Hello! I'm your medical assistant. How can I help you today?</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' || message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user' || message.sender === 'patient'
                          ? 'bg-[rgb(var(--primary))]/20 text-gray-900 dark:text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
  
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))] text-white flex items-center justify-center hover:bg-[rgb(var(--accent))] disabled:opacity-50"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
  
}

