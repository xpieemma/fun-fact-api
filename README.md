# ☕ The Daily Grind · Fun Fact API

 A clean, responsive full-stack web application that serves up random, interesting facts on demand. Built with a lightweight Vanilla JS frontend and a Node.js/Express backend, optimized for serverless deployment on Vercel.

### 🔗 [View Live Demo](https://fun-fact-ivory.vercel.app) 

## ✨ Features

* **Full-Stack Architecture:** Separates frontend UI logic from backend API fetching.
* **Serverless Ready:** Configured to run the Express backend as a Vercel Serverless Function via `vercel.json`.
* **Clean UI/UX:** Responsive, modern CSS card design with visual loading states and auto-dismissing error notifications.
* **Clipboard API:** One-click "Share" functionality to easily copy facts to the clipboard.
* **Robust Backend:** Uses `axios` with configured interceptors for logging, timeouts, and graceful error handling when interacting with external services.

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)  
**Backend:** Node.js, Express.js, Axios  
**Deployment:** Vercel (Static CDN + Serverless Functions)  
**External API:** [Useless Facts API](https://uselessfacts.jsph.pl/)

---

## 📂 Project Structure

```text
/
├── api/
│   └── index.js       # Express.js backend & API routes
├── public/            # (Optional) Static assets
├── index.html         # Frontend UI
├── script.js          # Frontend logic & API calls
├── styles.css         # UI Styling
├── package.json       # Project dependencies & scripts
└── vercel.json        # Serverless routing configuration
```

---

## Local Development

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xpieemma/fun-fact-api
   cd fun-fact
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   
   ```bash
   npm run dev
   ```
   *This uses `nodemon` to automatically restart the server upon file changes.*

1. **Open your browser:**
   Navigate to `http://localhost:3000`

---

## 📡 API Reference

Your Express server exposes the following endpoints:

### Get a Random Fact

\`\`\`http
GET /api/fun-fact
\`\`\`
**Response:**
\`\`\`json
{
  "fact": "The average person falls asleep in seven minutes.",
  "timestamp": "2026-03-17T12:00:00.000Z"
}
\`\`\`

### Get Multiple Facts

\`\`\`http
GET /api/fun-facts/:count
\`\`\`
*(Note: Maximum of 10 facts per request)*

---

## 👨‍💻 Author

**E. Pierre**
* [GitHub](https://github.com/xpieemma)
* [LinkedIn](https://linkedin.com/in/epierr14)