/* Lightweight modular assistant: remote + local knowledge base with fuzzy + multi-intent support */
(()=>{
  const cfg = {
    forceLocalFlagKey: 'forceLocalChat',
    maxHistory: 8,
    memoryKey: 'assistantUserMemory'
  };
  const knowledge = {
    skills: 'Cloud & DevOps (Azure, AWS EC2/S3/Lambda, GitHub Actions, CI/CD, IaC); JS/TS, PowerShell, Python, C++, HTML5/CSS3; MongoDB & SQL; AI (OpenAI, generative, automation); 3D & Simulation (Unreal, NVIDIA Omniverse, VR/AR); Tools (Git, Docker, GitHub Copilot, SCTP, TLS, DPDK/VPP).',
    experience: 'CAE: Software Engineer (DevOps, May 2025–present) + IVR System Developer (Sep 2024–May 2025) + Intern (Oct 2023–Sep 2024). Presagis: Simulation Developer (Jun 2022–Jun 2023), 3D Artist/Dev (Sep 2021–Jun 2022).',
    projects: 'VR Brain Installation (neuroscience VR), The Actual Informer (news summarization w/ OpenAI), Real-Time Dashboard (Python Dash), Expense Tracker (React).',
    education: 'Concordia University: Double Major Computational Design & CS (2022–present). Marianopolis College: Commerce DEC (2020–2022).',
    contact: 'Email: diego.crisafu@gmail.com | LinkedIn: linkedin.com/in/diegocrisafulli212bb0256 | GitHub: github.com/diegocrisafu',
    summary: 'Software & ML Engineer focusing on cloud-native, full-stack, automation, simulation & immersive tech.'
  };
  const categoryKeywords = {
    skills:['skill','stack','tech','technology','technologies','languages'],
    experience:['experience','role','roles','jobs','job','work history','career'],
    projects:['project','projects','build','portfolio','app','apps'],
    education:['education','school','study','studies','university','college','degree'],
    contact:['contact','email','reach','linkedin','github'],
    summary:['summary','about','profile','bio']
  };
  function normalize(s){return (s||'').toLowerCase();}
  function multiMatch(q){
    const hits=[]; const qs=normalize(q);
    for(const [cat,keys] of Object.entries(categoryKeywords)){
      if(keys.some(k=>qs.includes(k))) hits.push(cat);
    }
    return hits;
  }
  function fuzzyLookup(q){
    const qs = normalize(q);
    function dist(a,b){
      if(Math.abs(a.length-b.length)>1) return 99;
      const dp=Array(a.length+1).fill(null).map(()=>Array(b.length+1).fill(0));
      for(let i=0;i<=a.length;i++) dp[i][0]=i;
      for(let j=0;j<=b.length;j++) dp[0][j]=j;
      for(let i=1;i<=a.length;i++){
        for(let j=1;j<=b.length;j++){
          const cost = a[i-1]===b[j-1]?0:1;
          dp[i][j]=Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
        }
      }
      return dp[a.length][b.length];
    }
    for(const [cat,keys] of Object.entries(categoryKeywords)){
      for(const k of keys){
        if(qs.includes(k)) return cat;
        // token distance check
        const tokens = qs.split(/\s+/);
        if(tokens.some(t=>dist(t,k)<=1)) return cat;
      }
    }
    return null;
  }
  function composeAnswer(cats){
    if(!cats.length) return null;
    const uniq=[...new Set(cats)];
    if(uniq.length===1) return knowledge[uniq[0]];
    return uniq.map(c=>`(${c}) ${knowledge[c]}`).join(' | ');
  }
  const greetingRe=/^(hi|hey|hello|yo|sup)\b/;
  function loadPersistent(){
    try{ return JSON.parse(localStorage.getItem(cfg.memoryKey)||'{}'); }catch{ return {}; }
  }
  function savePersistent(mem){ try{ localStorage.setItem(cfg.memoryKey, JSON.stringify(mem)); }catch{} }
  const persistent = loadPersistent(); // { name?, lastTopics:[] }

  function rememberName(q){
    // patterns: "i am X", "i'm X", "my name is X"
    let m = q.match(/\b(i am|i'm|my name is)\s+([a-z][a-z\-']{1,30})/i);
    if(m){ const name = m[2].replace(/[^a-z\-']/gi,''); if(name){ persistent.name = name.charAt(0).toUpperCase()+name.slice(1); savePersistent(persistent); return name; } }
    return null;
  }
  function localAnswer(input, history){
    const raw=(input||'').trim();
    if(!raw) return 'Ask about skills, experience, projects, education, contact, or say help.';
    const q=normalize(raw);
    if(greetingRe.test(q)) {
      const nm = persistent.name ? ` ${persistent.name}` : '';
      return `Hi${nm}! Ask about skills, experience, projects, education, contact, or multiple at once.`;
    }
    const capturedName = rememberName(raw);
    if(capturedName){
      return `Nice to meet you, ${persistent.name}! Ask about skills, projects, or say help.`;
    }
  if(q.includes('help')) return 'Examples: "skills", "experience at CAE", "skills + projects", "contact", "summary".';
  if(/how are you|how's it going|how are u|you good/.test(q)) return "I'm running smoothly. How can I help you today?";
  if(/thank(s| you)|appreciate it/.test(q)) return 'You\'re welcome! Anything else you\'d like to know?';
  if(/joke|funny/.test(q)) return 'Here\'s a tiny dev joke: Why did the developer go broke? Because he used up all his cache.';
  if(/who am i\b/.test(q) && persistent.name) return `You told me your name is ${persistent.name}.`;
    const cats = multiMatch(q);
    if(!cats.length){
      const fuzzy=fuzzyLookup(q); if(fuzzy) return knowledge[fuzzy];
      // context memory: if user references pronouns after a category
      if(/tell me more|more info|expand|details|that one|those|it again/.test(q) && history){
        const lastCat = (history.slice().reverse().find(m=>m.meta && m.meta.cats && m.meta.cats.length)||{}).meta?.cats?.slice(-1)[0];
        if(lastCat) return knowledge[lastCat];
      }
      return 'Not sure. Try: skills, experience, projects, education, contact, summary.';
    }
    // track last topics
    persistent.lastTopics = cats.slice(-3);
    savePersistent(persistent);
    return composeAnswer(cats);
  }

  function isForceLocal(){
    if(window.__FORCE_LOCAL_CHAT) return true;
    if(location.search.includes('localchat=1')) { try{localStorage.setItem(cfg.forceLocalFlagKey,'1');}catch{} return true; }
    try{ return localStorage.getItem(cfg.forceLocalFlagKey)==='1'; }catch{ return false; }
  }

  async function remoteAnswer(base, message, history){
    if(!base || isForceLocal()) return null;
    try{
      const recent = (history||[]).slice(-4).map(m=>({role: m.from==='bot'?'model':'user', text: m.text}));
      const r = await fetch(`${base}/api/chat`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message, context: recent})});
      if(!r.ok){
        let errTxt='';
        try{ const j=await r.json(); errTxt = j.upstream || j.error || JSON.stringify(j); }catch{ errTxt = r.status+' error'; }
        if(/missing server api key/i.test(errTxt)) return '(Remote disabled: server missing API key)';
        return null;
      }
      const data=await r.json();
      const reply=(data && data.reply ? String(data.reply).trim(): '');
      if(!reply) return null;
      const low=reply.toLowerCase();
      if(/temporar(il|)y/.test(low) && low.includes('unavailable')) return null;
      return reply;
    }catch{ return null; }
  }

  // Public interface
  window.AssistantEngine = function(options={}){
    const history=[]; // {from:'user'|'bot', text:'', meta?}
    const getBase=()=>{
      const configured=(window.CHAT_API_BASE||'').trim();
      return (configured || (location.hostname==='localhost' ? 'http://localhost:8787' : '')).replace(/\/$/,'');
    };
  async function ask(message){
      history.push({from:'user', text: message});
      const base=getBase();
  const remote=await remoteAnswer(base,message,history);
      if(remote){
        history.push({from:'bot', text: remote, meta:{mode:'remote'}});
        return remote;
      }
      const local = localAnswer(message, history);
      history.push({from:'bot', text: local, meta:{mode:'local', cats: multiMatch(message)}});
      return local + ' (local)';
    }
    function getHistory(){ return history.slice(-cfg.maxHistory); }
    function forceLocal(v){ if(v){try{localStorage.setItem(cfg.forceLocalFlagKey,'1');}catch{} } else {try{localStorage.removeItem(cfg.forceLocalFlagKey);}catch{} } }
    return { ask, getHistory, forceLocal };
  };
})();
