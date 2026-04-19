/* ============================================
   AWAKELIFE COACHING — Core Application JS
   ============================================ */

// ---- Navbar Component ----
function renderNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const currentPath = window.location.pathname;
  const isActive = (path) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath === '')) return 'active';
    if (path !== '/' && currentPath.includes(path)) return 'active';
    return '';
  };
  nav.innerHTML = `
    <nav class="navbar" id="mainNav">
      <div class="container">
        <a href="/" class="nav-logo">
          <div class="nav-logo-icon">✦</div>
          AwakeLife
        </a>
        <div class="nav-links" id="navLinks">
          <a href="/" class="${isActive('/')}">Home</a>
          <a href="/about" class="${isActive('/about')}">About</a>
          <a href="/services/identity-habit" class="${isActive('/services')}">Services</a>
          <a href="/testimonials" class="${isActive('/testimonials')}">Testimonials</a>
          <a href="/resources" class="${isActive('/resources')}">Resources</a>
          <a href="https://neartail.com/sm/LdZu1Y_Gw" target="_blank"" class="btn btn-primary btn-sm">Book a Session</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;
  // Scrolled state
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

// ---- Footer Component ----
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="/" class="nav-logo" style="margin-bottom:4px">
              <div class="nav-logo-icon">✦</div>
              AwakeLife
            </a>
            <p class="footer-brand">Transform from within. Live with purpose. Guided by Nivedita Hakkapakki — empowering individuals to discover their true potential.</p>
          </div>
          <div>
            <div class="footer-title">Services</div>
            <div class="footer-links">
              <a href="/services/identity-habit">Identity & Habits</a>
              <a href="/services/mindset-resilience">Mindset & Resilience</a>
              <a href="/services/life-alignment">Life Alignment</a>
              <a href="/services/inner-awareness">Inner Awareness</a>
              <a href="/services/career-coaching">Career Coaching</a>
              <a href="/services/relationship-coaching">Relationship Coaching</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Company</div>
            <div class="footer-links">
              <a href="/about">About Nivedita</a>
              <a href="/testimonials">Testimonials</a>
              <a href="/resources">Resources</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Get in Touch</div>
            <div class="footer-links">
              <a href="mailto:nivedita.hakkapakki@gmail.com">nivedita.hakkapakki@gmail.com</a>
              <a href="tel:+918805366800">+91 8805366800</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} AwakeLife Coaching. All rights reserved.</span>
          <div class="footer-social">
            <a href="https://www.instagram.com/niveditahakkapakki?igsh=M21lcG9ocTFjeTNy" target="_blank" aria-label="Instagram">📷</a>
            <a href="https://www.linkedin.com/in/nivedita-hakkapakki-88595460" target="_blank" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ---- Counter Animation ----
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ---- Toast Notifications ----
window.showToast = function(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ---- Page Loader ----
function initLoader() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hide'), 300);
    });
  }
}

// ---- Smooth Scroll for anchor links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Parallax on hero orbs ----
function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length === 0) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 15;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// ---- Initialize All ----
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  initLoader();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initParallax();
});
