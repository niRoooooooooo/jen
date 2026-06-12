"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    const CREAM = "#f5f0e8";
    const GOLD = "#8b5a1f";
    const LGOLD = "#c49a2a";
    const TAN = "#d4c4a8";

    let W = container.offsetWidth;
    let H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    let T = 0;
    let last: number | null = null;
    const mouse = { x: W / 2, y: H / 2 };
    const ripples: Array<{
      x: number; y: number; r: number;
      maxR: number; alpha: number; speed: number;
    }> = [];

    /* ── DOT GRID ── */
    type GridPt = { ox: number; oy: number; x: number; y: number };
    let gridPts: GridPt[] = [];
    function buildGrid() {
      gridPts = [];
      for (let x = 28; x < W; x += 28)
        for (let y = 28; y < H; y += 28)
          gridPts.push({ ox: x, oy: y, x, y });
    }
    buildGrid();

    /* ── PARTICLES ── */
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.08,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.2 + Math.random() * 0.45,
    }));

    /* ── LIGHT RAYS ── */
    const rays = Array.from({ length: 9 }, (_, i) => ({
      angle: -0.65 + i * 0.17,
      width: 35 + Math.random() * 55,
      speed: 0.00007 + Math.random() * 0.00005,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.06 + Math.random() * 0.05,
    }));

    /* ── RIBBONS ── */
    type Ribbon = {
      phase: number; speed: number; amp: number;
      yBase: number; alpha: number; width: number; color: string;
    };
    let ribbons: Ribbon[] = [];
    function buildRibbons() {
      ribbons = Array.from({ length: 8 }, (_, i) => ({
        phase: i * 1.1,
        speed: 0.00018 + i * 0.00006,
        amp: H * (0.028 + i * 0.014),
        yBase: H * (0.08 + i * 0.13),
        alpha: 0.07 + (7 - i) * 0.009,
        width: 1.2 - i * 0.1,
        color: i % 2 === 0 ? GOLD : LGOLD,
      }));
    }
    buildRibbons();

    /* ── EVENT LISTENERS ── */
    /* Listen on window so z-index stacking never blocks coordinate tracking */
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      /* Only spawn ripples when click is inside the hero canvas */
      if (mx < 0 || mx > W || my < 0 || my > H) return;
      for (let k = 0; k < 3; k++) {
        ripples.push({
          x: mx, y: my,
          r: k * 18, maxR: 120 + k * 40,
          alpha: 0.6 - k * 0.15,
          speed: 2.5 + k * 0.8,
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    /* ── DRAW FUNCTIONS ── */
    function drawDotGrid() {
      for (const p of gridPts) {
        const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const R = 100;
        if (d < R) {
          const f = (1 - d / R) * 10;
          p.x = p.ox - (dx / d) * f;
          p.y = p.oy - (dy / d) * f;
        } else {
          p.x += (p.ox - p.x) * 0.12;
          p.y += (p.oy - p.y) * 0.12;
        }
        const distC = Math.sqrt((p.ox - W * 0.5) ** 2 + (p.oy - H * 0.5) ** 2);
        const fade = Math.max(0, 1 - distC / (W * 0.65));
        const near = d < R ? 1 - d / R : 0;
        ctx.save();
        ctx.globalAlpha = 0.13 + fade * 0.1 + near * 0.4;
        ctx.fillStyle = near > 0.3 ? LGOLD : GOLD;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 + near * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawRibbons() {
      for (const r of ribbons) {
        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          let y =
            r.yBase +
            Math.sin(x * 0.008 + T * r.speed * 1000 + r.phase) * r.amp +
            Math.sin(x * 0.0035 - T * r.speed * 600 + r.phase * 1.6) * r.amp * 0.42 +
            Math.sin(x * 0.016 + T * r.speed * 800 + r.phase * 0.5) * r.amp * 0.16;
          const dx = x - mouse.x, dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) y += (dy / (d + 1)) * (90 - d) * 0.4;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawParticles() {
      for (const p of pts) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          p.x -= (dx / d) * (120 - d) * 0.03;
          p.y -= (dy / d) * (120 - d) * 0.03;
        }
        p.x += p.vx + Math.sin(T * 0.00028 + p.phase) * 0.13;
        p.y += p.vy + Math.cos(T * 0.00022 + p.phase) * 0.1;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const pulse = 0.6 + 0.4 * Math.sin(T * 0.002 + p.phase);
        const near = d < 120 ? 1 - d / 120 : 0;
        ctx.save();
        ctx.globalAlpha = (p.alpha + near * 0.4) * pulse;
        ctx.fillStyle = near > 0.4 ? LGOLD : GOLD;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.r + near * 2) * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawConnections() {
      const maxD = W * 0.14;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            const mdx = mouse.x - (pts[i].x + pts[j].x) * 0.5;
            const mdy = mouse.y - (pts[i].y + pts[j].y) * 0.5;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            const boost = md < 130 ? (1 - md / 130) * 0.25 : 0;
            ctx.save();
            ctx.globalAlpha = (1 - d / maxD) * (0.15 + boost);
            ctx.strokeStyle = GOLD;
            ctx.lineWidth = 0.6 + boost * 1.2;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    function drawRays() {
      const ox = W * 1.05, oy = -H * 0.1;
      for (const r of rays) {
        const pulse = 0.5 + 0.5 * Math.sin(T * r.speed * 1000 + r.phase);
        const mx = (mouse.x / W - 0.5) * 0.12;
        ctx.save();
        ctx.globalAlpha = r.alpha * pulse;
        ctx.fillStyle = TAN;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        const a1 = r.angle + mx - r.width / 1200;
        const a2 = r.angle + mx + r.width / 1200;
        const len = W * 2.2;
        ctx.lineTo(ox + Math.cos(a1) * len, oy + Math.sin(a1) * len);
        ctx.lineTo(ox + Math.cos(a2) * len, oy + Math.sin(a2) * len);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    function drawMouseGlow() {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      g.addColorStop(0, "rgba(196,154,42,0.12)");
      g.addColorStop(0.5, "rgba(139,90,31,0.05)");
      g.addColorStop(1, "transparent");
      ctx.save();
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    function drawRipples() {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += r.speed;
        r.alpha -= 0.014;
        if (r.alpha <= 0) { ripples.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = LGOLD;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawScanLines() {
      ctx.save();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 0.4;
      for (let y = 0; y < H; y += 5) {
        ctx.globalAlpha = 0.03 + 0.012 * Math.sin(y * 0.09 + T * 0.0004);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawVignette() {
      const g = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.15, W * 0.5, H * 0.5, H);
      g.addColorStop(0, "rgba(245,240,232,0)");
      g.addColorStop(1, "rgba(175,155,125,0.32)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    /* ── ANIMATION LOOP ── */
    function loop(ts: number) {
      if (!last) last = ts;
      T += ts - last;
      last = ts;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, W, H);

      drawScanLines();
      drawRays();
      drawMouseGlow();
      drawDotGrid();
      drawRibbons();
      drawConnections();
      drawParticles();
      drawRipples();
      drawVignette();

      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    /* ── RESIZE ── */
    const ro = new ResizeObserver(() => {
      W = container.offsetWidth;
      H = container.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      buildGrid();
      buildRibbons();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
