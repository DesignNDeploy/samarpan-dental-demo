/* ============================================================
   SAMARPAN DENTAL CLINIC — Main JavaScript
   File: js/main.js
   Purpose: Navigation, scroll animations, accordion, form, toast
   ============================================================ */

'use strict';

/* ════════════════════════════════════════
   UTILITY FUNCTIONS
   ════════════════════════════════════════ */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const debounce = (fn, delay = 100) => {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
};

/* ════════════════════════════════════════
   NAVIGATION — Sticky Header + Scroll Effect
   ════════════════════════════════════════ */
const initNavigation = () => {
  const header = $('.site-header');
  const toggleBtn = $('.mobile-menu-toggle');
  const mobileNav = $('.mobile-nav');

  if (!header) return;

  // Add transparent class initially
  header.classList.add('site-header--transparent');

  const handleScroll = debounce(() => {
    if (window.scrollY > 60) {
      header.classList.add('site-header--scrolled');
      header.classList.remove('site-header--transparent');
    } else {
      header.classList.remove('site-header--scrolled');
      header.classList.add('site-header--transparent');
    }
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // Mobile menu toggle
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close mobile nav on link click
  $$('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('is-open');
      toggleBtn?.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = $(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 20;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // Active nav link highlight on scroll
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link[href^="#"]');

  const highlightNav = debounce(() => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  }, 50);

  window.addEventListener('scroll', highlightNav, { passive: true });
};

/* ════════════════════════════════════════
   SCROLL ANIMATIONS — Intersection Observer
   ════════════════════════════════════════ */
const initScrollAnimations = () => {
  const elements = $$('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
};

/* ════════════════════════════════════════
   ACCORDION — FAQ
   ════════════════════════════════════════ */
const initAccordion = () => {
  const triggers = $$('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');

      // Close all
      $$('.accordion-item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  // Open first item by default
  const first = $('.accordion-item');
  if (first) {
    first.classList.add('is-open');
    first.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'true');
  }
};

/* ════════════════════════════════════════
   COUNTER ANIMATION — Trust Numbers
   ════════════════════════════════════════ */
const initCounters = () => {
  const counters = $$('[data-counter]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current).toLocaleString('en-IN') + (el.dataset.suffix || '');
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
};

/* ════════════════════════════════════════
   TOAST NOTIFICATIONS
   ════════════════════════════════════════ */
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'success', duration = 4000) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }
};

/* ════════════════════════════════════════
   APPOINTMENT FORM
   ════════════════════════════════════════ */
const initBookingForm = () => {
  const form = $('#booking-form');
  if (!form) return;

  const validateField = (input) => {
    const value = input.value.trim();
    const name = input.name;
    let error = '';

    if (input.required && !value) {
      error = 'This field is required.';
    } else if (name === 'phone' && value && !/^[6-9]\d{9}$/.test(value)) {
      error = 'Please enter a valid 10-digit Indian mobile number.';
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address.';
    }

    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');
    if (errorEl) errorEl.textContent = error;
    input.classList.toggle('form-input--error', !!error);
    return !error;
  };

  // Real-time validation on blur
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('form-input--error')) validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const inputs = [...form.querySelectorAll('input[required], select[required], textarea[required]')];
    const valid = inputs.every(input => validateField(input));
    if (!valid) {
      Toast.show('Please fix the errors above before submitting.', 'error');
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual backend call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    Toast.show('🎉 Appointment request sent! We\'ll confirm via WhatsApp within minutes.', 'success', 6000);
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Log to console for now — replace with fetch() to backend
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
  });
};

/* ════════════════════════════════════════
   TABS — Service Detail Tabs
   ════════════════════════════════════════ */
const initTabs = () => {
  const tabGroups = $$('[data-tabs]');

  tabGroups.forEach(group => {
    const triggers = $$('[data-tab]', group);
    const panels = $$('[data-tab-panel]', group);

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const target = trigger.dataset.tab;

        triggers.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));

        trigger.classList.add('is-active');
        $(`[data-tab-panel="${target}"]`, group)?.classList.add('is-active');
      });
    });
  });
};

/* ════════════════════════════════════════
   WHATSAPP BUTTON
   ════════════════════════════════════════ */
const initWhatsApp = () => {
  const btn = $('.whatsapp-float__btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const phone = '91XXXXXXXXXX'; // Replace with actual number
    const message = encodeURIComponent('Hi, I would like to book an appointment at Samarpan Dental Clinic.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  });
};

/* ════════════════════════════════════════
   BACK TO TOP
   ════════════════════════════════════════ */
const initBackToTop = () => {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);

  const toggleVisibility = debounce(() => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, 100);

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* ════════════════════════════════════════
   LAZY LOADING IFRAMES
   ════════════════════════════════════════ */
const initLazyIframes = () => {
  const iframes = $$('iframe[data-src]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  }, { rootMargin: '200px' });

  iframes.forEach(iframe => observer.observe(iframe));
};

/* ════════════════════════════════════════
   SERVICE CARD — Read More Toggle
   ════════════════════════════════════════ */
const initServiceCards = () => {
  $$('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.dataset.service;
      if (serviceId) {
        const section = $(`#service-${serviceId}`);
        if (section) {
          const offset = 100;
          window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
        }
      }
    });
  });
};

/* ════════════════════════════════════════
   INIT ALL ON DOM READY
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  initNavigation();
  initScrollAnimations();
  initAccordion();
  initCounters();
  initBookingForm();
  initTabs();
  initWhatsApp();
  initBackToTop();
  initLazyIframes();
  initServiceCards();

  console.log('🦷 Samarpan Dental Clinic — Website Loaded');
});

/* ── Back to Top Button CSS injected via JS ── */
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
  .back-to-top {
    position: fixed;
    bottom: 100px;
    right: 28px;
    z-index: var(--z-sticky);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    box-shadow: var(--shadow-md);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    pointer-events: none;
  }
  .back-to-top.is-visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .back-to-top:hover {
    background: var(--color-primary-dark);
    transform: translateY(-3px);
  }
  .nav-link--active {
    color: var(--color-primary) !important;
    background: var(--color-primary-xlight);
  }
  .form-input--error {
    border-color: var(--color-error) !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
  }
  @keyframes toast-out {
    to { transform: translateX(120%); opacity: 0; }
  }
`;
document.head.appendChild(backToTopStyle);
