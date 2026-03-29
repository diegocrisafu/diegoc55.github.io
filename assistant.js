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

    summary: "Diego is an AI & Software Engineer double-majoring in Computation Arts and Computer Science at Concordia University. He has 4+ years of professional experience across CAE and Presagis, specializing in cloud computing, full-stack development, and AI/ML. He's passionate about building intelligent systems and bridges artistic creativity with AI engineering.",

    experience: [
      { role: 'Software Engineer Intern (Cloud)', company: 'CAE', period: 'May 2025-Sep 2025', desc: 'Developed and maintained CI/CD pipelines with Azure and GitHub Actions. Boosted deployment efficiency by 30%. Engineered cloud solutions using JavaScript and PowerShell.' },
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
      { name: 'WeatherLens', desc: 'Glassmorphism weather web app built for an AI/ML internship UI/UX assessment. Designed for two personas: travelers tracking multi-location forecasts and planners analyzing climate trends. Features a custom glassmorphism design system, drag-and-drop cities, animated weather particles, and interactive trend charts.', tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', '@dnd-kit'], link: 'https://github.com/diegocrisafu/ai_ui', demo: 'https://aiui-phi.vercel.app' },
      { name: 'The Actual Informer', desc: 'AI-powered news summarization platform. Built an NLP pipeline using OpenAI\'s API with custom prompt engineering to rewrite and condense articles. Full-stack app with TypeScript, Node.js, Express, deployed on AWS.', tech: ['TypeScript', 'Node.js', 'Express', 'AWS', 'OpenAI API', 'NLP', 'Prompt Engineering'], link: 'https://github.com/aalokok/cart498final' },
      { name: 'VR Brain Installation', desc: 'AI/VR research project with McGill University neuroscience team. Built ML-driven pipelines to transform neural imaging data into immersive 3D visualizations using computer vision and AI processing with Unreal Engine.', tech: ['Unreal Engine', 'VR', 'AI', 'ML', 'Computer Vision', 'Python'] },
      { name: 'Wooly', desc: 'AI-powered Chrome extension for sustainable fashion built at ConUHacks X (2025). Uses AI analysis and web scraping to score garment sustainability, with an AI chat mascot for fabric care advice.', links: 'GitHub: github.com/leticiahuang/wooly | Devpost: devpost.com/software/wooly', tech: ['JavaScript', 'Chrome Extensions', 'Web Scraping', 'AI'] },
      { name: 'Real-Time Dashboard', desc: 'Python Dash application that streams and visualizes data in real time. Features a data source selector and update-interval slider for dynamic monitoring.', tech: ['Python', 'Dash'] },
      { name: 'Expense Tracker', desc: 'React-based expense tracker with local persistence, deletion, and a category pie chart for budget visualization.', tech: ['React', 'JavaScript'] }
    ],

    interests: 'Traveling and exploring new countries, trying local food everywhere he goes, hiking with good views, photography, creative coding, and stoic philosophy.',
    languages: 'English, French, Spanish',
    funFacts: [
      "Diego built an NLP pipeline that uses OpenAI's API to automatically summarize news articles!",
      "He's integrated machine learning into military-grade simulation systems at CAE - night vision, LiDAR, and infrared.",
      "He built an AI-powered Chrome extension at a hackathon that analyzes fabric sustainability!",
      "He created ML-driven digital twins using NVIDIA Omniverse Isaac Sim at Presagis.",
      "He worked with McGill's neuroscience team, using AI/ML to visualize brain activity in VR.",
      "He's fluent in English, French, and Spanish - and Python, JavaScript, and C++!",
      "He double-majors in Computation Arts AND Computer Science - where AI meets creativity.",
      "He went from 3D Artist to DevOps Engineer in just a few years - talk about range!",
      "He boosted deployment efficiency by 30% at CAE with his CI/CD pipelines.",
      "He's worked with NVIDIA Omniverse, Unreal Engine, AND cloud infrastructure - from pixels to pipelines!"
    ],

    certifications: 'Diego is continuously learning and building. He actively explores new AI/ML frameworks, contributes to projects, and stays current with the latest in generative AI and cloud technologies.',

    values: 'Diego values clean code, continuous learning, creative problem-solving, and building things that make a real impact. He believes the best engineers combine technical depth with strong communication skills.',

    teamwork: 'Diego thrives in collaborative environments. He\'s worked on cross-functional teams at CAE and Presagis, collaborated with McGill neuroscience researchers, and built hackathon projects with diverse teams. He communicates clearly, gives constructive feedback, and loves pair programming.'
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
    if (/^(hi|hey|hello|yo|sup|hola|bonjour|salut|what'?s up|howdy|good (morning|afternoon|evening)|greetings|heya|wassup)\b/.test(s)) return greet();

    // Identity questions
    if (/who (is|are you|r u|made you|built you|created you)|what is this|what do you do|what are you/.test(s)) return "Hey! I'm Diego's AI assistant, here to tell you all about his work, skills, and experience. Think of me as your guide to everything Diego. What would you like to know?";
    if (/who is diego|tell me about diego|about diego|diego crisafulli/.test(s)) return info.summary + " Want to know more about something specific?";
    if (/your name|what.*your name/.test(s)) return "I'm Diego's portfolio assistant! I don't have a fancy name, but I know everything about Diego's career, skills, and projects. What can I help you with?";

    // Contact / links
    if (/github/.test(s)) return "Here's Diego's GitHub: " + info.github + " - feel free to check out his repos!";
    if (/linkedin/.test(s)) return "You can find Diego on LinkedIn here: " + info.linkedin;
    if (/email|reach|contact|message|hire|hiring|get in touch|send.*message|talk to|connect/.test(s)) return "Great question! You can reach Diego at " + info.email + ", or just scroll down to the contact form on this page. You can also connect on LinkedIn: " + info.linkedin + ". He typically responds within 24 hours!";
    if (/resum|r.sum|cv\b/.test(s)) return "You can grab Diego's resume from the navigation bar at the top - just click the Resume button!";
    if (/phone|call|number/.test(s)) return "Diego prefers email (" + info.email + ") or LinkedIn for getting in touch. Drop him a line!";
    if (/website|portfolio|site|page/.test(s)) return "You're on it! This portfolio was built by Diego himself using React. Feel free to explore all the sections - About, Skills, Projects, Experience, and more. You can also ask me anything!";

    // Location
    if (/where|location|based|live|city|from/.test(s)) return "Diego is based in " + info.location + "! He studies at " + info.university + ". Beautiful city, especially if you like winter.";

    // Salary / compensation
    if (/salary|pay|compensation|how much|rate|hourly/.test(s)) return "For compensation discussions, it's best to reach out to Diego directly at " + info.email + ". He's happy to discuss details for the right opportunity!";

    // Availability / remote work
    if (/remote|hybrid|in.?person|on.?site|relocat|move/.test(s)) return "Diego is based in Montreal but open to discussing work arrangements. Best to reach out directly at " + info.email + " to discuss specifics!";
    if (/available|open to|looking for|seeking|freelanc|intern|full.?time|part.?time|contract/.test(s)) return "For availability and opportunities, the best way to reach Diego is via email at " + info.email + " or LinkedIn at " + info.linkedin + ". He'd love to chat about the right fit!";

    // Skill-specific questions ("does he know X?", "is he good at X?")
    if (/know|good at|proficient|familiar|experience with|work with|worked with|use[sd]?|can he|does he|has he/.test(s)) {
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
    if (/skill|tech|stack|language|tool|framework|what.*know|what.*use|specializ|expertise|proficien/.test(s)) {
      if (/devops|cloud|azure|aws|docker|ci.?cd|pipeline|deploy|infra/.test(s)) return "Cloud & DevOps is one of Diego's strongest areas! He works with: " + info.knownSkills['Cloud & DevOps'].join(', ') + ". At CAE, he boosted deployment efficiency by 30% with his CI/CD pipelines.";
      if (/program|code|javascript|python|react|c\+\+|typescript|node|powershell|html|css/.test(s)) return "Diego's programming toolkit includes: " + info.knownSkills['Programming'].join(', ') + ". He's especially strong in JavaScript/TypeScript and Python!";
      if (/ai|machine|learning|automation|openai|gpt|llm|nlp|rag|langchain|claude|hugging|vector|fine.?tun|computer vision|generative|prompt/.test(s)) return "AI & ML is Diego's passion! His toolkit includes: " + info.knownSkills['AI & Machine Learning'].join(', ') + ". He's built NLP pipelines, ML-driven visualizations with McGill, AI simulations at Presagis, and more. This is where he really shines!";
      if (/3d|simulation|unreal|vr|ar|blender|omniverse|unity|game|render/.test(s)) return "On the creative/3D side, Diego works with: " + info.knownSkills['3D & Simulation'].join(', ') + ". He was literally a 3D Artist before becoming a DevOps engineer - pretty cool range!";
      if (/database|mongo|sql|git|tool/.test(s)) return "Diego's tooling includes: " + info.knownSkills['Databases & Tools'].join(', ') + ".";
      if (/front.?end|ui|ux|web|design/.test(s)) return "Diego's frontend skills include React, HTML, CSS, JavaScript, and TypeScript. He built this entire portfolio site! His Computation Arts background gives him a strong eye for design and user experience.";
      if (/back.?end|server|api/.test(s)) return "On the backend, Diego works with Node.js, Express, Python, and C++. He's built REST APIs, NLP pipelines, and cloud-deployed services on AWS and Azure.";
      return "Diego's got quite the skill set! Here's the breakdown:\n\n" + Object.keys(info.knownSkills).map(function(cat) { return cat + ": " + info.knownSkills[cat].join(', '); }).join('\n\n') + "\n\nAnything specific you'd like to dive into?";
    }

    // Experience
    if (/experience|work|career|job|roles?|employment|cae|presagis|intern|devops|ivr|ondulus|simulation dev/.test(s)) {
      if (/cae/.test(s)) {
        var cae = info.experience.filter(function(e) { return e.company === 'CAE'; });
        return "Diego's journey at CAE spans 3 roles:\n\n" + cae.map(function(e) { return e.role + " (" + e.period + ")\n" + e.desc; }).join('\n\n') + "\n\nPretty impressive growth, right?";
      }
      if (/presagis/.test(s)) {
        var p = info.experience.filter(function(e) { return e.company === 'Presagis'; });
        return "At Presagis, Diego held 2 roles:\n\n" + p.map(function(e) { return e.role + " (" + e.period + ")\n" + e.desc; }).join('\n\n');
      }
      if (/current|now|latest|recent|doing|today/.test(s)) {
        var c = info.experience[0];
        return "Right now, Diego is working as " + c.role + " at " + c.company + " (" + c.period + "). " + c.desc;
      }
      if (/first|start|begin|earliest/.test(s)) {
        var f = info.experience[info.experience.length - 1];
        return "Diego's career started as " + f.role + " at " + f.company + " (" + f.period + "). " + f.desc + " And look how far he's come since then!";
      }
      if (/how (many|long)|years|timeline/.test(s)) return "Diego has 4+ years of professional experience across two great companies - CAE and Presagis. He started as a 3D Artist and worked his way up to Software Engineer. That's some serious range!";
      if (/growth|progression|journey|path|promot/.test(s)) return "Diego's career progression is really impressive: 3D Artist → Simulation Developer → Software Engineer Intern → IVR Developer → DevOps Engineer. He went from creating 3D art to engineering cloud infrastructure - all in about 4 years!";
      return "Diego has had an awesome career journey! Here's the timeline:\n\n" + info.experience.map(function(e) { return "- " + e.role + " at " + e.company + " (" + e.period + ")"; }).join('\n') + "\n\nWant details on any specific role?";
    }

    // Projects
    if (/project|built|build|portfolio|app|wooly|hackathon|conuhacks|vr brain|informer|dashboard|expense|what.*made|what.*creat/.test(s)) {
      if (/wooly|hackathon|conuhacks|chrome ext|sustainable|fashion|fabric/.test(s)) {
        var w = info.projects[2];
        return w.name + " - " + w.desc + "\n\nLinks: " + w.links + "\n\nPretty cool for a hackathon project, right?";
      }
      if (/vr|brain|mcgill|neuro/.test(s)) return info.projects[1].name + " - " + info.projects[1].desc + " Seriously cutting-edge stuff!";
      if (/informer|news|summariz/.test(s)) return info.projects[0].name + " - " + info.projects[0].desc + "\n\nCheck it out: " + info.projects[0].link;
      if (/dashboard|real.?time|python dash|data|monitor/.test(s)) return info.projects[3].name + " - " + info.projects[3].desc;
      if (/expense|tracker|budget|chart/.test(s)) return info.projects[4].name + " - " + info.projects[4].desc;
      if (/favorite|best|proud|coolest/.test(s)) return "Hard to pick a favorite, but The Actual Informer really showcases Diego's AI engineering skills - building an NLP pipeline with OpenAI's API for news summarization. And the VR Brain Installation with McGill is seriously cutting-edge AI/VR research!";
      if (/how many/.test(s)) return "Diego has " + info.projects.length + " notable projects showcased on this portfolio, ranging from AI-powered news summarization to VR brain visualization with McGill. Want to hear about a specific one?";
      return "Diego has built some really cool things! Here's the lineup:\n\n" + info.projects.map(function(p) { return "- " + p.name + ": " + p.desc.split('.')[0] + "."; }).join('\n') + "\n\nAsk about any project and I'll give you the full scoop!";
    }

    // Education
    if (/education|school|university|college|degree|study|concordia|marianopolis|major|gpa|graduat|academ|course|class/.test(s)) {
      if (/marianopolis|cegep|commerce|dec/.test(s)) return "Before Concordia, Diego attended " + info.previousSchool + ". His commerce background gives him a unique business perspective that complements his technical skills!";
      if (/computation arts|comp arts|creative/.test(s)) return "Computation Arts is one of Diego's two majors at Concordia. It covers creative coding, digital art, interactive media, and the intersection of art and technology. Combined with Computer Science, it gives him a unique creative + technical perspective!";
      if (/why.*double|why.*both|combine/.test(s)) return "Diego double-majors because he believes the best tech is built at the intersection of creativity and engineering. Computation Arts teaches him to think like a designer, while Computer Science gives him the engineering chops. It's why his projects feel both technically strong and beautifully crafted!";
      return info.university + "\n" + info.majors + " (" + info.gradYear + ")\n\nPreviously: " + info.previousSchool + "\n\nHis coursework covers 3D graphics, high-performance computing, AI development, and creative coding. The double major really shows in his work - he's both an artist and an engineer!";
    }

    // Interests / personal
    if (/hobby|hobbies|interest|fun|free time|outside|personal|travel|food|hik|photo|passion|enjoy/.test(s)) return "When he's not coding, Diego loves " + info.interests + " Sounds like a pretty well-rounded guy!";
    if (/language|speak|french|spanish|english|bilingual|trilingual/.test(s)) return "Diego speaks " + info.languages + "! Trilingual and tech-savvy - quite the combo.";
    if (/fun fact|random|something cool|interesting|surprise|did you know|trivia/.test(s)) return "Here's a fun one: " + info.funFacts[Math.floor(Math.random() * info.funFacts.length)];
    if (/age|old|birthday|born/.test(s)) return "Diego is in his early twenties - young but already stacked with 4+ years of professional experience!";
    if (/stoic|philosophy|marcus aurelius|seneca/.test(s)) return "Diego is into stoic philosophy! He values principles like focusing on what you can control, continuous self-improvement, and resilience. It shows in his disciplined approach to engineering and career growth.";
    if (/country|countries|place|destination|visited/.test(s)) return "Diego loves traveling and exploring new countries! He's a foodie who tries local cuisine everywhere he goes. For specific travel stories, you'd have to ask him directly at " + info.email + "!";

    // Teamwork & soft skills
    if (/team|collaborat|work with others|soft skill|communicat|leadership|lead|manage/.test(s)) return info.teamwork;
    if (/value|principle|believe|ethic|work style|approach/.test(s)) return info.values;
    if (/learn|growth|improv|develop|certif|course|self.?taught/.test(s)) return info.certifications;
    if (/challenge|difficult|hard|obstacle|problem|tough/.test(s)) return "Diego thrives on challenges! Whether it's integrating ML into military-grade simulations at CAE, building VR brain visualizations with McGill researchers, or shipping an NLP pipeline at a hackathon - he embraces complex problems and finds creative solutions. That's the beauty of his art + engineering background!";
    if (/mentor|teach|help|guide/.test(s)) return "Diego enjoys mentoring and knowledge-sharing. His experience across diverse teams at CAE and Presagis, plus collaborative research with McGill, has made him great at explaining complex concepts and helping others grow.";

    // Strengths
    if (/strength|best at|strongest|what makes|stand out|unique|different|competitive|advantage|edge/.test(s)) return "What makes Diego stand out? His deep AI/ML expertise combined with full-stack engineering skills. He's built NLP pipelines, ML-powered simulations, and AI assistants - but he can also ship production cloud infrastructure and beautiful UIs. Going from 3D Artist to AI Engineer gives him a rare creative + technical perspective that's perfect for building intelligent products.";

    // Why hire
    if (/why.*hire|why.*choose|should.*hire|good fit|bring to|value.*add|what.*offer/.test(s)) return "Diego brings AI/ML depth with full-stack delivery skills. With 4+ years at CAE and Presagis, he's proven he can build intelligent systems in high-stakes environments — from ML-powered simulations and NLP applications to production DevOps pipelines. He works across the entire AI stack: prompt engineering, LLM integration, RAG pipelines, and deploying models to production. Plus he ships fast and communicates well. Want me to go deeper into any area?";

    // Comparison / versus
    if (/compare|vs|versus|better than|differ/.test(s)) return "I can only speak to Diego's skills and experience! He's got a unique blend of AI/ML engineering, creative arts, and cloud infrastructure that's hard to find. Want to know more about what makes him special?";

    // Recommendations / references
    if (/recommend|reference|referral|vouch/.test(s)) return "For professional references, it's best to reach out to Diego directly at " + info.email + ". He's happy to connect you with colleagues and collaborators who can speak to his work!";

    // Future goals
    if (/goal|aspir|dream|future|plan|vision|where.*see|next/.test(s)) return "Diego is passionate about pushing the boundaries of AI engineering. He's focused on building intelligent systems that combine cutting-edge ML with great user experiences. His dual background in arts and CS positions him perfectly for the future of human-centered AI!";

    // Favorite / preference
    if (/favorite|prefer|like most|best.*language|best.*tool|go.?to/.test(s)) return "Diego's go-to stack tends to be Python for AI/ML work and TypeScript for full-stack applications. But he's versatile - he picks the right tool for the job. For AI projects, he loves working with the OpenAI and Claude APIs!";

    // This website / portfolio
    if (/this (website|site|page|portfolio)|how.*built|made this|design/.test(s)) return "This portfolio is built with React and vanilla JavaScript, styled with CSS custom properties for theming (including dark mode!). Diego designed and built every part of it himself - including me, the chatbot you're talking to right now! It's deployed on GitHub Pages.";

    // AI-specific deep dives
    if (/rag|retrieval|augmented|generation|vector|embedding/.test(s)) return "Diego has experience with RAG (Retrieval-Augmented Generation) architectures, including vector databases and embedding pipelines. He understands how to build systems that ground LLM responses in real data. Want to know about his other AI skills?";
    if (/langchain|lang chain|chain/.test(s)) return "Yes! Diego works with LangChain for building LLM-powered applications. It's part of his AI & Machine Learning toolkit alongside OpenAI API, Claude API, and more.";
    if (/prompt|engineering|prompting/.test(s)) return "Prompt engineering is one of Diego's key skills! He used it extensively in The Actual Informer project to build NLP pipelines that rewrite and condense news articles. He understands how to craft effective prompts for different use cases.";
    if (/fine.?tun|training|model/.test(s)) return "Diego has experience with fine-tuning ML models. Combined with his work in prompt engineering, RAG, and LLM integration, he can build custom AI solutions tailored to specific domains.";
    if (/gpt|openai|chatgpt|llm|large language/.test(s)) return "Diego works extensively with LLMs including OpenAI's GPT models and Claude. He's built production NLP pipelines (The Actual Informer), conversational AI, and understands the full stack of LLM application development.";

    // Help
    if (/help|what can (you|i)|option|command|menu|how.*work/.test(s)) return "I'd love to help! Here's what I can tell you about Diego:\n\n- Work experience & career growth\n- Technical skills & AI/ML expertise\n- Projects he's built\n- Education & background\n- Personal interests & fun facts\n- How to contact him\n- Whether he knows specific technologies\n- His strengths & what makes him unique\n- Career goals & values\n- Teamwork & soft skills\n\nJust ask naturally - like \"does he know Python?\" or \"tell me about his AI projects!\"";

    // Pleasantries
    if (/thank|thanks|thx|appreciate|cheers|ty/.test(s)) return "You're very welcome! Let me know if there's anything else you'd like to know about Diego. I'm here all day!";
    if (/bye|goodbye|see you|later|gotta go|peace|cya/.test(s)) return "It was great chatting! Don't hesitate to come back anytime. And if you want to connect with Diego directly: " + info.email;
    if (/how are you|how('s| is) it going|you good|how.*doing/.test(s)) return "I'm doing fantastic, thanks for asking! Ready to tell you all about Diego. What are you curious about?";
    if (/cool|nice|awesome|great|wow|impressive|amazing|sick|dope|fire/.test(s)) return "Right?! Diego's done some really interesting work. Anything specific you'd like to explore further?";
    if (/lol|haha|funny|joke|humor|laugh/.test(s)) return "Glad I could make you smile! But seriously, Diego's got some great stuff to show. Want to hear about his projects or experience?";
    if (/yes|yeah|sure|okay|ok|yep|yea|absolutely|definitely/.test(s)) return "Awesome! What would you like to know? I can talk about Diego's experience, skills, projects, education, or how to reach him.";
    if (/no|nope|nah|not really|pass/.test(s)) return "No worries! I'm here whenever you need me. Feel free to ask anything about Diego anytime!";
    if (/sorry|apolog/.test(s)) return "No need to apologize! I'm here to help. What would you like to know about Diego?";
    if (/you('re| are) (great|awesome|cool|smart|helpful|good)/.test(s)) return "Thanks! I try my best. But all credit goes to Diego for building me and filling me with knowledge. Want to know more about him?";
    if (/love|marry|date/.test(s)) return "Ha! I'm flattered, but I'm just an AI assistant. I can tell you all about Diego though - he's pretty awesome! What would you like to know?";

    // Conversational follow-ups
    if (/tell me more|more info|expand|details|elaborate|go on|continue|keep going/.test(s)) return "Sure thing! What area interests you most? I can dive deeper into Diego's experience, skills, projects, education, or even personal interests!";
    if (/everything|all|summary|overview|quick rundown|tldr|tl;dr/.test(s)) return info.summary + "\n\nHe works with " + Object.keys(info.knownSkills).join(', ') + ". He's built " + info.projects.length + " notable projects. Reach him at " + info.email + ".\n\nWant me to go deeper into anything?";
    if (/what else|anything else|more|other/.test(s)) return "There's always more to discover about Diego! Try asking about:\n- A specific technology (e.g., \"does he know Docker?\")\n- His career journey and growth\n- AI/ML projects and expertise\n- Personal interests and fun facts\n- What makes him unique as an engineer\n\nWhat catches your interest?";

    // Weather / time / unrelated
    if (/weather|temperature|forecast/.test(s)) return "I'm all about Diego, not weather! But I can tell you he's based in Montreal - so probably cold and beautiful. Want to know something about Diego instead?";
    if (/meaning of life|42|universe/.test(s)) return "42! But in Diego's world, the meaning of life is building cool AI-powered things and traveling the world. Want to hear about his projects?";

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
