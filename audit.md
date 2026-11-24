# SmartStudy AI – Project Audit Report

## 1. Project Overview
SmartStudy AI is a web-based personal study assistant developed to help students learn, revise and organise their studies.

## 2. Features Audited

| Feature | Status |
|---|---|
| AI Doubt Solver | Working – Gemini API integrated |
| Notes Summarizer | Working – JavaScript-based |
| Quiz Generator | Working – JavaScript-based |
| Flashcard Maker | Working |
| Study Planner | Working |

## 3. Technology Audit
- HTML is used for the website structure.
- CSS is used for styling and layout.
- JavaScript handles frontend functionality.
- Node.js and Express.js manage backend operations.
- Google Gemini API powers the AI Doubt Solver.

## 4. Security Audit
- API key is stored in the backend `.env` file.
- `.env` is included in `.gitignore`.
- Backend `node_modules` is excluded from GitHub.
- API key is not directly exposed in frontend JavaScript.

## 5. Testing
