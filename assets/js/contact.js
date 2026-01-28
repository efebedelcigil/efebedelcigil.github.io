(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.getElementById("turnstile-widget");

  let turnstileWidgetId;
  let isValidated = false; 
  const WORKER_URL = "https://verifalia-handler.efebedelcigil.workers.dev/";
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM"; // Senin Site Key'in

  // --- Sayfa Önbellekten Yüklenirse (Geri Butonu vb.) Butonu Sıfırla ---
  window.addEventListener('pageshow', function(event) {
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Gönder";
    }
    isValidated = false;
  });

  // --- Turnstile Render Fonksiyonu ---
  window.onloadTurnstileCallback = function () {
    const currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    
    if (!turnstileContainer || turnstileContainer.innerHTML.trim() !== "") {
        return;
    }

    try {
        turnstileWidgetId = turnstile.render(turnstileContainer, {
            sitekey: TURNSTILE_SITEKEY,
            theme: currentTheme,
            callback: function(token) {
              if (submitBtn) submitBtn.disabled = false;
              if (errorBox) errorBox.style.display = "none";
            },
            "expired-callback": function() {
              if (submitBtn) submitBtn.disabled = true;
            },
            "error-callback": function() {
              if (errorBox) errorBox.style.display = "block";
            }
        });
    } catch (e) {
        console.warn("Turnstile render hatası:", e);
    }
  };

  // --- Form Submit İşleyici ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      // Eğer doğrulama bittiyse formun normal gönderilmesine izin ver
      if (isValidated) return; 

      e.preventDefault();

      const emailEl = form.querySelector('input[name="email"]');
      const emailInput = emailEl ? emailEl.value.trim() : "";

      if (!emailInput) return;

      const originalText = "Gönder";
      submitBtn.disabled = true;
      submitBtn.innerText = "Email Kontrol Ediliyor...";

      try {
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput })
        });

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error(data.error || "Sunucu hatası");
        }

        // Verifalia yanıtını güvenli şekilde çözümle
        let entry = null;
        if (data.body && data.body.entries) {
            if (Array.isArray(data.body.entries)) {
                entry = data.body.entries[0];
            } else if (data.body.entries.data && Array.isArray(data.body.entries.data)) {
                entry = data.body.entries.data[0];
            }
        }

        if (entry && entry.classification === "Deliverable") {
            // BAŞARILI
            isValidated = true; 
            submitBtn.innerText = "Yönlendiriliyor...";
            form.requestSubmit(); 
        } else {
            // BAŞARISIZ
            const statusMsg = entry ? entry.classification : "Bilinmiyor";
            alert("Girdiğiniz e-posta adresi geçerli görünmüyor (" + statusMsg + "). Lütfen kontrol ediniz.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }

      } catch (err) {
        console.error("Worker Hatası:", err);
        // Hata olsa bile kullanıcıyı mağdur etmemek için onayla gönder
        if(confirm("E-posta kontrolü sırasında bağlantı sorunu oluştu. Yine de göndermek ister misiniz?")) {
          isValidated = true;
          form.requestSubmit();
        } else {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    });
  }
})();