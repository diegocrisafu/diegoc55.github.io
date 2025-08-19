export default {
  async fetch(request, env) {
    const { GEMINI_API_KEY, ALLOWED_ORIGIN, DEBUG } = env;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request, ALLOWED_ORIGIN) });
    }

    const url = new URL(request.url);

    // Simple health endpoint
    if (url.pathname === '/api/health') {
      return json({ ok: true, hasKey: !!GEMINI_API_KEY }, 200, request, ALLOWED_ORIGIN);
    }

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        if (!GEMINI_API_KEY) {
          return json({ error: 'Server not configured: missing GEMINI_API_KEY' }, 500, request, ALLOWED_ORIGIN);
        }

        const { message } = await request.json();
        const text = (message || '').toString().trim();
        if (!text) {
          return json({ error: 'Missing message' }, 400, request, ALLOWED_ORIGIN);
        }

        // Use a current public model (adjust if you have access to others)
        const MODEL = 'gemini-1.5-flash';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        const payload = { contents: [ { parts: [ { text } ] } ] };

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        let rawBody; // keep for debugging
        if (!r.ok) {
          rawBody = await r.text();
          return json({ error: 'Upstream error', status: r.status, details: rawBody.slice(0, 800) }, r.status, request, ALLOWED_ORIGIN);
        }

        const data = await r.json();

        let reply = extractReply(data);
        if (!reply) {
          if (data?.promptFeedback?.blockReason) {
            reply = `Blocked by safety filter: ${data.promptFeedback.blockReason}`;
          } else if (data?.error?.message) {
            reply = `Error: ${data.error.message}`;
          } else {
            reply = 'No content returned.';
          }
        }

        const responsePayload = { reply };
        if (DEBUG === '1') {
          responsePayload.meta = {
            model: MODEL,
            hasCandidates: Array.isArray(data?.candidates) && data.candidates.length > 0,
            promptFeedback: data?.promptFeedback || null
          };
        }
        return json(responsePayload, 200, request, ALLOWED_ORIGIN);
      } catch (e) {
        return json({ error: 'Server error', message: e.message }, 500, request, ALLOWED_ORIGIN);
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

function extractReply(data) {
  try {
    if (!data) return '';
    // Standard path
    const candidate = data.candidates?.[0];
    if (candidate?.content?.parts) {
      const parts = candidate.content.parts
        .map(p => p.text)
        .filter(Boolean)
        .join('\n')
        .trim();
      if (parts) return parts;
    }
    // Alternate shapes
    if (candidate?.output) return String(candidate.output).trim();
    return '';
  } catch {
    return '';
  }
}
