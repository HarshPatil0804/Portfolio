(() => {
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.loader'), header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav'), track = document.querySelector('.certificate-track');
  let lenis = null;
  if (!reduced && typeof window.Lenis === 'function') {
    try {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      if (window.ScrollTrigger) lenis.on('scroll', window.ScrollTrigger.update);
      if (window.gsap?.ticker) { window.gsap.ticker.add(time => lenis.raf(time * 1000)); window.gsap.ticker.lagSmoothing(0); }
      else {
        const raf = time => { if (lenis) { lenis.raf(time); requestAnimationFrame(raf); } };
        requestAnimationFrame(raf);
      }
    } catch (error) {
      lenis = null; // Native scrolling remains available if Lenis cannot initialize.
    }
  }
  const certs = [
    {title:'Fundamentals of Machine Learning and Artificial Intelligence',issuer:'AWS Training & Certification',date:'7 Jul 2026',skills:'Course details are not stated on the certificate.',file:'AWS Training & Certification.pdf',mark:'AWS'},
    {title:'Fundamentals of Analytics on AWS · Part 1',issuer:'AWS Training & Certification',date:'11 Jul 2026',skills:'Course details are not stated on the certificate.',file:'Fundamentals of Analytics.pdf',mark:'AWS'},
    {title:'Developing Machine Learning Solutions',issuer:'AWS Training & Certification',date:'11 Jul 2026',skills:'Course details are not stated on the certificate.',file:'Developing Machine.pdf',mark:'AWS'},
    {title:'Exploring Artificial Intelligence Use Cases and Applications',issuer:'AWS Training & Certification',date:'8 Jul 2026',skills:'Course details are not stated on the certificate.',file:'Exploring Artificial Intelligence.pdf',mark:'AWS'},
    {title:'Responsible Artificial Intelligence Practices',issuer:'AWS Training & Certification',date:'9 Jul 2026',skills:'Course details are not stated on the certificate.',file:'Responsible Artificial.pdf',mark:'AWS'},
    {title:'GenAI Powered Data Analytics Job Simulation',issuer:'Forage',date:'4 Apr 2026',skills:'EDA and risk profiling · delinquency prediction with AI · data storytelling · AI-driven collections strategy.',file:'Tata Data Analytics Certificate.pdf',mark:'TATA'},
    {title:'Data Analytics Job Simulation',issuer:'Forage · Deloitte',date:'1 Apr 2026',skills:'Data analysis · forensic technology.',file:'Deloitte Data Analytics Certificate.pdf',mark:'D'},
    {title:'Data Analytics Job Simulation',issuer:'Forage · Quantium',date:'15 Oct 2025',skills:'Data preparation and customer analytics · experimentation and uplift testing · analytics and commercial application. Certificate contains inconsistent names.',file:'completion_certificate.pdf',mark:'Q'},
    {title:'Data Science & Analytics',issuer:'HP LIFE · HP Foundation',date:'7 Jul 2026',skills:'Data-science and analytics practices, methods, and tools · data-driven business approaches.',file:'Data Science & Analytics.pdf',mark:'HP'},
    {title:'Google Cloud Data Analytics',issuer:'Google Cloud',date:'Date not shown on image',skills:'The credential image shows the title; course details are not listed.',file:'../images/google-cloud-data-analytics-certificate.png',mark:'google'},
    {title:'Introduction to MS Excel',issuer:'Not stated on certificate',date:'4 Aug 2026',skills:'Course details are not stated on the certificate.',file:'Excel.pdf',mark:'XL'},
    {title:'Beginner to T-SQL Workshop',issuer:'Not stated on certificate',date:'08/12/2026 (date format unclear)',skills:'Course details are not stated on the certificate.',file:'Beginner to T-SQL Workshop - Harshavardhan Patil.pdf',mark:'SQL'},
    {title:'Data Fundamentals',issuer:'IBM (filename label)',date:'Date not shown',skills:'Course details are not shown in the credential file.',file:'Data Fundamentals from IBM.pdf',mark:'IBM'},
    {title:'Getting Started with Data',issuer:'IBM (filename label)',date:'Date not shown',skills:'Course details are not shown in the credential file.',file:'Getting Started with Data from IBM.pdf',mark:'IBM'},
    {title:'Generative AI Essentials',issuer:'IBM (filename label)',date:'Date not shown',skills:'Course details are not shown in the credential file.',file:'Generative AI Essentials fom IBM.pdf',mark:'IBM'},
    {title:'Make Agentic AI Work for You',issuer:'IBM (filename label)',date:'Date not shown',skills:'Course details are not shown in the credential file.',file:'Make Agentic AI Work for You from IBM.pdf',mark:'IBM'},
    {title:'Power BI credential',issuer:'Issuer not shown',date:'Date not shown',skills:'Course details are not shown in the credential file.',file:'Power Bi.pdf',mark:'BI'},
    {title:'Credential · IBM.pdf',issuer:'Not shown in credential file',date:'Not shown',skills:'Title, issuer, date, and course details are not shown in the credential file.',file:'IBM.pdf',mark:'IBM'},
    {title:'Credential · cretificate.pdf',issuer:'Not shown in credential file',date:'Not shown',skills:'Title, issuer, date, and course details are not shown in the credential file.',file:'cretificate.pdf',mark:'?'},
  ];
  track.innerHTML = certs.map((cert, i) => {
    const icon = cert.mark === 'google' ? '<img src="images/google-cloud-data-analytics-certificate.png" alt="" loading="lazy">' : cert.mark;
    const rawHref = cert.file.startsWith('../') ? `certificates/${cert.file}` : `certificates/${cert.file}`;
    const href = rawHref.split('/').map(encodeURIComponent).join('/');
    return `<article class="certificate-card reveal-item"><div class="certificate-top"><span class="cert-mark ${cert.mark === 'google' ? 'google' : ''}">${icon}</span><span class="cert-num">${String(i + 1).padStart(2, '0')}</span></div><div class="certificate-copy"><h3>${cert.title}</h3><p class="cert-issuer">${cert.issuer}</p><p class="cert-date">${cert.date}</p><p class="cert-skills">${cert.skills}</p></div><div class="certificate-bottom"><span>CREDENTIAL</span><a href="${href}" target="_blank" rel="noreferrer" aria-label="Open ${cert.title} certificate">VIEW ↗</a></div></article>`;
  }).join('');
  document.getElementById('year').textContent = new Date().getFullYear();
  const hideLoader = () => setTimeout(() => loader?.classList.add('is-hidden'), reduced ? 0 : 650);
  addEventListener('load', hideLoader, {once:true}); setTimeout(() => loader?.classList.add('is-hidden'), 1400);

  const menuButton = document.querySelector('.menu-toggle');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}));
  document.querySelectorAll('[data-scroll]').forEach(b => b.addEventListener('click', () => track.scrollBy({left:Number(b.dataset.scroll)*track.clientWidth*.72,behavior:reduced?'auto':'smooth'})));
  track.addEventListener('keydown', e => {if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();track.scrollBy({left:(e.key==='ArrowRight'?1:-1)*280,behavior:reduced?'auto':'smooth'});}});

  const projects = {
    agent:{type:'AI · ANALYTICS · WEB',title:'AI Data Analyst Agent',problem:'The project addresses a risk in data-chat tools: plausible metrics can be returned without a corresponding calculation.',approach:'The app parses CSV/XLSX/JSON in-browser, routes questions to DuckDB SQL, Python/pandas, statistics, or schema answers, validates generated code, retries errors up to three times, and displays generated code in Dev Mode. Raw files stay in-browser; plain-text questions are sent to the chosen model provider.',tools:'TypeScript · React · DuckDB-WASM · Pyodide · PapaParse · SheetJS · ECharts · Recharts · Vercel · optional Supabase',result:'The project reports 208 passing tests and links to a deployed Vercel demo. Business impact metrics are not reported.',link:'https://github.com/HarshPatil0804/Data-Analyst-AI-Agent'},
    hr:{type:'PEOPLE ANALYTICS · POWER BI',title:'HR Employee Attrition Analytics',problem:'The project examines employee turnover across departments, job roles, overtime, satisfaction, and income.',approach:'Uses the IBM HR attrition dataset (1,470 rows, 35 columns), a Python/Pandas Jupyter notebook for cleaning and EDA, Power Query for transformation, DAX KPIs, and an interactive Power BI dashboard.',tools:'Python · Pandas · Jupyter · Power Query · DAX · Power BI · Matplotlib',result:'Analysis highlights higher attrition in Research & Development and among employees working overtime. These are descriptive insights; no retention impact is reported.',link:'https://github.com/HarshPatil0804/HR-Employee-Attrition-Analytics-Dashboard'},
    shelf:{type:'COMPUTER VISION · STREAMLIT',title:'Empty Shelf Detection',problem:'The project targets retail stock-outs by identifying empty or partially empty shelf regions in store video.',approach:'The Streamlit app runs a YOLO model, samples every 30th video frame, and labels detected shelf regions Empty or Occupied using grayscale and Canny edge density. Reported evaluation: 92% mAP50, 35 FPS, and zero missed empty zones.',tools:'Python · Ultralytics YOLOv8 · OpenCV · NumPy · Streamlit · Jupyter',result:'Project slides report 92% mAP50, 35 FPS, and zero missed empty zones, without a stated evaluation method. The app summary also references an undefined all_results variable.',link:'https://github.com/HarshPatil0804/Empty-Shelf-Detection-Model'},
    loan:{type:'LENDING ANALYTICS · SQL SERVER · POWER BI',title:'Bank Loan Analysis',problem:'Tracks applications, funding, repayments, borrower segments, and good/bad loan risk.',approach:'Analyzes a 38,576-row financial loan CSV. SQL queries calculate application, funding, repayment, interest, DTI, good/bad loan, status, month, region, term, employment, purpose, and home-ownership views; a Power BI file provides summary, overview, and detail dashboards.',tools:'SQL Server · Power BI · CSV / Excel source data',result:'The dashboard provides portfolio KPIs, status and trend views, and written recommendations. The SQL file uses November in both MTD and PMTD filters; the accompanying report uses December for MTD and November for PMTD.',link:'https://github.com/HarshPatil0804/Bank-Loan-Analysis'},
    customer:{type:'CUSTOMER ANALYTICS · POWER BI',title:'Customer Shopping Behavior Analysis',problem:'The project examines shopping patterns, customer segments, subscription status, ratings, and revenue opportunities across 3,900 transactions.',approach:'The notebook fills missing review ratings with the median within each product category and loads records through SQLAlchemy into PostgreSQL. The Power BI dashboard shows customer, revenue, category, age, subscription, and segmentation views.',tools:'Python · Pandas · SQLAlchemy · PostgreSQL · Power BI · Jupyter',result:'The dashboard shows 3.9K customers, a 3.75 average rating, and a $59.76 average purchase amount.',link:'https://github.com/HarshPatil0804/Customer-Behavior-Analysis-'},
    ipl:{type:'SPORTS ANALYTICS · STREAMLIT',title:'IPL Ball-by-Ball Analytics',problem:'The project turns delivery-level IPL records into team, batter, bowler, scoring, extras, dismissal, and innings analysis.',approach:'The notebook cleans and engineers fields, aggregates delivery data, and feeds a Streamlit app with team/innings filters, Plotly charts, KPIs, and filtered CSV export.',tools:'Python · Pandas · NumPy · Streamlit · Plotly · Jupyter',result:'The analysis covers 577 matches, 173,965 runs, 5,532 wickets, 15,413 fours, 5,813 sixes, and 49,915 dot balls. Player and team filters use numeric dataset IDs.',link:'https://github.com/HarshPatil0804/IPL_Ball_by_Ball_IBM_Project'}
  };
  const dialog = document.querySelector('.project-dialog');
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    const item=projects[button.dataset.open]; document.getElementById('dialog-type').textContent=item.type; document.getElementById('dialog-title').textContent=item.title;
    document.getElementById('dialog-problem').textContent=item.problem; document.getElementById('dialog-approach').textContent=item.approach;
    document.getElementById('dialog-tools').textContent=item.tools; document.getElementById('dialog-result').textContent=item.result;
    document.querySelector('.dialog-link').href=item.link; dialog.showModal(); lenis?.stop();
  }));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>lenis?.start());

  const chips=document.querySelectorAll('[data-skills]');
  chips.forEach(button=>{const highlight=()=>{const related=button.dataset.skills.split(' ');document.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('is-dimmed',!related.includes(card.dataset.project)));chips.forEach(chip=>chip.classList.toggle('is-active',chip===button));};button.addEventListener('mouseenter',highlight);button.addEventListener('focus',highlight);});
  document.querySelector('.skill-groups').addEventListener('mouseleave',()=>{document.querySelectorAll('.project-card').forEach(card=>card.classList.remove('is-dimmed'));chips.forEach(chip=>chip.classList.remove('is-active'));});

  const updateScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress span').style.transform=`scaleX(${max>0?scrollY/max:0})`;};
  let lastY=0;addEventListener('scroll',()=>{updateScroll();const y=scrollY;if(y>180&&y>lastY+3)header.classList.add('is-hidden');else if(y<lastY-3||y<100)header.classList.remove('is-hidden');lastY=y;},{passive:true});updateScroll();
  const navLinks=document.querySelectorAll('.nav a[href^="#"]');
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.getAttribute('href') === '#') return;
    let target;
    try { target = document.querySelector(anchor.getAttribute('href')); } catch { return; }
    if (!target) return;
    event.preventDefault();
    const offset = -(header?.getBoundingClientRect().height || 0);
    if (lenis) lenis.scrollTo(target, { offset, duration: 1.2, lock: false });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: reduced ? 'auto' : 'smooth' });
    if (anchor.closest('.nav')) { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); }
  });
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`));}),{rootMargin:'-35% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>activeObserver.observe(section));

  const reveal=elements=>{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;if(window.gsap&&!reduced)gsap.to(el,{opacity:1,y:0,duration:.65,ease:'power2.out',delay:Math.min([...elements].indexOf(el)%4*.07,.21),onComplete:()=>{el.style.transform='none';}});else{el.style.opacity='1';el.style.transform='none';}observer.unobserve(el);}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});elements.forEach(el=>observer.observe(el));};
  reveal(document.querySelectorAll('.reveal-item'));
  if(!reduced&&window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.fromTo('.hero-line',{opacity:0,y:28},{opacity:1,y:0,duration:.8,stagger:.12,ease:'power3.out',delay:.68});gsap.fromTo('.hero-copy .eyebrow,.hero-role,.hero-intro,.hero-actions',{opacity:0,y:14},{opacity:1,y:0,duration:.65,stagger:.1,ease:'power2.out',delay:.8});
    gsap.utils.toArray('.stat strong').forEach(el=>{const target=Number(el.dataset.count);ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:()=>gsap.fromTo(el,{textContent:0},{textContent:target,duration:.8,ease:'power1.out',snap:{textContent:1},onUpdate:()=>{el.textContent=Math.round(Number(el.textContent));}})});});
    gsap.to('.hero-glow',{yPercent:10,opacity:.45,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  }else document.querySelectorAll('.hero-line,.hero-copy .eyebrow,.hero-role,.hero-intro,.hero-actions').forEach(el=>{el.style.opacity='1';el.style.clipPath='none';el.style.transform='none';});
  if(!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){const glow=document.querySelector('.cursor-glow'),hideGlow=()=>{glow.style.opacity='0';};header.addEventListener('pointerenter',hideGlow);addEventListener('scroll',hideGlow,{passive:true});addEventListener('pointermove',e=>{if(scrollY>0||header.matches(':hover')){hideGlow();return;}glow.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;glow.style.opacity='.55';},{passive:true});addEventListener('pointerleave',hideGlow);}
  const refreshScroll = () => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); };
  if (document.fonts?.ready) document.fonts.ready.then(refreshScroll);
  [...document.images].forEach(image => { if (!image.complete) { image.addEventListener('load', refreshScroll, {once:true}); image.addEventListener('error', refreshScroll, {once:true}); } });
  addEventListener('load', refreshScroll, {once:true});
  if(!reduced){const roles=[{article:'a',title:'Data Analyst'},{article:'a',title:'Web Developer'},{article:'an',title:'ML Enthusiast'}];let idx=0;const role=document.querySelector('.role-rotate'),article=document.querySelector('.role-article');setInterval(()=>{idx=(idx+1)%roles.length;const update=()=>{role.textContent=roles[idx].title;article.textContent=roles[idx].article;};if(window.gsap)gsap.to(role,{opacity:0,y:-5,duration:.4,onComplete:()=>{update();gsap.fromTo(role,{opacity:0,y:5},{opacity:1,y:0,duration:.4});}});else update();},3400);}
})();
