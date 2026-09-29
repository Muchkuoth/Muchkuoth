
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCounterAnimation();
  initBackToTop();
  initSmoothScroll();
  initTypingEffect();
  initParallax();
  initFormValidation();
  initServiceCardHover();
  initPreloader();
});


function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');

 
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('open');
    });

   
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
      });
    });


    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
      }
    });
  }

  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Stagger children if it's a grid
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('animate-in');
        });
      }
    });
  }, observerOptions);

  
  const animateElements = document.querySelectorAll(
    '.service-card, .branch-card, .value-card, .mv-card, ' +
    '.about-content, .section-title, .service-detail-content, ' +
    '.contact-grid, .hero-btn, .cta-section'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-element');
    observer.observe(el);
  });


  const grids = document.querySelectorAll(
    '.services-grid, .branches-grid, .values-grid, .mv-grid'
  );

  grids.forEach(grid => {
    grid.querySelectorAll('.service-card, .branch-card, .value-card, .mv-card')
      .forEach(child => child.classList.add('animate-child'));
    observer.observe(grid);
  });
}


function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (target - start) * easeOut);

          counter.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}


function initBackToTop() {
  // Create button
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '&#8593;';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

 
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}


function initTypingEffect() {
  const heroTagline = document.querySelector('.hero .tagline');
  if (!heroTagline) return;

  const text = heroTagline.textContent;
  heroTagline.textContent = '';
  heroTagline.style.borderRight = '2px solid var(--accent)';

  let i = 0;
  function type() {
    if (i < text.length) {
      heroTagline.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60);
    } else {
      
      setTimeout(() => {
        heroTagline.style.borderRight = 'none';
      }, 1000);
    }
  }

  setTimeout(type, 500);
}


function initParallax() {
  const hero = document.querySelector('.hero, .page-hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
  });
}

function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea');

  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      showNotification('Thank you! Your message has been sent. We will get back to you shortly.', 'success');
      form.reset();
      inputs.forEach(input => {
        input.classList.remove('success');
      });
    } else {
      showNotification('Please fill in all required fields correctly.', 'error');
    }
  });
}

function validateField(input) {
  const value = input.value.trim();
  let isValid = true;

  // Remove existing error message
  const existingError = input.parentNode.querySelector('.field-error');
  if (existingError) existingError.remove();

  if (input.required && !value) {
    isValid = false;
    showFieldError(input, 'This field is required');
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      showFieldError(input, 'Please enter a valid email address');
    }
  } else if (input.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      showFieldError(input, 'Please enter a valid phone number');
    }
  }

  if (isValid && value) {
    input.classList.remove('error');
    input.classList.add('success');
  } else if (!isValid) {
    input.classList.remove('success');
    input.classList.add('error');
  } else {
    input.classList.remove('error', 'success');
  }

  return isValid;
}

function showFieldError(input, message) {
  const errorEl = document.createElement('span');
  errorEl.className = 'field-error';
  errorEl.textContent = message;
  input.parentNode.insertBefore(errorEl, input.nextSibling);
}


function showNotification(message, type = 'info') {
  

  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  document.body.appendChild(notification);

  
  setTimeout(() => notification.classList.add('show'), 10);

  
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });

  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}


function initServiceCardHover() {
  const cards = document.querySelectorAll('.service-card, .branch-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}


function initPreloader() {
  // Create preloader
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-logo">KONDIAAL</div>
      <div class="preloader-spinner"></div>
    </div>
  `;
  document.body.prepend(preloader);

  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 800);
  });
}


(function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
})();


function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}


function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.body.classList.add('dark-mode');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}
