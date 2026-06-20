document.addEventListener('DOMContentLoaded', function() {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.card');
    if (!card) return;
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    card.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  const navLinks = document.querySelectorAll('nav a');
  const sections = {
    about: document.getElementById('about'),
    skills: document.getElementById('skills'),
    certifications: document.getElementById('certifications'),
    contact: document.getElementById('contact')
  };

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;
    let activeId = 'about';
    for (const [id, section] of Object.entries(sections)) {
      if (section && section.offsetTop <= scrollPosition) {
        activeId = id;
      }
    }
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});