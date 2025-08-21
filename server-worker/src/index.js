export default {
  async fetch(request, env) {
    const { GEMINI_API_KEY, ALLOWED_ORIGIN } = env;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request, ALLOWED_ORIGIN) });
    }

    if (new URL(request.url).pathname === '/api/chat' && request.method === 'POST') {
      try {
        const { message } = await request.json();
        const text = (message || '').toString().trim();
        if (!text) {
          return json({ error: 'Missing message' }, 400, request, ALLOWED_ORIGIN);
        }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const payload = { contents: [ { parts: [ { text } ] } ] };

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!r.ok) {
          const body = await r.text();
          return json({ error: 'Upstream error', details: body }, r.status, request, ALLOWED_ORIGIN);
        }

        const data = await r.json();
        let reply = 'Sorry, no response available.';
        if (data.candidates?.length) {
          const parts = data.candidates[0].content?.parts;
          if (parts?.[0]?.text) reply = parts[0].text.trim();
        }
        return json({ reply }, 200, request, ALLOWED_ORIGIN);
      } catch (e) {
        return json({ error: 'Server error' }, 500, request, ALLOWED_ORIGIN);
      }
    }

    return json({ ok: true }, 200, request, ALLOWED_ORIGIN);
  }
};

function corsHeaders(request, allowed) {
  const origin = request.headers.get('Origin');
  const allowOrigin = allowed || '*';
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', allowOrigin === '*' ? '*' : (origin && origin.startsWith(allowOrigin) ? origin : allowOrigin));
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

function json(obj, status, request, allowed) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(corsHeaders(request, allowed))
    }
  });
}
