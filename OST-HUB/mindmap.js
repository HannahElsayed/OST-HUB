/* ============ BLACKBOARD MIND MAPS (hand-drawn style) ============
   Data lives in <script type="application/json" id="mm-data-l1..l4"> blocks (structured, easy to extend).
   Node: {t,k,note,d,ar,kids}  k = def | cls | ex | exam | warn | n   ·   Branch: {t,topic,kids}
   Layout is deterministic: sizes -> subtree heights -> stacked blocks on two sides of the central topic. */
const MMApp=(function(){
'use strict';
const HF="'Kalam','Segoe Print','Bradley Hand','Chalkboard SE','Comic Sans MS','Cairo',cursive";
const COL={pink:'#E86A9B',purple:'#C77DFF',blue:'#42C6F5',yellow:'#F5E642',green:'#72E6A1',red:'#FF5555',white:'#FFFFFF'};
const KIND={def:{c:'#FFFFFF',l:'Definition'},cls:{c:COL.purple,l:'Classification'},ex:{c:COL.blue,l:'Example'},exam:{c:COL.yellow,l:'Exam-critical'},warn:{c:COL.red,l:'Watch out'},n:{c:'#EDEDED',l:'Note'}};
const NOTEC={ex:COL.blue,exam:COL.yellow,warn:COL.red};
const LECS=()=>Object.keys(window.MM_DATA||{});
const tabName=id=>(window.MM_DATA&&MM_DATA[id]&&MM_DATA[id].tab)||id;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const hash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rng=seed=>{let s=(seed>>>0)||1;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}};
const r1=x=>Math.round(x*10)/10;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const SZ=d=>d===0?{f:38,w:700,max:380,nf:18}:d===1?{f:25,w:700,max:260,nf:15}:d===2?{f:19,w:400,max:250,nf:14.5}:d===3?{f:17.5,w:400,max:240,nf:14}:{f:16.5,w:400,max:230,nf:13.5};

/* ---------- text measurement + wrapping ---------- */
let mctx=null;
const tw=(s,size,wt)=>{mctx=mctx||document.createElement('canvas').getContext('2d');mctx.font=(wt||400)+' '+size+'px '+HF;return mctx.measureText(s).width*1.05};
function wrap(text,maxW,size,wt){
  const words=String(text).split(/\s+/).filter(Boolean),lines=[];let cur='';
  for(const w of words){const t=cur?cur+' '+w:w;if(!cur||tw(t,size,wt)<=maxW)cur=t;else{lines.push(cur);cur=w}}
  if(cur)lines.push(cur);return lines.length?lines:[''];
}

/* ---------- hand-drawn path helpers ---------- */
function roughRect(x,y,w,h,r,seed,j){
  const R=rng(seed),J=j||1.6,o=()=>(R()-.5)*2*J;r=Math.min(r,w/2,h/2);
  const p=(a,b)=>r1(a+o())+' '+r1(b+o());
  return 'M'+p(x+r,y)+' Q'+p(x+w/2,y)+' '+p(x+w-r,y)+' Q'+p(x+w,y)+' '+p(x+w,y+r)+' Q'+p(x+w,y+h/2)+' '+p(x+w,y+h-r)+' Q'+p(x+w,y+h)+' '+p(x+w-r,y+h)+' Q'+p(x+w/2,y+h)+' '+p(x+r,y+h)+' Q'+p(x,y+h)+' '+p(x,y+h-r)+' Q'+p(x,y+h/2)+' '+p(x,y+r)+' Q'+p(x,y)+' '+p(x+r,y)+'Z';
}
function roughCircle(cx,cy,rad,seed){
  const R=rng(seed),N=22,ph=R()*6.28;let d='';
  for(let i=0;i<=N+2;i++){const a=ph+i/N*6.283*1.04,rr=rad*(1+.05*Math.sin(a*3+ph)+(R()-.5)*.05);d+=(i?'L':'M')+r1(cx+Math.cos(a)*rr)+' '+r1(cy+Math.sin(a)*rr*.96)}
  return d;
}
function star(cx,cy,R0,seed){
  const R=rng(seed);let d='';
  for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=(i%2?R0*.45:R0)*(1+(R()-.5)*.12);d+=(i?'L':'M')+r1(cx+Math.cos(a)*rr)+' '+r1(cy+Math.sin(a)*rr)}
  return d+'Z';
}
function wavy(x,y,w,seed){
  const R=rng(seed);let d='M'+r1(x)+' '+r1(y),cx=x,up=true;
  while(cx<x+w-1){const nx=Math.min(cx+9,x+w);d+=' Q'+r1((cx+nx)/2)+' '+r1(y+(up?-3.5:3.5)+(R()-.5))+' '+r1(nx)+' '+r1(y+(R()-.5)*1.2);cx=nx;up=!up}
  return d;
}
function underline(x,y,w,seed){const R=rng(seed);return 'M'+r1(x)+' '+r1(y+(R()-.5)*2)+' Q'+r1(x+w/2)+' '+r1(y+2+R()*2)+' '+r1(x+w)+' '+r1(y-1+(R()-.5)*2)}
function arrowHead(x,y,ang,size,seed){
  const R=rng(seed),a1=ang+Math.PI-.5+(R()-.5)*.15,a2=ang+Math.PI+.5+(R()-.5)*.15;
  return 'M'+r1(x+Math.cos(a1)*size)+' '+r1(y+Math.sin(a1)*size)+' L'+r1(x)+' '+r1(y)+' L'+r1(x+Math.cos(a2)*size)+' '+r1(y+Math.sin(a2)*size);
}

/* ---------- build the tree from JSON ---------- */
function prep(data){
  const root={id:'root',t:data.center,sub:data.sub,depth:0,kids:[],k:'center'};
  const all=[],byId={};
  const mk=(s,depth,parent,id,bi)=>{
    const nd={id,t:s.t,k:s.k||'n',note:s.note||'',d:s.d||'',ar:s.ar||'',topic:s.topic||(parent&&parent.topic)||'',sec:s.sec||(parent&&parent.sec)||'',depth,parent,kids:[],collapsed:false,bi,hidden:false};
    byId[id]=nd;all.push(nd);
    (s.kids||[]).forEach((c,j)=>nd.kids.push(mk(c,depth+1,nd,id+'.'+j,bi)));
    return nd;
  };
  data.branches.forEach((b,i)=>{
    const br=mk(b,1,root,'b'+i,i);br.k='n';br.col=i%2?COL.purple:COL.pink;br.num=i+1;root.kids.push(br);
  });
  all.forEach(n=>{n.imp=n.depth===1||n.k==='def'||n.k==='cls'||n.k==='exam'||n.k==='warn'});
  return{root,all,byId};
}

/* ---------- sizes ---------- */
function sizeNode(nd){
  const s=SZ(nd.depth);
  if(nd.depth===0){
    nd.lines=wrap(nd.t,s.max,s.f,s.w);nd.lh=s.f*1.2;
    const tws=nd.lines.map(l=>tw(l,s.f,s.w));nd.tw=Math.max(...tws);
    nd.w=Math.max(230,nd.tw+80);nd.h=nd.lines.length*nd.lh+34+34;nd.g=0;return;
  }
  const g=nd.depth===1?46:(nd.k==='exam'||nd.k==='warn'||nd.k==='ex')?20:0,padX=nd.depth===1?12:10,padY=nd.depth===1?8:6;
  nd.g=g;nd.padX=padX;nd.padY=padY;
  nd.lines=wrap(nd.t,s.max-g,s.f,s.w);nd.lh=s.f*1.25;
  nd.tw=Math.max(...nd.lines.map(l=>tw(l,s.f,s.w)));
  nd.nlines=nd.note?wrap(nd.note,Math.min(300,Math.max(nd.tw+10,170)),s.nf,400):[];nd.nlh=s.nf*1.25;
  nd.ntw=nd.nlines.length?Math.max(...nd.nlines.map(l=>tw(l,s.nf,400))):0;
  nd.w=g+Math.max(nd.tw,nd.ntw)+2*padX;
  nd.h=nd.lines.length*nd.lh+(nd.nlines.length?3+nd.nlines.length*nd.nlh:0)+2*padY;
}

/* ---------- deterministic layout ---------- */
function sizeAll(model){sizeNode(model.root);model.all.forEach(sizeNode)}
function layout(model){
  const {root}=model,GAPY=10;
  const vis=model.vis=[];
  const walk=nd=>{vis.push(nd);nd.vk.forEach(walk)};
  root.vk=root.kids;root.kids.forEach(walk);
  const sh=nd=>{
    if(!nd.vk.length){nd.sh=nd.h+GAPY;nd.ks=0;return nd.sh}
    let s=0;nd.vk.forEach(k=>s+=sh(k));nd.ks=s;nd.sh=Math.max(nd.h+GAPY,s);return nd.sh;
  };
  root.kids.forEach(b=>{sh(b);b.blk=b.sh+34});
  // choose the split (clockwise reading order) that balances both sides
  const n=root.kids.length,tot=root.kids.reduce((a,b)=>a+b.blk,0);
  let best=1,bd=Infinity,acc=0;
  for(let k=1;k<n;k++){acc+=root.kids[k-1].blk;const dd=Math.abs(acc-(tot-acc));if(dd<bd){bd=dd;best=k}}
  const right=root.kids.slice(0,best),left=root.kids.slice(best).reverse();
  const R0=root.w/2+150;
  const pos=(nd,dir,dist,cy)=>{
    nd.dir=dir;nd.dist=dist;nd.cy=cy;nd.x=dir>0?dist:-dist-nd.w;nd.y=cy-nd.h/2;
    if(nd.vk.length){
      const gap=nd.depth===1?68:56;let y=cy-nd.ks/2;
      nd.vk.forEach(k=>{pos(k,dir,dist+nd.w+gap,y+k.sh/2);y+=k.sh});
    }
  };
  const side=(list,dir)=>{
    const H=list.reduce((a,b)=>a+b.blk,0);let y=-H/2;
    list.forEach((b,i)=>{
      const yc=y+b.blk/2;y+=b.blk;
      const rel=Math.abs(yc)/Math.max(H/2,1),jit=(hash(b.id)%31)-15;
      pos(b,dir,R0+Math.pow(rel,2)*170+jit+(i%2?26:0),yc);
    });
    return H;
  };
  side(right,1);side(left,-1);
  root.x=-root.w/2;root.y=-root.h/2;root.cy=0;
  // bounding box (all nodes, expanded)
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  [root,...vis].forEach(nd=>{x0=Math.min(x0,nd.x);y0=Math.min(y0,nd.y);x1=Math.max(x1,nd.x+nd.w+24);y1=Math.max(y1,nd.y+nd.h)});
  model.bbox={x0:x0-30,y0:y0-90,x1:x1+30,y1:y1+70};
}

/* ---------- SVG generation ---------- */
const E=s=>esc(s);
function nodeSVG(nd,data){
  const s=SZ(nd.depth),seed=hash(nd.id),rot=((hash(nd.id+'r')%21)-10)/10*(nd.depth===1?.8:1.1);
  const cx=nd.x+nd.w/2,cy=nd.cy;
  let o='<g class="mmn k-'+nd.k+' d'+nd.depth+(nd.imp?' imp':'')+(nd.collapsed?' col':'')+'" data-id="'+nd.id+'" tabindex="0" role="button" aria-label="'+E(nd.t)+'" transform="rotate('+rot+' '+r1(cx)+' '+r1(cy)+')">';
  o+='<rect class="hit0" x="'+r1(nd.x)+'" y="'+r1(nd.y)+'" width="'+r1(nd.w)+'" height="'+r1(nd.h)+'" fill="rgba(0,0,0,0.001)" rx="10"/>';
  o+='<path class="hlbox" d="'+roughRect(nd.x-4,nd.y-3,nd.w+8,nd.h+6,12,seed+1,1.8)+'" fill="rgba(245,230,66,.25)" stroke="'+COL.yellow+'" stroke-width="2.6"/>';
  o+='<path class="selbox" d="'+roughRect(nd.x-5,nd.y-4,nd.w+10,nd.h+8,14,seed+2,2)+'" fill="none" stroke="'+COL.pink+'" stroke-width="3.4"/>';
  o+='<path class="impbox" d="'+roughRect(nd.x-4,nd.y-3,nd.w+8,nd.h+6,12,seed+3,1.6)+'" fill="none" stroke="'+(KIND[nd.k]?KIND[nd.k].c:'#fff')+'" stroke-width="2" stroke-dasharray="1 5" stroke-linecap="round"/>';
  const tx=nd.x+nd.padX+nd.g,ty=nd.y+nd.padY+s.f*.92,txtBottom=nd.y+nd.padY+nd.lines.length*nd.lh;
  if(nd.depth===1){
    o+='<path d="'+roughRect(nd.x+40,nd.y+4,nd.w-44,nd.h-8,9,seed+4,2.2)+'" fill="'+nd.col+'" fill-opacity=".62"/>';
    o+='<path d="'+roughCircle(nd.x+22,cy,15,seed+5)+'" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>';
    o+='<text x="'+r1(nd.x+22)+'" y="'+r1(cy+7)+'" text-anchor="middle" font-size="19" font-weight="700" fill="#fff" class="t">'+nd.num+'</text>';
  }else if(nd.k==='def'){
    o+='<path d="'+underline(tx,txtBottom-1,nd.tw,seed+6)+'" fill="none" stroke="'+COL.pink+'" stroke-width="2.8" stroke-linecap="round"/>';
  }else if(nd.k==='cls'){
    o+='<path d="'+roughRect(tx-6,nd.y+nd.padY-3,nd.tw+12,nd.lines.length*nd.lh+6,10,seed+6,1.4)+'" fill="rgba(199,125,255,.10)" stroke="'+COL.purple+'" stroke-width="2.1"/>';
  }else if(nd.k==='exam'){
    o+='<path d="'+wavy(tx,txtBottom,nd.tw,seed+6)+'" fill="none" stroke="'+COL.yellow+'" stroke-width="2.3" stroke-linecap="round"/>';
    o+='<path d="'+star(nd.x+nd.padX+8,nd.y+nd.padY+s.f*.62,8,seed+7)+'" fill="'+COL.yellow+'" stroke="'+COL.yellow+'" stroke-width="1" stroke-linejoin="round"/>';
  }else if(nd.k==='warn'){
    const ix=nd.x+nd.padX+8,iy=nd.y+nd.padY+s.f*.62;
    o+='<path d="M'+r1(ix)+' '+r1(iy-8)+' L'+r1(ix+9)+' '+r1(iy+7)+' L'+r1(ix-9)+' '+r1(iy+7)+'Z" fill="none" stroke="'+COL.red+'" stroke-width="2.2" stroke-linejoin="round"/><path d="M'+r1(ix)+' '+r1(iy-3)+' L'+r1(ix)+' '+r1(iy+2)+'" stroke="'+COL.red+'" stroke-width="2.2" stroke-linecap="round"/><circle cx="'+r1(ix)+'" cy="'+r1(iy+5)+'" r="1" fill="'+COL.red+'"/>';
  }else if(nd.k==='ex'){
    const ix=nd.x+nd.padX+3,iy=nd.y+nd.padY+s.f*.78;
    o+='<path d="M'+r1(ix)+' '+r1(iy)+' l10 -10 l3.2 3.2 l-10 10 l-4.4 1.2 z" fill="'+COL.blue+'" stroke="'+COL.blue+'" stroke-width="1" stroke-linejoin="round"/>';
  }
  const fill=nd.depth===1?'#fff':KIND[nd.k].c;
  o+='<text class="t" x="'+r1(tx)+'" y="'+r1(ty)+'" font-size="'+s.f+'" font-weight="'+s.w+'" fill="'+fill+'">'+nd.lines.map((l,i)=>'<tspan x="'+r1(tx)+'" dy="'+(i?r1(nd.lh):0)+'">'+E(l)+'</tspan>').join('')+'</text>';
  if(nd.nlines.length){
    const ny=txtBottom+3+s.nf*.9;
    o+='<text class="mmt" x="'+r1(tx)+'" y="'+r1(ny)+'" font-size="'+s.nf+'" fill="'+(NOTEC[nd.k]||COL.green)+'">'+nd.nlines.map((l,i)=>'<tspan x="'+r1(tx)+'" dy="'+(i?r1(nd.nlh):0)+'">'+E(l)+'</tspan>').join('')+'</text>';
  }
  if(nd.kids.length){
    const tx0=nd.dir>0?nd.x+nd.w+13:nd.x-13;
    o+='<g class="tog" data-tog="'+nd.id+'"><circle cx="'+r1(tx0)+'" cy="'+r1(cy)+'" r="10" fill="#080808" stroke="#fff" stroke-width="2"/><text class="tm" x="'+r1(tx0)+'" y="'+r1(cy+5.5)+'" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">−</text>'+
       '<circle class="tp" cx="'+r1(tx0)+'" cy="'+r1(cy)+'" r="13" fill="#080808" stroke="'+COL.yellow+'" stroke-width="2.2"/><text class="tp" x="'+r1(tx0)+'" y="'+r1(cy+4.5)+'" text-anchor="middle" font-size="12.5" font-weight="700" fill="'+COL.yellow+'">+'+countDesc(nd)+'</text></g>';
  }
  return o+'</g>';
}
function countDesc(nd){let c=0;const w=x=>x.kids.forEach(k=>{c++;w(k)});w(nd);return c}
function centerSVG(root){
  const seed=hash('root');
  let o='<g class="center">';
  o+='<path d="'+roughRect(root.x-8,root.y-8,root.w+16,root.h+16,40,seed+9,3)+'" fill="none" stroke="#fff" stroke-width="2.4" opacity=".55"/>';
  o+='<path d="'+roughRect(root.x,root.y,root.w,root.h,34,seed,2.4)+'" fill="'+COL.pink+'" stroke="#fff" stroke-width="3.2"/>';
  const lh=root.lh,y0=root.y+34+SZ(0).f*.9-(root.sub?7:0);
  o+='<text x="0" y="'+r1(y0)+'" text-anchor="middle" font-size="38" font-weight="700" fill="#fff" style="paint-order:stroke;stroke:#5a1a38;stroke-width:5px;stroke-linejoin:round">'+root.lines.map((l,i)=>'<tspan x="0" dy="'+(i?r1(lh):0)+'">'+E(l)+'</tspan>').join('')+'</text>';
  if(root.sub)o+='<text x="0" y="'+r1(root.y+root.h-14)+'" text-anchor="middle" font-size="18" fill="#fff" opacity=".92">'+E(root.sub)+'</text>';
  return o+'</g>';
}
function edgeSVG(a,b,dir,big,seed){
  const R=rng(seed),dx=b.x-a.x,len=Math.hypot(dx,b.y-a.y);
  let c1,c2;
  if(big){const ux=(a.ux||dir),uy=(a.uy||0);c1={x:a.x+ux*len*.38,y:a.y+uy*len*.38};c2={x:b.x-dir*Math.abs(dx)*.4,y:b.y+(R()-.5)*8}}
  else{c1={x:a.x+dx*.5+(R()-.5)*8,y:a.y+(R()-.5)*6};c2={x:b.x-dx*.45+(R()-.5)*8,y:b.y+(R()-.5)*6}}
  const ang=Math.atan2(b.y-c2.y,b.x-c2.x),hs=big?17:11,w=big?3.4:1.9;
  const d='M'+r1(a.x)+' '+r1(a.y)+' C'+r1(c1.x)+' '+r1(c1.y)+' '+r1(c2.x)+' '+r1(c2.y)+' '+r1(b.x)+' '+r1(b.y);
  let o='<path d="'+d+'" fill="none" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round" opacity="'+(big?.95:.82)+'"/>';
  if(big)o+='<path d="M'+r1(a.x+2)+' '+r1(a.y+2)+' C'+r1(c1.x+3)+' '+r1(c1.y+3)+' '+r1(c2.x+2)+' '+r1(c2.y-2)+' '+r1(b.x)+' '+r1(b.y)+'" fill="none" stroke="#fff" stroke-width="1.2" opacity=".3"/>';
  o+='<path d="'+arrowHead(b.x,b.y,ang,hs,seed)+'" fill="none" stroke="#fff" stroke-width="'+(big?3.2:2)+'" stroke-linecap="round" stroke-linejoin="round" opacity="'+(big?.95:.85)+'"/>';
  return o;
}
function buildSVG(M){
  const {root}=M.model,all=M.model.vis,data=M.data;
  let ed='',nd='';
  const rx=root.w/2+6,ry=root.h/2+6;
  root.kids.forEach(b=>{
    const tx=b.dir>0?b.x-4:b.x+b.w+4,ty=b.cy,dx=tx,dy=ty,sc=1/Math.sqrt((dx/rx)*(dx/rx)+(dy/ry)*(dy/ry)),a={x:dx*sc,y:dy*sc};
    const L=Math.hypot(dx,dy)||1;a.ux=dx/L;a.uy=dy/L;
    ed+='<g class="ed" data-to="'+b.id+'">'+edgeSVG(a,{x:tx,y:ty},b.dir,true,hash(b.id))+'</g>';
  });
  all.forEach(n=>{
    if(n.depth>1){
      const p=n.parent,a={x:p.dir>0?p.x+p.w+25:p.x-25,y:p.cy},b={x:n.dir>0?n.x-4:n.x+n.w+4,y:n.cy};
      ed+='<g class="ed" data-to="'+n.id+'">'+edgeSVG(a,b,n.dir,false,hash(n.id)+7)+'</g>';
    }
    nd+=nodeSVG(n);
  });
  const bb=M.model.bbox;
  const title='<g class="ttl"><path d="'+roughRect(bb.x0+14,bb.y0+14,Math.min(tw(data.title,30,700)+36,bb.x1-bb.x0-40),50,10,hash('ttl'),2.4)+'" fill="'+COL.pink+'" fill-opacity=".55"/><text x="'+r1(bb.x0+32)+'" y="'+r1(bb.y0+49)+'" font-size="30" font-weight="700" fill="#fff" style="paint-order:stroke;stroke:#080808;stroke-width:4px">'+E(data.title)+'</text></g>';
  const sx=bb.x1-30,sy=bb.y1-18;
  const sign='<g class="sig"><text x="'+r1(sx)+'" y="'+r1(sy)+'" text-anchor="end" font-size="34" font-weight="700" fill="'+COL.pink+'" transform="rotate(-3 '+r1(sx)+' '+r1(sy)+')">HANNAH</text><path d="'+underline(sx-148,sy+9,148,hash('sig'))+'" stroke="'+COL.yellow+'" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M'+r1(sx+14)+' '+r1(sy-12)+' c-9 -13 -22 4 -9 13 c4 3 9 7 9 7 c0 0 5 -4 9 -7 c13 -9 0 -26 -9 -13z" fill="'+COL.pink+'" transform="translate(0 -2)"/></g>';
  return '<g class="world"><g class="edges">'+ed+'</g><g class="nodes">'+centerSVG(root)+nd+'</g>'+title+sign+'</g>';
}

/* ---------- the app ---------- */
const S={el:null,cv:null,maps:{},cur:null,mounted:false,ro:null};
const q=(sel,r)=>(r||S.el).querySelector(sel);

function readData(id){const d=window.MM_DATA&&window.MM_DATA[id];if(!d)console.error('mind-map data missing',id);return d||null}
function fontsReady(){
  const tasks=[];
  try{tasks.push(document.fonts.load('700 24px Kalam'),document.fonts.load('400 18px Kalam'),document.fonts.load('400 16px Cairo'))}catch(e){}
  return Promise.race([Promise.all(tasks).catch(()=>{}),new Promise(r=>setTimeout(r,1800))]);
}
function mount(el){
  if(S.mounted)return;S.mounted=true;S.el=el;
  el.innerHTML='<div class="bb" id="bb"><div class="bb-bar"><div class="bb-tabs">'+LECS().map(id=>'<button data-lec="'+id+'">'+esc(tabName(id))+'</button>').join('')+'</div>'+
  '<div class="bb-row"><label class="bb-search"><span aria-hidden="true">🔎</span><input type="search" placeholder="Search terms…" aria-label="Search the mind map"><em class="bb-cnt"></em></label>'+
  '<button class="bb-btn" data-act="fit" title="Fit the map to the screen">⤢ Fit</button><button class="bb-btn" data-act="reset" title="Restore the default view">↺ Reset</button>'+
  '<button class="bb-btn" data-act="zin" aria-label="Zoom in">＋</button><button class="bb-btn" data-act="zout" aria-label="Zoom out">－</button>'+
  '<button class="bb-btn" data-act="mode" aria-pressed="false" title="Toggle overview / detailed notes">🔭 Overview</button><button class="bb-btn" data-act="rev" aria-pressed="false" title="Highlight definitions, classifications and exam facts">⭐ Revision</button>'+
  '<label class="bb-chk"><input type="checkbox" data-opt="notes" checked> Annotations</label><label class="bb-chk"><input type="checkbox" data-opt="ex" checked> Examples</label>'+
  '<button class="bb-btn" data-act="png" title="Save this map as an image">🖼 Save PNG</button><button class="bb-btn" data-act="fs" title="Fullscreen">⛶ Fullscreen</button></div>'+
  '<div class="bb-legend"><span><i style="background:#fff"></i>definition</span><span><i style="background:'+COL.purple+'"></i>classification</span><span><i style="background:'+COL.blue+'"></i>example</span><span><i style="background:'+COL.yellow+'"></i>exam-critical</span><span><i style="background:'+COL.green+'"></i>annotation</span><span><i style="background:'+COL.red+'"></i>watch out</span></div></div>'+
  '<div class="bb-canvas"><div class="bb-maps"></div><aside class="bb-panel" aria-live="polite"></aside><div class="bb-hint">drag = pan · wheel / pinch = zoom · click a note for details · ⊖ ⊕ = collapse / expand</div></div></div>';
  S.bb=q('.bb');S.cv=q('.bb-canvas');S.panel=q('.bb-panel');S.maps=S.maps||{};
  const bar=q('.bb-bar');
  bar.addEventListener('click',e=>{
    const t=e.target.closest('[data-lec]');if(t){select(t.dataset.lec);return}
    const a=e.target.closest('[data-act]');if(a)act(a.dataset.act);
  });
  bar.addEventListener('change',e=>{const o=e.target.dataset&&e.target.dataset.opt;if(!o||!S.cur)return;const M=S.cur;if(o==='notes')M.opts.notes=e.target.checked;if(o==='ex')M.opts.ex=e.target.checked;applyOpts(M)});
  const inp=q('.bb-search input');
  inp.addEventListener('input',()=>search(inp.value));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&S.cur){e.preventDefault();stepHit(S.cur,e.shiftKey?-1:1)}if(e.key==='Escape'){inp.value='';search('')}});
  S.panel.addEventListener('click',onPanelClick);
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)S.bb.classList.remove('pfs');setTimeout(()=>{if(S.cur){S.cur.auto=true;fit(S.cur,false)}},120)});
  if(window.ResizeObserver){S.ro=new ResizeObserver(()=>{const M=S.cur;if(M&&M.auto&&S.cv.clientWidth>0)fit(M,false)});S.ro.observe(S.cv)}
  select((S.start&&window.MM_DATA&&MM_DATA[S.start])?S.start:LECS()[0]);
}
function ensure(id){
  if(S.maps[id])return S.maps[id];
  const data=readData(id);if(!data)return null;
  const M={id,data,view:{x:0,y:0,k:1},auto:true,sel:null,hits:[],hitIdx:-1,rev:false,mode:'overview',opts:{notes:true,ex:true},ready:false};
  M.model=prep(data);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','bb-svg');svg.setAttribute('role','application');svg.setAttribute('aria-label',data.title+' mind map');
  q('.bb-maps').appendChild(svg);M.svg=svg;S.maps[id]=M;
  fontsReady().then(()=>{
    sizeAll(M.model);M.model.root.kids.forEach(b=>{if(b.kids.length)b.collapsed=true});
    M.ready=true;applyVis(M);bindCanvas(M);
    if(S.cur===M){M.auto=true;fit(M,false)}
  });
  return M;
}
function select(id){
  const M=ensure(id);if(!M)return;
  S.cur=M;
  S.el.querySelectorAll('.bb-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.lec===id));
  Object.values(S.maps).forEach(m=>m.svg.classList.toggle('on',m===M));
  closePanel();syncBar(M);
  const inp=q('.bb-search input');if(inp)inp.value=M.query||'';q('.bb-cnt').textContent=M.cntText||'';
  if(M.ready)fit(M,false);
}
function syncBar(M){
  const mb=q('[data-act=mode]');mb.textContent=M.mode==='detail'?'🔭 Overview':'📝 Detailed notes';mb.setAttribute('aria-pressed',M.mode==='overview');
  const rb=q('[data-act=rev]');rb.setAttribute('aria-pressed',M.rev);
  q('[data-opt=notes]').checked=M.opts.notes;q('[data-opt=ex]').checked=M.opts.ex;
}

/* ---------- visibility / classes ---------- */
function computeVis(M){
  const rec=(nd,hid)=>{
    nd.hidden=hid;
    const ch=hid||nd.collapsed;
    nd.vk=[];
    nd.kids.forEach(k=>{const kh=ch||(!M.opts.ex&&k.k==='ex');rec(k,kh);if(!kh)nd.vk.push(k)});
  };
  M.model.root.kids.forEach(b=>rec(b,false));
}
function applyVis(M){
  if(!M.ready)return;
  computeVis(M);layout(M.model);
  M.svg.innerHTML=buildSVG(M);M.world=M.svg.querySelector('.world');
  M.el={};M.svg.querySelectorAll('.mmn').forEach(g=>M.el[g.dataset.id]=g);
  M.ed={};M.svg.querySelectorAll('.ed').forEach(g=>M.ed[g.dataset.to]=g);
  M.world.classList.toggle('no-notes',!M.opts.notes);M.world.classList.toggle('rev',M.rev);
  if(M.sel&&!M.el[M.sel])M.sel=null;
  markSel(M);paintSearch(M);apply(M);
}
function paintSearch(M){
  if(!M.hits||!M.hits.length){M.world.classList.remove('has-q');return}
  M.world.classList.add('has-q');
  M.hits.forEach(n=>{const g=M.el[n.id];if(!g)return;g.classList.add('hit');let p=n.parent;while(p&&p.id!=='root'){const pg=M.el[p.id];if(pg)pg.classList.add('hp');const e=M.ed[p.id];if(e)e.classList.add('hp');p=p.parent}const e=M.ed[n.id];if(e)e.classList.add('hp')});
}
function applyOpts(M){
  if(!M.ready)return;
  applyVis(M);
}
function related(M,nd){
  const set=new Set([nd.id]);let p=nd.parent;
  while(p&&p.id!=='root'){set.add(p.id);p=p.parent}
  const w=x=>x.kids.forEach(k=>{set.add(k.id);w(k)});w(nd);return set;
}
function markSel(M){
  const sel=M.sel;
  M.world.classList.toggle('has-sel',!!sel);
  const rel=sel?related(M,M.model.byId[sel]):null;
  M.model.vis.forEach(n=>{const g=M.el[n.id];g.classList.toggle('sel',n.id===sel);g.classList.toggle('rel',!!rel&&rel.has(n.id));const e=M.ed[n.id];if(e)e.classList.toggle('rel',!!rel&&rel.has(n.id))});
}
function choose(M,id,opts){
  const nd=M.model.byId[id];if(!nd)return;
  M.auto=false;M.sel=id;markSel(M);openPanel(M,nd);
  if(!opts||opts.focus!==false)focusNode(M,nd,true);
}
function clearSel(M){if(!M.sel&&!S.panel.classList.contains('open'))return;M.sel=null;if(M.ready)markSel(M);closePanel()}
function toggle(M,id){
  const nd=M.model.byId[id];if(!nd||!nd.kids.length)return;
  const k=M.view.k,ox=(nd.x+nd.w/2)*k+M.view.x,oy=nd.cy*k+M.view.y;nd.collapsed=!nd.collapsed;M.auto=false;applyVis(M);M.view.x=ox-(nd.x+nd.w/2)*k;M.view.y=oy-nd.cy*k;apply(M);
  if(M.sel===id)openPanel(M,nd);
}

/* ---------- view (pan / zoom / fit) ---------- */
function apply(M){
  M.world.setAttribute('transform','translate('+r1(M.view.x)+' '+r1(M.view.y)+') scale('+M.view.k.toFixed(4)+')');
  if(S.cur===M){let s=48*M.view.k;while(s<18)s*=2;while(s>110)s/=2;S.cv.style.backgroundSize=s+'px '+s+'px';S.cv.style.backgroundPosition=r1(M.view.x)+'px '+r1(M.view.y)+'px'}
}
function zoomAt(M,px,py,f){
  const k=clamp(M.view.k*f,.08,3.2),wx=(px-M.view.x)/M.view.k,wy=(py-M.view.y)/M.view.k;
  M.view.k=k;M.view.x=px-wx*k;M.view.y=py-wy*k;apply(M);
}
function visBBox(M){
  const root=M.model.root;let x0=root.x,y0=root.y,x1=root.x+root.w,y1=root.y+root.h;
  const bb=M.model.bbox;return{x0:bb.x0,y0:bb.y0,x1:bb.x1,y1:bb.y1};
}
function fitTarget(M){
  const W=S.cv.clientWidth,H=S.cv.clientHeight;if(!W||!H)return null;
  const b=visBBox(M);
  const bw=b.x1-b.x0,bh=b.y1-b.y0,pad=16,k=clamp(Math.min((W-2*pad)/bw,(H-2*pad)/bh),.08,1.25);
  if(W<700&&k<.36)return{k:.36,x:W/2,y:H/2}; // phones: stay readable, pan to explore
  return{k,x:(W-bw*k)/2-b.x0*k,y:(H-bh*k)/2-b.y0*k};
}
function fit(M,anim){
  if(!M.ready)return;const t=fitTarget(M);if(!t)return;
  anim?animateView(M,t,520):(M.view.x=t.x,M.view.y=t.y,M.view.k=t.k,apply(M));
}
function animateView(M,t,ms){
  cancelAnimationFrame(M.raf);
  const s={x:M.view.x,y:M.view.y,k:M.view.k},t0=performance.now(),ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
  const step=now=>{const p=Math.min(1,(now-t0)/ms),e=ease(p);
    M.view.x=s.x+(t.x-s.x)*e;M.view.y=s.y+(t.y-s.y)*e;M.view.k=s.k+(t.k-s.k)*e;apply(M);
    if(p<1)M.raf=requestAnimationFrame(step)};
  M.raf=requestAnimationFrame(step);
}
function focusNode(M,nd,keepZoom){
  const W=S.cv.clientWidth,H=S.cv.clientHeight,panelOpen=S.panel.classList.contains('open')&&W>700;
  const effW=panelOpen?W-Math.min(430,W*.92):W,effH=(S.panel.classList.contains('open')&&W<=700)?H*.44:H;
  const br=nd.depth>1?branchOf(nd):nd;
  let k=M.view.k;
  if(!keepZoom||k<.75)k=Math.max(.9,Math.min(1.15,effW/((br.dir>0?1:1)*Math.max(420,(nd.w+300)))));
  else k=Math.min(k,1.6);
  const cx=nd.x+nd.w/2,cy=nd.cy;
  animateView(M,{k,x:effW/2-cx*k,y:effH/2-cy*k},480);
}
function branchOf(nd){while(nd.parent&&nd.parent.id!=='root')nd=nd.parent;return nd}

function bindCanvas(M){
  const svg=M.svg,pts=new Map();let g=null;
  svg.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    try{svg.setPointerCapture(e.pointerId)}catch(_){}
    cancelAnimationFrame(M.raf);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pts.size===1)g={sx:e.clientX,sy:e.clientY,vx:M.view.x,vy:M.view.y,moved:false,tgt:e.target};
    else if(pts.size===2){const a=[...pts.values()];g=g||{};g.moved=true;g.pinch={d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)||1,k:M.view.k,mx:(a[0].x+a[1].x)/2,my:(a[0].y+a[1].y)/2,vx:M.view.x,vy:M.view.y}}
  });
  svg.addEventListener('pointermove',e=>{
    if(!pts.has(e.pointerId)||!g)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pts.size>=2&&g.pinch){
      const a=[...pts.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)||1,mx=(a[0].x+a[1].x)/2,my=(a[0].y+a[1].y)/2,rc=svg.getBoundingClientRect();
      const k=clamp(g.pinch.k*d/g.pinch.d,.08,3.2),wx=(g.pinch.mx-rc.left-g.pinch.vx)/g.pinch.k,wy=(g.pinch.my-rc.top-g.pinch.vy)/g.pinch.k;
      M.auto=false;M.view.k=k;M.view.x=mx-rc.left-wx*k;M.view.y=my-rc.top-wy*k;apply(M);
    }else if(pts.size===1){
      const dx=e.clientX-g.sx,dy=e.clientY-g.sy;
      if(!g.moved&&Math.hypot(dx,dy)>5){g.moved=true;S.cv.classList.add('grab')}
      if(g.moved){M.auto=false;M.view.x=g.vx+dx;M.view.y=g.vy+dy;apply(M)}
    }
  });
  const up=e=>{
    if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);
    if(pts.size===0&&g){S.cv.classList.remove('grab');const wasTap=!g.moved&&e.type==='pointerup',tgt=g.tgt;g=null;if(wasTap)tap(M,tgt)}
    else if(pts.size===1&&g){const p=[...pts.values()][0];g={sx:p.x,sy:p.y,vx:M.view.x,vy:M.view.y,moved:true,tgt:null}}
  };
  svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);
  svg.addEventListener('wheel',e=>{
    e.preventDefault();M.auto=false;cancelAnimationFrame(M.raf);
    const rc=svg.getBoundingClientRect(),dy=e.deltaMode===1?e.deltaY*16:e.deltaMode===2?e.deltaY*100:e.deltaY;
    zoomAt(M,e.clientX-rc.left,e.clientY-rc.top,Math.exp(-dy*(e.ctrlKey?.012:.0016)));
  },{passive:false});
  svg.addEventListener('keydown',e=>{
    const n=e.target.closest&&e.target.closest('.mmn');if(!n)return;
    if(e.key==='Enter'){e.preventDefault();choose(M,n.dataset.id)}
    else if(e.key===' '){e.preventDefault();toggle(M,n.dataset.id)}
  });
}
function tap(M,tgt){
  const el=tgt&&tgt.closest?tgt:null;if(!el){clearSel(M);return}
  const tg=el.closest('.tog');if(tg){toggle(M,tg.dataset.tog);return}
  const nd=el.closest('.mmn');if(nd){choose(M,nd.dataset.id);return}
  clearSel(M);
}

/* ---------- search ---------- */
function search(qs){
  const M=S.cur;if(!M||!M.ready)return;
  qs=(qs||'').trim().toLowerCase();M.query=qs;
  M.hits=[];M.hitIdx=-1;
  if(!qs){applyVis(M);M.cntText='';q('.bb-cnt').textContent='';return}
  const hits=M.model.all.filter(n=>(n.t+' '+n.note+' '+n.d).toLowerCase().includes(qs));
  hits.forEach(n=>{let p=n.parent;while(p&&p.id!=='root'){p.collapsed=false;p=p.parent}});
  if(!M.opts.ex&&hits.some(n=>n.k==='ex')){M.opts.ex=true;q('[data-opt=ex]').checked=true}
  M.hits=hits;applyVis(M);
  M.hits=hits;M.cntText=hits.length?hits.length+' match'+(hits.length>1?'es':'')+' · Enter = next':'no matches';
  q('.bb-cnt').textContent=M.cntText;
  if(hits.length)stepHit(M,1);
}
function stepHit(M,dir){
  if(!M.hits.length)return;M.hitIdx=(M.hitIdx+dir+M.hits.length)%M.hits.length;M.auto=false;
  focusNode(M,M.hits[M.hitIdx],true);q('.bb-cnt').textContent=(M.hitIdx+1)+'/'+M.hits.length+' · Enter = next';
}

/* ---------- toolbar actions ---------- */
function act(a){
  const M=S.cur;if(!M||!M.ready)return;
  if(a==='fit'){M.auto=true;fit(M,true)}
  else if(a==='zin'||a==='zout'){M.auto=false;zoomAt(M,S.cv.clientWidth/2,S.cv.clientHeight/2,a==='zin'?1.3:1/1.3)}
  else if(a==='mode'){
    M.mode=M.mode==='detail'?'overview':'detail';
    M.model.all.forEach(n=>n.collapsed=M.mode==='overview'&&n.depth===1&&n.kids.length>0);
    const had=M.sel;applyVis(M);syncBar(M);M.auto=true;fit(M,true);if(had&&!M.sel)closePanel();
  }
  else if(a==='rev'){M.rev=!M.rev;applyOpts(M);syncBar(M)}
  else if(a==='reset'){
    M.model.all.forEach(n=>n.collapsed=n.depth===1&&n.kids.length>0);M.mode='overview';M.rev=false;M.opts={notes:true,ex:true};
    const inp=q('.bb-search input');inp.value='';search('');M.sel=null;closePanel();applyOpts(M);syncBar(M);M.auto=true;fit(M,true);
  }
  else if(a==='png'){exportPNG(M)}
  else if(a==='fs'){
    const el=S.bb;
    if(document.fullscreenElement||el.classList.contains('pfs')){if(document.exitFullscreen&&document.fullscreenElement)document.exitFullscreen();el.classList.remove('pfs');setTimeout(()=>{M.auto=true;fit(M,false)},120)}
    else if(el.requestFullscreen){el.requestFullscreen().catch(()=>{el.classList.add('pfs');setTimeout(()=>{M.auto=true;fit(M,false)},120)})}
    else{el.classList.add('pfs');setTimeout(()=>{M.auto=true;fit(M,false)},120)}
  }
}

/* ---------- export ---------- */
function exportPNG(M){
  const bb=M.model.bbox,W=Math.ceil(bb.x1-bb.x0),H=Math.ceil(bb.y1-bb.y0),sc=Math.min(2,4096/Math.max(W,H));
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),cl=M.world.cloneNode(true);
  cl.setAttribute('transform','translate('+(-bb.x0)+' '+(-bb.y0)+')');cl.setAttribute('class','world');
  svg.setAttribute('xmlns',ns);svg.setAttribute('width',Math.round(W*sc));svg.setAttribute('height',Math.round(H*sc));svg.setAttribute('viewBox','0 0 '+W+' '+H);
  svg.innerHTML='<style>text{font-family:'+HF.replace(/"/g,"'")+'}text.t{paint-order:stroke;stroke:#080808;stroke-width:4px;stroke-linejoin:round}text.mmt{paint-order:stroke;stroke:#080808;stroke-width:3px;stroke-linejoin:round;font-style:italic}.hlbox,.selbox,.impbox{display:none}.mmn:not(.col) .tp{display:none}.mmn.col .tm{display:none}.tog{cursor:pointer}</style><rect width="100%" height="100%" fill="#080808"/>';
  svg.appendChild(cl);
  const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'})),img=new Image();
  img.onload=()=>{const c=document.createElement('canvas');c.width=Math.round(W*sc);c.height=Math.round(H*sc);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
    c.toBlob(bl=>{if(!bl)return;const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='mind-map-'+M.id+'.png';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)})};
  img.onerror=()=>URL.revokeObjectURL(url);img.src=url;
}
function find(qs){
  const inp=S.el&&S.el.querySelector('.bb-search input');if(!inp)return;inp.value=qs;let tries=0;
  const run=()=>{if(S.cur&&S.cur.ready&&S.cur.hasOwnProperty('model')){search(qs)}else if(tries++<40)setTimeout(run,150)};run();
}

/* ---------- detail panel ---------- */
function topicOf(nd){
  if(!nd.topic)return null;const [n,i]=nd.topic.split('-').map(Number);
  const OSd=window.OS;const L=OSd&&OSd.LEC[n];if(!L||!L.topics[i])return null;
  return{n,i,t:L.topics[i],p:OSd.AR_PLUS[n+'-'+i]};
}
function openPanel(M,nd){
  const br=branchOf(nd),K=KIND[nd.k]||KIND.n,tp=topicOf(nd),sec=nd.sec||'';
  const path=[M.data.center];{const ch=[];let p=nd;while(p&&p.id!=='root'){ch.unshift(p.t);p=p.parent}path.push(...ch)}
  let h='<button class="bb-x" data-pa="close" aria-label="Close">✕</button>';
  h+='<div><span class="bb-ph" style="--m:'+br.col+'">'+E(nd.t)+'</span></div>';
  h+='<div class="bb-kind" style="color:'+(nd.depth===1?COL.pink:K.c)+'">'+(nd.depth===1?'Main branch '+nd.num:K.l)+'</div>';
  h+='<div class="bb-path">'+path.slice(0,-1).map(E).join(' › ')+'</div>';
  if(nd.note)h+='<p class="bb-note" style="color:'+(NOTEC[nd.k]||COL.green)+'">✎ '+E(nd.note)+'</p>';
  if(nd.d)h+='<div class="bb-sec"><span class="bb-pen en">In English</span><p>'+nd.d+'</p></div>';
  if(nd.ar)h+='<div class="bb-sec"><span class="bb-pen ar">بالمصري</span><p class="arp">'+nd.ar+'</p></div>';
  if(nd.kids.length){
    h+='<div class="bb-sec"><span class="bb-pen an">'+nd.kids.length+' sub-notes</span></div><div class="bb-chips">'+nd.kids.map(k=>'<button data-pa="jump" data-id="'+k.id+'">'+E(k.t.length>46?k.t.slice(0,44)+'…':k.t)+'</button>').join('')+'</div>';
  }
  if(tp&&nd.depth===1){
    const t=tp.t,p=tp.p;
    if(t.an)h+='<div class="bb-sec"><span class="bb-pen an">💡 Analogy</span><p class="arp">'+t.an+'</p></div>';
    if(p&&p.ar)h+='<div class="bb-sec"><span class="bb-pen ar">الشرح بالتفصيل</span><ul class="ar-l">'+p.ar.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>';
    if(p&&p.mem)h+='<div class="bb-sec"><span class="bb-pen mem">🧠 إزاي تفتكرها</span><p class="arp">'+p.mem+'</p></div>';
    if(p&&p.mis)h+='<div class="bb-sec"><span class="bb-pen warn">⚠️ غلطات الطلبة</span><p class="arp">'+p.mis+'</p></div>';
    if(t.tip)h+='<div class="bb-sec"><span class="bb-pen tip">🎯 Exam tip</span><p class="arp">'+t.tip+'</p></div>';
  }
  h+='<div class="bb-acts">';
  if(nd.kids.length)h+='<button data-pa="toggle" data-id="'+nd.id+'">'+(nd.collapsed?'⊕ Expand branch':'⊖ Collapse branch')+'</button>';
  if(tp)h+='<button class="alt" data-pa="lecture" data-n="'+tp.n+'" data-i="'+tp.i+'">📖 Open full explanation</button>';
  else if(sec)h+='<button class="alt" data-pa="goto" data-sec="'+sec+'">📖 Go to this section</button>';
  h+='</div>';
  S.panel.innerHTML=h;S.panel.scrollTop=0;S.panel.classList.add('open');
}
function closePanel(){S.panel.classList.remove('open')}
function onPanelClick(e){
  const b=e.target.closest('[data-pa]');if(!b||!S.cur)return;const M=S.cur,a=b.dataset.pa;
  if(a==='close'){M.sel=null;markSel(M);closePanel()}
  else if(a==='jump'){const nd=M.model.byId[b.dataset.id];if(nd){let p=nd.parent;while(p&&p.id!=='root'){p.collapsed=false;p=p.parent}applyVis(M);choose(M,nd.id)}}
  else if(a==='toggle'){toggle(M,b.dataset.id)}
  else if(a==='lecture'){
    const n=+b.dataset.n,i=+b.dataset.i;if(S.bb.classList.contains('pfs')||document.fullscreenElement)act('fs');
    Hub.go('#/os/lecture/'+n+'/t'+i);
  }
  else if(a==='goto'){
    const id=b.dataset.sec;if(S.bb.classList.contains('pfs')||document.fullscreenElement)act('fs');
    Hub.go('#/stats/chapter/'+(id[0]==='a'?5:6)+'/'+id);
  }
}
return{mount,select,find,get state(){return S}};
})();
