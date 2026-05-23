document.addEventListener('DOMContentLoaded', () => {
  // Navigation Scroll Effect
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const scrollTopBtn = document.querySelector('.scroll-top');

  const isHomePage = document.querySelector('.hero') !== null;

  const handleScroll = () => {
    if (!isHomePage) {
      header.classList.add('scrolled');
    } else {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Active Link State based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a:not(.nav-btn)');
  navItems.forEach(link => {
    const linkRef = link.getAttribute('href');
    if (currentPath === linkRef || (currentPath === '' && linkRef === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Reveal Animations on Scroll using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Counter animation for stats
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.getAttribute('data-count');
        const suffix = target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.ceil(parseInt(finalValue) / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= parseInt(finalValue)) {
            current = parseInt(finalValue);
            clearInterval(timer);
          }
          target.textContent = current.toLocaleString() + suffix;
        }, 25);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});
