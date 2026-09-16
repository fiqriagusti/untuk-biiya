// ═══════════ ENVELOPE INTERACTION ═══════════
const envelope = document.getElementById("hero-envelope");
const heroReveal = document.getElementById("hero-reveal");
const tapHint = document.getElementById("tap-hint");
let envelopeOpened = false;

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelope.classList.add("opened");
  tapHint.style.display = "none";
  setTimeout(() => {
    heroReveal.style.display = "block";
    heroReveal.style.animation = "fadeSlideUp 0.6s ease forwards";
  }, 600);
});

document.getElementById("hero-envelope").addEventListener("click", function () {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = 0.50;
  bgMusic.play();
});


// ═══════════ LIVE COUNTER ═══════════
const startDate = new Date("1999-10-18T00:00:00").getTime();

function updateCounter() {
  const now = Date.now();
  let diff = now - startDate;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  const start = new Date(startDate);
  const nowDate = new Date(now);

  let years = nowDate.getFullYear() - start.getFullYear();
  let months = nowDate.getMonth() - start.getMonth();
  let days = nowDate.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Heartbeats at ~72 bpm
  const heartbeats = Math.floor(totalSeconds * 1.2);

  const elYears = document.getElementById("c-years");
  if (elYears) elYears.textContent = years;
  document.getElementById("c-months").textContent = months;
  document.getElementById("c-days").textContent = days;
  document.getElementById("c-hours").textContent = hours;
  document.getElementById("c-minutes").textContent = minutes;
  document.getElementById("c-seconds").textContent = seconds;
  document.getElementById("c-heartbeats").textContent =
    heartbeats.toLocaleString();
}

setInterval(updateCounter, 1000);
updateCounter();

// ═══════════ SCROLL ANIMATIONS ═══════════
const sections = document.querySelectorAll(".section");
const sectionInners = document.querySelectorAll(".section-inner");
const navDots = document.querySelectorAll(".nav-dot");
const progressBar = document.getElementById("scroll-progress");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";

  // Section visibility
  sectionInners.forEach((inner, i) => {
    const rect = sections[i].getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
      inner.classList.add("visible");
    }
  });

  // Active nav dot
  let currentSection = 0;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      currentSection = i;
    }
  });
  navDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSection);
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Nav dot click
navDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.dataset.section);
    sections[idx].scrollIntoView({ behavior: "smooth" });
  });
});

// ═══════════ FLIP CARDS ═══════════
document.querySelectorAll(".thing-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// ═══════════ FLOATING HEARTS ═══════════
const heartsContainer = document.getElementById("floating-hearts");
const heartEmojis = ["🌙", "🌙", "🌟", "🌟", "🪐", "🪐", "🔆", "🔆"];

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "float-heart";
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 94 + "%";
  heart.style.fontSize = 0.6 + Math.random() * 0.8 + "rem";
  heart.style.animationDuration = 8 + Math.random() * 12 + "s";
  heart.style.animationDelay = Math.random() * 3 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 25000);
}

setInterval(createHeart, 2000);
// Create initial batch
for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 400);

// ═══════════ PARTICLE CANVAS ═══════════
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() > 0.5 ? 330 : 280; // pink or lavender
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 60%, 75%, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ═══════════ SPARKLE CURSOR ═══════════
let sparkleThrottle = 0;
document.addEventListener("mousemove", (e) => {
  sparkleThrottle++;
  if (sparkleThrottle % 5 !== 0) return;

  // Clamp position to prevent edge overflow
  const maxX = window.innerWidth - 20;
  const maxY = window.innerHeight - 20;
  const sx = Math.min(e.clientX, maxX);
  const sy = Math.min(e.clientY, maxY);

  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.textContent = ["✦", "✧", "·", "♡"][Math.floor(Math.random() * 4)];
  sparkle.style.left = sx + "px";
  sparkle.style.top = sy + "px";
  sparkle.style.color = `hsl(${330 + Math.random() * 30}, 60%, 70%)`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});
