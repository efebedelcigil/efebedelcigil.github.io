(function () {
  const form = document.getElementById('contactForm'); // ID ile seçim daha güvenli
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.querySelector(".cf-turnstile");

  let turnstileWidgetId;
  let isValidated = false; // Sonsuz döngüyü engellemek için kontrol bayrağı
  const WORKER_URL = "https://verifalia-handler.efebedelcigil.workers.dev/";
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

  // --- Turnstile Render Fonksiyonu ---
  window.onloadTurnstileCallback = function () {
    const currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    
    if (turnstileContainer) {
      turnstileContainer.innerHTML = "";
      turnstileWidgetId = turnstile.render(turnstileContainer, {
        sitekey: TURNSTILE_SITEKEY,
        theme: currentTheme,
        callback: function(token) {
          // Başarılı doğrulama
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
    }
  };

  // --- Form Submit İşleyici ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      // 1. Eğer email zaten doğrulandıysa, Formspree'ye gitmesine izin ver.
      if (isValidated) {
        return; 
      }

      // 2. Henüz doğrulanmadıysa durdur ve işlemlere başla.
      e.preventDefault();

      const emailEl = form.querySelector('input[name="email"]');
      const emailInput = emailEl ? emailEl.value.trim() : "";

      if (!emailInput) return;

      // Buton durumunu güncelle
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Email Kontrol Ediliyor...";

      try {
        // Worker'a istek at
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput })
        });

        const data = await response.json();

        // Worker Hatası Kontrolü (Örn: 500 veya 401)
        if (data.status !== 200) {
          throw new Error(data.error || "Sunucu hatası");
        }

        // Verifalia Sonucunu Analiz Et
        // Worker { status: 200, body: { entries: [...] } } dönüyor.
        const verifaliaBody = data.body; 
        
        if (verifaliaBody && verifaliaBody.entries && verifaliaBody.entries.length > 0) {
          const classification = verifaliaBody.entries[0].classification;
          
          if (classification === "Deliverable") {
            // BAŞARILI: Bayrağı kaldır ve formu tekrar gönder
            isValidated = true; 
            submitBtn.innerText = "Gönderiliyor...";
            form.requestSubmit(); 
          } else {
            // BAŞARISIZ: Riskli veya geçersiz email
            alert("Girdiğiniz e-posta adresi geçerli görünmüyor veya ulaşılamıyor. Lütfen kontrol ediniz.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
          }
        } else {
          // Beklenmeyen yanıt formatı
          console.warn("Beklenmeyen API yanıtı:", data);
          // Kullanıcıyı mağdur etmemek için gönderime izin ver (fallback)
          if(confirm("E-posta doğrulama servisi yanıt vermedi. Yine de göndermek istiyor musunuz?")) {
             isValidated = true;
             form.requestSubmit();
          } else {
             submitBtn.disabled = false;
             submitBtn.innerText = originalText;
          }
        }

      } catch (err) {
        console.error("Worker Error:", err);
        // Hata durumunda kullanıcıyı engelleme, onayla gönder
        if(confirm("E-posta kontrolü sırasında bir hata oluştu. Formu yine de göndermek ister misiniz?")) {
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