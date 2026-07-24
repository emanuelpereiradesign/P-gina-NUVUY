/* ==========================================================================
   NUVUY LANDING PAGE - CAKTO / FRAMER INTERACTIVE EFFECTS
   Exact 4-Column Pricing & Interactive Polish
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroTextStagger();
  initHeroNodesParallax();
  initCursorSpotlight();
  initCardBorderGlowAndTilt();
  initScrollReveal();
  initMagneticButtons();
  initInfiniteMarquee();
  initLiveSimulator();
  initPricingToggle();
  initFaqAccordion();
  initSmoothScroll();
  initStatsCounter();
  initSplineWatermarkRemoverAndZoomBlocker();
});

/* SVG Icon Constants */
const ICONS = {
  hot: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-.64-.24-1.23-.64-1.67L12 11.5l-.86 1.33c-.4.44-.64 1.03-.64 1.67z"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></svg>`,
  warm: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  cold: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>`,
  copy: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  sparkle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg>`
};

/* Remove Watermark & Lock Wheel Zoom */
function initSplineWatermarkRemoverAndZoomBlocker() {
  const cleanAndConfigureSpline = () => {
    const viewer = document.querySelector('spline-viewer');
    if (!viewer) return;

    const stopWheelZoom = (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    };

    viewer.addEventListener('wheel', stopWheelZoom, { capture: true });

    if (viewer.shadowRoot) {
      const logos = viewer.shadowRoot.querySelectorAll('#logo, a[href*="spline"], #spline-watermark, .spline-watermark');
      logos.forEach(logo => {
        logo.style.display = 'none';
        logo.style.opacity = '0';
        logo.style.visibility = 'hidden';
        logo.style.pointerEvents = 'none';
      });

      const canvasList = viewer.shadowRoot.querySelectorAll('canvas');
      canvasList.forEach(canvas => {
        canvas.style.background = 'transparent';
        canvas.removeEventListener('wheel', stopWheelZoom, true);
        canvas.addEventListener('wheel', stopWheelZoom, { capture: true });
      });
    }
  };

  const interval = setInterval(cleanAndConfigureSpline, 150);
  setTimeout(() => clearInterval(interval), 12000);
}

/* Hero Word-by-Word Staggered Text Reveal */
function initHeroTextStagger() {
  const titleEl = document.querySelector('.hero-title-stagger');
  if (!titleEl) return;

  const originalNodes = Array.from(titleEl.childNodes);
  let wordIndex = 0;
  let newHTML = '';

  originalNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(' ');
      words.forEach(word => {
        if (word.trim() === '') return;
        const delay = (0.2 + wordIndex * 0.08).toFixed(2);
        newHTML += `<span class="stagger-word" style="animation-delay: ${delay}s">${word} </span>`;
        wordIndex++;
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        newHTML += '<br>';
      } else {
        const words = node.textContent.split(' ');
        newHTML += `<span class="${node.className}">`;
        words.forEach(word => {
          if (word.trim() === '') return;
          const delay = (0.2 + wordIndex * 0.08).toFixed(2);
          newHTML += `<span class="stagger-word" style="animation-delay: ${delay}s">${word} </span>`;
          wordIndex++;
        });
        newHTML += `</span>`;
      }
    }
  });

  titleEl.innerHTML = newHTML;
}

/* Mouse Parallax Movement for Hero Floating Nodes */
function initHeroNodesParallax() {
  const heroSection = document.querySelector('.hero');
  const nodes = document.querySelectorAll('.floating-node');
  if (!heroSection || nodes.length === 0) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (e.clientX - rect.left - centerX) / centerX;
    const moveY = (e.clientY - rect.top - centerY) / centerY;

    nodes.forEach((node, idx) => {
      const depth = (idx + 1) * 12;
      node.style.marginRight = `${moveX * depth}px`;
      node.style.marginTop = `${moveY * depth}px`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    nodes.forEach(node => {
      node.style.marginRight = '0px';
      node.style.marginTop = '0px';
    });
  });
}

/* Cursor Spotlight Follower */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* Smooth Card Cursor Glow & 3D Tilt */
function initCardBorderGlowAndTilt() {
  const cards = document.querySelectorAll('.bento-card, .feature-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--card-x', `${x}px`);
      card.style.setProperty('--card-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      if (!card.classList.contains('featured')) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      }
    });
  });
}

/* Scroll Reveal Observer */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

/* Smooth Magnetic Buttons */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-glass, .btn-gradient');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

/* Seamless Infinite Marquee Duplication */
function initInfiniteMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  const children = Array.from(marqueeTrack.children);
  children.forEach(child => {
    const clone = child.cloneNode(true);
    marqueeTrack.appendChild(clone);
  });
}

/* Live Lead Scraper Simulator */
const sampleLeadsData = {
  estetica: [
    {
      nome: "Clínica Estética Bella Vita",
      score: 94,
      temp: "hot",
      tempText: "Quente",
      avaliacao: "4.8 (142 avaliações)",
      statusSite: "Site antigo / Sem versão mobile",
      statusInsta: "Perfil inativo há 4 meses",
      aiReason: "Empresa com excelente fluxo de clientes no Maps porém presença digital vulnerável. Alta probabilidade de fechar redesign e tráfego pago.",
      script: "Olá equipe Bella Vita! Notei que vocês têm ótimas avaliações no Google Maps (4.8), porém o site de vocês não abre bem no celular. Tenho uma proposta para dobrar os agendamentos diretos pelo WhatsApp. Podemos conversar 5 min?"
    },
    {
      nome: "Studio de Estética e Cílios Glow",
      score: 68,
      temp: "warm",
      tempText: "Morno",
      avaliacao: "4.2 (38 avaliações)",
      statusSite: "Sem site cadastrado",
      statusInsta: "Instagram ativo (2.4k seguidores)",
      aiReason: "Possui presença no Instagram mas depende 100% da rede social. Oportunidade para vender Landing Page de agendamento automático.",
      script: "Olá! Vi o trabalho incrível de vocês no Instagram. Vocês ainda não têm uma Landing Page de agendamento automático para não perder clientes fora do horário comercial? Criei um modelo exclusivo para o seu nicho."
    },
    {
      nome: "Harmonização Facial Dr. Lucas",
      score: 35,
      temp: "cold",
      tempText: "Frio",
      avaliacao: "5.0 (210 avaliações)",
      statusSite: "Site moderno com agendamento online",
      statusInsta: "Instagram verificado (45k seguidores)",
      aiReason: "Presença digital altamente consolidada e equipe própria. Prioridade baixa para prospecção direta simples.",
      script: "Olá Dr. Lucas, parabéns pela estrutura impecável. Oferecemos consultoria avançada de otimização de taxa de conversão (CRO) para clínicas de alta demanda."
    }
  ],
  restaurante: [
    {
      nome: "Bistrô e Hamburgueria Ladrilho",
      score: 91,
      temp: "hot",
      tempText: "Quente",
      avaliacao: "4.6 (310 avaliações)",
      statusSite: "Cardápio PDF lento no Google",
      statusInsta: "Sem Link no Perfil",
      aiReason: "Cliente tem alta demanda mas usa PDF pesado como cardápio. Ideal para venda de Cardápio Digital Interativo ou Pedidos via WhatsApp.",
      script: "Boa tarde! Estava vendo o perfil do Bistrô no Maps e notei que o cardápio está em PDF demorado para carregar. Desenvolvi um cardápio digital instantâneo que acelera em 3x os pedidos. Posso enviar uma demonstração sem compromisso?"
    },
    {
      nome: "Cantina Itália Mia",
      score: 62,
      temp: "warm",
      tempText: "Morno",
      avaliacao: "4.4 (85 avaliações)",
      statusSite: "Link quebrado no Google Maps",
      statusInsta: "Perfil com postagens semanais",
      aiReason: "O link do Google Maps está dando erro 404, perdendo clientes diariamente.",
      script: "Olá! Avisando por cortesia: o link do site de vocês no Google Maps está com erro de página não encontrada. Posso te ajudar a corrigir e criar uma página de vendas rápida hoje mesmo."
    }
  ],
  academia: [
    {
      nome: "Crossfit e Fitness Arena 360",
      score: 95,
      temp: "hot",
      tempText: "Quente",
      avaliacao: "4.9 (189 avaliações)",
      statusSite: "Sem site ou página de planos",
      statusInsta: "Instagram forte (8.5k seguidores)",
      aiReason: "Excelente autoridade local mas sem página de matrículas online. Lead perfeito para venda de Landing Page de alta conversão.",
      script: "Fala pessoal da Arena 360! Vejo que a comunidade de vocês é gigante no Instagram, mas faltam informações de planos no Google. Criei uma página de matrículas online com checkout direto. Bora agendar uma rápida conversa?"
    }
  ]
};

function initLiveSimulator() {
  const simForm = document.getElementById('sim-form');
  const simNiche = document.getElementById('sim-niche');
  const simCity = document.getElementById('sim-city');
  const placeholderState = document.getElementById('sim-placeholder');
  const loadingState = document.getElementById('sim-loading');
  const resultsContainer = document.getElementById('sim-results');

  if (!simForm) return;

  simForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicheVal = simNiche.value || 'estetica';
    const cityVal = simCity.value || 'São Paulo, SP';

    placeholderState.style.display = 'none';
    resultsContainer.style.display = 'none';
    loadingState.style.display = 'block';

    setTimeout(() => {
      loadingState.style.display = 'none';
      renderSimResults(nicheVal, cityVal);
      resultsContainer.style.display = 'grid';
      showToast(`3 Leads capturados e qualificados pela IA em ${cityVal}`);
    }, 1200);
  });
}

function renderSimResults(niche, city) {
  const resultsContainer = document.getElementById('sim-results');
  const leads = sampleLeadsData[niche] || sampleLeadsData.estetica;

  resultsContainer.innerHTML = leads.map(lead => `
    <div class="sim-lead-card">
      <div class="sim-card-top">
        <div class="sim-lead-title">${lead.nome}</div>
        <span class="score-badge ${lead.temp}">
          ${ICONS[lead.temp]} ${lead.tempText} (${lead.score}/100)
        </span>
      </div>
      <div class="sim-lead-info">
        <div><strong>Avaliação:</strong> ${lead.avaliacao}</div>
        <div><strong>Presença Web:</strong> ${lead.statusSite}</div>
      </div>
      <div class="sim-ai-reason">
        <strong>Análise Nuvuy Score:</strong><br>${lead.aiReason}
      </div>
      <div class="script-box">
        <button class="copy-btn" onclick="copyScript(this, \`${escapeJsString(lead.script)}\`)">
          ${ICONS.copy} Copiar Roteiro
        </button>
        "${lead.script}"
      </div>
    </div>
  `).join('');
}

function escapeJsString(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

window.copyScript = function(btnElement, text) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = `${ICONS.check} Copiado!`;
    btnElement.style.background = '#ffffff';
    btnElement.style.color = '#000000';
    showToast('Roteiro de abordagem copiado para a área de transferência');
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.style.background = '';
      btnElement.style.color = '';
    }, 2000);
  });
};

/* Pricing Toggle for all 4 Plans */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  const priceBasic = document.getElementById('price-basic');
  const pricePro = document.getElementById('price-pro');
  const priceBusiness = document.getElementById('price-business');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const isAnnual = toggle.classList.contains('active');

    if (isAnnual) {
      labelMonthly.classList.remove('active');
      labelAnnual.classList.add('active');
      if (priceBasic) priceBasic.innerText = '39';
      if (pricePro) pricePro.innerText = '77';
      if (priceBusiness) priceBusiness.innerText = '119';
    } else {
      labelAnnual.classList.remove('active');
      labelMonthly.classList.add('active');
      if (priceBasic) priceBasic.innerText = '49';
      if (pricePro) pricePro.innerText = '97';
      if (priceBusiness) priceBusiness.innerText = '149';
    }
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.questionBtn || item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Stats Counter */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const decimals = el.getAttribute('data-decimals') || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        
        let start = 0;
        const duration = 1800;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.innerText = target.toFixed(decimals) + suffix;
            clearInterval(timer);
          } else {
            el.innerText = start.toFixed(decimals) + suffix;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* Toast Utility */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${ICONS.sparkle} <span>${message}</span>`;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
