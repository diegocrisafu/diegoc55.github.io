Backend for Chatbot Proxy

How to run locally:

1) cd server
2) cp .env.example .env
3) Edit .env and set GEMINI_API_KEY=your_key
4) npm install
5) npm start

Frontend usage (already wired):
- index.html calls http://localhost:8787/api/chat

Deploy options:
- Vercel/Render/Fly/Cloud Run: set GEMINI_API_KEY and ALLOWED_ORIGIN env vars in the dashboard.
- GitHub Pages is static only; run backend elsewhere and point index.html to that URL.

Security tips:
- Never commit .env
- Limit rate, CORS to your domain, and rotate keys periodically.
