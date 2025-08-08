Cloudflare Worker Chat Proxy (Free)

This Worker hides your Gemini API key and exposes POST /api/chat.

Deploy via Dashboard (no CLI):
1) Go to https://dash.cloudflare.com → Workers & Pages → Create → Worker
2) Click Quick Edit → replace code with src/index.js content from this folder
3) Settings → Variables → Add secret: GEMINI_API_KEY (paste your key)
4) (Optional) Add text variable: ALLOWED_ORIGIN with your site origin (e.g., https://diegoc55.github.io)
5) Deploy → copy the Worker URL (e.g., https://your-worker.workers.dev)
6) In your site, set window.CHAT_API_BASE to that base URL (see chat-config.js)

CORS: The Worker reads ALLOWED_ORIGIN, defaults to "*" for testing.

