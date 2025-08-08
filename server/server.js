/*
  Minimal backend proxy to hide your API key.
  - Reads GEMINI_API_KEY from environment (.env in dev, host vars in prod)
  - Exposes POST /api/chat which forwards to Gemini generateContent
  - Adds CORS, basic rate limiting, and small input validation
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY not set. Set it in .env (dev) or host env (prod).');
}

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: ALLOWED_ORIGIN }));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,             // 30 requests/min per IP
});
app.use('/api/', limiter);

app.post('/api/chat', async (req, res) => {
  try {
    const userText = (req.body && req.body.message ? String(req.body.message) : '').trim();
    if (!userText) {
      return res.status(400).json({ error: 'Missing message' });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      contents: [ { parts: [ { text: userText } ] } ]
    };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: 'Upstream error', details: text });
    }

    const data = await r.json();
    let reply = 'Sorry, no response available.';
    if (data.candidates && data.candidates.length > 0) {
      const parts = data.candidates[0].content && data.candidates[0].content.parts;
      if (Array.isArray(parts) && parts[0] && typeof parts[0].text === 'string') {
        reply = parts[0].text.trim();
      }
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Chat proxy running on http://localhost:${PORT}`));
