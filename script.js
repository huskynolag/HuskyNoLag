// Este script gerencia a navegação, animações e interatividade da página.

document.addEventListener("DOMContentLoaded", function () {
  // Efeito de scroll na barra de navegação
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Rolagem suave para links de navegação internos
  document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Funcionalidade do menu mobile (hambúrguer)
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }


  // Funcionalidade do Lightbox de vídeo
  const videoOverlay = document.getElementById("videoOverlay");
  const closeBtn = document.getElementById("closeVideoBtn");
  const lightbox = document.getElementById("videoLightbox");
  const iframe = document.getElementById("videoIframe");

  // Abre o lightbox e carrega o vídeo
  function openLightbox() {
    if (lightbox && iframe) {
      lightbox.classList.add("active");
      iframe.src = "https://www.youtube.com/embed/PHTDiUjUTmw?autoplay=1&si=W0VDLAbCnbUJRrT7";
      document.body.style.overflow = "hidden"; // Impede a rolagem do corpo da página
    }
  }

  // Fecha o lightbox e pausa o vídeo
  function closeLightbox() {
    if (lightbox && iframe) {
      lightbox.classList.remove("active");
      iframe.src = ""; // Limpa o src para parar o vídeo
      document.body.style.overflow = "auto"; // Restaura a rolagem do corpo da página
    }
  }

  // Adiciona listeners para abrir e fechar o lightbox
  if (videoOverlay) {
    videoOverlay.addEventListener("click", openLightbox);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Fecha o lightbox ao pressionar a tecla 'Escape'
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Animações de entrada para elementos (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observa elementos específicos para aplicar animações de entrada
  document
    .querySelectorAll(".feature-card, .testimonial-card, .pricing-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Otimização de performance para dispositivos móveis
  if (window.innerWidth <= 768) {
    // Reduz a duração das animações em dispositivos móveis
    document.documentElement.style.setProperty("--transition", "all 0.2s ease");

    // Desabilita animações de hover em dispositivos de toque
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device");
    }
  }

  // Lazy loading para imagens (Intersection Observer)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Função debounce para otimizar eventos de scroll
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Otimiza o manipulador de eventos de scroll
  const debouncedScrollHandler = debounce(function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler, { passive: true });

  // Fallback para navegadores mais antigos que não suportam backdrop-filter
  if (!window.CSS || !CSS.supports("backdrop-filter", "blur(10px)")) {
    document.querySelectorAll(".navbar.scrolled").forEach((el) => {
      el.style.background = "rgba(34, 34, 34, 0.95)";
    });
  }

  // Preload de recursos críticos (ex: imagem de fundo do hero)
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = "husky.png";
  document.head.appendChild(preloadLink);

  console.log("HuskyFPS - Site carregado com sucesso! Animação de digitação ativa.");
});






