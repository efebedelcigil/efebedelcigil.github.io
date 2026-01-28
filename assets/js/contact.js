const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;

function isDarkMode() {
  return document.documentElement.classList.contains("dark-mode");
}

function renderTurnstile() {
  // 1. Güvenlik Kontrolü: Container yoksa veya Turnstile yüklenmediyse çık
  if (typeof window.turnstile === 'undefined' || !turnstileContainer) return;

  // 2. Temizlik: Eğer bir widget ID'si varsa Cloudflare belleğinden sil
  if (turnstileWidgetId !== undefined) {
    window.turnstile.remove(turnstileWidgetId);
    turnstileWidgetId = undefined;
  }

  // 3. DOM Temizliği: Container içindeki tüm eski kalıntıları (iframe vs) temizle
  turnstileContainer.innerHTML = "";

  // 4. Yeni Render: Temiz sayfaya tek bir widget bas
  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: isDarkMode() ? "dark" : "light",
    callback: function(token) {
      submitBtn.disabled = false;
      errorBox.style.display = "none";
    },
    "expired-callback": function() {
      submitBtn.disabled = true;
    },
    "error-callback": function() {
      submitBtn.disabled = true;
      errorBox.style.display = "block";
    }
  });
}

// Çakışmayı Önleyen Tetikleyici Yönetimi
// Sadece bir kez yükleme yapılması için 'load' olayını beklemek yeterlidir
window.addEventListener("load", () => {
  // Cloudstile'ın hazır olduğundan emin olalım
  if (window.turnstile) {
    renderTurnstile();
  } else {
    // Eğer script henüz hazır değilse callback'i bekle
    window.onloadTurnstileCallback = renderTurnstile;
  }
});

// Tema Değişim Gözlemcisi (Debounce ile optimize edildi)
let renderTimeout;
const darkModeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      clearTimeout(renderTimeout);
      renderTimeout = setTimeout(renderTurnstile, 100);
    }
  });
});

darkModeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"]
});

// --- Verifalia Email Verification (Fail-Safe Yapısı) ---
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

    // Verifalia sonucuna göre aksiyon al
    if (result.entry?.classification === "Deliverable") {
      submitBtn.innerText = "Sending...";
      form.submit(); 
    } else {
      alert("Lütfen geçerli bir e-posta adresi girdiğinizden emin olun.");
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
      if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
    }
  } catch (error) {
    // Verifalia günlük 25 kredi limitini aşarsan veya API hata verirse formu yine de gönder
    // Kullanıcıyı (özellikle staj başvurusu yapacak İK'cıyı) engellemiyoruz.
    console.warn("Email verification bypassed due to error.");
    form.submit();
  }
});