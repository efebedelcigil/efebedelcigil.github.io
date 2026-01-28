// contact.js (güncellenmiş, log ve hata yakalama)
const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
const form = document.querySelector('.contact-form');

let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

function safeLog(...args) {
  if (window.console && typeof console.log === 'function') console.log(...args);
}

function renderTurnstile() {
  safeLog("renderTurnstile called", { turnstileExists: !!window.turnstile, container: !!turnstileContainer });
  if (!window.turnstile || !turnstileContainer) {
    safeLog("Turnstile veya container bulunamadı, render atlandı.");
    return;
  }

  if (turnstileWidgetId !== undefined) {
    try { window.turnstile.remove(turnstileWidgetId); } catch(e) { safeLog("turnstile.remove hata", e); }
    turnstileWidgetId = undefined;
  }

  turnstileContainer.innerHTML = "";
  try {
    // sitekey kesinlikle string
    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
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

// Turnstile hazır olana kadar bekle
const checkTurnstile = setInterval(() => {
  if (window.turnstile && typeof window.turnstile.render === 'function') {
    clearInterval(checkTurnstile);
    safeLog("turnstile hazır, render çağrılıyor");
    renderTurnstile();
  }
}, 200);

// Tema değişimi takibi
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    safeLog("Tema değişti, turnstile yeniden render ediliyor", currentTheme);
    renderTurnstile();
  }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

// Form submit + Verifalia
if (!form) {
  safeLog("Form bulunamadı: .contact-form");
} else {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    safeLog("Form submit tetiklendi");

    if (!submitBtn) {
      safeLog("submitBtn bulunamadı, form requestSubmit ile gönderiliyor");
      form.requestSubmit();
      return;
    }

    const emailEl = form.querySelector('input[name="email"]');
    const emailInput = emailEl ? emailEl.value : "";
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
      if (!response.ok) throw new Error("Worker hatası veya CSP engeli: " + response.status);

      const result = await response.json();
      safeLog("Worker sonucu", result);

      if (result.entry?.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.requestSubmit();
      } else {
        alert("Lütfen geçerli ve ulaşılabilir bir e-posta adresi girdiğinizden emin olun.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        if (window.turnstile && typeof window.turnstile.reset === 'function') {
          try { window.turnstile.reset(turnstileWidgetId); } catch(e) { safeLog("turnstile.reset hata", e); }
        }
      }
    } catch (error) {
      console.warn("Doğrulama atlandı veya hata oluştu, form gönderiliyor.", error);
      if (!window.turnstile) {
        alert("Doğrulama servisine ulaşılamıyor. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        return;
      }
      form.requestSubmit();
    }
  });
}
