import React, { useEffect, useRef } from 'react';

const CODE_SYMBOLS = ['</>', '{ }', 'const', 'git', 'React', '010101', '=>', '[ ]', 'async', 'fn()', 'deploy', 'JSX', 'state', 'npm', 'API'];
const CLICK_SNIPPETS = [
  'console.log("Clicked!")',
  'deploy()',
  '<Developer />',
  '{ status: 200 }',
  'git push origin main',
  'npm run dev',
  'async function()',
  'Promise.resolve(true)',
  'import { Skill }',
  'HTTP 200 OK',
  'const dev = true;'
];

export const DeveloperBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768 || matchMedia('(pointer: coarse)').matches;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 100 : 180
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Background floating code particles
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 10 + 10;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
        this.opacity = Math.random() * 0.25 + 0.12;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.008;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        if (mouse.x > 0) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        let currentOpacity = this.opacity;
        if (mouse.x > 0) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            currentOpacity = Math.min(0.75, this.opacity + (1 - dist / mouse.radius) * 0.4);
          }
        }

        ctx.fillStyle = `rgba(20, 184, 166, ${currentOpacity})`;
        ctx.font = `bold ${this.size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const particleCount = isMobile ? 12 : Math.min(36, Math.floor((width * height) / 30000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Slow, elegant click effects array
    const clickEffects = [];

    const handleWindowClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // 1. Slow teal shockwave expansion ring
      clickEffects.push({
        type: 'ring',
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: isMobile ? 90 : 140,
        opacity: 0.9,
        color: '20, 184, 166',
        speed: 0.04
      });

      // 2. Slow purple secondary echo ring
      clickEffects.push({
        type: 'ring',
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: isMobile ? 130 : 190,
        opacity: 0.7,
        color: '168, 85, 247',
        speed: 0.03
      });

      // 3. Slower floating developer code snippets burst
      const numSnippets = isMobile ? 3 : 5;
      for (let i = 0; i < numSnippets; i++) {
        const angle = (Math.PI * 2 * i) / numSnippets + (Math.random() - 0.5);
        const speed = Math.random() * 0.8 + 0.6; // Much slower velocity for smooth slow-motion floating
        const text = CLICK_SNIPPETS[Math.floor(Math.random() * CLICK_SNIPPETS.length)];
        clickEffects.push({
          type: 'code',
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6, // Slow upward float
          text,
          opacity: 1,
          color: i % 2 === 0 ? '45, 212, 191' : '192, 132, 252'
        });
      }
    };

    window.addEventListener('click', handleWindowClick, { passive: true });

    // Render loop
    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (!isMobile && mouse.x > 0) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            const lineAlpha = (1 - dist / 140) * 0.22;
            ctx.strokeStyle = `rgba(20, 184, 166, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Process Slow Click Effects
      for (let i = clickEffects.length - 1; i >= 0; i--) {
        const fx = clickEffects[i];

        if (fx.type === 'ring') {
          // Slow expansion loop (~2.0 seconds)
          fx.radius += (fx.maxRadius - fx.radius) * fx.speed + 0.6;
          fx.opacity -= 0.007; // Slow fade out

          if (fx.opacity <= 0 || fx.radius >= fx.maxRadius - 2) {
            clickEffects.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, fx.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${fx.color}, ${fx.opacity})`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${fx.color}, ${fx.opacity})`;
          ctx.stroke();
          ctx.restore();
        } else if (fx.type === 'code') {
          // Slow floating text loop (~2.5 seconds)
          fx.x += fx.vx;
          fx.y += fx.vy;
          fx.vy -= 0.003; // Gentle upward drift
          fx.opacity -= 0.006; // Slow opacity decay

          if (fx.opacity <= 0) {
            clickEffects.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.font = 'bold 12px monospace';
          ctx.fillStyle = `rgba(${fx.color}, ${fx.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${fx.color}, ${fx.opacity})`;
          ctx.fillText(fx.text, fx.x, fx.y);
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 dark:opacity-75 no-print"
    />
  );
};
