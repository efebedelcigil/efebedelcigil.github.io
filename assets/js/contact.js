const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

function renderTurnstile() {
  // Analitik Kontrol: Sadece turnstile.render fonksiyonu gerçekten hazırsa başla
  if (typeof window.turnstile === 'undefined' || typeof window.turnstile.render !== 'function' || !turnstileContainer) return;

  if (turnstileWidgetId !== undefined) {
    try { window.turnstile.remove(turnstileWidgetId); } catch(e) {}
    turnstileWidgetId = undefined;
  }
  turnstileContainer.innerHTML = "";

  try {
    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
      theme: currentTheme,
      callback: (token) => { submitBtn.disabled = false; if(errorBox) errorBox.style.display = "none"; },
      "error-callback": () => { submitBtn.disabled = true; if(errorBox) errorBox.style.display = "block"; }
    });
  } catch (e) {
    console.warn("Turnstile render denemesi başarısız, kütüphane henüz tam hazır değil.");
  }
}

// Akıllı Başlatıcı: Kütüphanenin (ve iç fonksiyonlarının) tam hazır olduğunu bekle
const checkTurnstile = setInterval(() => {
  if (window.turnstile && typeof window.turnstile.render === 'function') {
    clearInterval(checkTurnstile);
    renderTurnstile();
  }
}, 200);

// Tema Değişimi Takibi
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    renderTurnstile();
  }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

// --- Verifalia Sorgu Mantığı ---

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[name="email"]').value;
    const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/"; 

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Checking email...";

    try {
      // Analitik Not: Eğer CSP düzgün çalışıyorsa bu istek Worker'a ulaşacak
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });
      
      if (!response.ok) throw new Error("Worker hatası veya CSP engeli");

      const result = await response.json();

      if (result.entry?.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.submit(); 
      } else {
        alert("Lütfen geçerli ve ulaşılabilir bir e-posta adresi girdiğinizden emin olun.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
      }
    } catch (error) {
      // Fail-safe: Eğer 25 kredin bittiyse veya CSP hala takılıyorsa 
      // ziyaretçiyi engelleme, mesajı Formspree'ye direkt gönder.
      console.warn("Mühendislik uyarısı: Doğrulama atlandı, form gönderiliyor.", error);
      form.submit();
    }
  });
}