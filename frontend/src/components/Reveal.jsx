import React, { useEffect, useRef } from "react";
export default function Reveal({ children, delay=0 }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setTimeout(()=> el.classList.add("visible"), delay); io.disconnect(); }
    }, { threshold:.2 });
    io.observe(el); return ()=> io.disconnect();
  },[delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}
