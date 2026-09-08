import { useState, useEffect, useRef } from "react";

const EXERCISES = {
  circuit: [
    { name:"KB Swings",             equipment:"Kettlebell",    type:"reps", reps:[15,25,40],   icon:"🔔" },
    { name:"KB Goblet Squat",       equipment:"Kettlebell",    type:"reps", reps:[15,25,40],   icon:"🔔" },
    { name:"KB Single-Arm Press",   equipment:"Kettlebell",    type:"reps", reps:[8,12,20],    icon:"🔔" },
    { name:"KB Romanian Deadlift",  equipment:"Kettlebell",    type:"reps", reps:[12,20,30],   icon:"🔔" },
    { name:"KB Turkish Get-Up",     equipment:"Kettlebell",    type:"reps", reps:[2,4,6],      icon:"🔔" },
    { name:"KB Clean & Press",      equipment:"Kettlebell",    type:"reps", reps:[8,12,20],    icon:"🔔" },
    { name:"KB Sumo Squat",         equipment:"Kettlebell",    type:"reps", reps:[15,25,40],   icon:"🔔" },
    { name:"KB Alternating Row",    equipment:"Kettlebell",    type:"reps", reps:[10,16,24],   icon:"🔔" },
    { name:"KB Farmers Carry",      equipment:"Kettlebell",    type:"time", seconds:[30,45,60],icon:"🔔" },
    { name:"KB Thruster",           equipment:"Kettlebell",    type:"reps", reps:[8,15,25],    icon:"🔔" },
    { name:"Chin-Ups",              equipment:"Pull-up Bar",   type:"reps", reps:[5,8,15],     icon:"🏋️" },
    { name:"Hanging Knee Raises",   equipment:"Pull-up Bar",   type:"reps", reps:[10,20,30],   icon:"🏋️" },
    { name:"Hanging Leg Raises",    equipment:"Pull-up Bar",   type:"reps", reps:[8,15,25],    icon:"🏋️" },
    { name:"Dead Hang",             equipment:"Pull-up Bar",   type:"time", seconds:[20,35,60],icon:"🏋️" },
    { name:"Bar Inverted Row",      equipment:"Pull-up Bar",   type:"reps", reps:[10,15,25],   icon:"🏋️" },
    { name:"L-Sit Hold (Bar)",      equipment:"Pull-up Bar",   type:"time", seconds:[10,20,40],icon:"🏋️" },
    { name:"Push-Ups",              equipment:"Bodyweight",    type:"reps", reps:[15,30,60],   icon:"💪" },
    { name:"Diamond Push-Ups",      equipment:"Bodyweight",    type:"reps", reps:[10,20,35],   icon:"💪" },
    { name:"Spiderman Push-Ups",    equipment:"Bodyweight",    type:"reps", reps:[10,16,25],   icon:"💪" },
    { name:"Wide-Grip Push-Ups",    equipment:"Bodyweight",    type:"reps", reps:[15,25,40],   icon:"💪" },
    { name:"Pike Push-Ups",         equipment:"Bodyweight",    type:"reps", reps:[8,15,25],    icon:"💪" },
    { name:"TRX Row",               equipment:"TRX Bands",     type:"reps", reps:[10,15,25],   icon:"🪢" },
    { name:"TRX Push-Up",           equipment:"TRX Bands",     type:"reps", reps:[10,15,25],   icon:"🪢" },
    { name:"TRX Squat",             equipment:"TRX Bands",     type:"reps", reps:[15,25,40],   icon:"🪢" },
    { name:"TRX Lunge",             equipment:"TRX Bands",     type:"reps", reps:[10,16,25],   icon:"🪢" },
    { name:"TRX Bicep Curl",        equipment:"TRX Bands",     type:"reps", reps:[10,15,25],   icon:"🪢" },
    { name:"TRX Tricep Press",      equipment:"TRX Bands",     type:"reps", reps:[10,15,25],   icon:"🪢" },
    { name:"TRX Plank",             equipment:"TRX Bands",     type:"time", seconds:[20,40,60],icon:"🪢" },
    { name:"TRX Mountain Climber",  equipment:"TRX Bands",     type:"reps", reps:[15,25,40],   icon:"🪢" },
    { name:"TRX Hamstring Curl",    equipment:"TRX Bands",     type:"reps", reps:[10,15,20],   icon:"🪢" },
    { name:"TRX Atomic Push-Up",    equipment:"TRX Bands",     type:"reps", reps:[6,12,20],    icon:"🪢" },
    { name:"MB Wall Ball",          equipment:"Medicine Ball", type:"reps", reps:[15,25,40],   icon:"⚫" },
    { name:"MB Russian Twist",      equipment:"Medicine Ball", type:"reps", reps:[15,25,40],   icon:"⚫" },
    { name:"MB Overhead Squat",     equipment:"Medicine Ball", type:"reps", reps:[15,20,30],   icon:"⚫" },
    { name:"MB Overhead Lunge",     equipment:"Medicine Ball", type:"reps", reps:[10,16,25],   icon:"⚫" },
    { name:"MB Chest Pass Squat",   equipment:"Medicine Ball", type:"reps", reps:[10,15,25],   icon:"⚫" },
    { name:"MB Sit-Up & Press",     equipment:"Medicine Ball", type:"reps", reps:[15,20,30],   icon:"⚫" },
    { name:"MB Lateral Toss Squat", equipment:"Medicine Ball", type:"reps", reps:[10,15,20],   icon:"⚫" },
    { name:"Sit-Ups",               equipment:"Bodyweight",    type:"reps", reps:[20,40,80],   icon:"💪" },
    { name:"Plank Hold",            equipment:"Bodyweight",    type:"time", seconds:[30,50,90],icon:"💪" },
    { name:"Diagonal Rev. Crunches",equipment:"Bodyweight",    type:"reps", reps:[15,25,40],   icon:"💪" },
    { name:"Flutter Kicks",         equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Low to High Plank",     equipment:"Bodyweight",    type:"time", seconds:[20,35,60],icon:"💪" },
    { name:"Shoulder Taps",         equipment:"Bodyweight",    type:"time", seconds:[20,35,60],icon:"💪" },
    { name:"Leg Raises",            equipment:"Bodyweight",    type:"reps", reps:[10,20,35],   icon:"💪" },
    { name:"V-Ups",                 equipment:"Bodyweight",    type:"reps", reps:[10,20,35],   icon:"💪" },
    { name:"Lower Back Extensions", equipment:"Bodyweight",    type:"reps", reps:[15,20,30],   icon:"💪" },
    { name:"Alternating Tucks + Leg Raises", equipment:"Bodyweight", type:"reps", reps:[15,25,40], icon:"💪" },
  ],
  military: [
    { name:"Squats",                         equipment:"Bodyweight",    type:"reps", reps:[25,50,100],  icon:"💪" },
    { name:"Sit-Ups",                        equipment:"Bodyweight",    type:"reps", reps:[20,40,80],   icon:"💪" },
    { name:"Push-Ups",                       equipment:"Bodyweight",    type:"reps", reps:[15,30,60],   icon:"💪" },
    { name:"Burpees",                        equipment:"Bodyweight",    type:"reps", reps:[10,20,40],   icon:"💪" },
    { name:"Reverse Lunges",                 equipment:"Bodyweight",    type:"reps", reps:[10,20,40],   icon:"💪" },
    { name:"Chin-Ups",                       equipment:"Pull-up Bar",   type:"reps", reps:[3,6,10],     icon:"🏋️" },
    { name:"Diamond Push-Ups",               equipment:"Bodyweight",    type:"reps", reps:[8,15,25],    icon:"💪" },
    { name:"Diagonal Reverse Crunches",      equipment:"Bodyweight",    type:"reps", reps:[10,20,30],   icon:"💪" },
    { name:"Bear Crawl (15m)",               equipment:"Bodyweight",    type:"reps", reps:[2,3,5],      icon:"💪" },
    { name:"KB Swings",                      equipment:"Kettlebell",    type:"reps", reps:[15,25,40],   icon:"🔔" },
    { name:"KB Farmers Carry",               equipment:"Kettlebell",    type:"time", seconds:[20,40,60],icon:"🔔" },
    { name:"TRX Inverted Row",               equipment:"TRX Bands",     type:"reps", reps:[8,14,20],    icon:"🪢" },
    { name:"MB Russian Twist",               equipment:"Medicine Ball",  type:"reps", reps:[15,25,40],  icon:"⚫" },
    { name:"Jumping Jacks",                  equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"High Knees",                     equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Mountain Climbers",              equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Squat Jumps",                    equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"Plank Jacks",                    equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"Star Jacks",                     equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Toe Taps",                       equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Low to High Plank",              equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"Plank Burpees",                  equipment:"Bodyweight",    type:"time", seconds:[20,35,50],icon:"💪" },
    { name:"Shoulder Taps",                  equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Lower Back Extensions",          equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"Flutter Kicks",                  equipment:"Bodyweight",    type:"time", seconds:[20,40,60],icon:"💪" },
    { name:"Lateral High Knees",             equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Jumping Lunges",                 equipment:"Bodyweight",    type:"time", seconds:[20,35,50],icon:"💪" },
    { name:"Shuffle + Side Lunges",          equipment:"Bodyweight",    type:"time", seconds:[20,35,50],icon:"💪" },
    { name:"Alternating High Kicks",         equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Squat + Side Step",              equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Jab and Cross",                  equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Crossover + Knee to Elbow",      equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Plyo Side Squats",               equipment:"Bodyweight",    type:"time", seconds:[20,35,50],icon:"💪" },
    { name:"Plyo Squat + Twist",             equipment:"Bodyweight",    type:"time", seconds:[20,35,50],icon:"💪" },
    { name:"Spiderman Push-Ups",             equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"London Bridge",                  equipment:"Bodyweight",    type:"time", seconds:[20,30,50],icon:"💪" },
    { name:"In-Out Steps",                   equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Alternating Tucks + Leg Raises", equipment:"Bodyweight",    type:"time", seconds:[20,40,50],icon:"💪" },
    { name:"Plank Hold",                     equipment:"Bodyweight",    type:"time", seconds:[30,50,80],icon:"💪" },
  ],
};

const STAPLES = {
  circuit:  [
    { name:"Pull-Ups",     equipment:"Pull-up Bar", type:"reps", reps:[5,5,5],   icon:"🏋️", staple:true },
    { name:"DB Bicep Curl",equipment:"Dumbbells",   type:"reps", reps:[25,25,25],icon:"🏅", staple:true },
  ],
  military: [
    { name:"Pull-Ups",     equipment:"Pull-up Bar", type:"reps", reps:[5,5,5],   icon:"🏋️", staple:true },
    { name:"DB Bicep Curl",equipment:"Dumbbells",   type:"reps", reps:[25,25,25],icon:"🏅", staple:true },
  ],
};

const WORKOUT_PARAMS = {
  circuit: {
    20: { beginner:{exCount:4,rounds:2}, intermediate:{exCount:5,rounds:2}, advanced:{exCount:7,rounds:3} },
    30: { beginner:{exCount:5,rounds:2}, intermediate:{exCount:6,rounds:3}, advanced:{exCount:8,rounds:3} },
    45: { beginner:{exCount:6,rounds:3}, intermediate:{exCount:7,rounds:3}, advanced:{exCount:9,rounds:4} },
    60: { beginner:{exCount:7,rounds:3}, intermediate:{exCount:8,rounds:4}, advanced:{exCount:10,rounds:5} },
  },
  military: {
    20: { beginner:{exCount:4,rounds:2}, intermediate:{exCount:5,rounds:2}, advanced:{exCount:6,rounds:3} },
    30: { beginner:{exCount:5,rounds:2}, intermediate:{exCount:6,rounds:3}, advanced:{exCount:8,rounds:3} },
    45: { beginner:{exCount:6,rounds:3}, intermediate:{exCount:8,rounds:3}, advanced:{exCount:10,rounds:4} },
    60: { beginner:{exCount:7,rounds:3}, intermediate:{exCount:9,rounds:4}, advanced:{exCount:12,rounds:5} },
  },
};

const LEVEL_IDX    = { beginner:0, intermediate:1, advanced:2 };
const LEVEL_LABELS = { beginner:"BEGINNER", intermediate:"INTERMEDIATE", advanced:"ADVANCED" };
const LEVEL_COLORS = { beginner:"#00c864", intermediate:"#ffb400", advanced:"#ff5050" };
const LEVEL_DESC   = {
  beginner:     "Lower reps, controlled pace. Build strength and form.",
  intermediate: "Moderate volume. Push the reps and own your equipment.",
  advanced:     "Military-grade volume. Max reps, full effort every round.",
};

const shuffle  = a => [...a].sort(() => Math.random() - 0.5);
const fmtTime  = s => String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const fmtDur   = s => { const m=Math.floor(s/60); return m>0?`${m}m ${s%60}s`:`${s}s`; };
const dateLong = iso => new Date(iso).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
const dateStr  = iso => new Date(iso).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});

function buildWorkout(type, level, dur) {
  const {exCount, rounds} = WORKOUT_PARAMS[type][dur][level];
  const li = LEVEL_IDX[level];
  const staples = STAPLES[type];
  const stapleNames = new Set(staples.map(s=>s.name));
  const pool = EXERCISES[type].filter(ex=>!stapleNames.has(ex.name));
  const selected = shuffle([...staples, ...shuffle(pool).slice(0, Math.max(0,exCount-staples.length))]);
  return {
    id:Date.now(), type, level, duration_target:dur, rounds,
    date:new Date().toISOString(),
    exercises: selected.map(ex=>({
      ...ex,
      target: ex.type==="reps" ? ex.reps[li] : ex.seconds[li],
      completedRounds: Array(rounds).fill(null),
    })),
    includeBike:false, bikeCompleted:false, completed:false,
  };
}

// ── Countdown timer ─────────────────────────────────────────────────────────
function Countdown({ total, onDone }) {
  const [left, setLeft] = useState(total);
  const [on, setOn]     = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (on && left > 0) {
      ref.current = setInterval(() => setLeft(s => {
        if (s <= 1) { clearInterval(ref.current); setOn(false); onDone&&onDone(); return 0; }
        return s - 1;
      }), 1000);
    } else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on]);
  const pct = ((total-left)/total)*100, circ = 2*Math.PI*34;
  const m = Math.floor(left/60), s = left%60;
  return (
    <div style={{textAlign:"center",marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
      <div style={{position:"relative",width:80,height:80,margin:"0 auto 8px"}}>
        <svg width="80" height="80" style={{transform:"rotate(-90deg)"}}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
          <circle cx="40" cy="40" r="34" fill="none" stroke={left<=5?"#ff4444":"#00ff88"} strokeWidth="6"
            strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:left<=5?"#ff4444":"#fff",fontFamily:"monospace"}}>
          {m>0?`${m}:${String(s).padStart(2,"0")}`:left}
        </div>
      </div>
      <div style={{display:"flex",gap:6,justifyContent:"center"}}>
        <button onClick={()=>on?setOn(false):setOn(true)}
          style={{padding:"4px 14px",borderRadius:6,border:"none",background:on?"#ff6b35":left===0?"#555":"#00ff88",color:"#000",fontWeight:700,cursor:"pointer",fontSize:12}}>
          {on?"⏸":left===0?"✓":"▶"}
        </button>
        <button onClick={()=>{setLeft(total);setOn(false);}}
          style={{padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"#aaa",cursor:"pointer",fontSize:12}}>↺</button>
      </div>
    </div>
  );
}

// ── Workout timer hook ───────────────────────────────────────────────────────
function useTimer() {
  const [secs, setSecs] = useState(0);
  const [on, setOn]     = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (on) ref.current = setInterval(() => setSecs(s=>s+1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on]);
  return { secs, on, start:()=>setOn(true), stop:()=>setOn(false), reset:()=>{setOn(false);setSecs(0);} };
}

// ── Shared styles ────────────────────────────────────────────────────────────
const R = { minHeight:"100vh", background:"#0a0a0f", fontFamily:"'Arial Narrow',Arial,sans-serif", color:"#fff" };
const BG = { position:"fixed", inset:0, background:"radial-gradient(ellipse at 20% 20%,rgba(0,255,136,0.04),transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(0,100,255,0.04),transparent 60%)", pointerEvents:"none", zIndex:0 };
const W  = { position:"relative", zIndex:1, maxWidth:480, margin:"0 auto", padding:"24px 16px 48px" };
const C  = (extra={}) => ({ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:16, marginBottom:12, ...extra });
const PRI  = { width:"100%", padding:16, borderRadius:10, border:"none", background:"linear-gradient(135deg,#00ff88,#00cc66)", color:"#000", fontWeight:900, fontSize:15, letterSpacing:2, cursor:"pointer", marginBottom:10, fontFamily:"inherit" };
const GHO  = (extra={}) => ({ width:"100%", padding:14, borderRadius:10, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#888", fontWeight:700, fontSize:13, cursor:"pointer", marginBottom:10, fontFamily:"inherit", ...extra });
const GEAR = { display:"inline-flex", alignItems:"center", gap:5, background:"rgba(0,255,136,0.08)", border:"1px solid rgba(0,255,136,0.2)", borderRadius:20, padding:"5px 12px", fontSize:13, color:"#00ff88", margin:3 };
const TB   = (active,bc,bg,tc) => ({ flex:1, padding:"10px 6px", borderRadius:8, border:`1px solid ${active?bc:"rgba(255,255,255,0.12)"}`, background:active?bg:"transparent", color:active?tc:"#888", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit", lineHeight:1.3, textAlign:"center" });

// ── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,  setScreen]  = useState("home");
  const [type,    setType]    = useState("circuit");
  const [level,   setLevel]   = useState("intermediate");
  const [dur,     setDur]     = useState(30);
  const [workout, setWorkout] = useState(null);
  const [round,   setRound]   = useState(0);
  const [expanded,setExpanded]= useState(null);
  const [detail,  setDetail]  = useState(null);
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("forge_h")||"[]"); } catch { return []; } });
  const timer = useTimer();

  const saveH = h => { setHistory(h); localStorage.setItem("forge_h", JSON.stringify(h)); };

  const start = () => { setWorkout(buildWorkout(type,level,dur)); setRound(0); setExpanded(null); timer.reset(); setScreen("active"); };

  const logRep = (ei,ri,val) => setWorkout(w=>({ ...w, exercises:w.exercises.map((ex,i)=>i!==ei?ex:{ ...ex, completedRounds:ex.completedRounds.map((v,j)=>j===ri?val:v) }) }));

  const finish = () => {
    timer.stop();
    const done = { ...workout, completed:true, duration:timer.secs };
    saveH([done,...history]); setWorkout(done); setScreen("summary");
  };

  if (screen==="home")    return <Home    type={type} level={level} dur={dur} setType={setType} setLevel={setLevel} setDur={setDur} onStart={start} histCount={history.length} onHistory={()=>setScreen("history")} />;
  if (screen==="active")  return <Active  workout={workout} round={round} timer={timer} expanded={expanded} setExpanded={setExpanded} onLog={logRep} onNext={()=>{setRound(r=>r+1);setExpanded(null);}} onFinish={finish} onBike={()=>setWorkout(w=>({...w,includeBike:!w.includeBike}))} />;
  if (screen==="summary") return <Summary workout={workout} onBike={()=>{ const u={...workout,bikeCompleted:!workout.bikeCompleted}; setWorkout(u); saveH(history.map(h=>h.id===u.id?u:h)); }} onHome={()=>setScreen("home")} onHistory={()=>setScreen("history")} />;
  if (screen==="history") return <History history={history} onBack={()=>setScreen("home")} onSelect={w=>{setDetail(w);setScreen("detail");}} onClear={()=>saveH([])} />;
  if (screen==="detail")  return <Detail  workout={detail} onBack={()=>setScreen("history")} />;
  return null;
}

// ── Home ─────────────────────────────────────────────────────────────────────
function Home({ type, level, dur, setType, setLevel, setDur, onStart, histCount, onHistory }) {
  const params = WORKOUT_PARAMS[type][dur][level];
  const lc = LEVEL_COLORS[level];
  return (
    <div style={R}><div style={BG}/><div style={W}>
      <header style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:44}}>⚡</div>
        <h1 style={{fontSize:42,fontWeight:900,letterSpacing:12,color:"#fff",textShadow:"0 0 30px rgba(0,255,136,0.3)",margin:0}}>FORGE</h1>
        <p style={{fontSize:11,letterSpacing:4,color:"#00ff88",opacity:0.8,marginTop:4}}>TACTICAL WORKOUT SYSTEM</p>
      </header>

      <div style={C()}>
        <label style={{fontSize:10,letterSpacing:2,color:"#888",display:"block",marginBottom:10}}>WORKOUT TYPE</label>
        <div style={{display:"flex",gap:8}}>
          {[["circuit","🔄 Circuit"],["military","🎖 Military"]].map(([v,l])=>(
            <button key={v} style={TB(type===v,"rgba(0,255,136,0.5)","rgba(0,255,136,0.1)","#00ff88")} onClick={()=>setType(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div style={C()}>
        <label style={{fontSize:10,letterSpacing:2,color:"#888",display:"block",marginBottom:10}}>FITNESS LEVEL</label>
        <div style={{display:"flex",gap:8}}>
          {[["beginner","🟢","Beginner","rgba(0,200,100,0.5)","rgba(0,200,100,0.1)","#00c864"],
            ["intermediate","🟡","Intermediate","rgba(255,180,0,0.5)","rgba(255,180,0,0.1)","#ffb400"],
            ["advanced","🔴","Advanced","rgba(255,80,80,0.5)","rgba(255,80,80,0.1)","#ff5050"],
          ].map(([v,e,l,bc,bg,tc])=>(
            <button key={v} style={TB(level===v,bc,bg,tc)} onClick={()=>setLevel(v)}>{e}<br/><span style={{fontSize:9,opacity:0.7,fontWeight:400}}>{l}</span></button>
          ))}
        </div>
        <div style={{fontSize:12,color:"#888",padding:"8px 2px 0"}}>{LEVEL_DESC[level]}</div>
      </div>

      <div style={C()}>
        <label style={{fontSize:10,letterSpacing:2,color:"#888",display:"block",marginBottom:10}}>WORKOUT DURATION</label>
        <div style={{display:"flex",gap:8}}>
          {[20,30,45,60].map(v=>(
            <button key={v} style={TB(dur===v,"rgba(0,255,136,0.5)","rgba(0,255,136,0.1)","#00ff88")} onClick={()=>setDur(v)}>
              {v}<span style={{fontSize:9,opacity:0.7,display:"block",fontWeight:400}}>min</span>
            </button>
          ))}
        </div>
      </div>

      <div style={C({background:"rgba(0,255,136,0.03)",borderColor:"rgba(0,255,136,0.12)"})}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:11,letterSpacing:2,color:"#888"}}>WORKOUT PREVIEW</span>
          <span style={{color:lc,fontSize:11,fontWeight:700}}>{LEVEL_LABELS[level]}</span>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[[params.exCount,"EXERCISES"],[params.rounds,"ROUNDS"],[`~${dur}`,"MINUTES"]].map(([v,l])=>(
            <div key={l}><div style={{fontSize:22,fontWeight:900,color:"#00ff88"}}>{v}</div><div style={{fontSize:10,color:"#888"}}>{l}</div></div>
          ))}
        </div>
      </div>

      <div style={C()}>
        <label style={{fontSize:10,letterSpacing:2,color:"#888",display:"block",marginBottom:10}}>YOUR GEAR</label>
        <div>
          {[["🔔","Adj. Kettlebell"],["🏋️","Pull-up Bar"],["🪢","TRX Bands"],["⚫","Med Balls"],["🏅","Dumbbells (11lb)"]].map(([icon,name])=>(
            <span key={name} style={GEAR}>{icon} {name}</span>
          ))}
        </div>
      </div>

      <button style={PRI} onClick={onStart}>GENERATE WORKOUT</button>
      <button style={GHO()} onClick={onHistory}>📋 WORKOUT HISTORY ({histCount})</button>
    </div></div>
  );
}

// ── Active ────────────────────────────────────────────────────────────────────
function Active({ workout:w, round:r, timer, expanded, setExpanded, onLog, onNext, onFinish, onBike }) {
  const roundDone = w.exercises.every(ex=>ex.completedRounds[r]!==null);
  const allDone   = w.exercises.every(ex=>ex.completedRounds.every(v=>v!==null));
  const lc = LEVEL_COLORS[w.level];
  return (
    <div style={R}><div style={BG}/><div style={W}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontSize:11,color:"#888",letterSpacing:1,marginBottom:2}}>
            {w.type.toUpperCase()} · <span style={{color:lc}}>{LEVEL_LABELS[w.level]}</span> · {w.duration_target} MIN
          </div>
          <div style={{fontSize:22,fontWeight:900}}>ROUND {r+1} / {w.rounds}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:"#888",marginBottom:4}}>ELAPSED</div>
          <div style={{fontFamily:"monospace",fontSize:22,fontWeight:800,marginBottom:6,color:timer.on?"#00ff88":timer.secs>0?"#ffcc00":"#555"}}>
            {fmtTime(timer.secs)}
          </div>
          <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
            <button style={{padding:"6px 14px",borderRadius:6,border:"none",background:timer.on?"#ff6b35":"#00ff88",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}
              onClick={()=>timer.on?timer.stop():timer.start()}>
              {timer.on?"⏸ PAUSE":timer.secs===0?"▶ START":"▶ RESUME"}
            </button>
            {timer.secs>0&&!timer.on&&(
              <button style={{padding:"6px 10px",borderRadius:6,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#888",cursor:"pointer",fontSize:12,fontFamily:"inherit"}} onClick={timer.reset}>↺</button>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {Array.from({length:w.rounds},(_,i)=>(
          <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<r?"#00ff88":i===r?"rgba(0,255,136,0.4)":"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>

      {w.exercises.map((ex,i)=>{
        const done=ex.completedRounds[r]!==null, open=expanded===i, logged=ex.completedRounds[r];
        return (
          <div key={i} style={C({padding:"12px 14px",border:done?"1px solid rgba(0,255,136,0.4)":"1px solid rgba(255,255,255,0.08)",cursor:"pointer"})}
            onClick={()=>setExpanded(open?null:i)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{ex.icon}</span>
                <div>
                  <div style={{fontWeight:700,color:done?"#00ff88":"#fff",fontSize:15}}>
                    {ex.name}
                    {ex.staple&&<span style={{fontSize:9,background:"rgba(0,255,136,0.15)",color:"#00ff88",borderRadius:6,padding:"2px 6px",letterSpacing:1,marginLeft:6,verticalAlign:"middle"}}>ALWAYS</span>}
                  </div>
                  <div style={{fontSize:11,color:"#888"}}>{ex.equipment}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,color:"#00ff88",fontSize:18}}>{ex.type==="reps"?`${ex.target} reps`:`${ex.target}s`}</div>
                {done&&<div style={{fontSize:11,color:"#00ff88"}}>✓ {logged}{ex.type==="reps"?" reps":"s"}</div>}
              </div>
            </div>
            {open&&(
              <div onClick={e=>e.stopPropagation()}>
                {ex.type==="time"?(
                  <Countdown total={ex.target} onDone={()=>onLog(i,r,ex.target)}/>
                ):(
                  <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:8}}>
                      {[ex.target-2,ex.target-1,ex.target,ex.target+1,ex.target+2].filter(v=>v>0).map(v=>(
                        <button key={v} onClick={()=>onLog(i,r,v)}
                          style={{padding:"8px 14px",borderRadius:8,border:logged===v?"2px solid #00ff88":"1px solid rgba(255,255,255,0.2)",background:logged===v?"rgba(0,255,136,0.15)":"transparent",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>
                          {v}
                        </button>
                      ))}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:10}}>
                      <input type="number" placeholder="custom"
                        style={{width:80,padding:"6px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.05)",color:"#fff",textAlign:"center",fontSize:14}}
                        onKeyDown={e=>e.key==="Enter"&&e.target.value&&onLog(i,r,parseInt(e.target.value))}/>
                      <span style={{color:"#888",fontSize:12}}>↵ to log</span>
                    </div>
                    <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                      {ex.completedRounds.map((rv,ri)=>(
                        <span key={ri} style={{fontSize:11,borderRadius:8,padding:"1px 7px",background:rv!==null?"rgba(0,255,136,0.15)":"rgba(255,255,255,0.05)",color:rv!==null?"#00ff88":"#555"}}>
                          R{ri+1}: {rv!==null?rv:"–"}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div style={C({display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px"})}>
        <div><div style={{fontWeight:700}}>🚴 30-min Bike Ride</div><div style={{fontSize:11,color:"#888"}}>Add after workout</div></div>
        <div onClick={onBike} style={{width:44,height:24,borderRadius:12,background:w.includeBike?"#00ff88":"rgba(255,255,255,0.15)",cursor:"pointer",position:"relative",transition:"background 0.2s"}}>
          <div style={{position:"absolute",top:3,left:w.includeBike?22:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s"}}/>
        </div>
      </div>

      {allDone?(
        <button style={PRI} onClick={onFinish}>COMPLETE WORKOUT ✓</button>
      ):roundDone&&r<w.rounds-1?(
        <button style={{...PRI,background:"linear-gradient(135deg,#00aaff,#0066ff)",color:"#fff"}} onClick={onNext}>NEXT ROUND →</button>
      ):(
        <button style={GHO({opacity:0.4})} disabled>LOG ALL EXERCISES TO CONTINUE</button>
      )}
    </div></div>
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────
function Summary({ workout:w, onBike, onHome, onHistory }) {
  const totalReps = w.exercises.reduce((s,ex)=>s+ex.completedRounds.reduce((a,r)=>a+(r||0),0),0);
  const lc = LEVEL_COLORS[w.level];
  return (
    <div style={R}><div style={BG}/><div style={W}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:52}}>🎯</div>
        <h2 style={{color:"#00ff88",fontSize:26,fontWeight:900,margin:"8px 0 4px"}}>MISSION COMPLETE</h2>
        <p style={{color:"#888",fontSize:13}}>{dateLong(w.date)}</p>
        <div style={{marginTop:6}}>
          <span style={{color:lc,fontSize:12,fontWeight:700}}>{LEVEL_LABELS[w.level]}</span>
          <span style={{color:"#555",fontSize:12}}> · {w.type.charAt(0).toUpperCase()+w.type.slice(1)} · {w.duration_target} min</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
        {[["⏱",fmtDur(w.duration||0),"ACTUAL TIME"],["🔁",w.rounds,"ROUNDS"],["💥",totalReps,"TOTAL REPS"]].map(([icon,val,lbl])=>(
          <div key={lbl} style={{...C(),textAlign:"center",padding:"14px 8px",marginBottom:0}}>
            <div style={{fontSize:20}}>{icon}</div>
            <div style={{fontSize:18,fontWeight:900,color:"#00ff88"}}>{val}</div>
            <div style={{fontSize:10,color:"#888",letterSpacing:1}}>{lbl}</div>
          </div>
        ))}
      </div>
      {w.includeBike&&(
        <div style={C({padding:"14px 16px",marginBottom:16})}>
          <div style={{fontWeight:700,marginBottom:8}}>🚴 30-Min Bike Ride</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={onBike} style={{width:44,height:24,borderRadius:12,background:w.bikeCompleted?"#00ff88":"rgba(255,255,255,0.15)",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
              <div style={{position:"absolute",top:3,left:w.bikeCompleted?22:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s"}}/>
            </div>
            <span style={{color:w.bikeCompleted?"#00ff88":"#888",fontSize:14}}>{w.bikeCompleted?"Bike ride completed ✓":"Mark as completed"}</span>
          </div>
        </div>
      )}
      <div style={C()}>
        <div style={{fontWeight:700,marginBottom:10,fontSize:12,letterSpacing:1}}>EXERCISE BREAKDOWN</div>
        {w.exercises.map((ex,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid rgba(255,255,255,0.06)",alignItems:"center"}}>
            <span style={{color:"#ccc",fontSize:13}}>{ex.icon} {ex.name}</span>
            <div style={{display:"flex",gap:4}}>
              {ex.completedRounds.map((r,ri)=>(
                <span key={ri} style={{fontSize:11,borderRadius:8,padding:"1px 7px",background:r!==null?"rgba(0,255,136,0.08)":"rgba(255,255,255,0.04)",color:r!==null?"#00ff88":"#555"}}>{r!==null?r:"–"}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button style={PRI} onClick={onHome}>NEW WORKOUT</button>
      <button style={GHO()} onClick={onHistory}>📋 VIEW HISTORY</button>
    </div></div>
  );
}

// ── History ───────────────────────────────────────────────────────────────────
function History({ history, onBack, onSelect, onClear }) {
  return (
    <div style={R}><div style={BG}/><div style={W}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button style={GHO({width:"auto",padding:"6px 14px",marginBottom:0})} onClick={onBack}>← BACK</button>
        <h2 style={{color:"#fff",fontSize:18,fontWeight:900}}>HISTORY</h2>
        {history.length>0
          ? <button style={GHO({width:"auto",padding:"6px 14px",marginBottom:0,color:"#ff6b35",borderColor:"#ff6b35"})} onClick={()=>window.confirm("Clear all history?")&&onClear()}>CLEAR</button>
          : <div style={{width:60}}/>}
      </div>
      {!history.length?(
        <div style={{textAlign:"center",color:"#555",padding:40}}><div style={{fontSize:40}}>📋</div><p>No workouts yet. Start training!</p></div>
      ):history.map((w,i)=>{
        const tr=w.exercises.reduce((s,ex)=>s+ex.completedRounds.reduce((a,r)=>a+(r||0),0),0);
        const lc=LEVEL_COLORS[w.level]||"#888";
        return (
          <div key={w.id} style={C({cursor:"pointer",padding:"14px 16px"})} onClick={()=>onSelect(w)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:800,fontSize:15}}>{w.type==="military"?"🎖":"🔄"} {w.type.charAt(0).toUpperCase()+w.type.slice(1)}</div>
                <div style={{marginTop:3}}><span style={{color:lc,fontSize:11,fontWeight:700}}>{(w.level||"").toUpperCase()}</span> <span style={{color:"#555",fontSize:11}}>· {w.duration_target||"?"} min</span></div>
                <div style={{color:"#888",fontSize:12,marginTop:2}}>{dateStr(w.date)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#00ff88",fontWeight:800}}>{fmtDur(w.duration||0)}</div>
                <div style={{fontSize:11,color:"#888"}}>{tr} reps · {w.rounds}R</div>
              </div>
            </div>
            <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
              {w.exercises.slice(0,4).map((ex,j)=>(
                <span key={j} style={{fontSize:11,color:"#aaa",background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"2px 8px"}}>{ex.icon} {ex.name}</span>
              ))}
              {w.exercises.length>4&&<span style={{fontSize:11,color:"#555"}}>+{w.exercises.length-4} more</span>}
              {w.bikeCompleted&&<span style={{fontSize:11,color:"#00aaff",background:"rgba(0,170,255,0.1)",borderRadius:10,padding:"2px 8px"}}>🚴 Bike</span>}
            </div>
          </div>
        );
      })}
    </div></div>
  );
}

// ── Detail ────────────────────────────────────────────────────────────────────
function Detail({ workout:w, onBack }) {
  const lc=LEVEL_COLORS[w.level]||"#888";
  return (
    <div style={R}><div style={BG}/><div style={W}>
      <button style={GHO({width:"auto",padding:"6px 14px",marginBottom:16})} onClick={onBack}>← BACK</button>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
          <span style={{color:lc,fontSize:12,fontWeight:700,letterSpacing:1}}>{(w.level||"").toUpperCase()}</span>
          <span style={{color:"#555"}}>·</span>
          <span style={{color:"#888",fontSize:12}}>{w.type.charAt(0).toUpperCase()+w.type.slice(1)} · {w.duration_target||"?"} min</span>
        </div>
        <h2 style={{color:"#fff",fontSize:22,fontWeight:900,margin:"0 0 4px"}}>{dateLong(w.date)}</h2>
        <div style={{color:"#00ff88",fontWeight:700}}>⏱ {fmtDur(w.duration||0)} · {w.rounds} rounds</div>
      </div>
      {w.exercises.map((ex,i)=>(
        <div key={i} style={C({padding:"12px 14px",marginBottom:8})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:700}}>{ex.icon} {ex.name}</div>
            <div style={{fontSize:12,color:"#888"}}>Target: {ex.target}{ex.type==="reps"?" reps":"s"}</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            {ex.completedRounds.map((r,ri)=>(
              <div key={ri} style={{flex:1,textAlign:"center",background:r!==null?"rgba(0,255,136,0.1)":"rgba(255,255,255,0.04)",borderRadius:8,padding:"6px 4px",border:`1px solid ${r!==null?"rgba(0,255,136,0.2)":"rgba(255,255,255,0.06)"}`,minWidth:32}}>
                <div style={{fontSize:10,color:"#888",marginBottom:2}}>R{ri+1}</div>
                <div style={{fontWeight:800,color:r!==null?"#00ff88":"#555",fontSize:14}}>{r!==null?r:"–"}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {w.bikeCompleted&&(
        <div style={C({padding:"12px 14px",background:"rgba(0,170,255,0.08)",border:"1px solid rgba(0,170,255,0.2)"})}>
          🚴 <span style={{color:"#00aaff",fontWeight:700}}>30-min bike ride completed</span>
        </div>
      )}
    </div></div>
  );
}
