const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;

function isDarkMode() {
  return document.documentElement.classList.contains("dark-mode");
}

function renderTurnstile() {
  if (!window.turnstile) return;

  // Analitik Temizlik: Eski widget varsa bellekten kaldır
  if (turnstileWidgetId !== undefined) {
    window.turnstile.remove(turnstileWidgetId);
  }

  // Container içeriğini sıfırla ve yeni widget'ı render et
  turnstileContainer.innerHTML = "";
  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: isDarkMode() ? "dark" : "light",
    callback: turnstileDone,
    "expired-callback": turnstileExpired,
    "error-callback": turnstileError
  });
  
  submitBtn.disabled = true;
}

function turnstileDone(token) {
  submitBtn.disabled = false;
  errorBox.style.display = "none";
}

function turnstileExpired() {
  submitBtn.disabled = true;
  errorBox.style.display = "block";
}

function turnstileError() {
  submitBtn.disabled = true;
  errorBox.style.display = "block";
}

// Sayfa yüklendiğinde başlat
window.addEventListener("load", renderTurnstile);

// Tema değişimini izle (Sadece class değişimine odaklanarak döngüyü engeller)
const darkModeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      renderTurnstile();
    }
  });
});

darkModeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"]
});

// --- Email Doğrulama API (Verifalia & Cloudflare Workers) ---
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

        // Verifalia 'Deliverable' sonucu verirse formu gönder
        if (result.entry?.classification === "Deliverable") {
            submitBtn.innerText = "Sending...";
            form.submit(); 
        } else {
            alert("This email address seems invalid. Please check it.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            // Hatalı mail girişinde Turnstile'ı güvenlik için sıfırla
            if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
        }
    } catch (error) {
        // API hatası veya kredi bitmesi durumunda (fail-safe) formu yine de gönder
        console.warn("Email validation service unavailable, bypassing...", error);
        form.submit();
    }
});