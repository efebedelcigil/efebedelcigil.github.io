(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  // DİKKAT: Artık class değil ID arıyoruz
  const turnstileContainer = document.getElementById("turnstile-widget");

  let turnstileWidgetId;
  let isValidated = false; 
  const WORKER_URL = "https://verifalia-handler.efebedelcigil.workers.dev/";
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

  // --- Turnstile Render Fonksiyonu ---
  window.onloadTurnstileCallback = function () {
    const currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    
    // Eğer container yoksa veya zaten render edilmişse dur.
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
      if (isValidated) return; 

      e.preventDefault();

      const emailEl = form.querySelector('input[name="email"]');
      const emailInput = emailEl ? emailEl.value.trim() : "";

      if (!emailInput) return;

      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Email Kontrol Ediliyor...";

      try {
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput })
        });

        const data = await response.json();

        // API Yanıt Kontrolü
        if (data.status !== 200) {
          throw new Error(data.error || "Sunucu hatası");
        }

        const verifaliaBody = data.body; 
        
        if (verifaliaBody && verifaliaBody.entries && verifaliaBody.entries.length > 0) {
          const classification = verifaliaBody.entries[0].classification;
          
          if (classification === "Deliverable") {
            isValidated = true; 
            submitBtn.innerText = "Gönderiliyor...";
            form.requestSubmit(); 
          } else {
            alert("Girdiğiniz e-posta adresi geçerli görünmüyor (" + classification + "). Lütfen kontrol ediniz.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
          }
        } else {
          // HATA AYIKLAMA: Object yerine içeriği yazdırıyoruz
          console.warn("Beklenmeyen API yanıtı:", JSON.stringify(data, null, 2));
          
          if(confirm("E-posta doğrulama servisi net bir yanıt veremedi. Yine de göndermek istiyor musunuz?")) {
             isValidated = true;
             form.requestSubmit();
          } else {
             submitBtn.disabled = false;
             submitBtn.innerText = originalText;
          }
        }

      } catch (err) {
        console.error("Worker Error:", err);
        if(confirm("E-posta kontrolü sırasında bir bağlantı hatası oluştu. Formu yine de göndermek ister misiniz?")) {
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