// Improved Studio Website Script (with Fixes for Form Input Blocking and Audio Clip Limiting)

// 1. Mobile Navigation Toggle
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

// 2. Count-up Animation
window.addEventListener('DOMContentLoaded', () => {
    // Count-up animation
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = Number(counter.dataset.count);
        const duration = 5000;
        const increment = target / (duration / 50);
        let count = 0;

        function updateCounter() {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count) + "%";
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + "%";
            }
        }

        updateCounter();
    });
});


    // Audio clip limiter (100s max)
    document.querySelectorAll('.demo-track').forEach(track => {
        const audio = track.querySelector('audio');
        const playBtn = track.querySelector('.play-btn');
        const progressBar = track.querySelector('.progress-bar');
        const timeDisplay = track.querySelector('.current-time');
        const MAX_DURATION = 100;

        playBtn.addEventListener('click', () => {
            document.querySelectorAll('audio').forEach(other => {
                if (other !== audio) {
                    other.pause();
                    other.currentTime = 0;
                    other.closest('.demo-track').querySelector('.play-btn i').className = 'fas fa-play';
                }
            });

            if (audio.paused) {
                audio.play();
                playBtn.querySelector('i').className = 'fas fa-pause';
            } else {
                audio.pause();
                playBtn.querySelector('i').className = 'fas fa-play';
            }
        });

        audio.addEventListener('timeupdate', () => {
            const current = Math.min(audio.currentTime, MAX_DURATION);
            const percent = (current / MAX_DURATION) * 100;
            progressBar.value = percent;
            timeDisplay.textContent = `${Math.floor(current / 60)}:${('0' + Math.floor(current % 60)).slice(-2)}`;

            if (audio.currentTime >= MAX_DURATION) {
                audio.pause();
                audio.currentTime = 0;
                playBtn.querySelector('i').className = 'fas fa-play';
            }
        });
    });

// 3. Testimonial Slider
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

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

showTestimonial(currentTestimonial);

window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.service-card');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');

    if (!carousel || !cards.length) return;

    const cardWidth = cards[0].offsetWidth + 25;

    // Clone first and last few cards for infinite loop effect
    cards.forEach(card => {
        const cloneStart = card.cloneNode(true);
        const cloneEnd = card.cloneNode(true);
        carousel.appendChild(cloneEnd);
        carousel.insertBefore(cloneStart, carousel.firstChild);
    });

    // Scroll to the actual first item (after prepending clones)
    const startIndex = cards.length;
    carousel.scrollLeft = startIndex * cardWidth;

    let isScrolling = false;
    let autoScrollInterval;

    function smoothScrollTo(offset) {
        if (isScrolling) return;
        isScrolling = true;
        carousel.scrollBy({ left: offset, behavior: 'smooth' });
        setTimeout(() => {
            isScrolling = false;
            handleLoop();
        }, 500);
    }

    function handleLoop() {
        const scrollLeft = carousel.scrollLeft;
        const totalCards = document.querySelectorAll('.service-card').length;
        const maxScrollLeft = (totalCards - cards.length) * cardWidth;

        if (scrollLeft <= 0) {
            carousel.scrollLeft = cards.length * cardWidth;
        } else if (scrollLeft >= maxScrollLeft) {
            carousel.scrollLeft = cards.length * cardWidth;
        }
    }

    // Manual Controls
    leftBtn?.addEventListener('click', () => smoothScrollTo(-cardWidth));
    rightBtn?.addEventListener('click', () => smoothScrollTo(cardWidth));

    // Auto Scroll
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

// 5. Contact Form + Fix for Spinner Blocking Input
window.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.contact-form');
    if (!formContainer) return;

    formContainer.innerHTML = `
        <form id="studioContactForm" novalidate>
            <div class="form-group">
                <input type="text" name="name" placeholder="Your Name" required pattern="[A-Za-z ]{3,50}">
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Phone (optional)" pattern="[0-9+ ]{10,15}">
            </div>
            <div class="form-group">
                <select name="service" required>
                    <option value="" disabled selected>Select Service</option>
                    <option value="Recording">Recording Session</option>
                    <option value="Mixing">Mixing</option>
                    <option value="Mastering">Mastering</option>
                    <option value="Studio Rental">Studio Rental</option>
                </select>
            </div>
            <div class="form-group">
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <div class="g-recaptcha" data-sitekey="6Le8K1krAAAAAPLrzLSYALpY_Trh-IZK0av0vZKp"></div>
            <button type="submit">Send Message</button>
            <div id="formFeedback" class="form-feedback" style="display:none;">
                <p class="success-text">Message sent! 🎉</p>
            </div>
        </form>
    `;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="spinnerOverlay" class="spinner-overlay" style="display:none;">
            <div class="spinner"></div>
        </div>
    `);

    const form = document.getElementById('studioContactForm');
    const spinner = document.getElementById('spinnerOverlay');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!form.checkValidity()) return form.reportValidity();

        const token = grecaptcha.getResponse();
        if (!token) return alert('Please complete the CAPTCHA 😊');

        spinner.style.display = 'flex';
        feedback.style.display = 'none';

        const formData = Object.fromEntries(new FormData(form).entries());
        formData.token = token;

        try {
            const res = await fetch('https://script.google.com/macros/s/AKfycbxQ8RMwQzkV4qicDXkQpLy1WK23QlNMRa63w7JbEAOiXYNbnLFHhm8Wjm0FZ0u9vVdP/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            spinner.style.display = 'none';

            if (result.success) {
                feedback.style.display = 'block';
                form.reset();
                grecaptcha.reset();
                setTimeout(() => feedback.style.display = 'none', 4000);
            } else {
                alert('Captcha failed or unknown error.');
                grecaptcha.reset();
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Try later.');
            spinner.style.display = 'none';
            grecaptcha.reset();
        }
    });

    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
            el.classList.toggle('invalid', !el.checkValidity());
            el.classList.toggle('valid', el.checkValidity());
        });
    });

    // Ensure overlays don't block input after load
    document.querySelectorAll('.overlay, .spinner-overlay').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    document.body.style.overflow = '';
});

// 6. Team Section
// 6. Team Section – Dynamic Cards + Modal
window.addEventListener('DOMContentLoaded', () => {
  const teamMembers = [
    {
      name: "Seyi Ademuwagun",
      title: "Sound Engineer",
      nickname: "\"SPYROSOUND\"",
      bio: "Meticulous, visionary, and obsessed with sonic perfection, Seyi doesn't just engineer sound – he sculpts emotional landscapes. With golden ears and technical wizardry, he transforms raw audio into breathtaking experiences that grip the soul.",
      image: "./imgs/pfps/Seyi_A.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    },
    {
      name: "Afolabi Oluwaseun Susan",
      title: "Lead Vocalist",
      bio: "Passionate, precise, and effortlessly magnetic, Susan is a powerhouse vocalist with mesmerizing stage presence and the organizational brilliance to keep studio magic flowing.",
      image: "./imgs/pfps/Oluwaseun_A.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    },
    {
      name: "Oloyede Ayotomiwa Israel",
      title: "CEO, Aysrael Studios",
      bio: "The dynamic force at the helm of Aysrael Studios, where business acumen meets artistic brilliance. A rare 360-degree master of boardroom, control room, and booth.",
      image: "./imgs/pfps/Ayotomiwa_O.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    },
    {
      name: "Osunrinde Taiwo",
      title: "Production Manager",
      bio: "Taiwo is the operational backbone behind every project, blending logistics with artistry. Also a skilled keyboardist bringing melodic depth to productions.",
      image: "./imgs/pfps/Taiwo_O.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    },
    {
      name: "Awonuga Olamide",
      title: "Social Media Manager",
      bio: "Turning pixels into gold, Olamide is a social media strategist who creates digital movements and builds loyal communities.",
      image: "./imgs/pfps/Awonuga_O.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    },
    {
      name: "Akintunde Olawale",
      title: "Music Producer",
      bio: "Olawale is a genre-defying music producer, blending innovation with emotion to sculpt immersive soundscapes.",
      image: "./imgs/pfps/Olawale_A.jpg",
      social: { instagram: "#", facebook: "#", tiktok: "#" }
    }
  ];

  const gallery = document.querySelector('.team-gallery');
  const modal = document.querySelector('.preview-modal');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.modal-close-btn');

  // Build and insert team cards dynamically
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

  // Modal open/close handlers
  function openModal(card) {
    modal.style.backgroundImage = `url('${card.dataset.image}')`;
    modal.querySelector('.modal-name').textContent = card.dataset.name;
    modal.querySelector('.modal-title').textContent = card.dataset.title;
    modal.querySelector('.modal-bio').textContent = card.dataset.bio;
    modal.querySelector('.instagram-link').href = card.dataset.instagram;
    modal.querySelector('.facebook-link').href = card.dataset.facebook;
    modal.querySelector('.tiktok-link').href = card.dataset.tiktok;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Add click event to each generated card
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});
