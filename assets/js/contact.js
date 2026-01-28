// contact.js
// Robust Turnstile + Verifalia worker handling with defensive checks and logs.

(function () {
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.querySelector(".cf-turnstile");
  const form = document.querySelector('.contact-form');

  let turnstileWidgetId;
  let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

  function safeLog(...args) {
    if (window.console && typeof console.log === 'function') console.log(...args);
  }

  // Ensure sitekey is a string and only one initialization path exists.
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

  function renderTurnstile() {
    safeLog("renderTurnstile called", { turnstileExists: !!window.turnstile, container: !!turnstileContainer });

    if (!window.turnstile) {
      safeLog("window.turnstile yok, Turnstile script henüz yüklenmemiş olabilir.");
      return;
    }
    if (!turnstileContainer) {
      safeLog("Turnstile container bulunamadı, render atlandı.");
      return;
    }

    if (typeof TURNSTILE_SITEKEY !== 'string') {
      console.error("Turnstile sitekey string değil:", typeof TURNSTILE_SITEKEY, TURNSTILE_SITEKEY);
      return;
    }

    // Remove previous widget if present
    if (turnstileWidgetId !== undefined) {
      try { window.turnstile.remove(turnstileWidgetId); } catch (e) { safeLog("turnstile.remove hata", e); }
      turnstileWidgetId = undefined;
    }

    turnstileContainer.innerHTML = "";
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: TURNSTILE_SITEKEY,
        theme: currentTheme,
        callback: () => {
          safeLog("Turnstile success callback");
          if (submitBtn) submitBtn.disabled = false;
          if (errorBox) errorBox.style.display = "none";
        },
        "error-callback": () => {
          safeLog("Turnstile error-callback");
          if (submitBtn) submitBtn.disabled = true;
          if (errorBox) errorBox.style.display = "block";
        }
      });
      safeLog("Turnstile render id", turnstileWidgetId);
    } catch (e) {
      console.warn("Turnstile render denemesi başarısız.", e);
    }
  }

  // Wait for Turnstile API to be ready
  const checkTurnstile = setInterval(() => {
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      clearInterval(checkTurnstile);
      safeLog("turnstile hazır, render çağrılıyor");
      renderTurnstile();
    }
  }, 200);

  // Observe theme changes and re-render if needed
  const observer = new MutationObserver(() => {
    const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      safeLog("Tema değişti, turnstile yeniden render ediliyor", currentTheme);
      renderTurnstile();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // Form submit + Verifalia worker
  if (!form) {
    safeLog("Form bulunamadı: .contact-form");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    safeLog("Form submit tetiklendi");

    if (!submitBtn) {
      safeLog("submitBtn bulunamadı, form requestSubmit ile gönderiliyor");
      form.requestSubmit();
      return;
    }

    const emailEl = form.querySelector('input[name="email"]');
    const emailInput = emailEl ? emailEl.value.trim() : "";
    const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/";

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Checking email...";

    try {
      safeLog("Worker çağrılıyor", workerUrl, { email: emailInput });
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });

      safeLog("Worker response status", response.status);

      if (!response.ok) {
        throw new Error("Worker HTTP hatası: " + response.status);
      }

      const result = await response.json();
      safeLog("Worker sonucu", result);

      // Worker içeriğinde mantıksal hata kontrolü
      if (result && typeof result.code !== 'undefined' && result.code !== 200) {
        safeLog("Worker mantıksal hata tespit edildi", result);
        alert("E-posta doğrulama servisi hatası: " + (result.message || "Bilinmeyen hata"));
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        return;
      }

      // Beklenen yapı: result.entry.classification === "Deliverable"
      if (result.entry && result.entry.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.requestSubmit();
      } else {
        alert("Lütfen geçerli ve ulaşılabilir bir e-posta adresi girdiğinizden emin olun.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        if (window.turnstile && typeof window.turnstile.reset === 'function') {
          try { window.turnstile.reset(turnstileWidgetId); } catch (e) { safeLog("turnstile.reset hata", e); }
        }
      }
    } catch (error) {
      console.warn("Worker çağrısında hata veya erişim sorunu:", error);
      // Kullanıcıya seçenek sun
      const retry = confirm("E-posta doğrulama servisine ulaşılamıyor veya hata oluştu. Formu yine de göndermek ister misiniz?");
      if (retry) {
        form.requestSubmit();
      } else {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
})();
