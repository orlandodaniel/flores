onload = () => {
  const btn = document.getElementById('start-animation-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.remove("not-loaded");
      btn.style.display = 'none';
      // Reproducir audio local
      let audio = document.getElementById('bg-audio');
      if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'bg-audio';
        audio.src = 'Yellow.mp3';
        audio.loop = true;
        audio.autoplay = true;
        audio.style.display = 'none';
        document.body.appendChild(audio);
      }
      audio.volume = 0.30;
      audio.play();
    });
  }

  // --- Corazones flotantes y barra de progreso ---
  const TOTAL_HEARTS = 29;
  let heartsCollected = 0;
  const heartsContainer = document.getElementById('hearts-container');
  const progressFill = document.getElementById('hearts-progress-bar-fill');
  const progressLabel = document.getElementById('hearts-progress-label');
  const flowersWrapper = document.getElementById('flowers-wrapper');
  const heartsInstructions = document.getElementById('hearts-instructions');

  // Generar corazones
  function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
  }

  function createHeart(i) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    // Posición y animación aleatoria
    const startX = randomBetween(5, 85); // vw
    const startY = randomBetween(10, 70); // vh
    const endX = randomBetween(5, 85); // vw
    const endY = randomBetween(10, 70); // vh
    const duration = randomBetween(7, 13); // s
    const delay = randomBetween(0, 6); // s

    heart.style.left = `0`;
    heart.style.top = `0`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.transform = `translate(${startX}vw, ${startY}vh)`;

    // SVG corazón rosado
    heart.innerHTML = `
      <svg viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 32s-1.5-1.3-6.5-5.2C6 22.6 2 18.7 2 13.7 2 8.7 6.2 5 11 5c2.6 0 5.1 1.3 6.5 3.3C19.9 6.3 22.4 5 25 5c4.8 0 9 3.7 9 8.7 0 5-4 8.9-10.5 13.1C20.5 30.7 19 32 19 32z"
          fill="#ffb6d5" stroke="#ff69b4" stroke-width="2"/>
      </svg>
    `;

    // Animación personalizada por JS
    heart.animate([
      { transform: `translate(${startX}vw, ${startY}vh)`, opacity: 1 },
      { transform: `translate(${endX}vw, ${endY}vh)`, opacity: 0.2 }
    ], {
      duration: duration * 1000,
      delay: delay * 1000,
      iterations: Infinity
    });

    // Click para recolectar
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      if (heart.classList.contains('removed')) return;
      heart.classList.add('removed');
      heartsCollected++;
      updateProgress();
      setTimeout(() => {
        heart.remove();
      }, 350);
    });

    return heart;
  }

  function updateProgress() {
    if (progressFill) {
      progressFill.style.width = `${(heartsCollected / TOTAL_HEARTS) * 100}%`;
    }
    if (progressLabel) {
      progressLabel.textContent = `${heartsCollected}/${TOTAL_HEARTS}`;
    }
    // Mostrar flores cuando la barra esté llena
    if (heartsCollected >= TOTAL_HEARTS && flowersWrapper) {
      flowersWrapper.style.display = 'block';
      // Forzar reflow para que el transition funcione si display era 'none'
      void flowersWrapper.offsetWidth;
      flowersWrapper.classList.add('visible');
      // Ocultar instrucciones
      if (heartsInstructions) {
        heartsInstructions.classList.add('hide');
      }
      // Mostrar mensaje final si no existe
      if (!document.getElementById('final-love-message')) {
        const msg = document.createElement('div');
        msg.id = 'final-love-message';
        msg.textContent = 'Te amo mucho, Yessy ❤️';
        msg.style.position = 'fixed';
        msg.style.top = '45%';
        msg.style.left = '50%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.fontSize = '2.4em';
        msg.style.fontFamily = "'Segoe UI', sans-serif";
        msg.style.color = '#ff37a5ff';
        msg.style.background = 'rgba(255,255,255,0.92)';
        msg.style.padding = '1em 2em';
        msg.style.borderRadius = '18px';
        msg.style.boxShadow = '0 4px 24px #ffe06655';
        msg.style.zIndex = 4000;
        msg.style.textAlign = 'center';
        msg.style.fontWeight = 'bold';
        msg.style.letterSpacing = '1px';
        msg.style.userSelect = 'none';
        msg.style.opacity = '0';
        msg.style.transition = 'opacity 1.2s';
        document.body.appendChild(msg);
        setTimeout(() => { msg.style.opacity = '1'; }, 300);
      }
    }
  }

  // Inicializar corazones
  if (heartsContainer) {
    for (let i = 0; i < TOTAL_HEARTS; i++) {
      heartsContainer.appendChild(createHeart(i));
    }
  }
  updateProgress();
};
