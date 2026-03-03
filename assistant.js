/* Diego's portfolio chatbot - charming, knowledgeable, helpful.
   Answers all types of questions about Diego. No persistence. */
(()=>{
  var info = {
    name: 'Diego Crisafulli',
    title: 'AI & Software Engineer',
    email: 'diego.crisafu@gmail.com',
    github: 'https://github.com/diegoc55',
    linkedin: 'https://www.linkedin.com/in/diegocrisafulli212bb0256',
    location: 'Montreal, Canada',
    university: 'Concordia University',
    majors: 'Computation Arts & Computer Science (Double Major)',
    gradYear: '2022-present',
    previousSchool: 'Marianopolis College - DEC in Commerce (2020-2022)',

    summary: "Diego is an AI & Software Engineer double-majoring in Computation Arts and Computer Science at Concordia University. He has 4+ years of professional experience across CAE and Presagis, specializing in AI/ML, generative AI, full-stack development, and DevOps. He's passionate about building intelligent systems and bridges artistic creativity with AI engineering.",

    experience: [
      { role: 'Software Engineer (DevOps)', company: 'CAE', period: 'May 2025-Present', desc: 'Develops and maintains CI/CD pipelines with Azure and GitHub Actions. Boosted deployment efficiency by 30%. Engineers cloud solutions using JavaScript and PowerShell.' },
      { role: 'IVR System Developer', company: 'CAE', period: 'Sep 2024-May 2025', desc: 'Improved IVR functionality and user experience. Developed automated test scripts in JavaScript, XML, and JSON. Boosted testing coverage and reduced defects significantly.' },
      { role: 'Software Engineer Intern', company: 'CAE', period: 'Oct 2023-Sep 2024', desc: 'Ondulus IR team - developed and tested night vision, LiDAR, and infrared simulation systems. Led C++ sensor testing and automated testing workflows.' },
      { role: 'Simulation Developer', company: 'Presagis', period: 'Jun 2022-Jun 2023', desc: 'Built simulations using NVIDIA Omniverse Isaac Sim with machine learning, point-cloud, and LiDAR technology. Created digital twins with USD workflows. Integrated Python automation.' },
      { role: '3D Artist / Developer', company: 'Presagis', period: 'Sep 2021-Jun 2022', desc: 'Built custom 3D models, textures, and animations using Unreal Engine, Omniverse, and Blender. Automated asset creation pipelines with Python scripting.' }
    ],

    knownSkills: {
      'Cloud & DevOps': ['Azure', 'AWS', 'EC2', 'S3', 'Lambda', 'GitHub Actions', 'CI/CD', 'Infrastructure as Code', 'Docker'],
      'Programming': ['JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'PowerShell', 'React', 'Node.js', 'HTML', 'CSS', 'Express'],
      'AI & Machine Learning': ['OpenAI API', 'Claude API', 'LangChain', 'RAG', 'Generative AI', 'Machine Learning', 'NLP', 'Computer Vision', 'Prompt Engineering', 'Hugging Face', 'Vector Databases', 'Fine-Tuning'],
      '3D & Simulation': ['Unreal Engine', 'NVIDIA Omniverse', 'VR', 'AR', 'Unity', 'Blender', 'USD Workflows', '3D Modeling'],
      'Databases & Tools': ['MongoDB', 'SQL', 'Git', 'JIRA', 'Chrome Extensions', 'GitHub Copilot']
    },

    projects: [
      { name: 'The Actual Informer', desc: 'AI-powered news summarization platform. Built an NLP pipeline using OpenAI\'s API with custom prompt engineering to rewrite and condense articles. Full-stack app with TypeScript, Node.js, Express, deployed on AWS.', tech: ['TypeScript', 'Node.js', 'Express', 'AWS', 'OpenAI API', 'NLP', 'Prompt Engineering'] },
      { name: 'VR Brain Installation', desc: 'AI/VR research project with McGill University neuroscience team. Built ML-driven pipelines to transform neural imaging data into immersive 3D visualizations using computer vision and AI processing with Unreal Engine.', tech: ['Unreal Engine', 'VR', 'AI', 'ML', 'Computer Vision', 'Python'] },
      { name: 'Wooly', desc: 'AI-powered Chrome extension for sustainable fashion built at ConUHacks X (2025). Uses AI analysis and web scraping to score garment sustainability, with an AI chat mascot for fabric care advice.', links: 'GitHub: github.com/leticiahuang/wooly | Devpost: devpost.com/software/wooly', tech: ['JavaScript', 'Chrome Extensions', 'Web Scraping', 'AI'] },
      { name: 'Real-Time Dashboard', desc: 'Python Dash application that streams and visualizes data in real time. Features a data source selector and update-interval slider for dynamic monitoring.', tech: ['Python', 'Dash'] },
      { name: 'Expense Tracker', desc: 'React-based expense tracker with local persistence, deletion, and a category pie chart for budget visualization.', tech: ['React', 'JavaScript'] },
      { name: 'Portfolio AI Chatbot', desc: 'This AI assistant you\'re chatting with! Custom-built conversational AI with NLP pattern matching, context-aware responses, and a knowledge graph. A live demo of AI engineering skills.', tech: ['JavaScript', 'NLP', 'AI', 'React'] }
    ],

    interests: 'Traveling and exploring new countries, trying local food everywhere he goes, hiking with good views, photography, creative coding, and stoic philosophy.',
    languages: 'English, French, Spanish',
    funFacts: [
      "Diego built an NLP pipeline that uses OpenAI's API to automatically summarize news articles!",
      "He's integrated machine learning into military-grade simulation systems at CAE - night vision, LiDAR, and infrared.",
      "He built an AI-powered Chrome extension at a hackathon that analyzes fabric sustainability!",
      "He created ML-driven digital twins using NVIDIA Omniverse Isaac Sim at Presagis.",
      "He built the AI chatbot you're talking to right now - meta, right?",
      "He worked with McGill's neuroscience team, using AI/ML to visualize brain activity in VR.",
      "He's fluent in English, French, and Spanish - and Python, JavaScript, and C++!",
      "He double-majors in Computation Arts AND Computer Science - where AI meets creativity."
    ]
  };

  // Flatten all known skills for lookup
  var allSkills = [];
  Object.keys(info.knownSkills).forEach(function(cat) {
    info.knownSkills[cat].forEach(function(s) { allSkills.push(s.toLowerCase()); });
  });

  // All tech from projects
  var allProjectTech = [];
  info.projects.forEach(function(p) {
    if (p.tech) p.tech.forEach(function(t) { allProjectTech.push(t.toLowerCase()); });
  });

  function isKnownSkill(query) {
    var q = query.toLowerCase();
    for (var i = 0; i < allSkills.length; i++) {
      if (q.indexOf(allSkills[i]) !== -1) return allSkills[i];
    }
    return null;
  }

  function findSkillCategory(skill) {
    var s = skill.toLowerCase();
    var cats = Object.keys(info.knownSkills);
    for (var i = 0; i < cats.length; i++) {
      var items = info.knownSkills[cats[i]];
      for (var j = 0; j < items.length; j++) {
        if (items[j].toLowerCase() === s) return cats[i];
      }
    }
    return null;
  }

  // Common programming languages/tech that Diego does NOT specifically list
  var commonTech = ['java','ruby','rust','go','golang','kotlin','swift','scala','perl','php','r','matlab','dart','flutter','angular','vue','svelte','django','flask','spring','rails','.net','c#','csharp','objective-c','elixir','haskell','clojure','lua','assembly','fortran','cobol'];

  function isUnknownTech(query) {
    var q = query.toLowerCase();
    for (var i = 0; i < commonTech.length; i++) {
      // Check for the tech name as a word boundary
      var re = new RegExp('\\b' + commonTech[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (re.test(q)) return commonTech[i];
    }
    return null;
  }

  var emailLink = 'diego.crisafu@gmail.com';
  var linkedinLink = 'linkedin.com/in/diegocrisafulli212bb0256';
  var fallback = "Hmm, I'm not quite sure about that one! If you'd like to know more, feel free to email Diego at " + emailLink + " or connect with him on LinkedIn (" + linkedinLink + "). He'd love to hear from you!";

  function match(q) {
    var s = q.toLowerCase().trim();
    if (!s) return greet();

    // Greetings
    if (/^(hi|hey|hello|yo|sup|hola|bonjour|what'?s up|howdy|good (morning|afternoon|evening))\b/.test(s)) return greet();

    // Identity questions
    if (/who (is|are you|r u)|what is this|what do you do/.test(s)) return "Hey! I'm Diego's AI assistant - built by him to showcase his AI engineering skills. I know all about his work in AI/ML, his experience, projects, and more. Think of me as a live demo of his AI capabilities. What would you like to know?";
    if (/who is diego|tell me about diego|about diego|diego crisafulli/.test(s)) return info.summary + " Want to know more about something specific?";

    // Contact / links
    if (/github/.test(s)) return "Here's Diego's GitHub: " + info.github + " - feel free to check out his repos!";
    if (/linkedin/.test(s)) return "You can find Diego on LinkedIn here: " + info.linkedin;
    if (/email|reach|contact|message|hire|hiring|get in touch|send.*message|talk to/.test(s)) return "Great question! You can reach Diego at " + info.email + ", or just scroll down to the contact form on this page. You can also connect on LinkedIn: " + info.linkedin + ". He typically responds within 24 hours!";
    if (/resum|r.sum|cv\b/.test(s)) return "You can grab Diego's resume from the navigation bar at the top - just click the Resume button!";
    if (/phone|call|number/.test(s)) return "Diego prefers email (" + info.email + ") or LinkedIn for getting in touch. Drop him a line!";

    // Location
    if (/where|location|based|live|city|from/.test(s)) return "Diego is based in " + info.location + "! He studies at " + info.university + ". Beautiful city, especially if you like winter.";

    // Skill-specific questions ("does he know X?", "is he good at X?")
    if (/know|good at|proficient|familiar|experience with|work with|worked with|use[sd]?|can he/.test(s)) {
      var known = isKnownSkill(s);
      if (known) {
        var cat = findSkillCategory(known);
        return "Yes! " + known.charAt(0).toUpperCase() + known.slice(1) + " is definitely in Diego's toolbox" + (cat ? " (under " + cat + ")" : "") + ". He's used it professionally across his roles. Want to know more about his " + (cat || "skills") + "?";
      }
      var unknown = isUnknownTech(s);
      if (unknown) {
        return "That's not explicitly listed in Diego's main skill set, but he's a fast learner who picks up new technologies quickly - especially with his strong CS foundation. His core strengths are in " + Object.keys(info.knownSkills).join(', ') + ". Want to hear more about any of those?";
      }
    }

    // General skill questions
    if (/skill|tech|stack|language|tool|framework|what.*know|what.*use|specializ/.test(s)) {
      if (/devops|cloud|azure|aws|docker|ci.?cd|pipeline|deploy/.test(s)) return "Cloud & DevOps is one of Diego's strongest areas! He works with: " + info.knownSkills['Cloud & DevOps'].join(', ') + ". At CAE, he boosted deployment efficiency by 30% with his CI/CD pipelines.";
      if (/program|code|javascript|python|react|c\+\+|typescript|node/.test(s)) return "Diego's programming toolkit includes: " + info.knownSkills['Programming'].join(', ') + ". He's especially strong in JavaScript/TypeScript and Python!";
      if (/ai|machine|learning|automation|openai|gpt|llm|nlp|rag|langchain|claude|hugging|vector|fine.?tun|computer vision/.test(s)) return "AI & ML is Diego's strongest area! His toolkit includes: " + info.knownSkills['AI & Machine Learning'].join(', ') + ". He's built NLP pipelines for news summarization, ML-driven neural visualization with McGill, AI-powered simulations at Presagis, and conversational AI assistants. This is where he really shines!";
      if (/3d|simulation|unreal|vr|ar|blender|omniverse|unity|game/.test(s)) return "On the creative/3D side, Diego works with: " + info.knownSkills['3D & Simulation'].join(', ') + ". He was literally a 3D Artist before becoming a DevOps engineer - pretty cool range!";
      if (/database|mongo|sql|git|tool/.test(s)) return "Diego's tooling includes: " + info.knownSkills['Databases & Tools'].join(', ') + ".";
      return "Diego's got quite the skill set! Here's the breakdown:\n\n" + Object.keys(info.knownSkills).map(function(cat) { return cat + ": " + info.knownSkills[cat].join(', '); }).join('\n\n') + "\n\nAnything specific you'd like to dive into?";
    }

    // Experience
    if (/experience|work|career|job|roles?|employment|cae|presagis|intern|devops|ivr/.test(s)) {
      if (/cae/.test(s)) {
        var cae = info.experience.filter(function(e) { return e.company === 'CAE'; });
        return "Diego's journey at CAE spans 3 roles:\n\n" + cae.map(function(e) { return e.role + " (" + e.period + ")\n" + e.desc; }).join('\n\n') + "\n\nPretty impressive growth, right?";
      }
      if (/presagis/.test(s)) {
        var p = info.experience.filter(function(e) { return e.company === 'Presagis'; });
        return "At Presagis, Diego held 2 roles:\n\n" + p.map(function(e) { return e.role + " (" + e.period + ")\n" + e.desc; }).join('\n\n');
      }
      if (/current|now|latest|recent|doing/.test(s)) {
        var c = info.experience[0];
        return "Right now, Diego is working as " + c.role + " at " + c.company + " (" + c.period + "). " + c.desc;
      }
      if (/how (many|long)|years/.test(s)) return "Diego has 4+ years of professional experience across two great companies - CAE and Presagis. He started as a 3D Artist and worked his way up to Software Engineer. That's some serious range!";
      return "Diego has had an awesome career journey! Here's the timeline:\n\n" + info.experience.map(function(e) { return "- " + e.role + " at " + e.company + " (" + e.period + ")"; }).join('\n') + "\n\nWant details on any specific role?";
    }

    // Projects
    if (/project|built|build|portfolio|app|wooly|hackathon|conuhacks|vr brain|informer|dashboard|expense|what.*made|what.*creat/.test(s)) {
      if (/wooly|hackathon|conuhacks|chrome ext|sustainable|fashion|fabric/.test(s)) {
        var w = info.projects[0];
        return w.name + " - " + w.desc + "\n\nLinks: " + w.links + "\n\nPretty cool for a hackathon project, right?";
      }
      if (/vr|brain|mcgill|neuro/.test(s)) return info.projects[1].name + " - " + info.projects[1].desc + " Seriously cutting-edge stuff!";
      if (/informer|news|summariz/.test(s)) return info.projects[2].name + " - " + info.projects[2].desc;
      if (/dashboard|real.?time|python dash|data/.test(s)) return info.projects[3].name + " - " + info.projects[3].desc;
      if (/expense|tracker|budget/.test(s)) return info.projects[4].name + " - " + info.projects[4].desc;
      if (/this|portfolio|website|site/.test(s)) return info.projects[5].name + " - " + info.projects[5].desc + " Meta, right?";
      return "Diego has built some really cool things! Here's the lineup:\n\n" + info.projects.map(function(p) { return "- " + p.name + ": " + p.desc.split('.')[0] + "."; }).join('\n') + "\n\nAsk about any project and I'll give you the full scoop!";
    }

    // Education
    if (/education|school|university|college|degree|study|concordia|marianopolis|major|gpa|graduat/.test(s)) {
      return info.university + "\n" + info.majors + " (" + info.gradYear + ")\n\nPreviously: " + info.previousSchool + "\n\nHis coursework covers 3D graphics, high-performance computing, AI development, and creative coding. The double major really shows in his work - he's both an artist and an engineer!";
    }

    // Interests / personal
    if (/hobby|hobbies|interest|fun|free time|outside|personal|travel|food|hik|photo/.test(s)) return "When he's not coding, Diego loves " + info.interests + " Sounds like a pretty well-rounded guy!";
    if (/language|speak|french|spanish|english/.test(s)) return "Diego speaks " + info.languages + "! Trilingual and tech-savvy - quite the combo.";
    if (/fun fact|random|something cool|interesting|surprise|did you know/.test(s)) return "Here's a fun one: " + info.funFacts[Math.floor(Math.random() * info.funFacts.length)];
    if (/age|old|birthday|born/.test(s)) return "Diego is in his early twenties - young but already stacked with 4+ years of professional experience!";
    if (/available|open to|looking for|seeking|freelanc/.test(s)) return "Great question! For availability and opportunities, the best way to reach Diego is via email at " + info.email + " or LinkedIn at " + info.linkedin + ". He'd love to chat!";

    // Strengths
    if (/strength|best at|strongest|what makes|stand out|unique|different/.test(s)) return "What makes Diego stand out? His deep AI/ML expertise combined with full-stack engineering skills. He's built NLP pipelines, ML-powered simulations, and AI assistants - but he can also ship production cloud infrastructure and beautiful UIs. Going from 3D Artist to AI Engineer gives him a rare creative + technical perspective that's perfect for building intelligent products.";
    
    // Why hire
    if (/why.*hire|why.*choose|should.*hire|good fit|bring to/.test(s)) return "Diego brings AI/ML depth with full-stack delivery skills. With 4+ years at CAE and Presagis, he's proven he can build intelligent systems in high-stakes environments — from ML-powered simulations and NLP applications to production DevOps pipelines. He works across the entire AI stack: prompt engineering, LLM integration, RAG pipelines, and deploying models to production. Plus he ships fast and communicates well. Want me to go deeper into any area?";

    // Help
    if (/help|what can (you|i)|option|command|menu/.test(s)) return "I'd love to help! Here's what I know about Diego:\n\n- His work experience & career\n- Technical skills & technologies\n- Projects he's built\n- Education background\n- How to contact him\n- Personal interests & fun facts\n- Whether he knows specific technologies\n\nJust ask naturally - like \"does he know Python?\" or \"what's his latest project?\"";

    // Pleasantries
    if (/thank|thanks|thx|appreciate|cheers/.test(s)) return "You're very welcome! Let me know if there's anything else you'd like to know about Diego. I'm here all day!";
    if (/bye|goodbye|see you|later|gotta go/.test(s)) return "It was great chatting! Don't hesitate to come back anytime. And if you want to connect with Diego directly: " + info.email;
    if (/how are you|how('s| is) it going|you good/.test(s)) return "I'm doing fantastic, thanks for asking! Ready to tell you all about Diego. What are you curious about?";
    if (/cool|nice|awesome|great|wow|impressive|amazing/.test(s)) return "Right?! Diego's done some really interesting work. Anything specific you'd like to explore further?";
    if (/lol|haha|funny|joke/.test(s)) return "Glad I could make you smile! But seriously, Diego's got some great stuff to show. Want to hear about his projects or experience?";
    if (/yes|yeah|sure|okay|ok|yep|yea/.test(s)) return "Awesome! What would you like to know? I can talk about Diego's experience, skills, projects, education, or how to reach him.";
    if (/no|nope|nah|not really/.test(s)) return "No worries! I'm here whenever you need me. Feel free to ask anything about Diego anytime!";

    // Conversational follow-ups
    if (/tell me more|more info|expand|details|elaborate|go on|continue/.test(s)) return "Sure thing! What area interests you most? I can dive deeper into Diego's experience, skills, projects, education, or even personal interests!";
    if (/everything|all|summary|overview|quick rundown/.test(s)) return info.summary + "\n\nHe works with " + Object.keys(info.knownSkills).join(', ') + ". He's built " + info.projects.length + " notable projects. Reach him at " + info.email + ".\n\nWant me to go deeper into anything?";

    // Last resort - check if asking about a specific known skill
    var lastSkill = isKnownSkill(s);
    if (lastSkill) {
      var c2 = findSkillCategory(lastSkill);
      return "Yes, Diego works with " + lastSkill + "!" + (c2 ? " It's part of his " + c2 + " toolkit." : "") + " Want to know how he's used it?";
    }

    // Check if asking about unknown tech
    var unknownTech = isUnknownTech(s);
    if (unknownTech) {
      return "Hmm, " + unknownTech.charAt(0).toUpperCase() + unknownTech.slice(1) + " isn't one of Diego's primary listed skills, but he's got a strong CS foundation and picks things up fast. His main strengths are in " + Object.keys(info.knownSkills).slice(0, 3).join(', ') + " and more. Want to see his full skill set?";
    }

    // Absolute fallback - charming and helpful
    return fallback;
  }

  function greet() {
    var hour = new Date().getHours();
    var greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return greeting + "! I'm Diego's AI assistant. Ask me about his AI/ML projects, technical skills, experience, or anything else. What are you curious about?";
  }

  window.AssistantEngine = function() {
    return {
      ask: function(message) { return Promise.resolve(match(message || '')); }
    };
  };
})();
