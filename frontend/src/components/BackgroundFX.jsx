import React, { useEffect, useRef } from "react";

/** Soft particles + 3 floating blobs. Sits behind all content. */
export default function BackgroundFX(){
  const ref = useRef(null);

  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext("2d");
    let w, h, raf, particles=[];

    const resize = ()=>{
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      particles = Array.from({length: Math.min(90, Math.floor(w/20))}).map(()=>({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6 + .4,
        a: Math.random()*Math.PI*2,
        s: Math.random()*0.5 + 0.2
      }));
    };
    const tick = ()=>{
      ctx.clearRect(0,0,w,h);
      ctx.globalAlpha = .7;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#06b6d4";
      particles.forEach(p=>{
        p.x += Math.cos(p.a)*p.s; p.y += Math.sin(p.a)*p.s; p.a += (Math.random()-.5)*0.05;
        if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    resize(); tick();
    window.addEventListener("resize", resize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  },[]);

  return (
    <>
      {/* floating gradient blobs */}
      <div className="blob" style={{top:80,left:-40,width:260,height:260}}/>
      <div className="blob" style={{bottom:120,right:-60,width:300,height:300}}/>
      <div className="blob" style={{top:350,right:240,width:220,height:220}}/>
      {/* particles canvas */}
      <canvas ref={ref} style={{position:"fixed", inset:0, zIndex:0, opacity:.25}} />
      {/* tiny noise overlay */}
      <div className="noise-overlay" />
    </>
  );
}
