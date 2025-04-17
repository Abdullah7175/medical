"use client";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: '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',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000', // Optional. Site URL for rankings on openrouter.ai.
//     'X-Title': 'Medical Dashboard', // Optional. Site title for rankings on openrouter.ai.
//   },
// });

// async function main() {
//   const completion = await openai.chat.completions.create({
//     model: 'openai/gpt-3.5',
//     messages: [
//       {
//         role: 'user',
//         content: 'What is the meaning of life?',
//       },
//     ],
//   });

//   console.log(completion.choices[0].message);
// }
// main();

export default function ChatGPTSearch() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSearch(input) {
    
    const ai = new GoogleGenAI({ apiKey: "AIzaSyBZVx613qeoOD8vSlu69tIOKV9_CNTdnEM" });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "who are you?",
      });
      console.log(response.text);
    }

    main();
  }
  handleSearch();

  return (
    <div>
      <h2 className="text-md font-bold mb-1">ChatGPT Search</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a medical question..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="btn-secondary text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
