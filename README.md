# SmartStudy AI – Your Personal AI Study Assistant

## About the Project
SmartStudy AI is a web-based study assistant designed to make learning easier, smarter and more interactive. It helps students understand concepts, revise notes, practise questions and organise their studies.

## Features

1. **AI Doubt Solver:** Uses Google's Gemini API to provide student-friendly explanations to academic questions.
2. **Notes Summarizer:** Converts lengthy notes into shorter summaries.
3. **Quiz Generator:** Generates practice quizzes from study material.
4. **Flashcard Maker:** Creates flashcards for quick revision.
5. **Study Planner:** Helps students organise their study tasks.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Google Gemini API

## Project Structure

```text
SmartStudy-AI/
│
├── index.html
├── style.css
├── script.js
├── .gitignore
│
└── backend/
    ├── server.js
    ├── package.json
    └── package-lock.json
```

## Setup Instructions

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Open the terminal and navigate to the backend folder.
4. Install dependencies:

   `npm install`

5. Create a `.env` file inside the backend folder.
6. Add your Gemini API key:

   `GEMINI_API_KEY=your_api_key_here`

7. Start the backend:

   `node server.js`

8. Open `index.html` in your browser.

## API Integration

SmartStudy AI uses the Google Gemini API to generate AI-powered answers through a Node.js backend.

The API key is stored securely in an