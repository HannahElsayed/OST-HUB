/* ===== Unified Study Hub: store, router, shell and pages =====
   Subjects live in os-app.js (window.OS) and stats-app.js (window.STATS). Everything saved is in localStorage. */
(function(){'use strict';
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ICONS={
 home:'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
 learn:'M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z',
 cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
 map:'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M19 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7 6.5l2.8 3M17 6.5l-2.8 3M7 17.5l2.8-3M17 17.5l-2.8-3',
 notes:'M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6',
 quiz:'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01',
 chart:'M4 20V10M10 20V4M16 20v-8M22 20H2',
 settings:'M4 7h10M18 7h2M4 17h2M10 17h10M16 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M8 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
 cpu:'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
 calc:'M5 3h14v18H5zM8 7h8M8 12h2M12 12h2M8 16h2M12 16h2',
 search:'M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M20 20l-4-4',
 bell:'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
 menu:'M4 6h16M4 12h16M4 18h16',
 clock:'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 2',
 chev:'M15 6l-6 6 6 6',
 plus:'M12 5v14M5 12h14',
 check:'M5 12l5 5 9-10',
 trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
 arrow:'M5 12h14M13 6l6 6-6 6',
 x:'M6 6l12 12M18 6L6 18',
 book:'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12',
 cards:'M3 7h14v12H3zM7 3h14v12',
 down:'M12 4v11M7 11l5 5 5-5M5 20h14',
 bolt:'M13 2L4 14h7l-1 8 9-12h-7z'
};
const ic=n=>'<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="'+ICONS[n]+'"/></svg>';

/* ---------------- store ---------------- */
const KEY='uniStudyHub.v1';
const defaults=()=>({done:{},recent:[],notes:{},tasks:[],quiz:[],prefs:{collapsed:false,weekStart:1,name:'HANNAH'}});
let S=defaults();
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object'){S=Object.assign(defaults(),v);S.prefs=Object.assign(defaults().prefs,v.prefs||{})}}catch(e){}
let saveT;const save=()=>{clearTimeout(saveT);saveT=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},60)};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);

/* ---------------- dates ---------------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parseYmd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const todayS=()=>ymd(new Date());
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const fmtLong=d=>d.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const ago=t=>{const s=(Date.now()-t)/1000;if(s<60)return 'just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' h ago';return Math.floor(s/86400)+' d ago'};

/* ---------------- registry: lectures / chapters ---------------- */
const words=t=>(String(t).replace(/<[^>]+>/g,' ').match(/\S+/g)||[]).length;
const SX_META={
 5:{title:'Chapter 5 — Bivariate (Joint) Distributions',short:'Bivariate (Joint) Distributions',summary:'Joint p.m.f. and p.d.f., marginal and conditional distributions, independence, covariance and correlation, and sums of random variables.',practice:'#/stats/chapter/5/a8'},
 6:{title:'Chapter 6 — Sampling Distributions',short:'Sampling Distributions',summary:'The sample mean X̄ and the CLT, chi-squared, Student\'s t and F, the family tree of distributions, a problem-solving toolkit, exercises and a cheat sheet.',practice:'#/stats/chapter/6/s8'}
};
let REG=[];
function buildRegistry(){
  REG=[];
  [1,2,3,4].forEach(n=>{
    const d=OS.LEC[n];let w=0;
    d.topics.forEach((t,i)=>{w+=words(t.th.join(' ')+' '+(t.ex||'')+' '+(t.tip||''));const p=OS.AR_PLUS[n+'-'+i];if(p)w+=words((p.ar||[]).join(' ')+' '+(p.why||'')+' '+(p.mis||'')+' '+(p.mem||''))});
    REG.push({key:'os-'+n,subject:'os',n,title:d.title,short:d.title.replace(/^Lecture \d+\s*[—–-]\s*/,''),summary:d.sub,concepts:d.topics.map(t=>t.t),minutes:Math.max(5,Math.round(w/180)),route:'#/os/lecture/'+n,map:'l'+n,practice:'#/os/tool/mcq/'+n});
  });
  [5,6].forEach(n=>{
    const m=SX_META[n],ch=$('#ch'+n),secs=$$('section',ch).map(s=>{const h=s.querySelector('h2');if(!h)return '';const c=h.cloneNode(true);const nn=c.querySelector('.n');if(nn)nn.remove();return c.textContent.trim()}).filter(Boolean);
    REG.push({key:'stats-'+n,subject:'stats',n,title:m.title,short:m.short,summary:m.summary,concepts:secs,minutes:Math.max(8,Math.round(words(ch.textContent)/200)),route:'#/stats/chapter/'+n,map:'c'+n,practice:m.practice});
  });
}
const byKey=k=>REG.find(r=>r.key===k);
const subjLec=s=>REG.filter(r=>r.subject===s);
const isDone=k=>!!S.done[k];
const doneCount=s=>subjLec(s).filter(r=>isDone(r.key)).length;
const pct=s=>{const t=subjLec(s).length;return t?Math.round(doneCount(s)/t*100):0};
const overallPct=()=>REG.length?Math.round(REG.filter(r=>isDone(r.key)).length/REG.length*100):0;
const SUBJ={os:{name:'Operating Systems',short:'OS',icon:'cpu',home:'#/os',cls:'os'},stats:{name:'Statistical Methods',short:'Statistics',icon:'calc',home:'#/stats',cls:'sx'}};
const cls=s=>SUBJ[s]?SUBJ[s].cls:'';
function touch(key){S.recent=S.recent.filter(r=>r.key!==key);S.recent.unshift({key,ts:Date.now()});S.recent=S.recent.slice(0,10);save()}
function quizAvg(subject){const q=S.quiz.filter(x=>!subject||x.subject===subject);if(!q.length)return null;return Math.round(q.reduce((a,x)=>a+x.score/x.total*100,0)/q.length)}

/* ---------------- shell ---------------- */
const V={hub:$('#v-hub'),os:$('#v-os'),sx:$('#v-sx'),mm:$('#v-mm')};
function showView(n){Object.keys(V).forEach(k=>V[k].hidden=k!==n)}
const NAV_GEN=[['dashboard','Dashboard','home'],['learning','My Learning','learn'],['planner','Study Planner','cal'],['mindmaps','Mind Maps','map'],['notes','Notes & Resources','notes'],['quizzes','Quizzes & Exams','quiz'],['progress','Progress & Statistics','chart'],['settings','Settings','settings']];
function buildSide(){
  $('#side').innerHTML='<a class="brand" href="#/dashboard" style="text-decoration:none"><span class="logo">'+ic('book')+'</span><span class="bt">Study Hub</span></a>'+
  '<h6>General</h6><nav class="nav" aria-label="General">'+NAV_GEN.map(g=>'<a href="#/'+g[0]+'" data-nav="'+g[0]+'" title="'+g[1]+'">'+ic(g[2])+'<span class="lbl">'+g[1]+'</span></a>').join('')+'</nav>'+
  '<h6>My Subjects</h6><nav class="nav" aria-label="Subjects">'+Object.keys(SUBJ).map(k=>'<a href="'+SUBJ[k].home+'" data-nav="'+k+'" title="'+SUBJ[k].name+'">'+ic(SUBJ[k].icon)+'<span class="lbl">'+SUBJ[k].name+'</span><span class="pct" data-pct="'+k+'"></span></a>').join('')+'</nav>'+
  '<div class="grow"></div><button class="collapse-btn" id="collapseBtn" aria-label="Collapse sidebar">'+ic('chev')+'<span class="lbl">Collapse</span></button>';
}
function updateNavPct(){$$('[data-pct]').forEach(e=>e.textContent=pct(e.dataset.pct)+'%')}
function setCollapsed(v){S.prefs.collapsed=v;$('#app').classList.toggle('collapsed',v);save()}

/* ---------------- tasks ---------------- */
const TYPES={study:'Study',revision:'Revision',deadline:'Deadline'};
const tasksOn=d=>S.tasks.filter(t=>t.date===d);
const pending=()=>S.tasks.filter(t=>!t.done);
const overdue=()=>pending().filter(t=>t.date<todayS());
let weekOff=0;
function taskHTML(t,opt){
  const sj=t.subject==='os'?'Operating Systems':t.subject==='stats'?'Statistical Methods':'General';
  const lec=t.lecture&&byKey(t.lecture);
  return '<div class="task '+(t.done?'done':'')+'"><input type="checkbox" data-a="ttoggle" data-id="'+t.id+'" '+(t.done?'checked':'')+' aria-label="Mark done"><div class="tt"><b>'+esc(t.title)+'</b><span>'+TYPES[t.type]+' · '+sj+(lec?' · '+esc(lec.short):'')+(opt&&opt.date?' · '+parseYmd(t.date).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'}):'')+'</span></div><button class="x" data-a="tdel" data-id="'+t.id+'" aria-label="Delete task">'+ic('trash')+'</button></div>';
}
function taskModal(date,edit){
  const t=edit?S.tasks.find(x=>x.id===edit):null;
  const bg=document.createElement('div');bg.className='modal-bg';
  const lecOpts=['<option value="">None</option>'].concat(REG.map(r=>'<option value="'+r.key+'" '+(t&&t.lecture===r.key?'selected':'')+'>'+esc(r.title)+'</option>')).join('');
  bg.innerHTML='<form class="modal" role="dialog" aria-modal="true" aria-label="Study task"><h3>'+(t?'Edit study task':'New study task')+'</h3>'+
   '<label class="field">Title<input name="title" required maxlength="120" placeholder="e.g. Revise CPU scheduling algorithms" value="'+esc(t?t.title:'')+'"></label>'+
   '<div class="row2"><label class="field">Subject<select name="subject"><option value="os">Operating Systems</option><option value="stats">Statistical Methods</option><option value="gen">General</option></select></label>'+
   '<label class="field">Type<select name="type"><option value="study">Study</option><option value="revision">Revision session</option><option value="deadline">Lecture deadline</option></select></label></div>'+
   '<div class="row2"><label class="field">Date<input type="date" name="date" required value="'+(t?t.date:date||todayS())+'"></label><label class="field">Lecture (optional)<select name="lecture">'+lecOpts+'</select></label></div>'+
   '<div class="acts"><button type="button" class="hbtn soft" data-m="cancel">Cancel</button><button class="hbtn" type="submit">'+(t?'Save changes':'Create task')+'</button></div></form>';
  document.body.appendChild(bg);
  const f=$('form',bg);if(t){f.subject.value=t.subject;f.type.value=t.type}
  f.elements.title.focus();
  const close=()=>{bg.remove();document.removeEventListener('keydown',esck)};
  const esck=e=>{if(e.key==='Escape')close()};document.addEventListener('keydown',esck);
  bg.addEventListener('click',e=>{if(e.target===bg||e.target.dataset.m==='cancel')close()});
  f.addEventListener('submit',e=>{e.preventDefault();
    const o={title:f.elements.title.value.trim(),subject:f.subject.value,type:f.type.value,date:f.date.value,lecture:f.lecture.value||''};
    if(!o.title||!o.date)return;
    if(t)Object.assign(t,o);else S.tasks.push(Object.assign({id:uid(),done:false},o));
    save();close();refresh();
  });
}

/* ---------------- shared page pieces ---------------- */
function lecCard(r,compact){
  const done=isDone(r.key),sj=SUBJ[r.subject];
  return '<article class="hcard lcard"><div class="top2"><span class="htag '+cls(r.subject)+'">'+sj.short+'</span><span class="htag '+(done?'ok':'')+'">'+(done?'Completed':'Not completed')+'</span><span class="htag">'+ic('clock').replace('class="i"','class="i" style="width:13px;height:13px"')+' ≈ '+r.minutes+' min read</span></div>'+
   '<h3>'+esc(r.title)+'</h3><p>'+esc(r.summary)+'</p>'+
   (compact?'':'<div class="concepts">'+r.concepts.slice(0,6).map(c=>'<span>'+esc(c.length>30?c.slice(0,28)+'…':c)+'</span>').join('')+(r.concepts.length>6?'<span>+'+(r.concepts.length-6)+' more</span>':'')+'</div>')+
   '<div class="foot"><a class="hbtn sm" href="'+r.route+'">Open '+(r.subject==='os'?'Lecture':'Chapter')+'</a>'+(r.map?'<a class="hbtn sm soft" href="#/mindmaps/'+r.map+'">Mind Map</a>':'')+(r.practice?'<a class="hbtn sm soft" href="'+r.practice+'">Practice Questions</a>':'')+'</div></article>';
}
function continueCard(item){
  const r=byKey(item.key);if(!r)return '';const done=isDone(r.key);
  return '<article class="hcard lcard"><div class="top2"><span class="htag '+cls(r.subject)+'">'+SUBJ[r.subject].name+'</span><span class="htag '+(done?'ok':'warn')+'">'+(done?'Completed':'In progress')+'</span></div><h3>'+esc(r.title)+'</h3><p>'+esc(r.summary)+'</p>'+
   '<div><div class="hbar '+cls(r.subject)+'" role="progressbar" aria-valuenow="'+(done?100:0)+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+(done?100:6)+'%"></i></div><p style="font-size:12.5px;margin-top:6px">'+(done?'Marked as completed':'Opened '+ago(item.ts)+' · not yet marked completed')+'</p></div>'+
   '<div class="foot"><a class="hbtn sm" href="'+r.route+'">'+(done?'Review':'Continue Studying')+' '+ic('arrow').replace('class="i"','class="i" style="width:16px;height:16px"')+'</a></div></article>';
}
const empty=(t,s,a)=>'<div class="empty-st"><b>'+t+'</b>'+s+(a?'<div style="margin-top:12px">'+a+'</div>':'')+'</div>';
function statCard(c,k,v,n,ic_,extra){return '<div class="stat '+c+'"><div class="k">'+ic(ic_)+k+'</div><div class="v">'+v+'</div><div class="n">'+n+'</div>'+(extra||'')+'</div>'}
function subjCard(k){
  const sj=SUBJ[k],n=subjLec(k).length,d=doneCount(k);
  const desc=k==='os'?'Operating system concepts, processes, memory, scheduling, synchronization, and related topics.':'Probability, distributions, sampling, statistical inference, and related topics.';
  return '<article class="subj '+sj.cls+'"><div class="ic">'+ic(sj.icon)+'</div><h3>'+sj.name+'</h3><p>'+desc+'</p><div class="meta"><span>'+n+(k==='os'?' lectures':' chapters')+'</span><span>'+d+' completed</span><span>'+pct(k)+'% progress</span></div><div class="hbar" role="progressbar" aria-valuenow="'+pct(k)+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pct(k)+'%"></i></div><div><a class="hbtn" href="'+sj.home+'">'+(k==='os'?'Open OS':'Open Statistics')+' '+ic('arrow')+'</a></div></article>';
}

/* ---------------- pages ---------------- */
function pageDashboard(){
  const now=new Date(),t=todayS(),todays=tasksOn(t).filter(x=>!x.done),od=overdue();
  const rec=S.recent.filter(r=>byKey(r.key)).slice(0,3);
  let msg;
  if(todays.length)msg='You have <b>'+todays.length+' task'+(todays.length>1?'s':'')+'</b> planned for today.';
  else if(od.length)msg='<b>'+od.length+' overdue task'+(od.length>1?'s':'')+'</b> need attention.';
  else if(rec.length)msg='Pick up where you left off: <b>'+esc(byKey(rec[0].key).short)+'</b>.';
  else msg='Open a lecture to start. Small, regular sessions beat last-minute cramming.';
  const done=REG.filter(r=>isDone(r.key)).length,avg=quizAvg(),pend=pending().length;
  const upcoming=S.tasks.filter(x=>!x.done).sort((a,b)=>a.date<b.date?-1:1).slice(0,5);
  return '<div class="welcome"><div><h1>Welcome back!</h1><p>Your learning space, organized in one place.</p></div><div class="today"><b>'+fmtLong(now)+'</b>'+msg+'</div></div>'+
  '<div class="hgrid g6">'+
   statCard('lav','Total Subjects',2,'Operating Systems · Statistical Methods','learn')+
   statCard('peach','Total Lectures',REG.length,subjLec('os').length+' OS lectures · '+subjLec('stats').length+' statistics chapters','book')+
   statCard('blue','Completed Lectures',done,'of '+REG.length+(done?'':' · none marked yet'),'check')+
   statCard('yellow','Overall Progress',overallPct()+'%',done?'Based on completed lectures':'No progress recorded yet','chart','<div class="hbar" style="margin-top:8px"><i style="width:'+overallPct()+'%"></i></div>')+
   statCard('pink','Quiz Average',avg==null?'—':avg+'%',avg==null?'No quiz finished yet':S.quiz.length+' attempt'+(S.quiz.length>1?'s':''),'quiz')+
   statCard('paper','Study Tasks Remaining',pend,S.tasks.length?(od.length?od.length+' overdue':'Nothing overdue'):'No tasks yet. Add one in the planner','cal')+
  '</div>'+
  '<div class="sec-h"><h2>Continue Learning</h2><a href="#/learning">All lectures</a></div>'+
  (rec.length?'<div class="hgrid g3">'+rec.map(continueCard).join('')+'</div>':empty('Nothing opened yet','Your most recent lectures will show up here.','<a class="hbtn sm" href="#/os/lecture/1">Start Lecture 1</a> <a class="hbtn sm soft" href="#/stats/chapter/5">Start Chapter 5</a>'))+
  '<div class="sec-h"><h2>My Subjects</h2></div><div class="hgrid g2">'+subjCard('os')+subjCard('stats')+'</div>'+
  '<div class="sec-h"><h2>Coming up</h2><a href="#/planner">Open planner</a></div>'+
  (upcoming.length?'<div class="tasklist">'+upcoming.map(x=>taskHTML(x,{date:1})).join('')+'</div>':empty('No study tasks yet','Plan revision sessions and lecture deadlines for the week.','<button class="hbtn sm" data-a="tnew">'+ic('plus')+' Create a study task</button>'));
}
function pageLearning(){
  return '<div class="page-h"><div><h1>My Learning</h1><p>Every lecture and chapter from both subjects, in one place.</p></div></div>'+
   '<div class="toolrow"><input class="txt" id="libq" data-a="libq" type="search" placeholder="Search lectures and topics…" aria-label="Search lectures"><div class="hchips" id="libf"><button class="hchip on" data-a="libf" data-v="all">All</button><button class="hchip" data-a="libf" data-v="os">Operating Systems</button><button class="hchip" data-a="libf" data-v="stats">Statistics</button><button class="hchip" data-a="libf" data-v="todo">Not completed</button><button class="hchip" data-a="libf" data-v="done">Completed</button></div></div>'+
   '<div class="hgrid g2" id="libg"></div>';
}
let libF='all',libQ='';
function fillLib(scope,target){
  const g=$(target||'#libg');if(!g)return;
  const q=libQ.toLowerCase();
  const list=REG.filter(r=>(scope?r.subject===scope:true)&&(libF==='all'||libF===r.subject||(libF==='done'&&isDone(r.key))||(libF==='todo'&&!isDone(r.key)))&&(!q||(r.title+' '+r.summary+' '+r.concepts.join(' ')).toLowerCase().includes(q)));
  g.innerHTML=list.length?list.map(r=>lecCard(r)).join(''):'<div style="grid-column:1/-1">'+empty('Nothing matches','Try a different word or clear the filters.')+'</div>';
}
function pagePlanner(){
  const ws=S.prefs.weekStart,base=new Date();base.setDate(base.getDate()+weekOff*7);
  const diff=(base.getDay()-ws+7)%7,start=addDays(base,-diff),days=[...Array(7)].map((_,i)=>addDays(start,i));
  const t=todayS(),wt=S.tasks.filter(x=>x.date>=ymd(days[0])&&x.date<=ymd(days[6]));
  const wd=wt.filter(x=>x.done).length;
  return '<div class="page-h"><div><h1>Study Planner</h1><p>Plan study sessions, revision and lecture deadlines. Tasks are saved on this device.</p></div><button class="hbtn" data-a="tnew">'+ic('plus')+' Create study task</button></div>'+
   '<div class="toolrow"><button class="hbtn soft sm" data-a="wk" data-v="-1" aria-label="Previous week">← Prev</button><button class="hbtn soft sm" data-a="wk" data-v="0">This week</button><button class="hbtn soft sm" data-a="wk" data-v="1" aria-label="Next week">Next →</button><b>'+days[0].toLocaleDateString(undefined,{day:'numeric',month:'short'})+' – '+days[6].toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})+'</b><span class="muted">'+wd+' of '+wt.length+' done this week</span></div>'+
   '<div class="legend" style="margin-bottom:12px"><span><i style="background:#EADCF8"></i>Operating Systems</span><span><i style="background:#FFE2DA"></i>Statistical Methods</span><span><i style="background:#E4EBF7"></i>General</span></div>'+
   '<div class="week">'+days.map(d=>{const s=ymd(d),ts=tasksOn(s);
     return '<section class="day '+(s===t?'today':'')+'" aria-label="'+fmtLong(d)+'"><header><span>'+d.toLocaleDateString(undefined,{weekday:'short'})+'</span><b>'+d.getDate()+'</b></header>'+
     ts.map(x=>'<button class="chip-t '+(x.subject==='os'?'os':x.subject==='stats'?'sx':'gen')+' '+(x.done?'done':'')+'" data-a="tedit" data-id="'+x.id+'" title="Click to edit"><span><span class="ty">'+TYPES[x.type]+'</span>'+esc(x.title)+'</span></button>').join('')+
     '<button class="add" data-a="tnew" data-date="'+s+'" aria-label="Add task on '+s+'">+ Add</button></section>'}).join('')+'</div>'+
   '<div class="sec-h"><h2>All tasks</h2></div>'+
   (S.tasks.length?'<div class="hgrid g2"><div><h3 style="margin-bottom:10px;font-size:15px">Pending ('+pending().length+')</h3><div class="tasklist">'+(pending().length?pending().sort((a,b)=>a.date<b.date?-1:1).map(x=>taskHTML(x,{date:1})).join(''):'<div class="muted">Nothing pending.</div>')+'</div></div><div><h3 style="margin-bottom:10px;font-size:15px">Completed ('+S.tasks.filter(x=>x.done).length+')</h3><div class="tasklist">'+(S.tasks.some(x=>x.done)?S.tasks.filter(x=>x.done).sort((a,b)=>a.date<b.date?1:-1).map(x=>taskHTML(x,{date:1})).join(''):'<div class="muted">Nothing completed yet.</div>')+'</div></div></div>':empty('No tasks yet','Create your first study task to start planning your week.','<button class="hbtn sm" data-a="tnew">'+ic('plus')+' Create a study task</button>'));
}
function pageNotes(){
  const withNote=REG.filter(r=>(S.notes[r.key]||'').trim());
  const res=[
   ['os','book','OS Cheatsheet','Comparison tables and key numbers for revision','#/os/tool/cheat'],
   ['os','cards','OS Flashcards','Question on the front, answer on the back','#/os/tool/cards'],
   ['sx','calc','Statistics cheat sheet and traps','Which distribution? Common mistakes and typos in the notes','#/stats/chapter/6/s11'],
   ['sx','book','Statistics exercises with answers','Chapter 6 exercises','#/stats/chapter/6/s10'],
   ['sx','book','Joint distribution exercises','Chapter 5 exercises with answers','#/stats/chapter/5/a9'],
   ['bl','map','Mind maps','All six blackboard maps','#/mindmaps']];
  return '<div class="page-h"><div><h1>Notes & Resources</h1><p>Your notes for every lecture and chapter, plus quick links to the revision material.</p></div></div>'+
   '<div class="sec-h" style="margin-top:0"><h2>Revision resources</h2></div><div class="toolbtns">'+res.map(r=>'<a class="tl" href="'+r[4]+'"><span class="ic '+r[0]+'">'+ic(r[1])+'</span><span>'+r[2]+'<small>'+r[3]+'</small></span></a>').join('')+'</div>'+
   '<div class="sec-h"><h2>My notes</h2><span class="muted">'+withNote.length+' of '+REG.length+' have notes</span></div>'+
   '<div class="hgrid g2">'+REG.map(r=>'<div class="hcard"><div class="top2" style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><span class="htag '+cls(r.subject)+'">'+SUBJ[r.subject].short+'</span><b style="font-size:15px">'+esc(r.short)+'</b></div><textarea class="txt" data-a="note" data-key="'+r.key+'" placeholder="Write notes for this '+(r.subject==='os'?'lecture':'chapter')+'…" aria-label="Notes for '+esc(r.title)+'">'+esc(S.notes[r.key]||'')+'</textarea><div class="notebox" style="margin:6px 0 0"><div class="saved" data-saved="'+r.key+'"></div></div><a class="hbtn sm soft" href="'+r.route+'">Open '+(r.subject==='os'?'lecture':'chapter')+'</a></div>').join('')+'</div>';
}
function pageQuizzes(){
  const osN=OS.MCQ.length,tfN=OS.TFQ.length,att=S.quiz.slice().reverse().slice(0,8);
  const osAvg=quizAvg('os'),sxAvg=quizAvg('stats');
  const tl=(c,i,t,s,h)=>'<a class="tl" href="'+h+'"><span class="ic '+c+'">'+ic(i)+'</span><span>'+t+'<small>'+s+'</small></span></a>';
  return '<div class="page-h"><div><h1>Quizzes & Exams</h1><p>MCQs, true/false, timed tests and practice generators. Finished quizzes are recorded for your statistics.</p></div></div>'+
   '<div class="hgrid g3" style="margin-bottom:8px"><div class="stat paper"><div class="k">Overall average</div><div class="v">'+(quizAvg()==null?'—':quizAvg()+'%')+'</div><div class="n">'+(S.quiz.length?S.quiz.length+' finished quizzes':'No quiz finished yet')+'</div></div><div class="stat lav"><div class="k">OS average</div><div class="v">'+(osAvg==null?'—':osAvg+'%')+'</div><div class="n">'+S.quiz.filter(x=>x.subject==='os').length+' attempts</div></div><div class="stat peach"><div class="k">Statistics average</div><div class="v">'+(sxAvg==null?'—':sxAvg+'%')+'</div><div class="n">'+S.quiz.filter(x=>x.subject==='stats').length+' attempts</div></div></div>'+
   '<div class="sec-h"><h2>Operating Systems</h2></div><div class="toolbtns">'+
    tl('os','quiz','MCQ ('+osN+' questions)','All lectures, with Egyptian Arabic explanations','#/os/tool/mcq')+tl('os','check','True / False ('+tfN+')','Quick checks','#/os/tool/tf')+tl('os','clock','Final Test','20 random questions · 15 minutes','#/os/tool/test')+tl('os','clock','Exam Center','4 timed mock exams + written practice','#/os/tool/exams')+
    [1,2,3,4].map(n=>tl('os','quiz','Lecture '+n+' practice','MCQs filtered to this lecture','#/os/tool/mcq/'+n)).join('')+'</div>'+
   '<div class="sec-h"><h2>Statistical Methods</h2></div><div class="toolbtns">'+
    tl('sx','quiz','Chapter 6 MCQ quiz','24 questions','#/stats/chapter/6/s8')+tl('sx','bolt','Chapter 6 practice generator','Unlimited questions with XP','#/stats/chapter/6/s9')+tl('sx','book','Chapter 6 exercises','From your sheet, with answers','#/stats/chapter/6/s10')+
    tl('sx','quiz','Chapter 5 MCQ quiz','24 questions','#/stats/chapter/5/a8')+tl('sx','book','Chapter 5 exercises','With answers','#/stats/chapter/5/a9')+'</div>'+
   '<div class="sec-h"><h2>Recent results</h2></div>'+
   (att.length?'<div class="hcard tbl-wrap"><table class="tbl"><thead><tr><th>Quiz</th><th>Subject</th><th>Score</th><th>When</th></tr></thead><tbody>'+att.map(a=>'<tr><td>'+esc(a.name)+'</td><td>'+SUBJ[a.subject].short+'</td><td><b>'+Math.round(a.score/a.total*100)+'%</b> ('+a.score+'/'+a.total+')</td><td>'+ago(a.ts)+'</td></tr>').join('')+'</tbody></table></div>':empty('No results yet','Finish a quiz and the result will be listed here.'));
}
function ringHTML(p,c,label){return '<div class="ring" style="--p:'+p+';--c:'+c+'" role="img" aria-label="'+label+'"><span>'+p+'%</span></div>'}
function pageProgress(){
  const q=S.quiz.slice(-12),tdone=S.tasks.filter(t=>t.done).length;
  const W=560,H=190,pl=34,pb=26,pt=10,bw=Math.min(36,(W-pl-10)/Math.max(q.length,1)-8);
  const chart=q.length?'<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto" role="img" aria-label="Quiz scores">'+[0,25,50,75,100].map(v=>{const y=H-pb-(H-pb-pt)*v/100;return '<line x1="'+pl+'" x2="'+W+'" y1="'+y+'" y2="'+y+'" stroke="#E5DED2"/><text x="'+(pl-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#77736D">'+v+'</text>'}).join('')+
   q.map((a,i)=>{const p=Math.round(a.score/a.total*100),x=pl+10+i*((W-pl-10)/q.length),h=(H-pb-pt)*p/100;return '<rect x="'+x.toFixed(1)+'" y="'+(H-pb-h).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="5" fill="'+(a.subject==='os'?'#A67BD4':'#E58F76')+'"/><text x="'+(x+bw/2).toFixed(1)+'" y="'+(H-pb-h-5).toFixed(1)+'" text-anchor="middle" font-size="11" fill="#252525">'+p+'</text><text x="'+(x+bw/2).toFixed(1)+'" y="'+(H-8)+'" text-anchor="middle" font-size="10.5" fill="#77736D">'+(a.subject==='os'?'OS':'St')+(i+1)+'</text>'}).join('')+'</svg>':'';
  return '<div class="page-h"><div><h1>Progress & Statistics</h1><p>Everything here is calculated from what you have actually completed on this device.</p></div></div>'+
   '<div class="hgrid g3"><div class="hcard prow">'+ringHTML(overallPct(),'#252525','Overall progress')+'<div><h3 style="margin:0">Overall</h3><p class="muted" style="margin:4px 0 0">'+REG.filter(r=>isDone(r.key)).length+' of '+REG.length+' lectures and chapters completed</p></div></div>'+
   Object.keys(SUBJ).map(k=>'<div class="hcard prow">'+ringHTML(pct(k),k==='os'?'#7d56b3':'#b9533a',SUBJ[k].name+' progress')+'<div><h3 style="margin:0">'+SUBJ[k].name+'</h3><p class="muted" style="margin:4px 0 0">'+doneCount(k)+' of '+subjLec(k).length+' completed</p></div></div>').join('')+'</div>'+
   '<div class="sec-h"><h2>Lecture status</h2></div><div class="hcard tbl-wrap"><table class="tbl"><thead><tr><th>Lecture or chapter</th><th>Subject</th><th>Status</th><th>Notes</th><th></th></tr></thead><tbody>'+REG.map(r=>'<tr><td>'+esc(r.title)+'</td><td>'+SUBJ[r.subject].short+'</td><td><span class="htag '+(isDone(r.key)?'ok':'')+'">'+(isDone(r.key)?'Completed':S.recent.some(x=>x.key===r.key)?'Opened':'Not started')+'</span></td><td>'+((S.notes[r.key]||'').trim()?'Yes':'—')+'</td><td><a href="'+r.route+'">Open</a></td></tr>').join('')+'</tbody></table></div>'+
   '<div class="sec-h"><h2>Quiz results</h2></div>'+
   (q.length?'<div class="hgrid g2"><div class="hcard"><h3>Last '+q.length+' quizzes</h3>'+chart+'<div class="legend"><span><i style="background:#A67BD4"></i>OS</span><span><i style="background:#E58F76"></i>Statistics</span></div></div><div class="hcard"><h3>Averages</h3><div class="prow" style="margin-bottom:12px"><b style="font-size:30px">'+quizAvg()+'%</b><span class="muted">overall · '+S.quiz.length+' attempts</span></div><p class="muted">OS: '+(quizAvg('os')==null?'no attempts':quizAvg('os')+'%')+' · Statistics: '+(quizAvg('stats')==null?'no attempts':quizAvg('stats')+'%')+'</p></div></div>':empty('No quiz results yet','Finish a quiz (all questions answered) and the score is recorded.','<a class="hbtn sm" href="#/quizzes">Go to quizzes</a>'))+
   '<div class="sec-h"><h2>Study tasks</h2></div><div class="hgrid g3"><div class="hmini"><span>Total</span><b>'+S.tasks.length+'</b></div><div class="hmini"><span>Completed</span><b>'+tdone+'</b></div><div class="hmini"><span>Remaining</span><b>'+pending().length+'</b></div></div>';
}
function pageSettings(){
  return '<div class="page-h"><div><h1>Settings</h1><p>Your data stays in this browser. Export a backup before clearing browser data or switching device.</p></div></div>'+
   '<div class="hgrid g2"><div class="hcard"><h3>Profile and planner</h3><div style="display:flex;flex-direction:column;gap:14px"><label class="field">Display name<input data-a="pname" value="'+esc(S.prefs.name)+'" maxlength="30"></label><label class="field">Week starts on<select data-a="pweek">'+[[6,'Saturday'],[0,'Sunday'],[1,'Monday']].map(w=>'<option value="'+w[0]+'" '+(S.prefs.weekStart===w[0]?'selected':'')+'>'+w[1]+'</option>').join('')+'</select></label><label style="display:flex;gap:10px;align-items:center"><input type="checkbox" data-a="pcol" '+(S.prefs.collapsed?'checked':'')+'> Keep the sidebar collapsed on desktop</label></div></div>'+
   '<div class="hcard"><h3>Backup</h3><p class="muted" style="margin-top:0">Progress, notes, tasks and quiz results as one JSON file.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="hbtn" data-a="export">'+ic('down')+' Export data</button><label class="hbtn soft" style="cursor:pointer">Import data<input type="file" accept="application/json" data-a="import" class="sr"></label></div><div class="muted" id="setmsg" style="margin-top:10px;min-height:20px" aria-live="polite"></div></div></div>'+
   '<div class="hcard danger" style="margin-top:16px"><h3>Reset</h3><p class="muted" style="margin-top:0">Clears completion marks, notes, tasks, quiz results and recent items on this device.</p><div id="rstbox"><button class="hbtn soft" data-a="reset1">Reset all progress…</button></div></div>';
}
function subjectHeader(k){
  const sj=SUBJ[k],rec=S.recent.map(r=>byKey(r.key)).find(r=>r&&r.subject===k);
  const intro=k==='os'?'Operating system concepts explained step by step in Egyptian Arabic with English terms: introduction and system types, system structures, processes and threads, and CPU scheduling with a live simulator.':'Joint distributions and sampling distributions with live labs, worked examples, quizzes and a problem-solving toolkit.';
  const qs=k==='os'?'<a class="hbtn soft" href="#/mindmaps/l1">'+ic('map')+' Mind maps</a><a class="hbtn soft" href="#/os/tool/cheat">'+ic('book')+' Revision</a><a class="hbtn soft" href="#/os/tool/mcq">'+ic('quiz')+' Quizzes</a>':'<a class="hbtn soft" href="#/stats/chapter/6/s11">'+ic('calc')+' Formulas & cheat sheet</a><a class="hbtn soft" href="#/mindmaps/c6">'+ic('map')+' Mind maps</a><a class="hbtn soft" href="#/stats/chapter/6/s9">'+ic('quiz')+' Practice</a>';
  return '<div class="subhead '+sj.cls+'"><div><span class="htag" style="background:rgba(255,255,255,.55)">'+sj.short+'</span><h1 style="margin-top:8px">'+sj.name+'</h1><p>'+intro+'</p></div><div class="qs">'+qs+'</div></div>'+
   '<div class="minis"><div class="hmini"><span>'+(k==='os'?'Total lectures':'Total chapters')+'</span><b>'+subjLec(k).length+'</b></div><div class="hmini"><span>Completed</span><b>'+doneCount(k)+'</b></div><div class="hmini"><span>Progress</span><b>'+pct(k)+'%</b><div class="hbar '+sj.cls+'" style="margin-top:6px"><i style="width:'+pct(k)+'%"></i></div></div><div class="hmini"><span>Recently studied</span><b style="font-size:16px;line-height:1.3;margin-top:6px">'+(rec?'<a href="'+rec.route+'" style="text-decoration:none">'+esc(rec.short)+'</a>':'—')+'</b></div></div>';
}
function pageSubject(k){
  const tools=k==='os'?[['os','book','Cheatsheet','Comparison tables','#/os/tool/cheat'],['os','cards','Flashcards','Flip to check yourself','#/os/tool/cards'],['os','quiz','MCQ','Multiple choice with explanations','#/os/tool/mcq'],['os','check','True / False','Quick checks','#/os/tool/tf'],['os','clock','Final Test','Timed, 20 questions','#/os/tool/test'],['os','clock','Exams','Mock exams + written practice','#/os/tool/exams'],['bl','map','Mind maps','Lectures 1 to 4','#/mindmaps/l1']]:
   [['sx','calc','Cheat sheet and traps','Which distribution? Common mistakes','#/stats/chapter/6/s11'],['sx','bolt','Practice generator','Unlimited questions','#/stats/chapter/6/s9'],['sx','quiz','MCQ quizzes','Chapters 5 and 6','#/stats/chapter/6/s8'],['sx','book','Exercises with answers','From your sheet','#/stats/chapter/6/s10'],['bl','map','Mind maps','Chapters 5 and 6','#/mindmaps/c6']];
  return subjectHeader(k)+'<div class="sec-h"><h2>'+(k==='os'?'Lecture library':'Chapter library')+'</h2></div><div class="toolrow"><input class="txt" id="libq" data-a="libq" type="search" placeholder="Search by topic or title…" aria-label="Search"><div class="hchips"><button class="hchip on" data-a="libf" data-v="all">All</button><button class="hchip" data-a="libf" data-v="todo">Not completed</button><button class="hchip" data-a="libf" data-v="done">Completed</button></div></div><div class="hgrid g2" id="libg"></div>'+
   '<div class="sec-h"><h2>Study tools</h2></div><div class="toolbtns">'+tools.map(t=>'<a class="tl" href="'+t[4]+'"><span class="ic '+t[0]+'">'+ic(t[1])+'</span><span>'+t[2]+'<small>'+t[3]+'</small></span></a>').join('')+'</div>';
}
function lecBar(r){
  const list=subjLec(r.subject),i=list.indexOf(r),prev=list[i-1],next=list[i+1],done=isDone(r.key);
  return '<div class="lecbar"><span class="ttl">'+esc(r.title)+'</span>'+
   '<a class="hbtn sm soft'+(prev?'':' ')+'" '+(prev?'href="'+prev.route+'"':'aria-disabled="true" style="opacity:.4;pointer-events:none"')+'>← Previous</a>'+
   '<button class="hbtn sm '+(done?'soft':'lav')+'" data-a="done" data-key="'+r.key+'">'+(done?ic('check').replace('class="i"','class="i" style="width:16px;height:16px"')+' Completed':'Mark as completed')+'</button>'+
   '<a class="hbtn sm soft" href="#/mindmaps/'+r.map+'">Mind map</a><a class="hbtn sm soft" href="'+r.practice+'">Practice</a>'+
   '<a class="hbtn sm soft" '+(next?'href="'+next.route+'"':'aria-disabled="true" style="opacity:.4;pointer-events:none"')+'>Next →</a></div>';
}
function lecFoot(r){
  const list=subjLec(r.subject),i=list.indexOf(r),prev=list[i-1],next=list[i+1],done=isDone(r.key);
  return '<div class="hcard notebox"><h3>My notes</h3><textarea class="txt" data-a="note" data-key="'+r.key+'" placeholder="Write your own notes for this '+(r.subject==='os'?'lecture':'chapter')+'…" aria-label="Notes">'+esc(S.notes[r.key]||'')+'</textarea><div class="saved" data-saved="'+r.key+'"></div></div>'+
   '<div class="bottombar"><span>'+(prev?'<a class="hbtn soft" href="'+prev.route+'">← '+esc(prev.short)+'</a>':'')+'</span><button class="hbtn '+(done?'soft':'lav')+'" data-a="done" data-key="'+r.key+'">'+(done?'Completed ✓ (click to undo)':'Mark as completed')+'</button><span>'+(next?'<a class="hbtn" href="'+next.route+'">'+esc(next.short)+' →</a>':'')+'</span></div>';
}
function toolBar(active){
  const T=[['cheat','Cheatsheet'],['cards','Flashcards'],['mcq','MCQ'],['tf','True / False'],['test','Final Test'],['exams','Exams']];
  return '<div class="toolrow"><a class="hbtn sm soft" href="#/os">← Operating Systems</a><div class="hchips">'+T.map(t=>'<a class="hchip '+(t[0]===active?'on':'')+'" href="#/os/tool/'+t[0]+'" style="text-decoration:none">'+t[1]+'</a>').join('')+'</div></div>';
}

/* ---------------- router ---------------- */
let cur={};
function crumbs(list){$('#crumbs').innerHTML=list.map((c,i)=>(i?'<span class="sep">/</span>':'')+(c[1]&&i<list.length-1?'<a href="'+c[1]+'">'+esc(c[0])+'</a>':'<b>'+esc(c[0])+'</b>')).join('')}
function setNav(k){$$('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===k))}
function hubPage(html,nav,cr,title){showView('hub');V.hub.innerHTML=html;setNav(nav);crumbs(cr);document.title=title+' · Study Hub'}
function route(opt){
  const raw=(location.hash||'#/dashboard').replace(/^#\/?/,''),qi=raw.indexOf('?'),path=qi<0?raw:raw.slice(0,qi),query=qi<0?'':decodeURIComponent(raw.slice(qi+1).replace(/^q=/,''));
  const p=path.split('/').filter(Boolean).map(decodeURIComponent),y=window.scrollY;
  cur={p,query};const H=[['Home','#/dashboard']];
  const a=p[0]||'dashboard';
  if(a==='dashboard')hubPage(pageDashboard(),'dashboard',[['Dashboard']],'Dashboard');
  else if(a==='learning'){hubPage(pageLearning(),'learning',H.concat([['My Learning']]),'My Learning');libF='all';libQ='';fillLib()}
  else if(a==='planner')hubPage(pagePlanner(),'planner',H.concat([['Study Planner']]),'Study Planner');
  else if(a==='notes')hubPage(pageNotes(),'notes',H.concat([['Notes & Resources']]),'Notes & Resources');
  else if(a==='quizzes')hubPage(pageQuizzes(),'quizzes',H.concat([['Quizzes & Exams']]),'Quizzes & Exams');
  else if(a==='progress')hubPage(pageProgress(),'progress',H.concat([['Progress & Statistics']]),'Progress & Statistics');
  else if(a==='settings')hubPage(pageSettings(),'settings',H.concat([['Settings']]),'Settings');
  else if(a==='mindmaps'){
    showView('mm');setNav('mindmaps');crumbs(H.concat([['Mind Maps']]));document.title='Mind Maps · Study Hub';
    if(!MMApp.state.mounted)MMApp.mount($('#mm-host'));
    if(p[1])MMApp.select(p[1]);
    if(query)MMApp.find(query);
  }
  else if(a==='os'||a==='stats'){
    const k=a;
    if(!p[1]){hubPage(pageSubject(k),k,H.concat([[SUBJ[k].name]]),SUBJ[k].name);libF='all';libQ='';fillLib(k)}
    else if(k==='os'&&p[1]==='lecture'){
      const r=byKey('os-'+p[2]);if(!r){location.hash='#/os';return}
      showView('os');setNav('os');touch(r.key);
      crumbs(H.concat([[SUBJ.os.name,'#/os'],[r.title]]));document.title=r.short+' · Study Hub';
      $('#os-head').innerHTML=lecBar(r);OS.show('l'+r.n);$('#os-foot').innerHTML=lecFoot(r);
      if(/^t\d+$/.test(p[3]||'')){const el=document.getElementById('L'+r.n+p[3]);if(el)setTimeout(()=>el.scrollIntoView({block:'start'}),30)}
      else if(!(opt&&opt.keep))window.scrollTo(0,0);
      return finishKeep(opt,y);
    }
    else if(k==='os'&&p[1]==='tool'){
      const t=p[2]||'cheat';showView('os');setNav('os');
      crumbs(H.concat([[SUBJ.os.name,'#/os'],[{cheat:'Cheatsheet',cards:'Flashcards',mcq:'MCQ',tf:'True / False',test:'Final Test',exams:'Exams'}[t]||'Tools']]));document.title='Operating Systems · Study Hub';
      $('#os-head').innerHTML=toolBar(t);$('#os-foot').innerHTML='';OS.show(t);
      if(p[3]&&(t==='mcq'||t==='tf')){const b=$('#pg-'+t+' .chips button[data-l="'+p[3]+'"]');if(b)b.click()}
      if(!(opt&&opt.keep))window.scrollTo(0,0);return finishKeep(opt,y);
    }
    else if(k==='stats'&&p[1]==='chapter'){
      const n=+p[2],r=byKey('stats-'+n);if(!r){location.hash='#/stats';return}
      showView('sx');setNav('stats');touch(r.key);
      crumbs(H.concat([[SUBJ.stats.name,'#/stats'],[r.title]]));document.title=r.short+' · Study Hub';
      $('#ch5').hidden=n!==5;$('#ch6').hidden=n!==6;
      $('#sx-head').innerHTML=lecBar(r);$('#sx-foot').innerHTML=lecFoot(r);
      requestAnimationFrame(()=>{STATS.redraw();if(p[3]){const el=document.getElementById(p[3]);if(el)el.scrollIntoView({block:'start'})}});
      if(!p[3]&&!(opt&&opt.keep))window.scrollTo(0,0);
      return finishKeep(opt,y);
    }
    else{location.hash='#/'+k;return}
  }
  else{location.hash='#/dashboard';return}
  if(opt&&opt.keep)window.scrollTo(0,y);else window.scrollTo(0,0);
  closeDrawer();updateNavPct();updateBell();
}
function finishKeep(opt,y){if(opt&&opt.keep)window.scrollTo(0,y);closeDrawer();updateNavPct();updateBell()}
const refresh=()=>route({keep:true});
function closeDrawer(){$('#app').classList.remove('open')}

/* ---------------- top bar: bell, recent, search ---------------- */
function updateBell(){
  const n=overdue().length+tasksOn(todayS()).filter(t=>!t.done).length;
  const b=$('#bellN');b.hidden=!n;b.textContent=n;
}
function togglePop(id){
  ['popRecent','popBell'].forEach(x=>{const e=$('#'+x);if(x===id){e.hidden=!e.hidden;if(!e.hidden)fillPop(x)}else e.hidden=true});
}
function fillPop(id){
  if(id==='popRecent'){
    const r=S.recent.filter(x=>byKey(x.key));
    $('#popRecent').innerHTML='<h5>Recently studied</h5>'+(r.length?r.map(x=>{const l=byKey(x.key);return '<a href="'+l.route+'"><span class="kind">'+SUBJ[l.subject].short+'</span><span><span class="t">'+esc(l.title)+'</span><span class="s">'+ago(x.ts)+'</span></span></a>'}).join(''):'<div class="empty">Nothing opened yet.</div>');
  }else{
    const od=overdue(),td=tasksOn(todayS()).filter(t=>!t.done);
    $('#popBell').innerHTML='<h5>Reminders</h5>'+((od.length+td.length)?td.concat(od).map(t=>'<a href="#/planner"><span class="kind">'+(t.date<todayS()?'Overdue':'Today')+'</span><span><span class="t">'+esc(t.title)+'</span><span class="s">'+TYPES[t.type]+' · '+t.date+'</span></span></a>').join(''):'<div class="empty">No reminders for today. Nice and clear.</div>');
  }
}
let IDX=null;
function buildIndex(){
  IDX=[];
  REG.forEach(r=>IDX.push({k:'Lecture',t:r.title,s:r.summary,h:(r.title+' '+r.summary+' '+r.concepts.join(' ')).toLowerCase(),r:r.route}));
  [1,2,3,4].forEach(n=>OS.LEC[n].topics.forEach((t,i)=>IDX.push({k:'OS topic',t:t.t,s:'Lecture '+n+' · '+t.ta,h:(t.t+' '+t.ta+' '+t.th.join(' ').replace(/<[^>]+>/g,' ')).toLowerCase(),r:'#/os/lecture/'+n+'/t'+i})));
  [5,6].forEach(n=>$$('section',$('#ch'+n)).forEach(sec=>{const h=sec.querySelector('h2');if(!h)return;const c=h.cloneNode(true),nn=c.querySelector('.n');if(nn)nn.remove();const title=c.textContent.trim();IDX.push({k:'Stats section',t:title,s:'Chapter '+n,h:(title+' '+sec.textContent.replace(/\s+/g,' ').slice(0,2500)).toLowerCase(),r:'#/stats/chapter/'+n+'/'+sec.id})}));
  Object.keys(window.MM_DATA||{}).forEach(id=>{const d=MM_DATA[id],walk=(a,path)=>a.forEach(x=>{IDX.push({k:'Mind map',t:x.t,s:d.title+(path?' › '+path:''),h:(x.t+' '+(x.note||'')+' '+(x.d||'')).toLowerCase(),r:'#/mindmaps/'+id+'?q='+encodeURIComponent(x.t)});if(x.kids)walk(x.kids,path?path:x.t)});walk(d.branches,'')});
  OS.MCQ.forEach(m=>IDX.push({k:'Question',t:m.q,s:'OS MCQ · Lecture '+m.l,h:m.q.toLowerCase(),r:'#/os/tool/mcq/'+m.l}));
  OS.TFQ.forEach(m=>IDX.push({k:'Question',t:m.q,s:'OS true/false · Lecture '+m.l,h:m.q.toLowerCase(),r:'#/os/tool/tf/'+m.l}));
  [['MQ',6,'s8'],['MQ5',5,'a8']].forEach(a=>(STATS[a[0]]||[]).forEach(q=>IDX.push({k:'Question',t:String(q[0]).replace(/<[^>]+>/g,''),s:'Statistics quiz · Chapter '+a[1],h:String(q[0]).toLowerCase(),r:'#/stats/chapter/'+a[1]+'/'+a[2]})));
}
let sel=-1;
function doSearch(q){
  const box=$('#popSearch');q=q.trim().toLowerCase();
  if(!q){box.hidden=true;return}
  if(!IDX)buildIndex();
  const tok=q.split(/\s+/).filter(Boolean);
  const res=[];
  IDX.forEach(x=>{if(!tok.every(w=>x.h.includes(w)))return;const tl=x.t.toLowerCase();res.push({x,sc:(tl.includes(q)?0:1)+(tl.startsWith(q)?-1:0)+({Lecture:0,'OS topic':1,'Stats section':1,'Mind map':2,Question:3}[x.k]||2)*.1})});
  Object.keys(S.notes).forEach(k=>{const n=S.notes[k]||'';if(n&&tok.every(w=>n.toLowerCase().includes(w))){const r=byKey(k);if(r)res.push({x:{k:'Note',t:'Your notes: '+r.short,s:n.slice(0,90),r:r.route},sc:.5})}});
  res.sort((a,b)=>a.sc-b.sc);
  const top=res.slice(0,14);sel=-1;
  box.innerHTML=top.length?top.map(o=>'<a href="'+o.x.r+'"><span class="kind">'+o.x.k+'</span><span><span class="t">'+esc(o.x.t.length>90?o.x.t.slice(0,88)+'…':o.x.t)+'</span><span class="s">'+esc(o.x.s)+'</span></span></a>').join('')+(res.length>14?'<div class="empty">'+(res.length-14)+' more. Refine your search.</div>':''):'<div class="empty">No results for “'+esc(q)+'”.</div>';
  box.hidden=false;
}

/* ---------------- events ---------------- */
function download(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
document.addEventListener('click',e=>{
  const pop=e.target.closest('.pop,.gsearch,#btnRecent,#btnBell');
  if(!pop){['popRecent','popBell','popSearch'].forEach(x=>{const el=$('#'+x);if(el)el.hidden=true})}
  if(e.target.closest('#popSearch a')){$('#popSearch').hidden=true;$('#gq').value=''}
  if(e.target.closest('#popRecent a,#popBell a')){['popRecent','popBell'].forEach(x=>$('#'+x).hidden=true)}
  const b=e.target.closest('[data-a]');if(!b||b.tagName==='INPUT'||b.tagName==='TEXTAREA'||b.tagName==='SELECT')return;
  const a=b.dataset.a;
  if(a==='done'){S.done[b.dataset.key]=!S.done[b.dataset.key];if(!S.done[b.dataset.key])delete S.done[b.dataset.key];save();refresh()}
  else if(a==='tnew')taskModal(b.dataset.date);
  else if(a==='tedit')taskModal(null,b.dataset.id);
  else if(a==='tdel'){S.tasks=S.tasks.filter(t=>t.id!==b.dataset.id);save();refresh()}
  else if(a==='wk'){weekOff=b.dataset.v==='0'?0:weekOff+ +b.dataset.v;refresh()}
  else if(a==='libf'){libF=b.dataset.v;$$('[data-a=libf]').forEach(x=>x.classList.toggle('on',x===b));fillLib(cur.p[0]==='os'||cur.p[0]==='stats'?cur.p[0]:null)}
  else if(a==='export'){download('study-hub-backup-'+todayS()+'.json',JSON.stringify(S,null,1))}
  else if(a==='reset1'){$('#rstbox').innerHTML='<p style="margin:0 0 10px"><b>This cannot be undone.</b> Reset everything on this device?</p><button class="hbtn soft" data-a="reset0">Cancel</button> <button class="hbtn" style="background:var(--bad);border-color:var(--bad)" data-a="reset2">Yes, reset everything</button>'}
  else if(a==='reset0'){$('#rstbox').innerHTML='<button class="hbtn soft" data-a="reset1">Reset all progress…</button>'}
  else if(a==='reset2'){const pr=S.prefs;S=defaults();S.prefs=pr;save();refresh();updateNavPct()}
});
document.addEventListener('change',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='ttoggle'){const t=S.tasks.find(x=>x.id===b.dataset.id);if(t){t.done=b.checked;save();refresh()}}
  else if(a==='pweek'){S.prefs.weekStart=+b.value;save()}
  else if(a==='pcol'){setCollapsed(b.checked)}
  else if(a==='import'){const f=b.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const v=JSON.parse(rd.result);if(!v||typeof v!=='object'||!('done' in v))throw 0;S=Object.assign(defaults(),v);S.prefs=Object.assign(defaults().prefs,v.prefs||{});save();setCollapsed(S.prefs.collapsed);refresh();$('#setmsg').textContent='Imported.';updateNavPct();updateProfile()}catch(_){$('#setmsg').textContent='That file is not a Study Hub backup.'}};rd.readAsText(f)}
});
let nT={};
document.addEventListener('input',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='libq'){libQ=b.value;fillLib(cur.p[0]==='os'||cur.p[0]==='stats'?cur.p[0]:null)}
  else if(a==='note'){const k=b.dataset.key;S.notes[k]=b.value;if(!b.value.trim())delete S.notes[k];save();$$('[data-saved="'+k+'"]').forEach(s=>{s.textContent='Saved';clearTimeout(nT[k]);nT[k]=setTimeout(()=>s.textContent='',1400)})}
  else if(a==='pname'){S.prefs.name=b.value.trim()||'Student';save();updateProfile()}
});
$('#gq').addEventListener('input',e=>doSearch(e.target.value));
$('#gq').addEventListener('focus',e=>{if(e.target.value)doSearch(e.target.value)});
$('#gq').addEventListener('keydown',e=>{
  const items=$$('#popSearch a');
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!items.length)return;sel=(sel+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((a,i)=>a.classList.toggle('sel',i===sel));items[sel].scrollIntoView({block:'nearest'})}
  else if(e.key==='Enter'){const t=items[Math.max(sel,0)];if(t){location.hash=t.getAttribute('href');$('#popSearch').hidden=true;e.target.value='';e.target.blur()}}
  else if(e.key==='Escape'){$('#popSearch').hidden=true;e.target.blur()}
});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||'')){e.preventDefault();$('#gq').focus()}});
$('#btnRecent').addEventListener('click',()=>togglePop('popRecent'));
$('#btnBell').addEventListener('click',()=>togglePop('popBell'));
$('#burger').addEventListener('click',()=>$('#app').classList.toggle('open'));
$('#scrim').addEventListener('click',closeDrawer);
document.addEventListener('click',e=>{if(e.target.closest('#collapseBtn'))setCollapsed(!S.prefs.collapsed)});
window.addEventListener('hashchange',()=>route());
function updateProfile(){$('#profName').textContent=S.prefs.name;$('#profAv').textContent=(S.prefs.name||'S').trim().charAt(0).toUpperCase()}

/* ---------------- public API (used by the subject apps and mind maps) ---------------- */
window.Hub={
  go:h=>{location.hash=h},
  recordQuiz:(subject,name,score,total)=>{if(!total)return;S.quiz.push({ts:Date.now(),subject,name,score,total});S.quiz=S.quiz.slice(-200);save()},
  openMap:id=>{location.hash='#/mindmaps/'+id}
};

/* ---------------- boot ---------------- */
buildRegistry();buildSide();updateProfile();
$('#app').classList.toggle('collapsed',!!S.prefs.collapsed);
route();
})();
