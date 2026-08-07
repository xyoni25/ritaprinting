/* Rich Printing & Advertising — shared site behaviour
   Loaded on every page. Relies on:
   - <body data-page="home|services|about|contact">
   - nav links / footer links carrying a matching data-page attribute
*/
(function(){
  'use strict';

  /* ---------- language toggle (persisted across pages) ---------- */
  var STORAGE_KEY = 'rich-lang';

  function applyLang(lang){
    document.body.classList.remove('lang-en','lang-am');
    document.body.classList.add('lang-' + lang);
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function setLang(lang){
    try{ window.localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
    applyLang(lang);
  }
  window.setLang = setLang;

  function initLang(){
    var saved = 'en';
    try{ saved = window.localStorage.getItem(STORAGE_KEY) || 'en'; }catch(e){}
    applyLang(saved);
  }

  /* ---------- active nav link (header + footer) ---------- */
  function initActiveNav(){
    var page = document.body.getAttribute('data-page');
    if(!page) return;
    document.querySelectorAll('[data-page-link]').forEach(function(link){
      if(link.getAttribute('data-page-link') === page){
        link.classList.add('active');
        link.setAttribute('aria-current','page');
      }
    });
  }

  /* ---------- mobile nav toggle ---------- */
  function initMobileNav(){
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if(!toggle || !links) return;
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal(){
    var items = document.querySelectorAll('.reveal');
    if(!items.length) return;
    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------- scroll progress bar ---------- */
  function initProgress(){
    var bar = document.getElementById('progress');
    if(!bar) return;
    window.addEventListener('scroll', function(){
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    }, {passive:true});
  }

  /* ---------- footer year ---------- */
  function initYear(){
    var yr = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function(el){
      el.textContent = yr;
    });
  }

  /* ---------- contact form (front-end only placeholder) ---------- */
  function initContactForm(){
    var form = document.getElementById('contactForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = document.getElementById('formStatus');
      if(status){
        status.textContent = document.body.classList.contains('lang-am')
          ? 'መልእክትዎ ደርሶናል፣ በቅርቡ እናገኝዎታለን።'
          : "Thanks — your message is ready to send. Connect this form to your email or CRM to go live.";
      }
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initLang();
    initActiveNav();
    initMobileNav();
    initReveal();
    initProgress();
    initYear();
    initContactForm();
  });
})();
