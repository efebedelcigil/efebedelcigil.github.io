// 1. Element Seçimleri
const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;
let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

// 2. Yardımcı Fonksiyon: Turnstile'ı Temizle ve Yeniden Render Et
function renderTurnstile() {
  // Turnstile kütüphanesi veya container yoksa işlemi durdur
  if (!window.turnstile || typeof window.turnstile.render !== 'function' || !turnstileContainer) {
    return;
  }

  // V is not a function hatasını önlemek için bellek temizliği
  if (turnstileWidgetId !== undefined) {
    try {
      window.turnstile.remove(turnstileWidgetId);
    } catch (e) {
      console.warn("Eski widget temizlenemedi:", e);
    }
    turnstileWidgetId = undefined;
  }
  
  // DOM temizliği (Çift widget oluşmasını engeller)
  turnstileContainer.innerHTML = "";

  // Yeni Widget Render
  try {
    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
      theme: currentTheme,
      callback: function(token) {
        submitBtn.disabled = false;
        if(errorBox) errorBox.style.display = "none";
      },
      "error-callback": function() {
        submitBtn.disabled = true;
        if(errorBox) errorBox.style.display = "block";
      }
    });
  } catch (err) {
    console.error("Render sırasında hata oluştu:", err);
  }
}

// 3. Tema Değişim Gözlemcisi (Sadece tema gerçekten değişirse tetiklenir)
const darkModeObserver = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    renderTurnstile();
  }
});

darkModeObserver.observe(document.documentElement, { 
  attributes: true, 
  attributeFilter: ["class"] 
});

// 4. Akıllı Başlatıcı (Kütüphanenin yüklenmesini bekler)
const checkTurnstileReady = setInterval(() => {
  if (window.turnstile && typeof window.turnstile.render === 'function') {
    clearInterval(checkTurnstileReady);
    renderTurnstile();
  }
}, 200);

// 5. Verifalia & Form Gönderim Mantığı
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
      const response = await fetch(workerUrl, {
        method: 'POST',
        body: JSON.stringify({ email: emailInput }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();

      // Verifalia Sonuç Kontrolü
      if (result.entry?.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.submit(); 
      } else {
        alert("Lütfen geçerli bir e-posta adresi girdiğinizden emin olun.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        if (window.turnstile) window.turnstile.reset(turnstileWidgetId);
      }
    } catch (error) {
      // Fail-safe: Kredi biterse veya API çökerse formu direkt gönder
      console.warn("Doğrulama servisi şu an kullanılamıyor, form gönderiliyor...");
      form.submit();
    }
  });
}