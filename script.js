// Datos de contacto centralizados: editá estos valores si cambia algún canal.
const links = {
  whatsapp: 'https://wa.me/543364383515?text=%C2%A1Hola%2C%20TRAMA!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20redes%20sociales%20y%20estrategia%20de%20comunicaci%C3%B3n.',
  instagram: 'https://instagram.com/somostrama__',
  email: 'mailto:somostrama06@gmail.com',
};

const teamInstagram = {
  camila: 'camiizalazarr',
  martina: 'marticiribeni_',
  ana: 'anatisseraa',
};

const openExternalLink = (url) => window.open(url, '_blank', 'noopener');

document.querySelectorAll('[data-contact]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    openExternalLink(links[element.dataset.contact]);
  });
});

document.querySelectorAll('[data-member]').forEach((button) => {
  button.addEventListener('click', () => {
    openExternalLink(`https://instagram.com/${teamInstagram[button.dataset.member]}`);
  });
});

// Navegación móvil y animaciones de entrada al recorrer la página.
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('.reveal');

if (reducedMotion.matches) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

const teamGrid = document.querySelector('.team-grid');
const teamCards = [...document.querySelectorAll('.team-card')];
const teamDots = [...document.querySelectorAll('.team-dots button')];

const setActiveTeamDot = (index) => {
  teamDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', String(isActive));
  });
};

if (teamGrid && teamCards.length && teamDots.length) {
  let scrollingFrame;
  teamGrid.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollingFrame);
    scrollingFrame = requestAnimationFrame(() => {
      const currentIndex = teamCards.reduce((closestIndex, card, index) => (
        Math.abs(card.offsetLeft - teamGrid.scrollLeft) < Math.abs(teamCards[closestIndex].offsetLeft - teamGrid.scrollLeft)
          ? index
          : closestIndex
      ), 0);
      setActiveTeamDot(currentIndex);
    });
  }, { passive: true });

  teamDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      teamGrid.scrollTo({ left: teamCards[index].offsetLeft, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
