/* Portfolio JS — Fabricio Calfual */

/* ── Particle canvas ── */
(function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class P {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.4 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a  = Math.random() * 0.45 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 140) {
        this.vx += (-dx / d) * 0.03;
        this.vy += (-dy / d) * 0.03;
        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd > 1.6) { this.vx = (this.vx / spd) * 1.6; this.vy = (this.vy / spd) * 1.6; }
      }
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${this.a})`;
      ctx.fill();
    }
  }

  function build() {
    const n = Math.min(130, Math.floor((W * H) / 9500));
    particles = Array.from({ length: n }, () => new P());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${0.13 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }

  resize();
  build();
  loop();

  window.addEventListener('resize', () => { resize(); build(); }, { passive: true });
  document.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
})();

/* ── Typing animation ── */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;
  const phrases = [
    'Desarrollador Full Stack',
    'Creador de Software',
    'Solucionador de Problemas',
    'Desarrollador Freelance'
  ];
  let pi = 0, ci = 0, del = false;
  const SPD_T = 75, SPD_D = 38, PAUSE = 2200;

  function tick() {
    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; return setTimeout(tick, PAUSE); }
      setTimeout(tick, SPD_T);
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
      setTimeout(tick, SPD_D);
    }
  }
  tick();
})();

/* ── Custom cursor ── */
(function () {
  const cursor = document.getElementById('cursor');
  const dot    = document.getElementById('cursor-dot');
  if (!cursor || window.matchMedia('(hover: none)').matches) return;

  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px,${ty}px)`;
  });

  (function anim() {
    cx += (tx - cx) * 0.13;
    cy += (ty - cy) * 0.13;
    cursor.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(anim);
  })();

  document.querySelectorAll('a,button,.tag').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('chover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('chover'));
  });
})();

/* ── Scroll progress ── */
(function () {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
})();

/* ── Nav scroll + hamburger ── */
(function () {
  const nav  = document.getElementById('nav');
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  ham && ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu && menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Intersection Observer: reveals + skill bars + counters ── */
(function () {
  /* Reveal */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay * 120);
      ro.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i % 5;
    ro.observe(el);
  });

  /* Skill bars */
  const so = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.w + '%';
      so.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.sfill').forEach(f => so.observe(f));

  /* Counters */
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.n;
      let v = 0;
      const step = target / 45;
      const t = setInterval(() => {
        v = Math.min(v + step, target);
        e.target.textContent = Math.floor(v);
        if (v >= target) clearInterval(t);
      }, 28);
      co.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.sn').forEach(c => co.observe(c));
})();

/* ── Theme toggle ── */
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
})();

/* ── SDK shim ── */
try {
  const stub = {
    defaultConfig: {},
    onConfigChange: () => {},
    mapToCapabilities: () => ({}),
    mapToEditPanelValues: () => new Map()
  };
  if (window.elementSdk) window.elementSdk.init(stub);
} catch (_) {}
