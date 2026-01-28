(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.getElementById("turnstile-widget");

  let turnstileWidgetId;
  const WORKER_URL = "https://verifalia-handler.efebedelcigil.workers.dev/";
  const FORMSPREE_URL = "https://formspree.io/f/xlgjvlev"; // Formspree ID'n
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

  // --- Turnstile Render ---
  window.onloadTurnstileCallback = function () {
    const currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    
    if (!turnstileContainer || turnstileContainer.innerHTML.trim() !== "") return;

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
        console.warn("Turnstile hatası:", e);
    }
  };

  // --- Form Submit (AJAX) ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Sayfa yenilenmesini engelle

      const emailEl = form.querySelector('input[name="email"]');
      const emailInput = emailEl ? emailEl.value.trim() : "";
      if (!emailInput) return;

      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Email Kontrol Ediliyor...";

      try {
        // 1. ADIM: E-posta Doğrulama (Worker)
        const verifyRes = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput })
        });
        
        const verifyData = await verifyRes.json();
        
        // Verifalia Sonucunu Kontrol Et
        let isDeliverable = false;
        
        // API yapısını güvenli çözümle
        if (verifyData.status === 200 && verifyData.body && verifyData.body.entries) {
            let entry = Array.isArray(verifyData.body.entries) 
                ? verifyData.body.entries[0] 
                : (verifyData.body.entries.data ? verifyData.body.entries.data[0] : null);
            
            if (entry && entry.classification === "Deliverable") {
                isDeliverable = true;
            }
        } else {
             // API hatası varsa inisiyatif alıp kullanıcıyı mağdur etmeyelim
             console.warn("Verifalia yanıt vermedi, bypass ediliyor.");
             isDeliverable = true; 
        }

        if (!isDeliverable) {
            alert("Girdiğiniz e-posta adresi geçerli görünmüyor. Lütfen kontrol ediniz.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            return; // İşlemi durdur
        }

        // 2. ADIM: Formspree'ye Gönderim (AJAX)
        submitBtn.innerText = "Gönderiliyor...";
        
        const formData = new FormData(form);
        
        const formspreeRes = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (formspreeRes.ok) {
            // BAŞARILI: Formu temizle ve teşekkür mesajı göster
            form.innerHTML = `
                <div style="text-align:center; padding: 2rem; background: #e8f5e9; border-radius: 8px; color: #2e7d32;">
                    <h3>Mesajınız Alındı! 🚀</h3>
                    <p>En kısa sürede size dönüş yapacağım.</p>
                </div>
            `;
        } else {
            // Formspree hatası
            const errorData = await formspreeRes.json();
            throw new Error(errorData.error || "Form gönderilemedi.");
        }

      } catch (err) {
        console.error("Form Hatası:", err);
        alert("Bir hata oluştu: " + err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    });
  }
})();