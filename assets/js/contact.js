const submitBtn = document.getElementById("submitBtn");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

function renderTurnstile() {
  // Turnstile objesi veya container yoksa veya zaten render ediliyorsa dur
  if (!window.turnstile || !turnstileContainer) return;

  // Önceki widget'ı temizle (Memory leak ve çift widget önleyici)
  if (turnstileWidgetId !== undefined) {
    try { window.turnstile.remove(turnstileWidgetId); } catch(e) {}
    turnstileWidgetId = undefined;
  }
  turnstileContainer.innerHTML = "";

  try {
    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
      theme: currentTheme,
      callback: (token) => { submitBtn.disabled = false; },
      "error-callback": () => { submitBtn.disabled = true; }
    });
  } catch (e) {
    console.error("Turnstile Render Hatası (V is not a function koruması):", e);
  }
}

// Tema değişimini sadece 'dark-mode' sınıfı gerçekten değişirse tetikle
const darkModeObserver = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    renderTurnstile();
  }
});
darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

// Ready Check: Turnstile script'inin yüklendiğinden emin ol
let retryCount = 0;
const initTurnstile = setInterval(() => {
  if (window.turnstile) {
    clearInterval(initTurnstile);
    renderTurnstile();
  } else if (retryCount > 50) { // 5 saniye sonra vazgeç
    clearInterval(initTurnstile);
    console.warn("Turnstile yüklenemedi, fail-safe modu.");
    submitBtn.disabled = false; // Kullanıcıyı mağdur etme
  }
  retryCount++;
}, 100);

// --- Verifalia Entegrasyonu ---
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = form.querySelector('input[name="email"]').value;
  const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/"; 

  submitBtn.disabled = true;
  submitBtn.innerText = "Checking email...";

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      body: JSON.stringify({ email: emailInput }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();

    if (result.entry?.classification === "Deliverable") {
      submitBtn.innerText = "Sending...";
      form.submit(); 
    } else {
      alert("Please enter a valid email address.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Send";
      if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
    }
  } catch (error) {
    // Kredi biterse (günlük 25 hakkın dolması gibi) formu direkt gönder
    form.submit();
  }
});