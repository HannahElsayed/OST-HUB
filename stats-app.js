/* Statistical Methods labs, calculators and quizzes (chapters 5 and 6). Exposed as window.STATS. */
(function(){
function erfc(x){const z=Math.abs(x),t=1/(1+0.5*z);const r=t*Math.exp(-z*z-1.26551223+t*(1.00002368+t*(0.37409196+t*(0.09678418+t*(-0.18628806+t*(0.27886807+t*(-1.13520398+t*(1.48851587+t*(-0.82215223+t*0.17087277)))))))));return x>=0?r:2-r;}
const Phi=x=>0.5*erfc(-x/Math.SQRT2);
function lgamma(x){const c=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5];let y=x,t=x+5.5;t-=(x+0.5)*Math.log(t);let s=1.000000000190015;for(let j=0;j<6;j++)s+=c[j]/++y;return -t+Math.log(2.5066282746310005*s/x);}
function gammaP(a,x){if(x<=0)return 0;const gln=lgamma(a);if(x<a+1){let ap=a,sum=1/a,del=sum;for(let n=0;n<1000;n++){ap++;del*=x/ap;sum+=del;if(Math.abs(del)<Math.abs(sum)*1e-14)break;}return sum*Math.exp(-x+a*Math.log(x)-gln);}let b=x+1-a,c=1/1e-300,d=1/b,h=d;for(let i=1;i<1000;i++){const an=-i*(i-a);b+=2;d=an*d+b;if(Math.abs(d)<1e-300)d=1e-300;c=b+an/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<1e-14)break;}return 1-Math.exp(-x+a*Math.log(x)-gln)*h;}
function betacf(a,b,x){const qab=a+b,qap=a+1,qam=a-1;let c=1,d=1-qab*x/qap;if(Math.abs(d)<1e-300)d=1e-300;d=1/d;let h=d;for(let m=1;m<=1000;m++){const m2=2*m;let aa=m*(b-m)*x/((qam+m2)*(a+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;h*=d*c;aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<1e-14)break;}return h;}
function betaI(x,a,b){if(x<=0)return 0;if(x>=1)return 1;const bt=Math.exp(lgamma(a+b)-lgamma(a)-lgamma(b)+a*Math.log(x)+b*Math.log(1-x));return x<(a+1)/(a+b+2)?bt*betacf(a,b,x)/a:1-bt*betacf(b,a,1-x)/b;}
const chi2cdf=(x,k)=>x<=0?0:gammaP(k/2,x/2);
const tcdf=(t,v)=>{const i=0.5*betaI(v/(v+t*t),v/2,0.5);return t>0?1-i:i;};
const fcdf=(x,a,b)=>x<=0?0:betaI(a*x/(a*x+b),a/2,b/2);
const normPdf=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
const chi2Pdf=(x,k)=>x<=0?(k===2?0.5:0):Math.exp((k/2-1)*Math.log(x)-x/2-(k/2)*Math.log(2)-lgamma(k/2));
const tPdf=(x,v)=>Math.exp(lgamma((v+1)/2)-lgamma(v/2)-0.5*Math.log(v*Math.PI)-((v+1)/2)*Math.log(1+x*x/v));
const fPdf=(x,a,b)=>x<=0?0:Math.exp(lgamma((a+b)/2)-lgamma(a/2)-lgamma(b/2)+(a/2)*Math.log(a/b)+(a/2-1)*Math.log(x)-((a+b)/2)*Math.log(1+a*x/b));
function bisect(f,p,lo,hi){for(let i=0;i<200;i++){const m=(lo+hi)/2;if(f(m)<p)lo=m;else hi=m;}return (lo+hi)/2;}
const zInv=p=>bisect(Phi,p,-40,40);
const chi2Inv=(p,k)=>{let hi=Math.max(10,k*3);while(chi2cdf(hi,k)<p)hi*=2;return bisect(x=>chi2cdf(x,k),p,0,hi);};
const tInv=(p,v)=>bisect(x=>tcdf(x,v),p,-1e6,1e6);
const fInv=(p,a,b)=>{let hi=10;while(fcdf(hi,a,b)<p)hi*=2;return bisect(x=>fcdf(x,a,b),p,0,hi);};

const $=s=>document.querySelector(s);
const fmt=(x,d=4)=>Number(x).toFixed(d);
const pick=a=>a[Math.floor(Math.random()*a.length)];
function randn(){let u=0;while(u===0)u=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*Math.random());}
const redraws=[];

/* ---------- generic plot ---------- */
function plot(cv,o){
  const css=getComputedStyle(document.documentElement);const C=n=>css.getPropertyValue(n).trim();
  const dpr=window.devicePixelRatio||1,W=cv.clientWidth||600,H=260;
  cv.width=W*dpr;cv.height=H*dpr;
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
  const L=44,R=10,T=14,B=28,pw=W-L-R,ph=H-T-B,xmin=o.xmin,xmax=o.xmax;
  let bars=null,ymax=0;
  if(o.data&&o.data.length){const nb=o.bins||40,bw=(xmax-xmin)/nb,cnt=new Array(nb).fill(0),tot=o.data.length;
    for(const v of o.data){const i=Math.floor((v-xmin)/bw);if(i>=0&&i<nb)cnt[i]++;}
    bars=cnt.map(c=>c/(tot*bw));ymax=Math.max(...bars);}
  const curves=o.curves||[],N=300;
  const pts=curves.map(c=>{const a=[];for(let i=0;i<=N;i++){const x=xmin+(xmax-xmin)*i/N;let y=c.f(x);if(!isFinite(y))y=0;a.push([x,y]);}return a;});
  pts.forEach(a=>a.forEach(p=>{if(p[1]>ymax&&p[1]<ymax*6+1)ymax=Math.max(ymax,p[1]);}));
  if(o.ycap)ymax=Math.min(ymax,o.ycap);
  ymax=(ymax||1)*1.12;
  const X=x=>L+(x-xmin)/(xmax-xmin)*pw,Y=y=>T+ph-Math.min(y,ymax)/ymax*ph;
  g.lineWidth=1;g.strokeStyle=C('--grid');g.fillStyle=C('--mut');g.font='11px system-ui';
  for(let i=0;i<=4;i++){const y=T+ph*i/4;g.beginPath();g.moveTo(L,y);g.lineTo(L+pw,y);g.stroke();}
  g.textAlign='center';for(let i=0;i<=5;i++){const x=xmin+(xmax-xmin)*i/5;g.fillText(String(+x.toPrecision(3)),X(x),H-10);}
  g.textAlign='right';for(let i=0;i<=4;i++){const v=ymax*(4-i)/4;g.fillText(v.toPrecision(2),L-4,T+ph*i/4+4);}
  if(bars){const bw=pw/bars.length;g.fillStyle=C('--acc3');g.globalAlpha=.55;bars.forEach((b,i)=>{g.fillRect(L+i*bw+1,Y(b),bw-1,T+ph-Y(b));});g.globalAlpha=1;}
  curves.forEach((c,k)=>{g.beginPath();g.strokeStyle=C(c.color);g.lineWidth=2.2;g.setLineDash(c.dash||[]);pts[k].forEach((p,i)=>i?g.lineTo(X(p[0]),Y(p[1])):g.moveTo(X(p[0]),Y(p[1])));g.stroke();});
  g.setLineDash([]);
  let lx=L+8;g.textAlign='left';
  curves.forEach(c=>{if(!c.label)return;g.strokeStyle=C(c.color);g.setLineDash(c.dash||[]);g.lineWidth=2.2;g.beginPath();g.moveTo(lx,T+8);g.lineTo(lx+18,T+8);g.stroke();g.setLineDash([]);g.fillStyle=C('--ink');g.fillText(c.label,lx+22,T+12);lx+=34+g.measureText(c.label).width;});
}
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
const sdev=a=>{const m=mean(a);return Math.sqrt(a.reduce((s,v)=>s+(v-m)**2,0)/(a.length-1));};

/* ---------- 2: CLT ---------- */
const pops={
  normal:{mu:50,sd:10,gen:()=>50+10*randn(),range:[0,100]},
  unif:{mu:50,sd:100/Math.sqrt(12),gen:()=>100*Math.random(),range:[0,100]},
  exp:{mu:50,sd:50,gen:()=>-50*Math.log(1-Math.random()),range:[0,250]},
  bimodal:{mu:50,sd:Math.sqrt(925),gen:()=>(Math.random()<.5?20:80)+5*randn(),range:[0,100]}
};
let means=[],popData=[],lastSample=null;
function cltPop(){const p=pops[$('#popSel').value];popData=Array.from({length:20000},p.gen);}
function cltDraw(){
  const p=pops[$('#popSel').value],n=+$('#nSl').value;$('#nVal').textContent=n;
  plot($('#cvPop'),{data:popData,xmin:p.range[0],xmax:p.range[1],bins:50});
  const se=p.sd/Math.sqrt(n);
  plot($('#cvMeans'),{data:means,xmin:p.mu-4*se,xmax:p.mu+4*se,bins:40,curves:[{f:x=>normPdf((x-p.mu)/se)/se,color:'--acc2',label:'N(μ, σ²/n)'}]});
  let t=`Population: μ = ${fmt(p.mu,1)}, σ = ${fmt(p.sd,2)}. Theory for X̄: mean ${fmt(p.mu,1)}, sd σ/√n = ${fmt(se,2)}.<br>`;
  if(lastSample)t+=`Last sample (first 10 values): ${lastSample.slice(0,10).map(v=>fmt(v,1)).join(', ')}${lastSample.length>10?' …':''} → x̄ = <b>${fmt(mean(lastSample),2)}</b><br>`;
  if(means.length>1)t+=`${means.length} sample means so far: average = <b>${fmt(mean(means),2)}</b>, sd = <b>${fmt(sdev(means),2)}</b>`;
  $('#cltOut').innerHTML=t;
}
function takeSamples(k){const p=pops[$('#popSel').value],n=+$('#nSl').value;
  for(let j=0;j<k;j++){const s=[];for(let i=0;i<n;i++)s.push(p.gen());means.push(mean(s));if(j===k-1)lastSample=s;}cltDraw();}
$('#popSel').onchange=()=>{means=[];lastSample=null;cltPop();takeSamples(1000);};
$('#nSl').oninput=()=>{means=[];lastSample=null;$('#nVal').textContent=$('#nSl').value;takeSamples(1000);};
$('#b1').onclick=()=>takeSamples(1);
$('#b1000').onclick=()=>takeSamples(1000);
$('#bReset').onclick=()=>{means=[];lastSample=null;cltDraw();};
redraws.push(cltDraw);

/* ---------- 3: chi ---------- */
function chiDraw(redo=true){
  const v=+$('#chiNu').value;$('#chiNuV').textContent=v;
  if(redo||!chiDraw.d||chiDraw.v!==v){chiDraw.v=v;chiDraw.d=Array.from({length:5000},()=>{let s=0;for(let i=0;i<v;i++){const z=randn();s+=z*z;}return s;});}
  const d=chiDraw.d;
  plot($('#cvChi'),{data:d,xmin:0,xmax:chi2Inv(0.995,v),bins:45,ycap:0.6,curves:[{f:x=>chi2Pdf(x,v),color:'--acc2',label:'χ²('+v+') pdf'}]});
  $('#chiOut').innerHTML=`Simulated mean = <b>${fmt(mean(d),2)}</b> (theory ν = ${v}), simulated variance = <b>${fmt(sdev(d)**2,2)}</b> (theory 2ν = ${2*v}). Upper 5% point χ²<sub>0.05,${v}</sub> = <b>${fmt(chi2Inv(0.95,v),3)}</b>.`;
}
$('#chiNu').oninput=()=>chiDraw(true);$('#chiRe').onclick=()=>chiDraw(true);
redraws.push(()=>chiDraw(false));

/* ---------- 4: t ---------- */
function tDraw(redo=true){
  const v=+$('#tNu').value;$('#tNuV').textContent=v;const n=v+1;
  if(redo||!tDraw.d||tDraw.v!==v){tDraw.v=v;tDraw.d=[];for(let k=0;k<5000;k++){const xs=[];for(let i=0;i<n;i++)xs.push(randn());const m=mean(xs);const S=Math.sqrt(xs.reduce((a,b)=>a+(b-m)**2,0)/(n-1));tDraw.d.push(m/(S/Math.sqrt(n)));}}
  plot($('#cvT'),{data:tDraw.d,xmin:-6,xmax:6,bins:48,curves:[{f:x=>tPdf(x,v),color:'--acc2',label:'t('+v+')'},{f:normPdf,color:'--mut',dash:[5,4],label:'N(0,1)'}]});
  $('#tOut').innerHTML=`t<sub>0.025,${v}</sub> = <b>${fmt(tInv(0.975,v),3)}</b> versus z<sub>0.025</sub> = <b>1.960</b>. The smaller ν is, the further out you must go to cut off the same 2.5%.`;
}
$('#tNu').oninput=()=>tDraw(true);$('#tRe').onclick=()=>tDraw(true);
redraws.push(()=>tDraw(false));

/* ---------- 5: F ---------- */
const chiSample=k=>{let s=0;for(let i=0;i<k;i++){const z=randn();s+=z*z;}return s;};
function fDraw(redo=true){
  const a=+$('#f1').value,b=+$('#f2').value;$('#f1V').textContent=a;$('#f2V').textContent=b;
  if(redo||!fDraw.d||fDraw.a!==a||fDraw.b!==b){fDraw.a=a;fDraw.b=b;fDraw.d=Array.from({length:5000},()=>(chiSample(a)/a)/(chiSample(b)/b));}
  const xmax=Math.min(fInv(0.99,a,b),30);
  plot($('#cvF'),{data:fDraw.d,xmin:0,xmax:xmax,bins:45,ycap:1.2,curves:[{f:x=>fPdf(x,a,b),color:'--acc2',label:`F(${a},${b}) pdf`}]});
  $('#fOut').innerHTML=`Simulated mean = <b>${fmt(mean(fDraw.d),2)}</b>${b>2?` (theory r₂/(r₂−2) = ${fmt(b/(b-2),2)})`:' (theory undefined for r₂ ≤ 2)'}. Upper 5% point F<sub>0.05</sub>(${a},${b}) = <b>${fmt(fInv(0.95,a,b),3)}</b>.`;
}
$('#f1').oninput=$('#f2').oninput=()=>fDraw(true);$('#fRe').onclick=()=>fDraw(true);
redraws.push(()=>fDraw(false));

/* ---------- 7a: Detective ---------- */
const DT={
 start:{q:'What does the quantity you need the distribution of look like?',o:[
  ['A linear combination like aX + bY + c (X, Y normal)','lin'],
  ['A sum of squares Z₁² + … or (X−μ)²/σ²','sq'],
  ['It involves S² (the sample variance)','s2'],
  ['A ratio A / B','ratio'],
  ['A sum of independent χ² variables','addchi'],
  ['It involves the sample mean X̄','xbar']]},
 lin:{ans:'Normal',why:'A linear combination of independent normals is normal.',steps:['Mean = a·μ<sub>X</sub> + b·μ<sub>Y</sub> + c (the constant shifts the mean only).','Variance = a²σ²<sub>X</sub> + b²σ²<sub>Y</sub> (+ 2ab·cov(X,Y) if not independent). Coefficients get squared; subtracting still ADDS variances.','Write the answer as N(mean, variance) — careful: the second number is the variance, not the sd.']},
 sq:{q:'Are the variables already standard normal N(0,1)?',o:[['Yes, they are N(0,1)','sq_yes'],['No, they are N(μ,σ²) (e.g. N(0,16))','sq_no'],['I used X̄ in place of μ','s2']]},
 sq_yes:{ans:'χ²(k), k = number of squared terms',why:'Sum of k independent squared N(0,1) variables.',steps:['Count the terms: that is the d.f.','Mean = k, variance = 2k.']},
 sq_no:{ans:'χ²(k) after standardizing',why:'Divide each term by its standard deviation first.',steps:['Write ((X−μ)/σ)² for every term so each Z ~ N(0,1).','Count the terms → d.f. For X ~ N(0,16): (X/4)² ~ χ²(1).']},
 s2:{ans:'(n−1)S²/σ² ~ χ²(n−1)',why:'Theorem 6.4 (normal population). One d.f. is lost because X̄ is estimated.',steps:['E[(n−1)S²/σ²] = n−1, Var = 2(n−1).','So E(S²) = σ² and Var(S²) = 2σ⁴/(n−1).']},
 ratio:{q:'What are the top and bottom of the ratio?',o:[
  ['Top is N(0,1), bottom is √(χ²/df)','t1'],
  ['(X̄−μ)/(S/√n)','t2'],
  ['Top and bottom are both χ²/df','f1'],
  ['(sum of k squared N(0,σ²)) / (sum of m squared N(0,σ²))','f2'],
  ['S₁²/S₂² style ratio of two sample variances','f3']]},
 t1:{ans:'t(df)',why:'Theorem 6.5: Z/√(U/r) with Z, U independent.',steps:['df = r, the d.f. of the χ² under the root.','Check that the numerator Z and U are independent.']},
 t2:{ans:'t(n−1)',why:'Theorem 6.6 (normal population, σ unknown).',steps:['d.f. = n−1.','If n ≥ 30 you may use N(0,1) instead.']},
 f1:{ans:'F(top df, bottom df)',why:'Theorem 6.7: (U₁/r₁)/(U₂/r₂).',steps:['Numerator d.f. goes first.','Check independence of U₁ and U₂.']},
 f2:{ans:'F(k, m)',why:'σ² cancels in the ratio, so you do not need to know it. Each sum/σ² is χ²; each is divided by its d.f.',steps:['Top has k terms, bottom has m terms → F(k, m).','Example: (X₁²+X₂²)/(X₃²+X₄²) ~ F(2,2).']},
 f3:{ans:'(S₁²/σ₁²)/(S₂²/σ₂²) ~ F(n₁−1, n₂−1)',why:'Corollary of Theorem 6.7 with independent normal samples.',steps:['d.f. are the sample sizes minus one, numerator first.','If σ₁² = σ₂² the ratio is just S₁²/S₂².']},
 addchi:{ans:'χ²(ν₁ + ν₂ + …)',why:'Additivity of independent chi-squares.',steps:['Add the d.f.','Remember X² with X ~ N(0,1) is χ²(1).']},
 xbar:{q:'Is the population normal?',o:[['Yes','xb_n'],['No / unknown','xb_u']]},
 xb_n:{q:'Is σ known?',o:[['Yes, σ is known','xb_z'],['No, I only have S','xb_t']]},
 xb_z:{ans:'Z = (X̄−μ)/(σ/√n) ~ N(0,1) (exact, any n)',why:'Theorem 6.1.',steps:['σ<sub>X̄</sub> = σ/√n.','Standardize, then use the Z table.']},
 xb_t:{ans:'T = (X̄−μ)/(S/√n) ~ t(n−1)',why:'Theorem 6.6. If n ≥ 30 it is practically N(0,1).',steps:['d.f. = n−1.','Use the t table: area α to the right.']},
 xb_u:{q:'Is n ≥ 30?',o:[['Yes','xb_clt'],['No','xb_no']]},
 xb_clt:{ans:'Z ≈ N(0,1) by the CLT',why:'Theorem 6.2. If σ is unknown use S.',steps:['σ<sub>X̄</sub> = σ/√n (or S/√n).','Treat the answer as approximate.']},
 xb_no:{ans:'Not enough information',why:'Small n and a non-normal population: none of the chapter\'s exact results apply.',steps:['Look for extra information about the population shape.']}
};
let dtPath=[];
function dtShow(k){
  const n=DT[k],box=$('#dtBox');
  let h=`<div class="crumb">${dtPath.map(p=>p[0]).join(' → ')||'Start'}</div>`;
  if(n.q){h+=`<b>${n.q}</b>`;n.o.forEach(([l,nx])=>{h+=`<button class="opt" data-k="${nx}" data-l="${l.replace(/"/g,'&quot;')}">${l}</button>`;});}
  else{h+=`<div class="res">${n.ans}</div><p>${n.why}</p><ol>${n.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;}
  h+=`<div class="ctl"><button class="ghost" id="dtBack">Back</button><button class="ghost" id="dtReset">Start over</button></div>`;
  box.innerHTML=h;
  box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{dtPath.push([b.dataset.l,k]);dtShow(b.dataset.k);});
  $('#dtBack').onclick=()=>{const p=dtPath.pop();dtShow(p?p[1]:'start');};
  $('#dtReset').onclick=()=>{dtPath=[];dtShow('start');};
}
dtShow('start');

/* ---------- 7b: Calc 1 ---------- */
function c1ui(){const two=$('#c1mode').value==='two';$('#c1one').style.display=two?'none':'flex';$('#c1two').style.display=two?'flex':'none';$('#c1bl').style.display=$('#c1ev').value==='between'?'':'none';}
$('#c1mode').onchange=$('#c1ev').onchange=c1ui;
$('#c1go').onclick=()=>{
  const two=$('#c1mode').value==='two',ev=$('#c1ev').value,a=+$('#c1a').value,b=+$('#c1b').value;let m,s,st=[];
  if(two){const m1=+$('#c1mu1').value,s1=+$('#c1sg1').value,n1=+$('#c1n1').value,m2=+$('#c1mu2').value,s2=+$('#c1sg2').value,n2=+$('#c1n2').value;
    m=m1-m2;s=Math.sqrt(s1*s1/n1+s2*s2/n2);
    st.push(`mean of X̄₁ − X̄₂ = μ₁ − μ₂ = ${m1} − ${m2} = ${fmt(m,3)}`,`sd = √(σ₁²/n₁ + σ₂²/n₂) = √(${s1}²/${n1} + ${s2}²/${n2}) = ${fmt(s,4)}`);}
  else{const mu=+$('#c1mu').value,sg=+$('#c1sg').value,n=+$('#c1n').value;m=mu;s=sg/Math.sqrt(n);
    st.push(`mean of X̄ = μ = ${mu}`,`σ<sub>X̄</sub> = σ/√n = ${sg}/√${n} = ${fmt(s,4)}`);}
  if(!(s>0)){$('#c1out').textContent='sd must be positive.';return;}
  const za=(a-m)/s,zb=(b-m)/s;let p;
  if(ev==='between'){p=Phi(zb)-Phi(za);st.push(`z₁ = (${a} − ${fmt(m,3)})/${fmt(s,4)} = ${fmt(za,3)},  z₂ = (${b} − ${fmt(m,3)})/${fmt(s,4)} = ${fmt(zb,3)}`,`P = Φ(${fmt(zb,2)}) − Φ(${fmt(za,2)}) = ${fmt(Phi(zb),4)} − ${fmt(Phi(za),4)}`);}
  else if(ev==='above'){p=1-Phi(za);st.push(`z = (${a} − ${fmt(m,3)})/${fmt(s,4)} = ${fmt(za,3)}`,`P = 1 − Φ(${fmt(za,2)}) = 1 − ${fmt(Phi(za),4)}`);}
  else{p=Phi(za);st.push(`z = (${a} − ${fmt(m,3)})/${fmt(s,4)} = ${fmt(za,3)}`,`P = Φ(${fmt(za,2)})`);}
  $('#c1out').innerHTML=`<ol>${st.map(x=>`<li>${x}</li>`).join('')}</ol><div class="res">P = ${fmt(p,4)}</div>`;
};

/* ---------- 7c: Calc 2 ---------- */
function c2ui(){const d=$('#c2d').value;$('#c2p1l').style.display=d==='z'?'none':'';$('#c2p2l').style.display=d==='f'?'':'none';$('#c2p1l').firstChild.textContent=d==='f'?'r₁ ':'ν ';}
$('#c2d').onchange=c2ui;
$('#c2go').onclick=()=>{
  const d=$('#c2d').value,m=$('#c2m').value,v=+$('#c2v').value,p1=Math.round(+$('#c2p1').value),p2=Math.round(+$('#c2p2').value);
  const cdf=d==='t'?x=>tcdf(x,p1):d==='chi'?x=>chi2cdf(x,p1):d==='f'?x=>fcdf(x,p1,p2):Phi;
  const inv=d==='t'?p=>tInv(p,p1):d==='chi'?p=>chi2Inv(p,p1):d==='f'?p=>fInv(p,p1,p2):zInv;
  const nm=d==='t'?`t(${p1})`:d==='chi'?`χ²(${p1})`:d==='f'?`F(${p1},${p2})`:'N(0,1)';
  if((d!=='z'&&p1<1)||(d==='f'&&p2<1)){$('#c2out').textContent='Degrees of freedom must be ≥ 1.';return;}
  if(m==='crit'){if(!(v>0&&v<1)){$('#c2out').textContent='α must be between 0 and 1.';return;}
    const x=inv(1-v);let extra=d==='t'||d==='z'?`<br>By symmetry the lower point is ${fmt(-x,4)}.`:'';
    $('#c2out').innerHTML=`${nm}: the point with area ${v} to the right is <div class="res">${fmt(x,4)}</div>(so P(X &gt; ${fmt(x,4)}) = ${v}, P(X &lt; ${fmt(x,4)}) = ${fmt(1-v,4)})${extra}`;}
  else{const lo=cdf(v);$('#c2out').innerHTML=`${nm}: P(X &lt; ${v}) = <b>${fmt(lo,4)}</b><div class="res">P(X &gt; ${v}) = ${fmt(1-lo,4)}</div>`;}
};
c2ui();c1ui();

/* ---------- 8: Practice ---------- */
let cur=null,xp=0,streak=0;
try{xp=+localStorage.getItem('ch6xp')||0;}catch(e){}
function xpShow(){$('#xp').textContent=xp;$('#streak').textContent=streak;$('#lvl').textContent=1+Math.floor(xp/50);}
const r1=x=>Math.round(x*10)/10;
function genA(){
  const n=pick([36,49,64,81,100,121,144]),sg=pick([10,20,30,40,50,60]),mu=pick([200,500,800,900,1000,1200]);
  const se=sg/Math.sqrt(n),zs=[-2,-1.5,-1,-0.5,0.5,1,1.5,2],ev=pick(['between','above','below']);
  let a=r1(mu+pick(zs)*se),b=r1(mu+pick(zs)*se);if(a>b)[a,b]=[b,a];if(a===b)b=r1(a+se);
  const za=(a-mu)/se,zb=(b-mu)/se;let ans,q,st=`σ<sub>X̄</sub> = ${sg}/√${n} = ${fmt(se)}<br>`;
  if(ev==='between'){ans=Phi(zb)-Phi(za);q=`P(${a} &lt; X̄ &lt; ${b})`;st+=`z₁ = ${fmt(za,2)}, z₂ = ${fmt(zb,2)} → Φ(${fmt(zb,2)}) − Φ(${fmt(za,2)})`;}
  else if(ev==='above'){ans=1-Phi(za);q=`P(X̄ &gt; ${a})`;st+=`z = ${fmt(za,2)} → 1 − Φ(${fmt(za,2)})`;}
  else{ans=Phi(za);q=`P(X̄ &lt; ${a})`;st+=`z = ${fmt(za,2)} → Φ(${fmt(za,2)})`;}
  return{kind:'num',ans,tol:0.006,html:`A population has μ = ${mu} and σ = ${sg}. A random sample of n = ${n} is drawn. Find ${q}. <i>(4 decimals)</i>`,steps:st};
}
function genB(){
  const n1=pick([36,49,64,100]),n2=pick([25,36,49,81]),s1=pick([20,30,40]),s2=pick([10,20,30]),m1=pick([120,150,200]),m2=pick([80,100,120]);
  const m=m1-m2,se=Math.sqrt(s1*s1/n1+s2*s2/n2);const d=Math.round(m+pick([-2,-1,-0.5,0.5,1,2])*se);const z=(d-m)/se;
  return{kind:'num',ans:1-Phi(z),tol:0.006,html:`Independent samples: n₁ = ${n1} from a population with μ₁ = ${m1}, σ₁ = ${s1}; n₂ = ${n2} from μ₂ = ${m2}, σ₂ = ${s2}. Find P(X̄₁ − X̄₂ ≥ ${d}). <i>(4 decimals)</i>`,
    steps:`mean = ${m1} − ${m2} = ${m}<br>sd = √(${s1}²/${n1} + ${s2}²/${n2}) = ${fmt(se)}<br>z = (${d} − ${m})/${fmt(se)} = ${fmt(z,2)} → 1 − Φ(${fmt(z,2)})`};
}
function genC(){
  const isT=Math.random()<0.5,al=pick([0.1,0.05,0.025,0.01,0.005]),v=Math.floor(5+Math.random()*21);
  const ans=isT?tInv(1-al,v):chi2Inv(1-al,v);
  return{kind:'num',ans,tol:isT?0.012:Math.max(0.06,ans*0.004),html:`Find ${isT?'t':'χ²'}<sub>${al},${v}</sub>, the point with area ${al} to the <b>right</b> for ${isT?'t':'χ²'}(${v}). <i>(use the table or Calculator 2)</i>`,steps:`Table lookup with α = ${al}, ν = ${v}.`};
}
function genD(){
  const a=2+Math.floor(Math.random()*6);let b=2+Math.floor(Math.random()*6);if(b===a)b=a+1;const k=a+1,n=a+3;
  const T=[
   {q:`X₁,…,X<sub>${k}</sub> are i.i.d. N(0,σ²). What is (X₁²+…+X<sub>${k}</sub>²)/σ² ?`,c:`χ²(${k})`,w:[`χ²(${k-1})`,`t(${k})`,`N(0,${k})`],e:`Each Xᵢ/σ ~ N(0,1); ${k} squared terms → χ²(${k}).`},
   {q:`Z ~ N(0,1) and U ~ χ²(${k}) are independent. What is Z/√(U/${k}) ?`,c:`t(${k})`,w:[`t(${k-1})`,`F(1,${k})`,`N(0,1)`],e:`Theorem 6.5: Z/√(U/r) ~ t(r).`},
   {q:`U ~ χ²(${a}) and V ~ χ²(${b}) are independent. What is (U/${a})/(V/${b}) ?`,c:`F(${a},${b})`,w:[`F(${b},${a})`,`χ²(${a+b})`,`t(${a})`],e:`Theorem 6.7. Numerator d.f. comes first.`},
   {q:`A random sample of size n = ${n} comes from N(μ,σ²). What is (n−1)S²/σ² ?`,c:`χ²(${n-1})`,w:[`χ²(${n})`,`t(${n-1})`,`N(0,1)`],e:`Theorem 6.4: one d.f. lost for X̄.`},
   {q:`A random sample of size n = ${n} comes from a normal population, σ unknown, n &lt; 30. What is (X̄−μ)/(S/√n) ?`,c:`t(${n-1})`,w:[`N(0,1)`,`t(${n})`,`χ²(${n-1})`],e:`Theorem 6.6.`},
   {q:`U ~ χ²(${a}) and V ~ χ²(${b}) are independent. What is U+V ?`,c:`χ²(${a+b})`,w:[`χ²(${a+b-1})`,`F(${a},${b})`,`χ²(${a*b})`],e:`Additivity of independent chi-squares.`},
   {q:`X₁,…,X<sub>${a+b}</sub> are i.i.d. N(0,σ²). What is (X₁²+…+X<sub>${a}</sub>²)/(X<sub>${a+1}</sub>²+…+X<sub>${a+b}</sub>²) ?`,c:`F(${a},${b})`,w:[`F(${b},${a})`,`χ²(${a+b})`,`t(${a})`],e:`σ² cancels in the ratio; d.f. = number of terms on top and bottom.`},
   {q:`X ~ N(μ,σ²) with σ known, sample size n. What is (X̄−μ)/(σ/√n) ?`,c:`N(0,1)`,w:[`t(${n-1})`,`t(${n})`,`χ²(1)`],e:`Theorem 6.1: exact for any n.`},
   {q:`T ~ t(${k}). What is T² ?`,c:`F(1,${k})`,w:[`χ²(${k})`,`F(${k},1)`,`t(${k*k})`],e:`T² = Z²/(U/${k}) = (χ²(1)/1)/(χ²(${k})/${k}).`}
  ];
  const t=pick(T);const opts=[t.c,...t.w].sort(()=>Math.random()-.5);
  return{kind:'mc',ans:t.c,opts,html:t.q,steps:t.e};
}
function newQ(){
  const ty=$('#ptype').value,t=ty==='mix'?pick(['A','B','C','D']):ty;cur={A:genA,B:genB,C:genC,D:genD}[t]();cur.done=false;
  $('#pq').innerHTML=`<div style="font-size:17px">${cur.html}</div>`;
  $('#pfb').textContent='';
  if(cur.kind==='num'){$('#pinWrap').style.display='flex';$('#pin').value='';$('#pin').focus();}
  else{$('#pinWrap').style.display='none';$('#pq').innerHTML+=cur.opts.map(o=>`<button class="opt" data-o="${o}">${o}</button>`).join('');
    $('#pq').querySelectorAll('.opt').forEach(b=>b.onclick=()=>judge(b.dataset.o===cur.ans,b.dataset.o));}
}
function judge(ok,given){
  if(cur.done)return;cur.done=true;
  if(ok){xp+=10;streak++;}else{streak=0;}
  try{localStorage.setItem('ch6xp',xp);}catch(e){}
  xpShow();
  const ansTxt=cur.kind==='num'?fmt(cur.ans,4):cur.ans;
  $('#pfb').innerHTML=(ok?`<span class="ok">Correct! +10 XP</span>`:`<span class="bad">Not quite.</span> You answered ${given}.`)+`<br>Answer: <b>${ansTxt}</b><br><div style="margin-top:6px">${cur.steps}</div>`;
}
$('#pnew').onclick=newQ;$('#ptype').onchange=newQ;
$('#pchk').onclick=()=>{if(!cur||cur.kind!=='num')return;const v=parseFloat($('#pin').value);if(isNaN(v)){$('#pfb').textContent='Type a number first.';return;}judge(Math.abs(v-cur.ans)<=cur.tol,v);};
$('#pin').onkeydown=e=>{if(e.key==='Enter')$('#pchk').click();};
xpShow();newQ();


/* ---------- 8: MCQ quiz ---------- */
const MQ=[
 ['A statistic is…',['a fixed unknown number describing the population','a function of the sample that contains no unknown parameter','the whole population','the sample size only'],1,'A statistic is computed from the sample only (X̄ and S² are examples).'],
 ['If X₁,…,Xₙ is a random sample from N(μ, σ²), then X̄ ~',['N(μ, σ²)','N(μ, σ²/n)','N(μ/n, σ²)','N(nμ, nσ²)'],1,'E(X̄) = μ and Var(X̄) = σ²/n.'],
 ['A population has μ = 100 and σ = 20. For samples of size n = 25, the standard deviation of X̄ is',['20','4','16','0.8'],1,'σ/√n = 20/5 = 4.'],
 ['The normal approximation for X̄ (CLT) is good when',['n ≥ 30, whatever the population shape','the population must be normal','n < 10','σ is known'],0,'For n ≥ 30 the CLT works for any population shape.'],
 ['μ = 900, σ = 50, n = 64. P(X̄ > 910) ≈',['0.0548','0.9452','0.4207','0.1587'],0,'sd = 6.25, z = 10/6.25 = 1.6, P(Z > 1.6) = 0.0548.'],
 ['For independent samples, Var(X̄₁ − X̄₂) =',['σ₁²/n₁ − σ₂²/n₂','σ₁²/n₁ + σ₂²/n₂','(σ₁² + σ₂²)/(n₁ + n₂)','σ₁σ₂/√(n₁n₂)'],1,'Variances always add, even for a difference.'],
 ['n = 36 observations, σ = 12. P(|X̄ − μ| < 2) ≈',['0.6826','0.9544','0.3413','0.8413'],0,'sd = 12/6 = 2, so z is between −1 and 1, giving 0.6826.'],
 ['If the sample size n is multiplied by 4, the standard deviation of X̄',['doubles','is halved','is quartered','does not change'],1,'σ/√(4n) = (σ/√n)/2.'],
 ['The mean and variance of χ²(ν) are',['ν and 2ν','2ν and ν','ν and ν','0 and ν'],0,'Mean = ν, variance = 2ν.'],
 ['If Z₁,…,Z₅ are i.i.d. N(0,1), then Z₁² + … + Z₅² ~',['χ²(4)','χ²(5)','t(5)','N(0,5)'],1,'A sum of 5 squared standard normals is χ²(5).'],
 ['U ~ χ²(3) and V ~ χ²(7) are independent. U + V ~',['χ²(10)','χ²(21)','F(3,7)','χ²(4)'],0,'Independent chi-squares add their d.f.'],
 ['A sample of n = 12 comes from a normal population. (n−1)S²/σ² ~',['χ²(12)','χ²(11)','t(11)','N(0,1)'],1,'Theorem 6.4: χ²(n−1) = χ²(11).'],
 ['Why is the d.f. n−1 and not n for (n−1)S²/σ²?',['We lose one d.f. by estimating μ with X̄','Because n is always odd','Because σ is unknown','Because S² is biased'],0,'Using X̄ in place of μ costs one degree of freedom.'],
 ['Z ~ N(0,1) and U ~ χ²(9) are independent. Z/√(U/9) ~',['N(0,1)','t(9)','F(1,9)','χ²(9)'],1,'Theorem 6.5.'],
 ['A normal sample with n = 16 and σ unknown. (X̄ − μ)/(S/√n) ~',['N(0,1)','t(16)','t(15)','χ²(15)'],2,'Theorem 6.6: t(n−1) = t(15).'],
 ['Compared with N(0,1), the t(5) density has',['heavier tails','lighter tails','a different mean','a larger mean'],0,'Same center, more spread, so heavier tails.'],
 ['Which statement about t-table points is correct?',['t₀.₉₇₅ = −t₀.₀₂₅','t₀.₉₇₅ = t₀.₀₂₅','t₀.₉₇₅ = 1 − t₀.₀₂₅','t₀.₉₇₅ = 1/t₀.₀₂₅'],0,'t is symmetric about 0, so lower points are negatives of upper points.'],
 ['n = 24 from a normal population. K such that P(−K < t < K) = 0.90 is',['1.319','1.714','2.069','2.500'],1,'ν = 23 and 0.05 in each tail: t₀.₀₅,₂₃ = 1.714.'],
 ['U ~ χ²(4) and V ~ χ²(9) are independent. (U/4)/(V/9) ~',['F(9,4)','F(4,9)','χ²(13)','t(4)'],1,'Numerator d.f. comes first: F(4,9).'],
 ['X₁,…,X₄ are i.i.d. N(0,σ²). (X₁² + X₂²)/(X₃² + X₄²) ~',['χ²(2)','t(2)','F(2,2)','F(4,4)'],2,'σ² cancels. Each sum/σ² is χ²(2), so the ratio is F(2,2).'],
 ['If T ~ t(ν), then T² ~',['χ²(ν)','F(1,ν)','F(ν,1)','t(ν²)'],1,'T² = (Z²/1)/(U/ν) = F(1,ν).'],
 ['X ~ N(0,16). Then X²/16 ~',['χ²(1)','χ²(16)','N(0,1)','F(1,16)'],0,'(X/4)² is a squared standard normal.'],
 ['X ~ N(2,9) and Y ~ N(1,16) are independent. X − Y ~',['N(1, 7)','N(1, 25)','N(3, 25)','N(1, 5)'],1,'Mean 2 − 1 = 1; variance 9 + 16 = 25.'],
 ['Normal population, n = 10, σ unknown. To find P(X̄ > c) you should use',['the Z table','the t table with 9 d.f.','the χ² table with 9 d.f.','the F table'],1,'Small n and σ unknown: use t with n−1 d.f.']
];
let mqOrder=[],mqI=0,mqScore=0,mqDone=false;
function mqStart(){mqOrder=MQ.map((_,i)=>i).sort(()=>Math.random()-.5);mqI=0;mqScore=0;mqShow();}
function mqShow(){
  $('#mqT').textContent=MQ.length;
  if(mqI>=MQ.length){if(window.Hub)Hub.recordQuiz('stats','Chapter 6 quiz',mqScore,MQ.length);$('#mqBox').innerHTML=`<div class="res">Finished! Score: ${mqScore} / ${MQ.length}</div><p>${mqScore>=MQ.length*0.8?'Great work. You are ready for the exam questions.':'Review the sections you missed, then press Restart.'}</p>`;$('#mqFb').style.display='none';$('#mqNext').style.display='none';$('#mqN').textContent=MQ.length;$('#mqS').textContent=mqScore;return;}
  const q=MQ[mqOrder[mqI]];mqDone=false;
  const idx=q[1].map((_,i)=>i).sort(()=>Math.random()-.5);
  $('#mqN').textContent=mqI+1;$('#mqS').textContent=mqScore;
  $('#mqBox').innerHTML=`<div class="mq-q">${q[0]}</div>`+idx.map(i=>`<button class="opt" data-i="${i}">${q[1][i]}</button>`).join('');
  $('#mqFb').style.display='none';$('#mqNext').style.display='none';
  $('#mqBox').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    if(mqDone)return;mqDone=true;const i=+b.dataset.i,ok=i===q[2];if(ok)mqScore++;
    $('#mqBox').querySelectorAll('.opt').forEach(o=>{if(+o.dataset.i===q[2])o.classList.add('right');else if(o===b)o.classList.add('wrong');});
    $('#mqFb').style.display='block';$('#mqFb').innerHTML=(ok?'<span class="ok">Correct!</span> ':'<span class="bad">Not quite.</span> ')+q[3];
    $('#mqS').textContent=mqScore;$('#mqNext').style.display='';$('#mqNext').textContent=mqI+1>=MQ.length?'See result':'Next question';
  });
}
$('#mqNext').onclick=()=>{mqI++;mqShow();};
$('#mqRestart').onclick=mqStart;
mqStart();

/* ---------- init ---------- */
cltPop();takeSamples(1000);chiDraw(true);tDraw(true);fDraw(true);

/* ================= CHAPTER 5 ================= */
const fr=x=>{if(Math.abs(x)<1e-12)return '0';for(let d=1;d<=200;d++){const n=Math.round(x*d);if(Math.abs(x*d-n)<5e-8)return d===1?String(n):n+'/'+d;}return null;};
const fx=(x,d=4)=>{const f=fr(x),s=Number(x).toFixed(d);return f&&f.includes('/')?`${f} (${s})`:s;};
const PRE={
 books:{xs:[0,1,2],ys:[0,1,2],h:[[3/28,9/28,3/28],[3/14,3/14,0],[1/28,0,0]]},
 prod:{xs:[1,2,3],ys:[1,2,3],h:[1,2,3].map(y=>[1,2,3].map(x=>x*y/36))},
 ex5:{xs:[1,2,3],ys:[-2,-1,2,4],h:[[.1,0,.1],[.2,.1,0],[0,.1,.1],[.1,.2,0]]}
};
let J=null,jmx=0,jmy=0;
function jLoad(k){const p=PRE[k];J={xs:p.xs.slice(),ys:p.ys.slice(),h:p.h.map(r=>r.slice())};jBuild();}
function jBuild(){
  const {xs,ys,h}=J;
  let t='<table class="jt"><tr><th>Y \\ X</th>'+xs.map((x,i)=>`<th><input type="number" step="any" data-x="${i}" value="${x}"></th>`).join('')+'</tr>';
  ys.forEach((y,r)=>{t+=`<tr><th><input type="number" step="any" data-y="${r}" value="${y}"></th>`+xs.map((_,c)=>`<td><input type="number" step="any" min="0" data-r="${r}" data-c="${c}" value="${+h[r][c].toPrecision(10)}"></td>`).join('')+'</tr>';});
  $('#jbox').innerHTML=t+'</table>';
  $('#jbox').querySelectorAll('input').forEach(i=>i.oninput=jRead);
  jRead();
}
function jRead(){
  const b=$('#jbox'),xs=[...b.querySelectorAll('[data-x]')].map(i=>+i.value),ys=[...b.querySelectorAll('[data-y]')].map(i=>+i.value);
  const h=ys.map((_,r)=>xs.map((_,c)=>+b.querySelector(`[data-r="${r}"][data-c="${c}"]`).value||0));
  J={xs,ys,h};jCompute();
}
function jCompute(){
  const {xs,ys,h}=J;
  const gX=xs.map((_,c)=>ys.reduce((s,_,r)=>s+h[r][c],0)),gY=ys.map((_,r)=>xs.reduce((s,_,c)=>s+h[r][c],0));
  const tot=gX.reduce((a,b)=>a+b,0);
  const EX=xs.reduce((s,x,c)=>s+x*gX[c],0),EY=ys.reduce((s,y,r)=>s+y*gY[r],0);
  const EX2=xs.reduce((s,x,c)=>s+x*x*gX[c],0),EY2=ys.reduce((s,y,r)=>s+y*y*gY[r],0);
  let EXY=0;ys.forEach((y,r)=>xs.forEach((x,c)=>{EXY+=x*y*h[r][c];}));
  const vx=EX2-EX*EX,vy=EY2-EY*EY,cv=EXY-EX*EY,rho=(vx>1e-12&&vy>1e-12)?cv/Math.sqrt(vx*vy):NaN;
  let bad=null;ys.forEach((y,r)=>xs.forEach((x,c)=>{if(!bad&&Math.abs(h[r][c]-gX[c]*gY[r])>1e-7)bad=[x,y,h[r][c],gX[c],gY[r]];}));
  let o='';
  o+=Math.abs(tot-1)<1e-6?`<span class="ok">Valid p.m.f.</span> (total = 1)`:`<span class="bad">Total = ${fmt(tot,4)}, not 1</span>: not a valid p.m.f. (results below use the raw numbers)`;
  o+='<div style="overflow-x:auto;margin-top:8px"><table class="mt"><tr><th>Y \\ X</th>'+xs.map(x=>`<th>${x}</th>`).join('')+'<th>g<sub>Y</sub>(y)</th></tr>';
  ys.forEach((y,r)=>{o+=`<tr><th>${y}</th>`+xs.map((_,c)=>`<td>${fr(h[r][c])||fmt(h[r][c],4)}</td>`).join('')+`<td><b>${fr(gY[r])||fmt(gY[r],4)}</b></td></tr>`;});
  o+='<tr><th>g<sub>X</sub>(x)</th>'+gX.map(v=>`<td><b>${fr(v)||fmt(v,4)}</b></td>`).join('')+`<td>${fr(tot)||fmt(tot,4)}</td></tr></table></div>`;
  o+=`<p style="margin:10px 0 0">E[X] = ${fx(EX)}, E[Y] = ${fx(EY)}, E[XY] = ${fx(EXY)}<br>Var(X) = ${fx(vx)}, Var(Y) = ${fx(vy)}<br><b>cov(X,Y) = ${fx(cv)}</b>, <b>ρ = ${isNaN(rho)?'undefined':fmt(rho,4)}</b></p>`;
  o+=bad?`<p class="bad" style="margin:8px 0 0">Dependent: at (x=${bad[0]}, y=${bad[1]}), h = ${fmt(bad[2],5)} but g<sub>X</sub>·g<sub>Y</sub> = ${fmt(bad[3]*bad[4],5)}.</p>`:`<p class="ok" style="margin:8px 0 0">Independent: h = g<sub>X</sub>·g<sub>Y</sub> in every cell (so cov = 0).</p>`;
  if(!bad&&Math.abs(cv)>1e-6)o+='';
  if(bad&&Math.abs(cv)<1e-9)o+=`<p style="margin:6px 0 0">Note: cov = 0 here, yet the variables are dependent. Zero covariance does not imply independence.</p>`;
  $('#jout').innerHTML=o;
  // conditional
  const t=$('#jct').value,vals=t==='xy'?ys:xs,sel=$('#jcv');const idx=Math.max(0,Math.min(sel.selectedIndex<0?0:sel.selectedIndex,vals.length-1));
  sel.innerHTML=vals.map((v,i)=>`<option value="${i}">${v}</option>`).join('');sel.selectedIndex=idx;
  let cd='';
  if(t==='xy'){const g=gY[idx];cd=g<1e-12?'P(Y = y) = 0, so the conditional is undefined.':`f(x | Y = ${ys[idx]}) = h(x, ${ys[idx]}) / ${fr(g)||fmt(g,4)}:<br>`+xs.map((x,c)=>`x = ${x}: <b>${fr(h[idx][c]/g)||fmt(h[idx][c]/g,4)}</b>`).join(' &nbsp; ');}
  else{const g=gX[idx];cd=g<1e-12?'P(X = x) = 0, so the conditional is undefined.':`f(y | X = ${xs[idx]}) = h(${xs[idx]}, y) / ${fr(g)||fmt(g,4)}:<br>`+ys.map((y,r)=>`y = ${y}: <b>${fr(h[r][idx]/g)||fmt(h[r][idx]/g,4)}</b>`).join(' &nbsp; ');}
  $('#jcond').innerHTML=cd;
  jmx=EX;jmy=EY;drawJ();
}
function drawJ(){
  if(!J)return;
  const cv=$('#cvJ'),css=getComputedStyle(document.documentElement),C=n=>css.getPropertyValue(n).trim();
  const dpr=window.devicePixelRatio||1,W=cv.clientWidth||600,H=260;cv.width=W*dpr;cv.height=H*dpr;
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
  const {xs,ys,h}=J,pad=0.7;
  const x0=Math.min(...xs)-pad,x1=Math.max(...xs)+pad,y0=Math.min(...ys)-pad,y1=Math.max(...ys)+pad;
  const L=44,R=10,T=10,B=26,pw=W-L-R,ph=H-T-B;
  const X=x=>L+(x-x0)/(x1-x0)*pw,Y=y=>T+ph-(y-y0)/(y1-y0)*ph;
  const mx=Math.max(x0,Math.min(x1,jmx)),my=Math.max(y0,Math.min(y1,jmy));
  g.globalAlpha=.16;g.fillStyle=C('--ok');
  g.fillRect(X(mx),T,L+pw-X(mx),Y(my)-T);g.fillRect(L,Y(my),X(mx)-L,T+ph-Y(my));
  g.fillStyle=C('--bad');
  g.fillRect(L,T,X(mx)-L,Y(my)-T);g.fillRect(X(mx),Y(my),L+pw-X(mx),T+ph-Y(my));
  g.globalAlpha=1;
  g.strokeStyle=C('--grid');g.lineWidth=1;g.strokeRect(L,T,pw,ph);
  g.fillStyle=C('--mut');g.font='11px system-ui';g.textAlign='center';xs.forEach(x=>g.fillText(String(x),X(x),H-10));
  g.textAlign='right';ys.forEach(y=>g.fillText(String(y),L-6,Y(y)+4));
  g.setLineDash([5,4]);g.strokeStyle=C('--acc2');g.lineWidth=1.6;
  g.beginPath();g.moveTo(X(mx),T);g.lineTo(X(mx),T+ph);g.moveTo(L,Y(my));g.lineTo(L+pw,Y(my));g.stroke();g.setLineDash([]);
  g.fillStyle=C('--acc2');g.textAlign='left';g.fillText('μX',X(mx)+3,T+11);g.fillText('μY',L+4,Y(my)-4);
  g.fillStyle=C('--acc3');g.globalAlpha=.8;
  ys.forEach((y,r)=>xs.forEach((x,c)=>{const p=h[r][c];if(p>0){g.beginPath();g.arc(X(x),Y(y),3+28*Math.sqrt(Math.min(p,1)),0,2*Math.PI);g.fill();}}));
  g.globalAlpha=1;
}
document.querySelectorAll('[data-pre]').forEach(b=>b.onclick=()=>jLoad(b.dataset.pre));
$('#jct').onchange=()=>{$('#jcv').selectedIndex=0;jCompute();};
$('#jcv').onchange=jCompute;
$('#jaddx').onclick=()=>{jRead();J.xs.push(Math.max(...J.xs)+1);J.h.forEach(r=>r.push(0));jBuild();};
$('#jrmx').onclick=()=>{jRead();if(J.xs.length>2){J.xs.pop();J.h.forEach(r=>r.pop());jBuild();}};
$('#jaddy').onclick=()=>{jRead();J.ys.push(Math.max(...J.ys)+1);J.h.push(J.xs.map(()=>0));jBuild();};
$('#jrmy').onclick=()=>{jRead();if(J.ys.length>2){J.ys.pop();J.h.pop();jBuild();}};
redraws.push(drawJ);
jLoad('books');

/* variance / covariance calculator */
$('#qgo').onclick=()=>{
  const vx=+$('#qvx').value,vy=+$('#qvy').value,c=+$('#qcov').value,a1=+$('#qa1').value,a2=+$('#qa2').value,b1=+$('#qb1').value,b2=+$('#qb2').value;
  if(vx<=0||vy<=0){$('#qout').textContent='Variances must be positive.';return;}
  if(c*c>vx*vy+1e-9){$('#qout').innerHTML='<span class="bad">Impossible: cov² cannot exceed Var(X)·Var(Y).</span>';return;}
  const vu=a1*a1*vx+a2*a2*vy+2*a1*a2*c,vv=b1*b1*vx+b2*b2*vy+2*b1*b2*c,cuv=a1*b1*vx+(a1*b2+a2*b1)*c+a2*b2*vy;
  $('#qout').innerHTML=`Var(U) = ${a1}²(${vx}) + ${a2}²(${vy}) + 2(${a1})(${a2})(${c}) = <b>${fmt(vu,3)}</b><br>Var(V) = ${b1}²(${vx}) + ${b2}²(${vy}) + 2(${b1})(${b2})(${c}) = <b>${fmt(vv,3)}</b><br>cov(U,V) = ${a1}·${b1}(${vx}) + (${a1}·${b2} + ${a2}·${b1})(${c}) + ${a2}·${b2}(${vy}) = <b>${fmt(cuv,3)}</b><br>ρ(U,V) = ${(vu>0&&vv>0)?fmt(cuv/Math.sqrt(vu*vv),4):'undefined'}<br><span style="color:var(--mut)">Var(X+Y) = ${fmt(vx+vy+2*c,3)}, Var(X−Y) = ${fmt(vx+vy-2*c,3)}, ρ(X,Y) = ${fmt(c/Math.sqrt(vx*vy),4)}</span>`;
};
$('#qgo').click();

/* generic quiz for chapter 5 */
const MQ5=[
 ['A function h(x,y) is a valid joint p.m.f. if',['h ≥ 0 and the sum over all pairs equals 1','h ≤ 1 for every pair','the sum over x equals the sum over y','h(x,y) = h(y,x)'],0,'Non-negative and total probability 1 (Theorem 5.1).'],
 ['h(x,y) = kxy for x, y ∈ {1,2,3}. Then k =',['1/6','1/9','1/36','1/18'],2,'ΣΣ xy = (1+2+3)² = 36.'],
 ['With h = xy/36, P(X+Y ≥ 4) =',['5/36','31/36','1/2','4/9'],1,'1 − [h(1,1) + h(1,2) + h(2,1)] = 1 − 5/36.'],
 ['The marginal p.m.f. g_X(x) is found by',['adding h(x,y) over all y','adding h(x,y) over all x','dividing h(x,y) by g_Y(y)','multiplying h by x'],0,'Sum out the other variable.'],
 ['The conditional p.m.f. of X given Y = y is',['h(x,y)·g_Y(y)','h(x,y)/g_Y(y)','h(x,y)/g_X(x)','g_X(x)/g_Y(y)'],1,'Slice the row and rescale by its total.'],
 ['In the books example, g_X(0) = 3/28 + 3/14 + 1/28 =',['5/14','5/12','1/2','3/14'],0,'10/28 = 5/14 (your notes print 5/12 by mistake).'],
 ['To prove discrete X and Y independent you must check',['h = g_X·g_Y in every cell','h = g_X·g_Y in one cell','cov(X,Y) = 0','E[X] = E[Y]'],0,'The factorization must hold for all pairs.'],
 ['One cell has h(0,0) ≠ g_X(0)·g_Y(0). Then X and Y are',['independent','dependent','uncorrelated','identical'],1,'A single failing cell proves dependence.'],
 ['cov(X,Y) equals',['E[XY] − E[X]E[Y]','E[XY] + E[X]E[Y]','E[X]E[Y] − E[XY]','E[X²] − E[Y²]'],0,'cov = E[XY] − μ_X μ_Y.'],
 ['If X and Y are independent, then',['cov(X,Y) = 0','cov(X,Y) = 1','ρ = 1','Var X = Var Y'],0,'Independence gives E[XY] = E[X]E[Y].'],
 ['If cov(X,Y) = 0, then X and Y are',['always independent','not necessarily independent','always dependent','identically distributed'],1,'Zero covariance only rules out a linear relationship.'],
 ['The correlation coefficient ρ always lies in',['[0, 1]','[−1, 1]','(−∞, ∞)','[0, ∞)'],1,'−1 ≤ ρ ≤ 1 and it is unitless.'],
 ['Var(X + Y) =',['Var X + Var Y','Var X + Var Y + 2cov(X,Y)','Var X − Var Y','Var X · Var Y'],1,'The covariance term appears with a factor 2.'],
 ['Var X = 5, Var Y = 4, cov = 3. Var(X − Y) =',['3','6','12','15'],0,'5 + 4 − 2(3) = 3.'],
 ['Same values. Var(3X − 2Y + 5) =',['22','25','43','30'],1,'9(5) + 4(4) − 2(3)(2)(3) = 25. The +5 does not matter.'],
 ['cov(X − Y, X + Y) =',['Var X + Var Y','Var X − Var Y','2cov(X,Y)','0 always'],1,'VarX + cov − cov − VarY = VarX − VarY.'],
 ['If cov(X,Y) = 2, then cov(3X + 1, 4Y − 5) =',['2','12','24','8'],2,'cov(aX+b, cY+d) = ac·cov = 12·2 = 24.'],
 ['A joint p.d.f. equals k on x > 0, y > 0, x + y < 2. Then k =',['2','1/2','1/4','1'],1,'The triangle has area 2, so k = 1/2.'],
 ['f(x,y) = 24xy on x > 0, y > 0, x + y < 1. The marginal f_X(x) =',['12x(1−x)²','24x(1−x)','12x²(1−x)','x(1−x)²'],0,'∫₀^{1−x} 24xy dy = 12x(1−x)².'],
 ['Why are X and Y with f = 24xy on the triangle x + y < 1 dependent?',['The support is not a rectangle, so f ≠ f_X·f_Y','They have different means','cov is zero','The pdf is not positive'],0,'Knowing x restricts the possible y, so they cannot be independent.'],
 ['For a continuous joint p.d.f., the first step before integrating is to',['sketch the region and set the limits','compute cov','differentiate','assume independence'],0,'Most errors come from wrong limits.'],
 ['If X and Y are uncorrelated, Var(X + Y) =',['Var X + Var Y','Var X − Var Y','0','2 Var X'],0,'The cov term is 0.'],
 ['h = c(x²+y²), x ∈ {−1,0,1,3}, y ∈ {−1,2,3}. Then c =',['1/33','1/56','1/89','1/72'],2,'ΣΣ(x²+y²) = 3(11) + 4(14) = 89.'],
 ['cov(X,Y) > 0 means',['X and Y tend to be above their means together (or below together)','X and Y are independent','X always exceeds Y','Var X > Var Y'],0,'Positive covariance means they move in the same direction.']
];
function makeQuiz(p,bank){
  let order=[],i=0,score=0,done=false;
  const q$=s=>$('#'+p+s);
  function start(){order=bank.map((_,k)=>k).sort(()=>Math.random()-.5);i=0;score=0;show();}
  function show(){
    q$('T').textContent=bank.length;
    if(i>=bank.length){if(window.Hub)Hub.recordQuiz('stats','Chapter '+(p==='m5'?5:6)+' quiz',score,bank.length);q$('Box').innerHTML=`<div class="res">Finished! Score: ${score} / ${bank.length}</div><p>${score>=bank.length*0.8?'Great work. You are ready for exam questions.':'Review the sections you missed, then press Restart.'}</p>`;q$('Fb').style.display='none';q$('Next').style.display='none';q$('N').textContent=bank.length;q$('S').textContent=score;return;}
    const q=bank[order[i]];done=false;
    const idx=q[1].map((_,k)=>k).sort(()=>Math.random()-.5);
    q$('N').textContent=i+1;q$('S').textContent=score;
    q$('Box').innerHTML=`<div class="mq-q">${q[0]}</div>`+idx.map(k=>`<button class="opt" data-i="${k}">${q[1][k]}</button>`).join('');
    q$('Fb').style.display='none';q$('Next').style.display='none';
    q$('Box').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      if(done)return;done=true;const k=+b.dataset.i,ok=k===q[2];if(ok)score++;
      q$('Box').querySelectorAll('.opt').forEach(o=>{if(+o.dataset.i===q[2])o.classList.add('right');else if(o===b)o.classList.add('wrong');});
      q$('Fb').style.display='block';q$('Fb').innerHTML=(ok?'<span class="ok">Correct!</span> ':'<span class="bad">Not quite.</span> ')+q[3];
      q$('S').textContent=score;q$('Next').style.display='';q$('Next').textContent=i+1>=bank.length?'See result':'Next question';
    });
  }
  q$('Next').onclick=()=>{i++;show();};
  q$('Restart').onclick=start;
  start();
}
makeQuiz('m5',MQ5);

let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>redraws.forEach(f=>f()),150);});
window.STATS={redraw:()=>redraws.forEach(f=>f()),MQ,MQ5};

})();
