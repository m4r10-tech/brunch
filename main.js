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

// Pestañas de la carta
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const next = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!next) return;
    const target = tabs[(i + next + tabs.length) % tabs.length];
    selectTab(target);
    target.focus();
  });
});

// Animación al hacer scroll
const revealables = document.querySelectorAll('.feature, .section-head, .menu-panel, .story > *, .quotes blockquote, .visit > *, .hours-wrap > *');
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
const HORARIO = { abre: 8 * 60 + 30, cierra: 15 * 60 + 30 }; // todos los días

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
