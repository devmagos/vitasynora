document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger) {
    const closeMenu = () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    };

    const openMenu = () => {
      hamburger.classList.add('open');
      navLinks.classList.add('open');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    };

    hamburger.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });

  // Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve to run once
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // Form submission
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstNameField = document.getElementById('firstName');
      const fullNameField = document.getElementById('fullName');
      const name = firstNameField ? firstNameField.value : (fullNameField ? fullNameField.value : '');
      const email = document.getElementById('email').value;
      const successMsg = document.getElementById('successMsg');
      
      demoForm.style.display = 'none';
      successMsg.style.display = 'block';
      successMsg.innerHTML = `<h3>Thank you, ${name}!</h3><p>Your message has been received. A member of our team will contact you at ${email} within 24 hours. In the meantime, explore our technology to learn more about VitaSynora.</p>`;
    });
  }
  
  // Waitlist submission
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('waitlistSuccess');
      waitlistForm.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
});
