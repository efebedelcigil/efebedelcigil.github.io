const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

function renderTurnstile() {
  if (typeof window.turnstile === 'undefined' || !turnstileContainer) return;

  // Temizlik aşaması
  if (turnstileWidgetId !== undefined) {
    try {
      window.turnstile.remove(turnstileWidgetId);
    } catch (e) { console.warn("Widget removal failed", e); }
    turnstileWidgetId = undefined;
  }
  
  turnstileContainer.innerHTML = "";

  // Render aşaması
  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: currentTheme,
    callback: (token) => { submitBtn.disabled = false; errorBox.style.display = "none"; },
    "error-callback": () => { submitBtn.disabled = true; errorBox.style.display = "block"; }
  });
}

// Sadece tema gerçekten değiştiğinde render et
const darkModeObserver = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    renderTurnstile();
  }
});

darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

// Sayfa yüklenince Turnstile'ın hazır olduğundan emin ol
window.addEventListener("load", () => {
  let checkTurnstile = setInterval(() => {
    if (window.turnstile) {
      clearInterval(checkTurnstile);
      renderTurnstile();
    }
  }, 100);
});

// --- Verifalia Sorgu Mantığı ---
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
      alert("Invalid email address. Please double check.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Send";
      window.turnstile.reset(turnstileWidgetId);
    }
  } catch (error) {
    // Kredi biterse veya API çökerse fail-safe olarak gönder
    form.submit();
  }
});