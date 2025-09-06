/* Lightweight modular assistant: remote + local knowledge base with fuzzy + multi-intent support */
(()=>{
  const cfg = {
    forceLocalFlagKey: 'forceLocalChat',
    maxHistory: 8
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
    // minimal Levenshtein-like tolerance: accept single substitution/typo using regex char class cheat
    const qs = normalize(q);
    for(const [cat,keys] of Object.entries(categoryKeywords)){
      for(const k of keys){
        if(qs.includes(k)) return cat;
        // simple fuzzy: remove one char windows
        for(let i=0;i<k.length;i++){
          const variant = k.slice(0,i)+k.slice(i+1);
            if(variant.length>2 && qs.includes(variant)) return cat;
        }
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
  function localAnswer(input, history){
    const raw=(input||'').trim();
    if(!raw) return 'Ask about skills, experience, projects, education, contact, or say help.';
    const q=normalize(raw);
    if(greetingRe.test(q)) return 'Hi! Ask me about skills, experience, projects, education, contact, or multiple at once.';
    if(q.includes('help')) return 'Examples: "skills", "experience at CAE", "skills + projects", "contact", "summary".';
    const cats = multiMatch(q);
    if(!cats.length){
      const fuzzy=fuzzyLookup(q); if(fuzzy) return knowledge[fuzzy];
      // context memory: if user references pronouns after a category
      if(/tell me more|more info|expand|details/.test(q) && history){
        const lastCat = (history.slice().reverse().find(m=>m.meta && m.meta.cats)||{}).meta?.cats?.[0];
        if(lastCat) return knowledge[lastCat];
      }
      return 'Not sure. Try: skills, experience, projects, education, contact, summary.';
    }
    return composeAnswer(cats);
  }

  function isForceLocal(){
    if(window.__FORCE_LOCAL_CHAT) return true;
    if(location.search.includes('localchat=1')) { try{localStorage.setItem(cfg.forceLocalFlagKey,'1');}catch{} return true; }
    try{ return localStorage.getItem(cfg.forceLocalFlagKey)==='1'; }catch{ return false; }
  }

  async function remoteAnswer(base, message){
    if(!base || isForceLocal()) return null;
    try{
      const r = await fetch(`${base}/api/chat`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message})});
      if(!r.ok) return null;
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
      const remote=await remoteAnswer(base,message);
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
