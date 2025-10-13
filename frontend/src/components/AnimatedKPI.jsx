import React, { useEffect, useRef, useState } from "react";

export default function AnimatedKPI({ value=100, suffix="", duration=900, format=v=>v }){
  const [num,setNum] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting && !started.current){
        started.current = true;
        const start = performance.now();
        const step = (now)=>{
          const t = Math.min(1, (now-start)/duration);
          setNum(Math.round(value*t));
          if(t<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold:.3 });
    io.observe(el); return ()=> io.disconnect();
  },[value,duration]);

  return <span ref={ref}>{format(num)}{suffix}</span>;
}
