// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  })
);

// Animación al hacer scroll
const revealables = document.querySelectorAll('.feature, .section-head, .menu-card, .story > *, .quotes blockquote, .visit > *, .hours-wrap > *');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealables.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Abierto / cerrado según la hora de Toledo
const HORARIO = { abre: 8 * 60 + 30, cierra: 21 * 60 }; // todos los días, festivos incluidos

function horaToledo() {
  const partes = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t) => partes.find((p) => p.type === t).value;
  const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  return {
    dia: dias.indexOf(get('weekday').replace('.', '').toLowerCase()),
    minutos: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

function fmt(min) {
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`;
}

function actualizarEstado() {
  const { dia, minutos } = horaToledo();
  let clase, html;
  if (minutos >= HORARIO.abre && minutos < HORARIO.cierra) {
    const quedan = HORARIO.cierra - minutos;
    if (quedan <= 30) {
      clase = 'is-soon';
      html = `<strong>Cierra pronto</strong> · hasta las ${fmt(HORARIO.cierra)}`;
    } else {
      clase = 'is-open';
      html = `<strong>Abierto ahora</strong> · hasta las ${fmt(HORARIO.cierra)}`;
    }
  } else {
    clase = 'is-closed';
    const cuando = minutos < HORARIO.abre ? 'hoy' : 'mañana';
    html = `<strong>Cerrado</strong> · abrimos ${cuando} a las ${fmt(HORARIO.abre)}`;
  }
  document.querySelectorAll('[data-status]').forEach((el) => {
    el.classList.remove('is-open', 'is-soon', 'is-closed');
    el.classList.add(clase);
    el.querySelector('.status-text').innerHTML = html;
    el.hidden = false;
  });
  document.querySelectorAll('.week tr[data-day]').forEach((tr) => {
    tr.classList.toggle('today', Number(tr.dataset.day) === dia);
  });
}
actualizarEstado();
setInterval(actualizarEstado, 30 * 1000);

document.getElementById('year').textContent = new Date().getFullYear();
