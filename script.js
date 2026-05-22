(() => {
  'use strict';

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    primaryNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Read-more (story) ----------
  document.querySelectorAll('.read-more-toggle').forEach(btn => {
    const more = btn.parentElement.querySelector('.story-more');
    if (!more) return;
    btn.addEventListener('click', () => {
      const isOpen = !more.hasAttribute('hidden');
      if (isOpen) {
        more.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        more.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- Profile modal ----------
  const profileData = (() => {
    const el = document.getElementById('profile-data');
    if (!el) return {};
    try { return JSON.parse(el.textContent); } catch { return {}; }
  })();

  const modal = document.getElementById('profile-modal');
  const modalContent = document.getElementById('modal-content');
  let lastTrigger = null;

  function openProfile(id, trigger) {
    const data = profileData[id];
    if (!data || !modal || !modalContent) return;
    lastTrigger = trigger;
    modalContent.innerHTML = `
      <span class="modal-emoji" aria-hidden="true">${data.emoji}</span>
      <h2 id="modal-title">${data.title}</h2>
      ${data.sections.map(([h, p]) => `<h3>${h}</h3><p>${p}</p>`).join('')}
    `;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(el) {
    el.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastTrigger && el === modal) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-profile');
      openProfile(id, card);
    });
  });

  // ---------- Lightbox (infographic) ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const infographicTrigger = document.querySelector('.infographic-trigger');
  if (infographicTrigger && lightbox && lightboxImg) {
    infographicTrigger.addEventListener('click', () => {
      const img = infographicTrigger.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      const closeBtn = lightbox.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
      lastTrigger = infographicTrigger;
    });
  }

  // ---------- Close on backdrop / [data-close] / Esc ----------
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', e => {
      const overlay = e.target.closest('.modal, .lightbox');
      if (overlay) closeModal(overlay);
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal && !modal.hasAttribute('hidden')) closeModal(modal);
    if (lightbox && !lightbox.hasAttribute('hidden')) closeModal(lightbox);
  });

  // ---------- Scroll-reveal animation ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.section-head, .pillar, .profile-card, .reason, .impact-grid li, .price-card, .impact-longterm, .faq-list details, .contact-info, .infographic-trigger'
    );
    targets.forEach(t => t.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));
  }
})();
