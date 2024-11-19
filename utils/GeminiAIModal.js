const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

async function run() {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [
    await uploadToGemini("Unknown File", "application/octet-stream"),
  ];

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Job Position: Full Stack Developer, Job Description:React,Nodejs,MySql, Years of Experience:6, Depends on these information please give me 5 Interview question with Answered in JSON format, Give question and Answered as field in JSON\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Job Position: Full Stack Developer, Job Description:React,Nodejs,MySql, Years of Experience:6, Depends on these information please give me 5 Interview question with Answered in JSON format, Give question and Answered as field in JSON",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[\n  {\n    "question": "Describe your experience with React.js, including specific versions you\'ve worked with and any advanced concepts you\'re familiar with (e.g., hooks, context API, state management libraries like Redux or Zustand).  Give an example of a complex React component you\'ve built and the challenges you faced.",\n    "answer": "I have extensive experience with React.js, primarily using versions 16 and 17. I\'m proficient with functional components, hooks (useState, useEffect, useContext, etc.), and the context API. I\'ve also worked extensively with Redux for state management in larger applications.  A complex component I built was a dynamic data visualization dashboard that fetched data from a REST API, filtered and sorted it based on user input, and rendered it using interactive charts. The main challenge was efficiently managing a large state and optimizing performance for large datasets. I addressed this by implementing memoization and using React.memo to prevent unnecessary re-renders."\n  },\n  {\n    "question": "Explain your experience with Node.js and its ecosystem. What are some of your preferred Node.js frameworks or libraries, and why do you prefer them?  Describe a project where you used Node.js to solve a challenging problem.",\n    "answer": "I\'ve worked extensively with Node.js, primarily using Express.js as the framework for building RESTful APIs. I appreciate its ease of use, scalability, and extensive middleware support. I also have experience with other libraries like Mongoose (for MongoDB interactions) and Socket.IO (for real-time communication). In a previous project, I used Node.js to build a real-time chat application. The challenge was maintaining consistent state across multiple clients and handling a large number of concurrent connections. We solved this by leveraging Socket.IO\'s built-in features for managing rooms and broadcasting messages efficiently."\n  },\n  {\n    "question": "How familiar are you with MySQL? Describe your experience with database design, SQL queries (including joins and subqueries), and database optimization techniques. Give an example of a complex database query you\'ve written and explain your approach.",\n    "answer": "I\'m very comfortable with MySQL. I have experience designing relational databases, writing complex SQL queries (including joins like INNER JOIN, LEFT JOIN, and subqueries), and optimizing query performance using indexing and other techniques. For example, I once had to write a query to retrieve data from three tables to generate a detailed sales report, which involved multiple joins and aggregate functions. To optimize the query, I created indexes on the columns involved in the joins, resulting in a significant performance improvement."\n  },\n  {\n    "question": "Describe your experience with testing in a full-stack environment. What testing methodologies (unit, integration, end-to-end) do you employ, and what frameworks or tools do you use?  How do you ensure high code quality?",\n    "answer": "I incorporate testing throughout the development lifecycle, using a combination of unit, integration, and end-to-end tests.  For unit testing in React, I use Jest and React Testing Library, focusing on testing component behavior and state changes.  For integration testing, I use tools like Supertest to test the interactions between my frontend and backend APIs.  End-to-end testing is done using Cypress or Selenium to test the complete application flow.  I always strive for high test coverage to ensure code quality and prevent regressions. Code reviews are also a crucial part of my workflow, allowing for collective code quality enhancement and knowledge sharing."\n  },\n  {\n    "question": "You\'re tasked with designing a new feature for an e-commerce website:  a user profile page that displays order history, saved addresses, and payment methods.  Describe your approach to designing the backend and frontend, considering data modeling, API design, state management, and user experience. What technologies would you choose and why?",\n    "answer": "My approach would begin with careful data modeling in MySQL.  I\'d define tables for users, orders, addresses, and payment methods, with appropriate relationships between them.  The backend, built with Node.js and Express.js, would expose RESTful APIs to fetch and manage this data.  On the frontend, using React, I would use hooks for managing state, possibly useContext for sharing data across components, and a suitable routing library like React Router.  For the UI, I\'d focus on clear and intuitive design, separating the data fetching and display logic for maintainability.  Security considerations, including authentication and authorization, would be a top priority, implementing appropriate measures to protect sensitive user data. For data fetching and caching, I\'d consider using techniques like GraphQL or a library like SWR to optimize performance."\n  }\n]\n```\n',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
});
