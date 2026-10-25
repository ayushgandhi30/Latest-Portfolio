import { useState, useEffect, useRef } from 'react';

const TECH_ROTATION = ['Express.js', 'React.js', 'Next.js', 'Node.js', 'TypeScript'];

export default function Home() {
  const [techIndex, setTechIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  // Rotate technologies smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setTechIndex((prev) => (prev + 1) % TECH_ROTATION.length);
        setIsAnimating(false);
      }, 250);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Interactive Dot Grid Canvas
  useEffect(() => {
    // Interactive Dot Grid Canvas & Cursor Follower Circle
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dotSpacing = 34;
    let dots = [];
    let shockwaves = [];
    let circleRingPulse = 1.0;

    const initDots = () => {
      const width = canvas.parentElement.offsetWidth;
      const height = canvas.parentElement.offsetHeight;
      dots = [];
      for (let x = dotSpacing; x < width; x += dotSpacing) {
        for (let y = dotSpacing; y < height; y += dotSpacing) {
          dots.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement.offsetWidth * dpr;
      canvas.height = canvas.parentElement.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      initDots();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial position for the circle (top-left accent, matching screenshot)
    let circleX = 80;
    let circleY = 55;
    let targetX = 80;
    let targetY = 55;
    let hasUserMoved = false;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      hasUserMoved = true;
      mousePosRef.current = { x: targetX, y: targetY };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    // Click handler to trigger outward spread animation for all dots
    const handlePointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Only trigger if click is inside the Home section viewport
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      circleRingPulse = 1.5;

      // Add expanding ripple shockwave
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 1.3,
        speed: 9,
        waveWidth: 30,
        strength: 20,
      });

      // Immediate smooth burst displacement spreading all dots outward from click
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - clickX;
        const dy = dot.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Disperse dots outward smoothly based on distance
        const push = Math.min(38, 4000 / (dist + 95));
        dot.x += (dx / dist) * push;
        dot.y += (dy / dist) * push;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('pointerdown', handlePointerDown);

    let angle = 0;

    const render = () => {
      const width = canvas.parentElement.offsetWidth;
      const height = canvas.parentElement.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      angle += 0.02;

      // Smoothly glide circle towards cursor pointer (lerp)
      if (hasUserMoved) {
        circleX += (targetX - circleX) * 0.12;
        circleY += (targetY - circleY) * 0.12;
      }

      // Propagate shockwave ripples
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const wave = shockwaves[s];
        wave.radius += wave.speed;

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = dot.originX - wave.x;
          const dy = dot.originY - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - wave.radius);

          if (diff < wave.waveWidth) {
            const factor = (1 - diff / wave.waveWidth) * Math.max(0, 1 - wave.radius / wave.maxRadius);
            const push = factor * wave.strength * 0.22;
            dot.x += (dx / (dist || 1)) * push;
            dot.y += (dy / (dist || 1)) * push;
          }
        }

        // Draw faint expanding ring
        const progress = wave.radius / wave.maxRadius;
        if (progress < 1) {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.28 * (1 - progress)})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        if (wave.radius > wave.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Smoothly ease dots directly back to origin with ZERO bounce (exponential lerp)
      const easeSpeed = 0.075;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.x += (dot.originX - dot.x) * easeSpeed;
        dot.y += (dot.originY - dot.y) * easeSpeed;

        const dx = circleX - dot.x;
        const dy = circleY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;

        let radius = 1.3;
        let color = '#dcdfe5'; // Subtle neutral dot

        if (dist < maxDist) {
          const factor = 1 - dist / maxDist;
          radius = 1.3 + factor * 2.8;
          color = `rgba(37, 99, 235, ${0.25 + factor * 0.75})`;
        }

        // Enhance size and color if dot is displaced, fading smoothly as it settles
        const offset = Math.hypot(dot.x - dot.originX, dot.y - dot.originY);
        if (offset > 0.8) {
          const offsetFactor = Math.min(1, offset / 18);
          radius = Math.max(radius, 1.3 + offsetFactor * 2.5);
          color = `rgba(37, 99, 235, ${0.3 + offsetFactor * 0.7})`;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Draw the accent ring that moves according to cursor pointer
      circleRingPulse += (1.0 - circleRingPulse) * 0.1;
      const orbitRadius = 26 * circleRingPulse;

      // Outer circle outline matching screenshot
      ctx.beginPath();
      ctx.arc(circleX, circleY, orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Subtle translucent inner fill
      ctx.beginPath();
      ctx.arc(circleX, circleY, orbitRadius - 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.04)';
      ctx.fill();

      // Orbiting dot on the circle outline
      const dotOrbitX = circleX + Math.cos(angle) * orbitRadius;
      const dotOrbitY = circleY + Math.sin(angle) * orbitRadius;
      ctx.beginPath();
      ctx.arc(dotOrbitX, dotOrbitY, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-[var(--bg)]">
      {/* Interactive Background Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gray-200/80 bg-white/90 shadow-2xs text-xs font-medium text-[var(--ink)] mb-8 transition-transform hover:scale-[1.02]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>

            {/* Sub-headline with dynamic rotating tech */}
            <div className="text-2xl md:text-3xl font-bold text-[var(--ink)] mb-2 flex items-center gap-2 flex-wrap">
              <span>I build with</span>
              <span
                className={`text-[var(--acc)] transition-all duration-300 transform inline-block ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
              >
                {TECH_ROTATION[techIndex]}
              </span>
            </div>

            {/* Main Bold Name Display */}
            <h1 className="text-6xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[0.92] my-2 select-none">
              Ayush <br /> Gandhi
            </h1>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-[var(--mute)] max-w-xl leading-relaxed">
              Full-stack developer from Vadodara. I turn ideas into fast, reliable
              web products, from database schema to pixel-level UI.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="px-8 py-3.5 rounded-full bg-[var(--ink)] text-white font-medium text-sm hover:bg-black transition-all duration-200 shadow-sm hover:shadow active:scale-95"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full bg-white border border-gray-300 text-[var(--ink)] font-medium text-sm hover:border-[var(--ink)] hover:bg-gray-50/50 transition-all duration-200 active:scale-95"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Right Column: Code Card & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Floating Badge: Top-Right (Next.js) */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 z-20 animate-float-1">
                <div className="bg-white border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.06)] px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-105 select-none">
                  Next.js
                </div>
              </div>

              {/* Floating Badge: Middle-Left (MongoDB) */}
              <div className="absolute top-[70%] -left-4 sm:-left-7 md:-left-20 lg:-left-20 -translate-y-1/2 z-20 animate-float-2">
                <div className="bg-white border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.06)] px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-105 select-none">
                  MongoDB
                </div>
              </div>

              {/* Floating Badge: Bottom-Right (TypeScript) */}
              <div className="absolute -bottom-4 right-6 sm:right-8 md:right-10 md:-bottom-5 z-20 animate-float-3">
                <div className="bg-white border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.06)] px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-105 select-none">
                  TypeScript
                </div>
              </div>

              {/* Code Editor Window Card */}
              <div className="bg-white rounded-3xl md:rounded-[28px] border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.07)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.11)]">
                {/* Window Header */}
                <div className="px-5 py-3.5 bg-slate-50/80 flex items-center gap-2.5 border-b border-slate-100/70">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  </div>
                  <span className="ml-3 font-mono text-xs sm:text-sm text-slate-500 font-medium">
                    developer.ts
                  </span>
                </div>

                {/* Code Window Body */}
                <div className="p-6 sm:p-7 md:p-8 font-mono text-xs sm:text-sm md:text-base leading-relaxed md:leading-[1.85] text-slate-800 overflow-x-auto">
                  <pre className="space-y-0.5">
                    <code>
                      <span className="text-[#8b5cf6] font-medium">const</span>{' '}
                      <span>developer</span> = {'{'}
                    </code><br />
                    <code>
                      {'  '}<span>name</span>: <span className="text-[#2563eb]">"Ayush Gandhi"</span>,
                    </code><br />
                    <code>
                      {'  '}<span>role</span>: <span className="text-[#2563eb]">"Full-Stack Developer"</span>,
                    </code><br />
                    <code>
                      {'  '}<span>stack</span>: [
                      <span className="text-[#2563eb]">"Next.js"</span>,{' '}
                      <span className="text-[#2563eb]">"Express.js"</span>,{' '}
                      <span className="text-[#2563eb]">"MongoDB"</span>,
                    </code><br />
                    <code>
                      <span className="text-[#2563eb]">"TypeScript"</span>],
                    </code><br />
                    <code>
                      {'  '}<span>location</span>: <span className="text-[#2563eb]">"Vadodara, India"</span>,
                    </code><br />
                    <code>
                      {'  '}<span>openToWork</span>:{' '}
                      <span className="text-[#8b5cf6] font-medium">true</span>,
                    </code><br />
                    <code>{'};'}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics / Stats Section */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-gray-100/80 grid grid-cols-3 gap-6 max-w-lg">
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              10+
            </div>
            <div className="text-xs md:text-sm text-[var(--mute)] mt-1 font-medium">
              Projects shipped
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              6+
            </div>
            <div className="text-xs md:text-sm text-[var(--mute)] mt-1 font-medium">
              Months in industry
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              MERN
            </div>
            <div className="text-xs md:text-sm text-[var(--mute)] mt-1 font-medium">
              Core stack
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Hint (matching screenshot) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-6 text-xs text-[var(--mute)]/80 select-none">
        Move your cursor over the dots
      </div>
    </section>
  );
}
