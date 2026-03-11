const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  observer.observe(element);
});

const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.results": "Results",
    "nav.about": "About Us",
    "nav.cta": "Free Estimate",
    "hero.eyebrow": "Professional exterior cleaning in New Jersey",
    "hero.title": "Start your spring<br />with lots of cleaning",
    "hero.subtitle": "Request your free estimate today",
    "hero.lead": "Homes, driveways, roofs, gutters, windows, and exterior surfaces cleaned with power, precision, and a premium finish.",
    "hero.primary": "Request Estimate",
    "hero.point1": "Fast response",
    "hero.point2": "Residential and commercial service",
    "hero.point3": "Visible results from the first visit",
    "stat.label": "Featured service",
    "stat.copy": "Restore color, remove buildup, and improve curb appeal immediately.",
    "services.eyebrow": "Our services and results",
    "services.title": "Our services and results",
    "compare.before": "Before",
    "compare.after": "After",
    "cards.house.title": "House Exterior Wash",
    "cards.house.copy": "Remove mildew, dirt, and stains without damaging siding, paint, or delicate finishes.",
    "cards.driveway.title": "Driveways and Walkways",
    "cards.driveway.copy": "Concrete, slab, and pavement deep-cleaned to recover color and texture.",
    "cards.gutter.title": "Gutter Cleaning",
    "cards.gutter.copy": "Debris removal and exterior cleaning to prevent clogs and improve drainage.",
    "cards.stairs.title": "Stairs and Railings",
    "cards.stairs.copy": "Targeted exterior cleaning for railings, steps, and access areas.",
    "cards.roof.title": "Roof Cleaning",
    "cards.roof.copy": "Treat organic buildup and restore curb appeal without damaging the surface.",
    "cards.window.title": "Window Cleaning",
    "cards.window.copy": "Clearer glass, fewer water marks, and a cleaner, brighter facade.",
    "trust.eyebrow": "Why choose Elite Blast Power Wash",
    "trust.title": "Professional exterior cleaning with visible results and a service you can count on.",
    "trust.metric1": "main services",
    "trust.metric2Value": "Fast",
    "trust.metric2": "response and scheduling",
    "trust.metric3": "focused on curb appeal",
    "about.eyebrow": "About us",
    "about.title": "Reliable exterior cleaning for homes that need to look cleaner, brighter, and better maintained.",
    "about.copy": "Elite Blast Power Wash helps homeowners improve curb appeal with careful pressure washing, cleaner finishes, and visible before-and-after results.",
    "about.feature1.title": "Attention to detail",
    "about.feature1.copy": "We focus on the areas that change the look of a property fast: siding, entries, gutters, roofs, windows, and access points.",
    "about.feature2.title": "Visible results",
    "about.feature2.copy": "Our work is built around clear before-and-after improvements you can see from the first visit.",
    "about.feature3.title": "Straightforward service",
    "about.feature3.copy": "Clear communication, fast scheduling, and estimates that help you move forward without friction.",
    "contact.eyebrow": "Free estimate",
    "contact.title": "Ready to clean up your property?",
    "contact.copy": "Call us at",
    "contact.copy2": "or send us your request today.",
    "form.name": "Name",
    "form.namePlaceholder": "Your name",
    "form.phone": "Phone",
    "form.phonePlaceholder": "(201) 589-7668",
    "form.email": "Email",
    "form.emailPlaceholder": "your@email.com",
    "form.service": "Service",
    "form.message": "Message",
    "form.messagePlaceholder": "Tell us what you need cleaned",
    "form.submit": "Request Estimate",
    "footer.cta": "Call us to start your next exterior cleaning project."
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.results": "Resultados",
    "nav.about": "Sobre nosotros",
    "nav.cta": "Presupuesto gratuito",
    "hero.eyebrow": "Lavado exterior profesional en New Jersey",
    "hero.title": "Empieza tu primavera<br />con mucha limpieza",
    "hero.subtitle": "Pide tu presupuesto gratuito hoy",
    "hero.lead": "Casas, entradas, techos, canalones, ventanas y superficies exteriores tratadas con potencia, precisión y acabado premium.",
    "hero.primary": "Solicitar estimado",
    "hero.point1": "Respuesta rápida",
    "hero.point2": "Servicio residencial y comercial",
    "hero.point3": "Resultados visibles desde la primera visita",
    "stat.label": "Servicio destacado",
    "stat.copy": "Recupera color, elimina suciedad acumulada y mejora la primera impresión.",
    "services.eyebrow": "Nuestros servicios y resultados",
    "services.title": "Nuestros servicios y resultados",
    "compare.before": "Antes",
    "compare.after": "Después",
    "cards.house.title": "Lavado exterior de casas",
    "cards.house.copy": "Elimina moho, polvo y manchas sin castigar siding, pintura ni acabados delicados.",
    "cards.driveway.title": "Entradas y accesos",
    "cards.driveway.copy": "Hormigón, losa y pavimento con limpieza profunda para recuperar tono y textura.",
    "cards.gutter.title": "Limpieza de canalones",
    "cards.gutter.copy": "Retirada de residuos y lavado exterior para evitar obstrucciones y mejorar el drenaje.",
    "cards.stairs.title": "Escaleras y railings",
    "cards.stairs.copy": "Limpieza exterior dirigida para barandillas, escalones y zonas de acceso.",
    "cards.roof.title": "Limpieza de techo",
    "cards.roof.copy": "Tratamiento para remover suciedad orgánica y devolver presencia sin dañar la superficie.",
    "cards.window.title": "Limpieza de ventanas",
    "cards.window.copy": "Cristal más claro, menos marcas de agua y una fachada mucho más limpia y luminosa.",
    "trust.eyebrow": "Por qué elegirnos",
    "trust.title": "Limpieza exterior profesional con resultados visibles y servicio confiable.",
    "trust.metric1": "servicios principales",
    "trust.metric2Value": "Rápida",
    "trust.metric2": "respuesta y agenda",
    "trust.metric3": "cuidado de la imagen de tu propiedad",
    "about.eyebrow": "Sobre nosotros",
    "about.title": "Limpieza exterior confiable para viviendas que necesitan verse más limpias, luminosas y cuidadas.",
    "about.copy": "Elite Blast Power Wash ayuda a mejorar la imagen de tu propiedad con lavados cuidadosos, acabados más limpios y resultados before/after que realmente se notan.",
    "about.feature1.title": "Atención al detalle",
    "about.feature1.copy": "Nos centramos en las zonas que cambian rápido la imagen de una propiedad: fachadas, entradas, canalones, techos, ventanas y accesos.",
    "about.feature2.title": "Resultados visibles",
    "about.feature2.copy": "Nuestro trabajo se apoya en mejoras before/after claras que se perciben desde la primera visita.",
    "about.feature3.title": "Servicio directo",
    "about.feature3.copy": "Comunicación clara, programación rápida y presupuestos que te permiten avanzar sin complicaciones.",
    "contact.eyebrow": "Presupuesto gratuito",
    "contact.title": "¿Listo para mejorar la imagen de tu propiedad?",
    "contact.copy": "Llámanos al",
    "contact.copy2": "o envíanos tu solicitud hoy.",
    "form.name": "Nombre",
    "form.namePlaceholder": "Tu nombre",
    "form.phone": "Telefono",
    "form.phonePlaceholder": "(201) 589-7668",
    "form.email": "Email",
    "form.emailPlaceholder": "tu@email.com",
    "form.service": "Servicio",
    "form.message": "Mensaje",
    "form.messagePlaceholder": "Cuéntanos qué necesitas limpiar",
    "form.submit": "Solicitar presupuesto",
    "footer.cta": "Llámanos para empezar tu próximo proyecto de limpieza exterior."
  }
};

const setLanguage = (lang) => {
  const copy = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) {
      element.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (copy[key]) {
      element.innerHTML = copy[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (copy[key]) {
      element.setAttribute("placeholder", copy[key]);
    }
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });
};

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage("en");

document.querySelectorAll("[data-before-after]").forEach((comparison) => {
  const range = comparison.querySelector(".comparison-range");

  if (!range) {
    return;
  }

  const updateSplit = () => {
    comparison.style.setProperty("--split", `${range.value}%`);
  };

  range.addEventListener("input", updateSplit);
  updateSplit();
});

const form = document.querySelector(".contact-form");

if (form) {
  const status = form.querySelector(".form-status");
  const turnstileWrap = form.querySelector(".turnstile-wrap");
  const turnstileNode = form.querySelector(".cf-turnstile");

  const formMessages = {
    en: {
      sending: "Sending request...",
      success: "Request sent successfully.",
      invalid: "Please complete all required fields correctly.",
      error: "We couldn't send your request. Please call us or try again.",
      antiSpam: "Please complete the anti-spam check."
    },
    es: {
      sending: "Enviando solicitud...",
      success: "Solicitud enviada correctamente.",
      invalid: "Completa correctamente los campos obligatorios.",
      error: "No pudimos enviar tu solicitud. Llamanos o vuelve a intentarlo.",
      antiSpam: "Completa la verificacion anti-spam."
    }
  };

  const trackLeadSubmission = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "eliteblast_lead_submitted",
      form_id: "contact-form",
      domain: window.location.hostname
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "contact",
        event_label: "eliteblast_form"
      });
    }
  };

  fetch("turnstile-config.php", {
    headers: { Accept: "application/json" }
  })
    .then((response) => response.json())
    .then((config) => {
      if (!config.enabled || !config.siteKey || !turnstileWrap || !turnstileNode) {
        return;
      }

      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        turnstileWrap.hidden = false;
        if (window.turnstile) {
          window.turnstile.render(turnstileNode, {
            sitekey: config.siteKey,
            theme: "light"
          });
        }
      };
      document.head.appendChild(script);
    })
    .catch(() => {});

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const lang = document.documentElement.lang === "es" ? "es" : "en";
    const copy = formMessages[lang];

    if (!button || !status) {
      return;
    }

    if (!form.reportValidity()) {
      status.textContent = copy.invalid;
      status.dataset.state = "error";
      return;
    }

    if (!turnstileWrap.hidden && window.turnstile) {
      const response = form.querySelector('[name="cf-turnstile-response"]');
      if (!response || !response.value) {
        status.textContent = copy.antiSpam;
        status.dataset.state = "error";
        return;
      }
    }

    const originalText = button.textContent;
    const formData = new FormData(form);
    button.textContent = copy.sending;
    button.disabled = true;
    status.textContent = "";
    status.dataset.state = "";

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.ok) {
          throw new Error(data.message || copy.error);
        }
        status.textContent = copy.success;
        status.dataset.state = "success";
        trackLeadSubmission();
        form.reset();
        if (window.turnstile) {
          window.turnstile.reset();
        }
        window.setTimeout(() => {
          window.location.href = `thank-you.html?lang=${lang}`;
        }, 900);
      })
      .catch((error) => {
        status.textContent = error.message || copy.error;
        status.dataset.state = "error";
      })
      .finally(() => {
        button.textContent = originalText;
        button.disabled = false;
      });
  });
}
