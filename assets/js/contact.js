const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;

function isDarkMode() {
  return document.documentElement.classList.contains("dark-mode");
}

function renderTurnstile() {
  if (!window.turnstile || !turnstileContainer) return;

  // Önceki widget'ı güvenli bir şekilde kaldır
  if (typeof turnstileWidgetId !== 'undefined') {
    window.turnstile.remove(turnstileWidgetId);
  }

  // Widget'ı render et
  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: isDarkMode() ? "dark" : "light",
    callback: function(token) {
      submitBtn.disabled = false;
      errorBox.style.display = "none";
    },
    "expired-callback": function() {
      submitBtn.disabled = true;
      errorBox.style.display = "block";
    },
    "error-callback": function() {
      submitBtn.disabled = true;
      errorBox.style.display = "block";
    }
  });
}

// Turnstile hazır olduğunda render et
window.onloadTurnstileCallback = function() {
  renderTurnstile();
};

// Sayfa yüklendiğinde ve tema değiştiğinde tetikle
window.addEventListener("load", renderTurnstile);

const darkModeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      // Sonsuz döngüyü önlemek için kısa bir gecikme ekleyelim
      setTimeout(renderTurnstile, 50);
    }
  });
});

darkModeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"]
});

// --- Verifalia Email Verification ---
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const emailInput = form.querySelector('input[name="email"]').value;
  const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/"; 

  submitBtn.disabled = true;
  const originalText = submitBtn.innerText;
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
      submitBtn.innerText = originalText;
      if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
    }
  } catch (error) {
    // Verifalia günlük 25 kredi limitini [cite: 40, 46, 150] aşarsan 
    // veya hata olursa formu yine de gönder (Fail-safe)
    form.submit();
  }
});