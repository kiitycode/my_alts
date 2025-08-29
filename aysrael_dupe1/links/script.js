// Improved Studio Website Script (with Fixes for Form Input Blocking and Audio Clip Limiting)

// 1) Mobile Navigation Toggle
const dashboardToggle = document.getElementById('dashboardToggle');
const dashboard = document.getElementById('dashboard');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

function toggleDashboard() {
  const isOpen = dashboard.classList.toggle('open');
  overlay.style.display = isOpen ? 'block' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

dashboardToggle?.addEventListener('click', toggleDashboard);
closeBtn?.addEventListener('click', toggleDashboard);
overlay?.addEventListener('click', toggleDashboard);

// Count-up on view (once), slower with easing, A11y-friendly
window.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix ?? '%';
    const duration = parseInt(el.dataset.duration, 10) || 6000; // slower than before (was 5000)

    // If user prefers reduced motion, jump to final
    if (prefersReducedMotion) {
      el.textContent = `${Math.round(target)}${suffix}`;
      return;
    }

    const start = performance.now();
    const from = 0;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // smooth finish

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(from + (target - from) * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // Set initial text and observe when visible
  counters.forEach((el) => {
    const suffix = el.dataset.suffix ?? '%';
    el.textContent = `0${suffix}`;
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.animated === 'true') return; // run once
            el.dataset.animated = 'true';
            animate(el);
            obs.unobserve(el);
          }
        });
      },
      {
        threshold: 0.6,          // ~60% visible before starting
        rootMargin: '0px 0px -10% 0px' // slight early trigger near bottom
      }
    );

    counters.forEach((el) => observer.observe(el));
  } else {
    // Fallback for very old browsers
    counters.forEach((el) => animate(el));
  }
});


// Audio clip limiter (100s max) + FA6 icon fixes
document.querySelectorAll('.demo-track').forEach(track => {
  const audio = track.querySelector('audio');
  const playBtn = track.querySelector('.play-btn');
  const progressBar = track.querySelector('.progress-bar');
  const timeDisplay = track.querySelector('.current-time');
  const MAX_DURATION = 100;

  playBtn?.addEventListener('click', () => {
    document.querySelectorAll('audio').forEach(other => {
      if (other !== audio) {
        other.pause();
        other.currentTime = 0;
        const otherBtnIcon = other.closest('.demo-track')?.querySelector('.play-btn i');
        if (otherBtnIcon) otherBtnIcon.className = 'fa-solid fa-play';
      }
    });

    const icon = playBtn.querySelector('i');
    if (audio.paused) {
      audio.play();
      if (icon) icon.className = 'fa-solid fa-pause';
    } else {
      audio.pause();
      if (icon) icon.className = 'fa-solid fa-play';
    }
  });

  audio?.addEventListener('timeupdate', () => {
    const current = Math.min(audio.currentTime, MAX_DURATION);
    const percent = (current / MAX_DURATION) * 100;
    if (progressBar) progressBar.value = percent;
    if (timeDisplay) {
      timeDisplay.textContent = `${Math.floor(current / 60)}:${String(Math.floor(current % 60)).padStart(2, '0')}`;
    }

    if (audio.currentTime >= MAX_DURATION) {
      audio.pause();
      audio.currentTime = 0;
      const icon = playBtn?.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-play';
    }
  });
});

// Seek within 0..100s for each demo-track
window.addEventListener('load', () => {
  document.querySelectorAll('.demo-track').forEach(track => {
    const audio = track.querySelector('audio');
    const bar   = track.querySelector('.progress-bar');
    const timeEl = track.querySelector('.current-time');
    const MAX = 100; // must match your limiter

    if (!audio || !bar) return;

    // If attributes are missing, set sensible defaults
    if (!bar.hasAttribute('min'))  bar.min  = 0;
    if (!bar.hasAttribute('max'))  bar.max  = 100;
    if (!bar.hasAttribute('step')) bar.step = 0.5;

    const cappedDuration = () => Math.min(audio.duration || MAX, MAX);
    const pctToTime = pct => (Math.max(0, Math.min(100, pct)) / 100) * cappedDuration();

    const updateTimeText = (t) => {
      if (!timeEl) return;
      const m = Math.floor(t / 60);
      const s = String(Math.floor(t % 60)).padStart(2, '0');
      timeEl.textContent = `${m}:${s}`;
    };

    // Drag/click to seek (0..100%)
    bar.addEventListener('input', () => {
      const pct = Number(bar.value) || 0;
      const newTime = pctToTime(pct);
      audio.currentTime = newTime;       // jumps immediately
      updateTimeText(newTime);           // reflect instantly
    });

    // Keep slider in sync while playing (your existing timeupdate also does this;
    // this line is lightweight and won’t interfere)
    audio.addEventListener('timeupdate', () => {
      // Map currentTime (clamped by your limiter) back to 0..100 slider
      const current = Math.min(audio.currentTime, MAX);
      bar.value = (current / MAX) * 100;
    });

    // Reset slider once metadata is ready
    audio.addEventListener('loadedmetadata', () => {
      bar.value = 0;
      updateTimeText(0);
    });
  });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((el, i) => el.classList.toggle('active', i === index));
}

document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-next')?.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

if (testimonials.length) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
  showTestimonial(currentTestimonial);
}

// Services Carousel (infinite feel)
window.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.services-carousel');
  const cards = document.querySelectorAll('.service-card');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  if (!carousel || !cards.length) return;

  const cardWidth = cards[0].offsetWidth + 25;

  // Clone first and last for loop illusion
  cards.forEach(card => {
    const cloneStart = card.cloneNode(true);
    const cloneEnd = card.cloneNode(true);
    carousel.appendChild(cloneEnd);
    carousel.insertBefore(cloneStart, carousel.firstChild);
  });

  const startIndex = cards.length;
  carousel.scrollLeft = startIndex * cardWidth;

  let isScrolling = false;
  let autoScrollInterval;

  function smoothScrollTo(offset) {
    if (isScrolling) return;
    isScrolling = true;
    carousel.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(() => { isScrolling = false; handleLoop(); }, 500);
  }

  function handleLoop() {
    const scrollLeft = carousel.scrollLeft;
    const totalCards = document.querySelectorAll('.service-card').length;
    const maxScrollLeft = (totalCards - cards.length) * cardWidth;
    if (scrollLeft <= 0 || scrollLeft >= maxScrollLeft) {
      carousel.scrollLeft = cards.length * cardWidth;
    }
  }

  leftBtn?.addEventListener('click', () => smoothScrollTo(-cardWidth));
  rightBtn?.addEventListener('click', () => smoothScrollTo(cardWidth));

  function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => smoothScrollTo(cardWidth), 4000);
  }

  carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carousel.addEventListener('mouseleave', startAutoScroll);

  // Touch swipe
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoScrollInterval);
  });
  carousel.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) smoothScrollTo(cardWidth);
    else if (diff < -50) smoothScrollTo(-cardWidth);
    startAutoScroll();
  });

  startAutoScroll();
});

// Team Section – Dynamic Cards + Modal
window.addEventListener('DOMContentLoaded', () => {
  const teamMembers = [
    { name: "Seyi Ademuwagun", title: "Sound Engineer", nickname: "\"SPYROSOUND\"", bio: "Meticulous, visionary, and obsessed with sonic perfection, Seyi doesn't just engineer sound – he sculpts emotional landscapes. With golden ears and technical wizardry, he transforms raw audio into breathtaking experiences that grip the soul.", image: "./imgs/pfps/Seyi_A.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } },
    { name: "Afolabi Oluwaseun Susan", title: "Lead Vocalist", bio: "Passionate, precise, and effortlessly magnetic, Susan is a powerhouse vocalist with mesmerizing stage presence and the organizational brilliance to keep studio magic flowing.", image: "./imgs/pfps/Oluwaseun_A.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } },
    { name: "Oloyede Ayotomiwa Israel", title: "CEO, Aysrael Studios", bio: "The dynamic force at the helm of Aysrael Studios, where business acumen meets artistic brilliance. A rare 360-degree master of boardroom, control room, and booth.", image: "./imgs/pfps/Ayotomiwa_O.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } },
    { name: "Osunrinde Taiwo", title: "Production Manager", bio: "Taiwo is the operational backbone behind every project, blending logistics with artistry. Also a skilled keyboardist bringing melodic depth to productions.", image: "./imgs/pfps/Taiwo_O.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } },
    { name: "Awonuga Olamide", title: "Social Media Manager", bio: "Turning pixels into gold, Olamide is a social media strategist who creates digital movements and builds loyal communities.", image: "./imgs/pfps/Awonuga_O.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } },
    { name: "Akintunde Olawale", title: "Music Producer", bio: "Olawale is a genre-defying music producer, blending innovation with emotion to sculpt immersive soundscapes.", image: "./imgs/pfps/Olawale_A.jpg", social: { instagram: "#", facebook: "#", tiktok: "#" } }
  ];

  const gallery = document.querySelector('.team-gallery');
  const modal = document.querySelector('.preview-modal');
  const modalOverlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (gallery) {
    teamMembers.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.dataset.name = member.name;
      card.dataset.title = member.title;
      card.dataset.bio = member.bio;
      card.dataset.image = member.image;
      card.dataset.instagram = member.social.instagram;
      card.dataset.facebook = member.social.facebook;
      card.dataset.tiktok = member.social.tiktok;

      card.innerHTML = `
        <div class="card-image" style="background-image: url('${member.image}');"></div>
        <div class="card-overlay">
          <h3 class="card-name">${member.name}${member.nickname ? ` <em>${member.nickname}</em>` : ''}</h3>
          <p class="card-title"><em>${member.title}</em></p>
        </div>
      `;

      gallery.appendChild(card);
    });

    function openModal(card) {
      if (!modal) return;
      modal.style.backgroundImage = `url('${card.dataset.image}')`;
      modal.querySelector('.modal-name').textContent = card.dataset.name;
      modal.querySelector('.modal-title').textContent = card.dataset.title;
      modal.querySelector('.modal-bio').textContent = card.dataset.bio;
      modal.querySelector('.instagram-link').href = card.dataset.instagram;
      modal.querySelector('.facebook-link').href = card.dataset.facebook;
      modal.querySelector('.tiktok-link').href = card.dataset.tiktok;
      modal.classList.add('active');
      modalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal?.classList.remove('active');
      modalOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('click', () => openModal(card));
    });

    closeBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
    });
  }

  // Inject floating WhatsApp button on contact page (no HTML changes needed)
  const contactSection = document.getElementById('contact');
  if (contactSection && !document.querySelector('.whatsapp-float')) {
    const wa = document.createElement('a');
    wa.className = 'whatsapp-float';
    wa.href = 'https://wa.me/2349036194499?text=Hi%20AYSRAEL%20Studios%2C%20I%27d%20like%20to%20book%20a%20session.';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat on WhatsApp');
    wa.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
    document.body.appendChild(wa);
  }
});

// Page scroll effect
document.addEventListener('DOMContentLoaded', () => {
  // Choose all content sections (skip header/footer). Add .ros-ignore on any section you don't want animated.
  const groups = [...document.querySelectorAll('section')]
    .filter(s => !s.closest('header') && !s.closest('footer') && !s.classList.contains('ros-ignore'));

  // Annotate each section + its direct children for staggered reveal
  groups.forEach(group => {
    group.setAttribute('data-ros', '');
    const kids = [...group.children]; // direct children for clean stagger
    kids.forEach((el, i) => {
      el.setAttribute('data-ros-item', '');
      el.style.setProperty('--i', i); // controls stagger order
    });
  });

  // IntersectionObserver to toggle visibility
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const group = entry.target;
      const repeat = group.classList.contains('ros-repeat') || group.hasAttribute('data-ros-repeat');
      if (entry.isIntersecting) {
        group.classList.add('is-visible');
        if (!repeat) io.unobserve(group); // play once by default
      } else if (repeat) {
        group.classList.remove('is-visible'); // allow re-animation
      }
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }); // pre-trigger slightly before fully in view

  groups.forEach(g => io.observe(g));
});

// Dots for Services carousel (non-intrusive)
window.addEventListener('load', () => {
  const carousel = document.querySelector('.services-carousel');
  if (!carousel) return;

  // After your cloning runs, total = 3 * N (you prepend + append one set)
  const allCards = carousel.querySelectorAll('.service-card');
  if (!allCards.length) return;

  const totalCards = allCards.length;
  const N = Math.floor(totalCards / 3);      // original count
  if (N < 1) return;

  // Build dots just after the carousel
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'services-dots';
  dotsWrap.setAttribute('role', 'tablist');
  dotsWrap.setAttribute('aria-label', 'Service slides');
  carousel.after(dotsWrap);

  const dots = Array.from({ length: N }, (_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Go to slide ${i + 1} of ${N}`);
    b.addEventListener('click', () => {
      const step = (allCards[0]?.offsetWidth || 300) + 25; // match your base calc
      const targetLeft = (N + i) * step;                   // jump into the middle (original window)
      carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
    });
    dotsWrap.appendChild(b);
    return b;
  });

  // Update active dot from scrollLeft
  let ticking = false;
  function updateActiveFromScroll() {
    const step = (allCards[0]?.offsetWidth || 300) + 25; // same formula as your base
    const rawIndex = Math.round(carousel.scrollLeft / step);
    // Normalize to original range (your originals live from index N .. 2N-1)
    const normalized = ((rawIndex - N) % N + N) % N;
    dots.forEach((d, idx) => d.setAttribute('aria-current', idx === normalized ? 'true' : 'false'));
  }

  carousel.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActiveFromScroll();
      ticking = false;
    });
  }, { passive: true });

  // Keep in sync on resize (card width may change)
  window.addEventListener('resize', () => {
    updateActiveFromScroll();
  });

  // Initial state
  updateActiveFromScroll();
});