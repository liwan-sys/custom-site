/* Janette Boudoir — main.js
 * Vanilla JS — sticky header, mobile nav, reveal, filters, cookie banner, back-to-top
 */
(function () {
  'use strict';

  // ---- Sticky header --------------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function () {
      if (window.scrollY > 24) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav -----------------------------------------------------------
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Reveal on scroll -----------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Category filter (boutique) ------------------------------------------
  const chips = document.querySelectorAll('.filter-chip');
  const items = document.querySelectorAll('[data-category]');
  if (chips.length && items.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const target = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        items.forEach(function (item) {
          const cats = (item.getAttribute('data-category') || '').split(' ');
          if (target === 'all' || cats.indexOf(target) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Cookie banner --------------------------------------------------------
  const cookie = document.querySelector('.cookie');
  if (cookie) {
    const KEY = 'jb_cookie_ok';
    let consent = null;
    try { consent = window.localStorage.getItem(KEY); } catch (e) {}
    if (!consent) {
      setTimeout(function () { cookie.classList.add('show'); }, 1200);
    }
    cookie.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        try { window.localStorage.setItem(KEY, b.classList.contains('accept') ? 'yes' : 'no'); } catch (e) {}
        cookie.classList.remove('show');
      });
    });
  }

  // ---- Back to top ----------------------------------------------------------
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    const onScrollTop = function () {
      if (window.scrollY > 600) backTop.classList.add('show');
      else backTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScrollTop, { passive: true });
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth scroll for in-page anchors -----------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    const id = a.getAttribute('href');
    if (id.length <= 1) return;
    a.addEventListener('click', function (e) {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- Order on product card -----------------------------------------------
  document.querySelectorAll('[data-order]').forEach(function (b) {
    b.addEventListener('click', function () {
      const name = b.getAttribute('data-order') || 'votre commande';
      const subject = encodeURIComponent('Commande — ' + name);
      const body = encodeURIComponent(
        'Bonjour Janette,\n\nJe souhaiterais commander : ' + name + '.\n\nDate souhaitée : \nQuantité : \nMessage : \n\nMerci !'
      );
      window.location.href = 'mailto:bonjour@janetteboudoir.fr?subject=' + subject + '&body=' + body;
    });
  });
})();
