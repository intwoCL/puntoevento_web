document.addEventListener('DOMContentLoaded', () => {

  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1528904342990491789/BjjFMXW84J6H2dCsYz5sIp8ME7-5_3ySc7u1CAR5D7_KyI5mLW1EYzp8hMjClUgFIcI0';

  let userPoints = 0;
  let coinShortName = 'pts';

  const rewardItems = [
    { id: 'reward-keychain', name: 'Llavero Metálico', points: 100, unlocked: false },
    { id: 'reward-mug', name: 'Termo Metálico', points: 300, unlocked: false },
    { id: 'reward-shirt', name: 'Café Premium', points: 600, unlocked: false },
    { id: 'reward-pass', name: 'Gift Card $10.000', points: 1000, unlocked: false }
  ];

  const events = [
    { id: 'evt-1', name: 'Conferencia LATAM 2026', date: '15 Oct 2026', time: '09:00 - 18:00', location: 'Centro de Convenciones, CDMX', desc: 'La conferencia más importante de tecnología e innovación en Latinoamérica.' },
    { id: 'evt-2', name: 'Workshop Innovación Corporativa', date: '22 Nov 2026', time: '14:00 - 17:00', location: 'Sala Ejecutiva, Piso 12', desc: 'Taller interactivo de metodologías ágiles para equipos de alto rendimiento.' },
    { id: 'evt-3', name: 'Feria de Beneficios 2026', date: '05 Dic 2026', time: '10:00 - 20:00', location: 'Hotel Marriott, Salón Grand', desc: 'Exposición de convenios, descuentos y beneficios exclusivos para colaboradores.' }
  ];

  let registeredEvents = {};

  // ===== DOM REFS (safe) =====
  const pointsDisplay = document.getElementById('user-points');
  const progressBar = document.getElementById('progress-bar');
  const redeemModal = document.getElementById('phone-redeem-modal');
  const redeemCodeDisplay = document.getElementById('redeem-code-display');
  const redeemProductDisplay = document.getElementById('redeem-product-display');
  const ticketModal = document.getElementById('phone-ticket-modal');
  const ticketWelcome = document.getElementById('ticket-welcome');
  const ticketEventName = document.getElementById('ticket-event-name');
  const ticketAttendee = document.getElementById('ticket-attendee');
  const ticketDate = document.getElementById('ticket-date');
  const ticketTime = document.getElementById('ticket-time');
  const ticketLocation = document.getElementById('ticket-location');
  const ticketCode = document.getElementById('ticket-code');
  const combinedPoints = document.getElementById('combined-points');
  const combinedEvents = document.getElementById('combined-events');

  // ===== NOTIFICATIONS =====
  function showNotification(text) {
    document.querySelectorAll('#phone-notification').forEach(el => {
      const txt = el.querySelector('#notification-text, #notification-text-2') || el.querySelector('span:last-child');
      if (txt) txt.textContent = text;
      el.classList.remove('translate-y-[-150%]', 'opacity-0');
      el.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        el.classList.add('translate-y-[-150%]', 'opacity-0');
        el.classList.remove('translate-y-0', 'opacity-100');
      }, 3500);
    });
  }

  function createFloatingIndicator(text) {
    const el = document.createElement('div');
    el.textContent = text;
    el.className = 'fixed pointer-events-none text-lg font-bold text-[var(--color-accent)] z-50 transition-all duration-700 ease-out select-none';
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translate(-50%, -120px)';
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 700);
  }

  function animateValue(obj, start, end, duration) {
    if (start === end) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) window.requestAnimationFrame(step);
      else obj.textContent = end;
    };
    window.requestAnimationFrame(step);
  }

  // ===== POINTS SIMULATOR =====
  document.querySelectorAll('.mission-btn').forEach(button => {
    button.addEventListener('click', () => {
      userPoints += parseInt(button.dataset.points);
      createFloatingIndicator(`+${parseInt(button.dataset.points)} ${coinShortName}`);
      updateSimulatorUI();
    });
  });

  function updateSimulatorUI() {
    if (!pointsDisplay) return;
    animateValue(pointsDisplay, parseInt(pointsDisplay.textContent || '0'), userPoints, 500);
    const maxPoints = 1200;
    if (progressBar) progressBar.style.width = `${Math.min((userPoints / maxPoints) * 100, 100)}%`;

    rewardItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const btn = el.querySelector('.redeem-btn');
      const badge = el.querySelector('.prize-status');
      if (userPoints >= item.points) {
        el.classList.remove('opacity-55', 'border-dashed');
        el.classList.add('border-solid', 'border-[oklch(72%_0.16_150)]', 'bg-[oklch(72%_0.16_150_/_0.03)]');
        badge.innerHTML = 'Disponible';
        badge.className = 'prize-status text-[10px] px-2 py-0.5 rounded bg-[oklch(72%_0.16_150_/_0.15)] text-[oklch(72%_0.16_150)] font-medium';
        btn.disabled = false;
        btn.className = 'redeem-btn text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors bg-[var(--color-accent)] text-black hover:shadow-lg';
      } else {
        el.classList.add('opacity-55', 'border-dashed');
        el.classList.remove('border-solid', 'border-[oklch(72%_0.16_150)]', 'bg-[oklch(72%_0.16_150_/_0.03)]');
        badge.innerHTML = `${item.points} <span class="coin-name-display-short">${coinShortName}</span>`;
        badge.className = 'prize-status text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium';
        btn.disabled = true;
        btn.className = 'redeem-btn text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors bg-transparent text-gray-500 cursor-not-allowed';
      }
    });

    if (combinedPoints) combinedPoints.textContent = userPoints;
  }

  // ===== REDEEM =====
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.redeem-btn:not([disabled])');
    if (!btn) return;
    const itemEl = btn.closest('.reward-item');
    const item = rewardItems.find(r => r.id === itemEl.id);
    if (item && userPoints >= item.points) {
      userPoints -= item.points;
      updateSimulatorUI();
      const code = 'PE-' + Math.floor(1000 + Math.random() * 9000) + '-' + String.fromCharCode(65 + Math.floor(Math.random() * 26));
      if (redeemCodeDisplay) redeemCodeDisplay.textContent = code;
      if (redeemProductDisplay) redeemProductDisplay.textContent = item.name;
      if (redeemModal) {
        redeemModal.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
        redeemModal.classList.add('translate-y-0', 'opacity-100');
      }
      showNotification(`¡Canjeado! ${item.name} se ha descontado de tu saldo.`);
    }
  });

  if (document.getElementById('close-redeem-modal')) {
    document.getElementById('close-redeem-modal').addEventListener('click', () => {
      redeemModal.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      redeemModal.classList.remove('translate-y-0', 'opacity-100');
    });
  }

  // ===== EVENTS SIMULATOR =====
  function renderEventsList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    events.forEach(evt => {
      const reg = registeredEvents[evt.id];
      const card = document.createElement('div');
      card.className = 'event-card p-4 rounded-xl space-y-2';
      card.innerHTML = `
        <div class="flex justify-between items-start">
          <span class="text-[10px] font-mono ${reg ? 'text-[var(--color-emerald)]' : 'text-zinc-500'}">${reg ? '✓ REGISTRADO' : 'PRÓXIMO EVENTO'}</span>
          <span class="text-[10px] text-zinc-500">${evt.date}</span>
        </div>
        <h4 class="text-sm font-bold text-[var(--color-ink)]">${evt.name}</h4>
        <p class="text-[10px] text-[var(--color-ink-muted)] leading-relaxed">${evt.desc}</p>
        <div class="flex items-center space-x-3 text-[9px] text-zinc-500 font-mono">
          <span>🕐 ${evt.time}</span>
          <span>📍 ${evt.location}</span>
        </div>
        <button class="evt-register-btn w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${reg ? 'bg-[var(--color-emerald)] text-white cursor-default' : 'bg-[var(--color-accent)] text-black hover:shadow-lg'}"
          data-evt-id="${evt.id}" ${reg ? 'disabled' : ''}>
          ${reg ? 'Registrado ✓' : 'Registrarse'}
        </button>
      `;
      container.appendChild(card);
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.evt-register-btn:not([disabled])');
    if (!btn) return;
    const evt = events.find(e => e.id === btn.dataset.evtId);
    if (!evt || registeredEvents[evt.id]) return;

    registeredEvents[evt.id] = true;
    renderEventsList('events-list');
    renderEventsList('events-list-full');

    const names = ['Ana Martínez', 'Carlos López', 'María García', 'José Hernández', 'Laura Rodríguez', 'Pedro Sánchez'];
    const attendee = names[Math.floor(Math.random() * names.length)];
    const code = 'EV-' + Math.floor(1000 + Math.random() * 9000) + '-' + evt.name.substring(0, 3).toUpperCase();

    if (ticketWelcome) ticketWelcome.textContent = `¡Bienvenido a ${evt.name}!`;
    if (ticketEventName) ticketEventName.textContent = evt.name;
    if (ticketAttendee) ticketAttendee.textContent = attendee;
    if (ticketDate) ticketDate.textContent = evt.date;
    if (ticketTime) ticketTime.textContent = evt.time;
    if (ticketLocation) ticketLocation.textContent = evt.location;
    if (ticketCode) ticketCode.textContent = code;

    if (ticketModal) {
      ticketModal.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
      ticketModal.classList.add('translate-y-0', 'opacity-100');
    }
    showNotification(`¡Registro exitoso! Ticket generado para ${evt.name}`);

    if (combinedEvents) combinedEvents.textContent = Object.keys(registeredEvents).length;
  });

  if (document.getElementById('close-ticket-modal')) {
    document.getElementById('close-ticket-modal').addEventListener('click', () => {
      ticketModal.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      ticketModal.classList.remove('translate-y-0', 'opacity-100');
    });
  }

  // ===== WHITE LABEL =====
  const coinNameInput = document.getElementById('coin-name-input');
  function updateCoinNames() {
    if (!coinNameInput) return;
    const newName = coinNameInput.value.trim() || 'Muni-Puntos';
    coinShortName = newName.substring(0, 5).toLowerCase();
    document.querySelectorAll('.coin-name-display').forEach(el => el.textContent = newName);
    document.querySelectorAll('.coin-name-display-short').forEach(el => el.textContent = coinShortName);
    updateSimulatorUI();
  }
  if (coinNameInput) coinNameInput.addEventListener('input', updateCoinNames);

  const coinIconInput = document.getElementById('coin-icon-input');
  if (coinIconInput) {
    coinIconInput.addEventListener('change', (e) => {
      document.querySelectorAll('.coin-icon-display').forEach(el => el.textContent = e.target.value);
    });
  }

  document.querySelectorAll('.theme-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-color-btn').forEach(b => {
        b.classList.remove('border-white', 'scale-110');
        b.classList.add('border-transparent');
      });
      btn.classList.add('border-white', 'scale-110');
      btn.classList.remove('border-transparent');
      document.documentElement.style.setProperty('--color-accent', btn.dataset.color);
      document.documentElement.style.setProperty('--color-accent-hover', btn.dataset.hover);
      document.documentElement.style.setProperty('--color-accent-muted', btn.dataset.muted);
    });
  });

  // ===== NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-[var(--color-accent)]', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[var(--color-accent)]', 'font-semibold');
          }
        });
      }
    });
  });

  // ===== PRICING HOVER =====
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.plan-card').forEach(c => c.style.borderColor = 'var(--color-rule)');
      card.style.borderColor = 'var(--color-accent)';
    });
  });

  // ===== CAPTCHA IMAGE GENERATOR =====
  function renderCaptchaImage(canvas, number) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 80;
    const h = canvas.height = 50;

    // Background
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, w, h);

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${100 + Math.random() * 100}, ${100 + Math.random() * 100}, ${100 + Math.random() * 100}, 0.4)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.bezierCurveTo(Math.random() * w, Math.random() * h, Math.random() * w, Math.random() * h, Math.random() * w, Math.random() * h);
      ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${0.3 + Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Number with distortion
    const colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const fontSize = 28 + Math.floor(Math.random() * 6);
    const fontWeight = Math.random() > 0.5 ? '900' : '700';
    ctx.font = `${fontWeight} ${fontSize}px 'Cabinet Grotesk', system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw each digit with slight rotation/offset
    const digits = String(number).split('');
    const digitWidth = w / (digits.length + 1);
    digits.forEach((digit, i) => {
      ctx.save();
      const x = digitWidth * (i + 1);
      const y = h / 2 + (Math.random() - 0.5) * 8;
      const rotation = (Math.random() - 0.5) * 0.3;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      ctx.fillText(digit, 0, 0);
      ctx.restore();
    });
  }

  // ===== ACCESS FORM =====
  const accessModal = document.getElementById('access-modal');
  const accessForm = document.getElementById('access-form');

  if (accessForm) {
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formComment = document.getElementById('form-comment');
    const captchaCanvas1 = document.getElementById('captcha-canvas-1');
    const captchaCanvas2 = document.getElementById('captcha-canvas-2');
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    const formError = document.getElementById('form-error');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    let captchaA = 0;
    let captchaB = 0;

    function generateCaptcha() {
      captchaA = Math.floor(1 + Math.random() * 9);
      captchaB = Math.floor(1 + Math.random() * 9);
      renderCaptchaImage(captchaCanvas1, captchaA);
      renderCaptchaImage(captchaCanvas2, captchaB);
      if (captchaInput) captchaInput.value = '';
      if (captchaError) captchaError.classList.add('hidden');
    }

    function showForm() {
      if (localStorage.getItem('pe_access_granted')) return true;
      generateCaptcha();
      accessModal.classList.remove('opacity-0', 'pointer-events-none');
      accessModal.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
      return false;
    }

    function hideForm() {
      accessModal.classList.add('opacity-0', 'pointer-events-none');
      accessModal.classList.remove('opacity-100');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.contact-trigger').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showForm();
      });
    });

    accessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formError) formError.classList.add('hidden');
      if (captchaError) captchaError.classList.add('hidden');

      const name = formName.value.trim();
      const email = formEmail.value.trim();
      const comment = formComment.value.trim();

      if (!name || !email) {
        if (formError) {
          formError.textContent = 'Completa todos los campos obligatorios.';
          formError.classList.remove('hidden');
        }
        return;
      }

      if (parseInt(captchaInput.value) !== captchaA + captchaB) {
        if (captchaError) captchaError.classList.remove('hidden');
        generateCaptcha();
        return;
      }

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = 'Enviando...';
      }

      const payload = {
        embeds: [{
          title: '🎯 Nuevo Acceso al Simulador',
          color: 0x3B82F6,
          fields: [
            { name: 'Nombre', value: name, inline: true },
            { name: 'Correo', value: email, inline: true },
            { name: 'Comentario', value: comment || 'Sin comentario', inline: false },
            { name: 'Captcha', value: `${captchaA} + ${captchaB} = ${captchaA + captchaB}`, inline: true },
            { name: 'Timestamp', value: new Date().toISOString(), inline: true }
          ],
          footer: { text: 'PuntoEvento — Web Simulator' }
        }]
      };

      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (_) {}

      localStorage.setItem('pe_access_granted', 'true');
      hideForm();
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Ingresar al Simulador';
      }

      const simulador = document.getElementById('simulador');
      if (simulador) simulador.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== CORPORATIVO CLOUDS =====
  const cloudEvents = document.getElementById('cloud-events');
  const cloudChallenges = document.getElementById('cloud-challenges');
  const selectPuntos = document.getElementById('cloud-select-puntos');
  const selectEventos = document.getElementById('cloud-select-eventos');
  const footerPuntos = document.getElementById('footer-select-puntos');
  const footerEventos = document.getElementById('footer-select-eventos');

  function showCloudView(view) {
    if (!cloudEvents || !cloudChallenges) return;
    cloudEvents.classList.add('hidden');
    cloudChallenges.classList.add('hidden');
    if (view === 'points') {
      cloudChallenges.classList.remove('hidden');
    } else if (view === 'events') {
      cloudEvents.classList.remove('hidden');
    }
  }

  if (selectPuntos) selectPuntos.addEventListener('click', () => showCloudView('points'));
  if (selectEventos) selectEventos.addEventListener('click', () => showCloudView('events'));
  if (footerPuntos) footerPuntos.addEventListener('click', () => showCloudView('points'));
  if (footerEventos) footerEventos.addEventListener('click', () => showCloudView('events'));

  // ===== INIT =====
  renderEventsList('events-list');
  renderEventsList('events-list-full');
  updateSimulatorUI();
  updateCoinNames();
});
