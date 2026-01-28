(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.getElementById("turnstile-widget");

  let turnstileWidgetId;
  let isValidated = false; 
  const WORKER_URL = "https://verifalia-handler.efebedelcigil.workers.dev/";
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

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

        if (data.status !== 200) {
          throw new Error(data.error || "Sunucu hatası");
        }

        const verifaliaBody = data.body; 
        
        // --- DÜZELTME BURADA ---
        // Verifalia yapısı: body -> entries -> data array -> item
        let entry = null;
        if (verifaliaBody && verifaliaBody.entries) {
            if (Array.isArray(verifaliaBody.entries)) {
                entry = verifaliaBody.entries[0];
            } else if (verifaliaBody.entries.data && Array.isArray(verifaliaBody.entries.data)) {
                entry = verifaliaBody.entries.data[0];
            }
        }

        if (entry) {
          const classification = entry.classification;
          
          if (classification === "Deliverable") {
            // BAŞARILI
            isValidated = true; 
            submitBtn.innerText = "Gönderiliyor...";
            form.requestSubmit(); 
          } else {
            // BAŞARISIZ
            alert("Girdiğiniz e-posta adresi geçerli görünmüyor (" + classification + "). Lütfen kontrol ediniz.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
          }
        } else {
          // BEKLENMEYEN YAPI (Yine de loglayalım ama kullanıcıyı geçirelim)
          console.warn("Verifalia yanıtı okunamadı:", verifaliaBody);
          if(confirm("E-posta servisi yanıt verdi fakat sonuç okunamadı. Yine de göndermek ister misiniz?")) {
             isValidated = true;
             form.requestSubmit();
          } else {
             submitBtn.disabled = false;
             submitBtn.innerText = originalText;
          }
        }

      } catch (err) {
        console.error("Worker Hatası:", err);
        if(confirm("Kontrol sırasında bir hata oluştu. Formu yine de göndermek ister misiniz?")) {
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