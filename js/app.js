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
          <div class="social-badge-container">
            <a href="https://www.instagram.com/niveditahakkapakki?igsh=M21lcG9ocTFjeTNy" target="_blank" class="social-badge" style="font-size: 0.8rem; padding: 6px 12px;">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.42.419.679.818.896 1.377.163.422.358 1.057.412 2.227.059 1.266.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.419.42-.818.679-1.377.896-.422.163-1.057.358-2.227.412-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.818-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.419-.42.818-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.266-.059 1.646-.071 4.85-.071zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.283 1.347 20.615.935 19.825.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span>@niveditahakkapakki</span>
            </a>
            <a href="https://www.linkedin.com/in/nivedita-hakkapakki-88595460" target="_blank" class="social-badge" style="font-size: 0.8rem; padding: 6px 12px;">
              <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>Nivedita Hakkapakki</span>
            </a>
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
