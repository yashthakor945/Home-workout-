const $=s=>document.querySelector(s),p=n=>String(n).padStart(2,'0'),K=d=>d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LOGO='icon-192.png';$('#lg').src=LOGO;
const SEC=['Calisthenics','Boxing','Home Workout','Upper Body','Lower Body','My Workouts'];
function px(s){const m=s.trim().match(/^(.+?)\s+(\d+)\s*[x×]\s*(\d+\w*)$/i);return m?{n:m[1],s:+m[2],r:m[3]}:{n:s.trim(),s:3,r:'10'}}
const BW=[
['c1',0,'Push & Pull Basics','Full body','Push-ups 4x12|Pike push-ups 3x10|Chair dips 3x12|Inverted rows 3x10|Squats 4x20|Plank 3x45s'],
['b1',1,'Shadow Boxing','Cardio','Shadow boxing 5x2m|Jab-cross 4x30|Hooks 4x30|Burpees 3x12|Skipping 4x60s|Core twists 3x30'],
['h1',2,'Full Body Home','Full body','Jumping jacks 3x40|Squats 3x20|Push-ups 3x15|Lunges 3x12|Mountain climbers 3x30|Plank 3x45s'],
['h2',2,'Abs Burner','Abs','Crunches 3x20|Leg raises 3x15|Bicycle crunch 3x30|Russian twist 3x30|Plank 3x60s'],
['u1',3,'Chest & Triceps','Chest','Push-ups 4x15|Wide push-ups 3x12|Diamond push-ups 3x10|Chair dips 3x12|Decline push-ups 3x10'],
['u2',3,'Arms','Arms','Close-grip push-ups 3x12|Bicep curls 4x12|Tricep extensions 3x12|Hammer curls 3x12|Pike push-ups 3x10'],
['l1',4,'Legs & Glutes','Legs','Squats 4x20|Lunges 3x12|Glute bridge 3x20|Wall sit 3x40s|Calf raises 4x25|Jump squats 3x12']
].map(a=>({id:a[0],sec:SEC[a[1]],name:a[2],tag:a[3],ex:a[4].split('|').map(px)}));
let S={};try{S=JSON.parse(localStorage.hw1)||{}}catch(x){}
S=Object.assign({custom:[],plan:['rest','u1','l1','c1','b1','u2','h1'],done:{},ov:{},time:'18:00',notif:0,last:''},S);
const save=()=>{try{localStorage.hw1=JSON.stringify(S)}catch(x){}};
const W=()=>BW.concat(S.custom),getW=id=>W().find(w=>w.id==id);
const pl=d=>{const k=K(d);return k in S.ov?S.ov[k]:S.plan[d.getDay()]};
let ani=1,pw=0,lastT=-1,T='home',F=0,cm=new Date(),sel=K(new Date()),cur=null;cm.setDate(1);
function toast(m){const t=$('#ts');t.textContent=m;t.style.display='block';clearTimeout(t.h);t.h=setTimeout(()=>t.style.display='none',3500)}
function opts(sel){return '<option value="rest"'+(sel=='rest'?' selected':'')+'>Rest day</option>'+SEC.map(s=>{const l=W().filter(w=>w.sec==s);return l.length?`<optgroup label="${s}">`+l.map(w=>`<option value="${w.id}"${w.id==sel?' selected':''}>${e(w.name)}</option>`).join('')+'</optgroup>':''}).join('')}
function home(){const sk=streak(),n=new Date(),k=K(n),id=pl(n),w=getW(id),d=S.done[k],x=d&&d.w==id?d.x.length:0;
let wk=0,st=0,rp=0;for(const q in S.done){const v=S.done[q];if(v.f)wk++;st+=v.s;rp+=v.r}
let g='',nd=0;for(let i=29;i>=0;i--){const t=new Date(n);t.setDate(n.getDate()-i);const v=S.done[K(t)];if(v&&v.f)nd++;g+=`<div class="p${v&&v.f?' d':pl(t)=='rest'?' r':''}${i?'':' t'}" style="--d:${(29-i)*14}ms"></div>`}
const mo=new Date(n);mo.setDate(n.getDate()-(n.getDay()+6)%7);let rs=[],tot=0,mx=1;
for(let i=0;i<7;i++){const t=new Date(mo);t.setDate(mo.getDate()+i);const v=S.done[K(t)],r=v?v.r:0;rs.push(r);tot+=r;mx=Math.max(mx,r)}
const bars=rs.map((r,i)=>`<div style="flex:1;text-align:center"><small class="m">${r||'·'}</small><div class="bar" style="height:${Math.max(6,r/mx*64)}px;${r?'background:#dcdce0':''}"></div><small class="m">${'MTWTFSS'[i]}</small></div>`).join('');
return `<div class="card"><div class="row sp"><span class="m">${n.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}</span><select class="chip" onchange="ovr(this.value)">${opts(w?id:'rest')}</select></div>
<div class="box">${w?e(w.name):'Rest day'}</div>
<p class="m" style="margin:10px 0 14px">${w?`${e(w.tag)} · ${w.ex.length} exercises · ${x}/${w.ex.length} done${sk?` · ${sk}-day streak`:''}`:'Recover, stretch and drink water.'}</p>
${w?`<div class="pb" style="margin-bottom:14px"><i style="width:${Math.round(x/w.ex.length*100)}%"></i></div>`:''}<button class="btn" onclick="${w?`openS('${id}')`:`go('work')`}">${w?(d&&d.f?'Completed · View':x?'Continue workout':'Start workout'):'Train anyway'}</button></div>
<div class="g3"><div class="card"><span class="big" data-n="${wk}">${wk}</span><span class="m">workouts</span></div><div class="card"><span class="big" data-n="${st}">${st}</span><span class="m">sets</span></div><div class="card"><span class="big" data-n="${rp}">${rp}</span><span class="m">reps</span></div></div>
<div class="card"><div class="row sp"><b>Last 30 days</b><span class="m">${nd} done</span></div><div class="pills">${g}</div></div>
<div class="card"><div class="row sp"><b>This week</b><span class="m">${tot} reps</span></div><div class="bars">${bars}</div></div>`}
function cal(){const n=new Date(),tk=K(n),y=cm.getFullYear(),m=cm.getMonth(),f=new Date(y,m,1).getDay(),dm=new Date(y,m+1,0).getDate();let c='';
for(let i=0;i<f;i++)c+='<i></i>';
for(let i=1;i<=dm;i++){const t=new Date(y,m,i),q=K(t),v=S.done[q];c+=`<div class="cd${v&&v.f?' d':pl(t)=='rest'?' r':''}${q==tk?' t':''}${q==sel?' s':''}" onclick="sel='${q}';render()">${i}</div>`}
const sd=new Date(sel+'T00:00:00'),sw=getW(pl(sd)),v=S.done[sel],vw=v&&getW(v.w);
const pn=[1,2,3,4,5,6,0].map(i=>`<div class="row sp" style="margin-bottom:8px"><span style="width:44px">${'SunMonTueWedThuFriSat'.substr(i*3,3)}</span><select onchange="S.plan[${i}]=this.value;save();render()">${opts(S.plan[i])}</select></div>`).join('');
return `<div class="card"><div class="row sp" style="margin-bottom:12px"><button class="chip" onclick="cm.setMonth(cm.getMonth()-1);render()">‹</button><b>${cm.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</b><button class="chip" onclick="cm.setMonth(cm.getMonth()+1);render()">›</button></div>
<div class="cal m" style="margin-bottom:6px">${[...'SMTWTFS'].map(x=>`<small>${x}</small>`).join('')}</div><div class="cal">${c}</div>
<p class="m" style="margin-top:12px;font-size:13px">Filled = done · Dashed = rest day · Blue ring = today</p></div>
<div class="card"><b>${sd.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}</b><p class="m" style="margin-top:4px">${v&&v.f?`Completed ${vw?e(vw.name):'workout'} · ${v.s} sets · ${v.r} reps`:sw?`Planned: ${e(sw.name)}`:'Rest day'}</p></div>
<div class="card"><b>Weekly plan</b><p class="m" style="margin:2px 0 12px;font-size:13px">Pick a workout or Rest day for each weekday.</p>${pn}</div>
<div class="card"><div class="row sp"><b>Daily reminder</b><button class="chip ${S.notif?'on':''}" onclick="tgN()">${S.notif?'On':'Off'}</button></div>
<input type="time" value="${S.time}" onchange="S.time=this.value;save()" style="margin:12px 0 8px"><p class="m" style="font-size:13px">At this time you get today’s workout (or rest day) as a notification. Keep the app open for it to appear.</p></div>`}
function work(){const l=W().filter(w=>w.sec==SEC[F]);
return `<div class="row sp" style="margin-bottom:12px"><h2>Workouts</h2><button class="chip on" onclick="mk()">+ New</button></div><div class="chips">${SEC.map((s,i)=>`<button class="chip${i==F?' on':''}" onclick="F=${i};render()">${s}</button>`).join('')}</div>`+(l.length?l.map(w=>`<div class="card"><div class="row sp"><div><b>${e(w.name)}</b><div class="m" style="font-size:13px">${e(w.tag)} · ${w.ex.length} exercises</div></div><div class="row">${w.id[0]=='x'?`<button class="chip" onclick="del('${w.id}',this)">Delete</button>`:''}<button class="chip on" onclick="openS('${w.id}')">Start</button></div></div><p class="m" style="font-size:13px;margin-top:10px">${w.ex.map(q=>e(q.n)).join(', ')}</p></div>`).join(''):'<div class="card"><p class="m">Nothing here yet. Tap + New to create your own workout.</p></div>')}
const V={home,cal,work};
function render(){const a=ani,v=$('#v');ani=0;v.className=a?'in':'';v.innerHTML=V[T]();[...v.children].forEach((c,i)=>c.style.setProperty('--i',i));if(a)document.querySelectorAll('[data-n]').forEach(cu);document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.t==T))}
function go(t){T=t;ani=1;render();scrollTo(0,0)}
function ovr(v){S.ov[K(new Date())]=v;save();render()}
function sheet(h){const o=$('#ov'),re=o.classList.contains('on')&&!o.classList.contains('out');o.classList.remove('out');o.innerHTML='<div class="sheet'+(re?' st':'')+'">'+h+'</div>';o.classList.add('on')}
function cl(){const o=$('#ov');o.classList.add('out');setTimeout(()=>o.classList.remove('on','out'),230)}
function openS(id){const k=K(new Date());if(!getW(id))return;if(S.done[k]&&S.done[k].w!=id)delete S.done[k];S.ov[k]=id;S.done[k]=S.done[k]||{w:id,x:[],f:0,s:0,r:0};save();cur=id;ses();render()}
function ses(){const k=K(new Date()),w=getW(cur),d=S.done[k];
sheet(`<div class="row sp"><h2>${e(w.name)}</h2><button class="chip" onclick="cl()">Close</button></div><p class="m" style="margin:4px 0 12px">${e(w.tag)} · ${d.x.length}/${w.ex.length} done</p><div class="pb"><i style="width:${pw}%"></i></div><div class="row" style="margin-top:12px"><span class="chip" id="rt">Rest timer</span><button class="chip" onclick="rt(30)">30s</button><button class="chip" onclick="rt(60)">60s</button><button class="chip" onclick="rt(90)">90s</button></div><div style="margin-top:12px">${w.ex.map((q,i)=>`<div class="ex${d.x.includes(i)?' on':''}${i==lastT?' pop':''}" onclick="tg(${i})"><span class="ck"></span><div><b>${e(q.n)}</b><div class="m" style="font-size:13px">${q.s} sets × ${q.r}</div></div></div>`).join('')}</div>`);const pc=Math.round(d.x.length/w.ex.length*100);rtk();requestAnimationFrame(()=>requestAnimationFrame(()=>{const b=$('.pb i');if(b)b.style.width=pc+'%';pw=pc}))}
function tg(i){const k=K(new Date()),w=getW(cur),d=S.done[k],j=d.x.indexOf(i);j<0?d.x.push(i):d.x.splice(j,1);d.f=d.x.length==w.ex.length?1:0;d.s=0;d.r=0;d.x.forEach(i=>{const q=w.ex[i];d.s+=q.s;if(/^\d+$/.test(q.r))d.r+=q.s*q.r});lastT=i;save();ses();lastT=-1;render();if(d.f)toast('Workout complete. Nice work!')}
function mk(){sheet(`<h2>New workout</h2><input id="nn" placeholder="Workout name" maxlength="40" style="margin:12px 0 8px"><div class="row" style="margin-bottom:8px"><select id="ns">${SEC.map((s,i)=>`<option value="${i}"${i==5?' selected':''}>${s}</option>`).join('')}</select><select id="nt">${['Chest','Arms','Abs','Back','Shoulders','Legs','Full body'].map(t=>`<option>${t}</option>`).join('')}</select></div><textarea id="nx" rows="6" placeholder="One exercise per line, like:&#10;Push-ups 3x15&#10;Plank 3x45s"></textarea><button class="btn" style="margin-top:12px" onclick="sv()">Save workout</button><button class="chip" style="width:100%;margin-top:8px" onclick="cl()">Cancel</button>`)}
function sv(){const n=$('#nn').value.trim(),ex=$('#nx').value.split('\n').map(s=>s.trim()).filter(Boolean);if(!n||!ex.length){toast('Add a name and at least one exercise');return}
S.custom.push({id:'x'+Date.now(),sec:SEC[$('#ns').value],name:n,tag:$('#nt').value,ex:ex.map(px)});F=+$('#ns').value;save();cl();render()}
function del(id,b){if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again';return}S.custom=S.custom.filter(w=>w.id!=id);S.plan=S.plan.map(v=>v==id?'rest':v);save();render()}
function tgN(){if(!S.notif){try{Notification.requestPermission()}catch(x){}}S.notif=S.notif?0:1;save();render();toast(S.notif?'Reminder on':'Reminder off')}
setInterval(()=>{if(!S.notif)return;const n=new Date(),k=K(n);if(p(n.getHours())+':'+p(n.getMinutes())==S.time&&S.last!=k){S.last=k;save();const w=getW(pl(n)),m=w?`Today: ${w.name} · ${w.ex.length} exercises`:'Rest day today. Recover well.';notify(m);toast(m)}},15000);
function streak(){let c=0;const n=new Date();for(let i=0;i<400;i++){const t=new Date(n);t.setDate(n.getDate()-i);const v=S.done[K(t)];if(v&&v.f)c++;else if(i==0||pl(t)=='rest')continue;else break}return c}
function cu(el){const to=+el.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/700);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}
function notify(m){if(!('Notification' in window)||Notification.permission!='granted')return;if(navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.ready.then(r=>r.showNotification('Home Workout',{body:m,icon:LOGO}));else try{new Notification('Home Workout',{body:m,icon:LOGO})}catch(x){}}
let rE=0;function rt(s){rE=Date.now()+s*1000;rtk()}
function rtk(){const el=$('#rt');if(!el)return;const l=Math.ceil((rE-Date.now())/1000);el.textContent=l>0?'Rest '+l+'s':'Rest timer';el.className=l>0?'chip on':'chip'}
setInterval(()=>{if(rE){rtk();if(Date.now()>rE){rE=0;rtk();navigator.vibrate&&navigator.vibrate(200);toast('Rest over. Next set!')}}},500);
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(x){}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
render();
