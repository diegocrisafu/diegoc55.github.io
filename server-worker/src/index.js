export default {
  async fetch(request, env) {
    const { GEMINI_API_KEY, ALLOWED_ORIGIN } = env;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request, ALLOWED_ORIGIN) });
    }

    if (new URL(request.url).pathname === '/api/chat' && request.method === 'POST') {
      try {
  const { message, context } = await request.json();
  const text = (message || '').toString().trim();
        if (!text) {
          return json({ error: 'Missing message' }, 400, request, ALLOWED_ORIGIN);
        }
        if (!GEMINI_API_KEY) {
          return json({ error: 'Missing server API key', advice: 'Set GEMINI_API_KEY in worker environment vars.' }, 500, request, ALLOWED_ORIGIN);
        }

  // Using gemini-1.5-flash (fast, multimodal capable) — adjust here if upgrading models
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        let contents = [ { parts: [ { text } ] } ];
        if(Array.isArray(context) && context.length){
          const prior = context.filter(c=>c && c.text).map(c=>({ role: c.role==='model'?'model':'user', parts:[{text: c.text.slice(0,500)}] }));
          contents = [...prior, { parts:[{text}] }];
        }
        const payload = { contents };

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!r.ok) {
          const body = await r.text();
          let parsed; try { parsed = JSON.parse(body); } catch {}
          const upstreamMsg = parsed?.error?.message || parsed?.message || body.slice(0,300);
          return json({ error: 'Upstream error', status: r.status, upstream: upstreamMsg }, r.status, request, ALLOWED_ORIGIN);
        }

        const data = await r.json();
        let reply = 'Sorry, no response available.';
        if (data.candidates?.length) {
          const parts = data.candidates[0].content?.parts;
          if (parts?.[0]?.text) reply = parts[0].text.trim();
        }
        return json({ reply }, 200, request, ALLOWED_ORIGIN);
    } catch (e) {
  return json({ error: 'Server error', details: (e && e.message) || 'unknown' }, 500, request, ALLOWED_ORIGIN);
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
