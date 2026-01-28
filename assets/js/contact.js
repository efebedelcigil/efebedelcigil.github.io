const form = document.querySelector('.contact-form');
const submitBtn = form.querySelector("#submitBtn");
const errorBox = form.querySelector("#turnstileError");
const turnstileContainer = form.querySelector(".cf-turnstile");
let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

function renderTurnstile() {
  if (!window.turnstile || !turnstileContainer) return;

  if (turnstileWidgetId !== undefined) {
    try { window.turnstile.remove(turnstileWidgetId); } catch(e) {}
    turnstileWidgetId = undefined;
  }
  turnstileContainer.innerHTML = "";

  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: currentTheme,
    callback: () => {
      submitBtn.disabled = false;
      if(errorBox) errorBox.style.display = "none";
    },
    "error-callback": () => {
      submitBtn.disabled = true;
      if(errorBox) errorBox.style.display = "block";
    }
  });
  submitBtn.disabled = true;
}

// Tekrar yüklenme / duplicate sorununu önlemek için
if (!window.turnstileLoaded) {
  const checkTurnstile = setInterval(() => {
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      clearInterval(checkTurnstile);
      renderTurnstile();
      window.turnstileLoaded = true;
    }
  }, 200);
}

// Dark mode takip
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    renderTurnstile();
  }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

// Form submit / Verifalia worker
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[name="email"]').value;
    const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/";

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Checking email...";

    try {
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });
      if (!response.ok) throw new Error("Worker hatası");

      const result = await response.json();

      if (result.entry?.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.submit();
      } else {
        alert("Lütfen geçerli ve ulaşılabilir bir e-posta adresi girin.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
      }
    } catch (error) {
      console.warn("Doğrulama atlandı, form gönderiliyor.", error);
      form.submit();
    }
  });
}
