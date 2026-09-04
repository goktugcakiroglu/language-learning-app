# Language Detective

Language Detective is a professional, global SaaS MVP designed to transform vocabulary acquisition into a visual and interactive "rabbit hole" experience. Rather than serving as a standard dictionary, it acts as a semantic exploration engine powered by AI.

## Key Features

* **Interactive Linguistic Mind Maps:** Built with React Flow, visualizing etymology, prefixes, suffixes, synonyms, and antonyms dynamically.
* **Semantic Clustering (Rabbit Hole Effect):** Users can seamlessly jump from one related concept to another without reloading, creating an infinite learning loop.
* **AI Visual Memory:** Integrates directly with Pollinations AI to generate stunning, context-aware imagery based on prompt-engineered linguistic data.
* **Strict English-First Output:** Backed by strict prompt engineering ensuring all definitions, context tags, and explanations are output in professional-grade English.
* **Cache-First Architecture:** Eliminates redundant API calls and prevents quota exhaustion by storing previously analyzed words in a local cache.

## Tech Stack

* **Frontend:** React, Tailwind CSS, React Flow, Lucide Icons
* **Backend:** Node.js, TypeScript, Express.js
* **AI & Data:** Google Gemini API (gemini-1.5-flash), Pollinations AI (Image Generation)

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* A valid Google Gemini API Key

### Installation & Running the App

You can set up the entire project by running the following commands in your terminal:

```bash
# 1. Clone the repository
git clone [https://github.com/goktugcakiroglu/language-learning-app.git](https://github.com/goktugcakiroglu/language-learning-app.git)
cd language-learning-app

# 2. Install Backend Dependencies
cd backend
npm install
# IMPORTANT: Create a .env file inside the 'backend' folder and add: GEMINI_API_KEY=your_api_key_here

# 3. Install Frontend Dependencies
cd ../frontend
npm install

# 4. Start the Application
# You will need two separate terminal windows to run both servers simultaneously:
# Terminal 1 (Backend): cd backend && npm run dev
# Terminal 2 (Frontend): cd frontend && npm run dev
```

## Architecture Highlights

* **Strategy Pattern**: The application logic utilizes the Strategy Pattern (e.g., EnglishStrategy.ts) to allow seamless scalability for future multi-language support.

* **Auto-Fit Graph Layout**: React Flow's canvas automatically scales and centers (fitView) to maintain a clean UI regardless of monitor size or data complexity.
