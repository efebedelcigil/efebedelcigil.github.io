const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;

function isDarkMode() {
  return document.documentElement.classList.contains("dark-mode");
}

function renderTurnstile() {
  if (!window.turnstile) return;
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

window.addEventListener("load", () => {
  renderTurnstile();
});

const darkModeObserver = new MutationObserver(() => {
  renderTurnstile();
});
darkModeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"]
});

// Email doğrulama API kısmı
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Formu hemen gönderme
    
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

        // Eğer mail ulaşılabilirse (Deliverable) gönder
        if (result.entry?.classification === "Deliverable") {
            submitBtn.innerText = "Sending...";
            form.submit(); 
        } else {
            alert("This email address seems invalid. Please check it.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
        }
    } catch (error) {
        // Bir hata çıkarsa kullanıcıyı mağdur etme, formu gönder
        form.submit();
    }
});