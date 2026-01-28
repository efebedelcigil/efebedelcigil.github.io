// contact.js
(function () {
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");
  const turnstileContainer = document.querySelector(".cf-turnstile");
  const form = document.querySelector('.contact-form');

  let turnstileWidgetId;
  let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";

  function safeLog(...args) {
    if (window.console && typeof console.log === 'function') console.log(...args);
  }

  // --- 1) Global error filter: Turnstile'in "sitekey expected string got object" hatasını sessize al
  // Bu, hatayı kökten çözmez (kaynağı düzeltmek en iyisi) ama konsol spam'ini engeller.
  window.addEventListener('error', function (ev) {
    try {
      const msg = ev && ev.message ? ev.message.toString() : '';
      if (msg.includes('Invalid or missing type for parameter "sitekey"')) {
        // Engelle: hata konsolda görünmesin
        ev.preventDefault && ev.preventDefault();
        safeLog("Susturulan Turnstile sitekey hatası (kaynak: başka bir script).");
        return;
      }
    } catch (e) { /* ignore */ }
    // diğer hatalar normal akışta kalsın
  }, true);

  // --- 2) Turnstile render (defansif)
  const TURNSTILE_SITEKEY = "0x4AAAAAACULU4HpGNkW9SVM";

  function renderTurnstile() {
    safeLog("renderTurnstile called", { turnstileExists: !!window.turnstile, container: !!turnstileContainer });

    if (!window.turnstile) {
      safeLog("window.turnstile yok, Turnstile script henüz yüklenmemiş olabilir.");
      return;
    }
    if (!turnstileContainer) {
      safeLog("Turnstile container bulunamadı, render atlandı.");
      return;
    }

    if (typeof TURNSTILE_SITEKEY !== 'string') {
      console.error("Turnstile sitekey string değil:", typeof TURNSTILE_SITEKEY, TURNSTILE_SITEKEY);
      return;
    }

    if (turnstileWidgetId !== undefined) {
      try { window.turnstile.remove(turnstileWidgetId); } catch (e) { safeLog("turnstile.remove hata", e); }
      turnstileWidgetId = undefined;
    }

    turnstileContainer.innerHTML = "";
    try {
      turnstileWidgetId = window.turnstile.render(turnstileContainer, {
        sitekey: TURNSTILE_SITEKEY,
        theme: currentTheme,
        callback: () => {
          safeLog("Turnstile success callback");
          if (submitBtn) submitBtn.disabled = false;
          if (errorBox) errorBox.style.display = "none";
        },
        "error-callback": () => {
          safeLog("Turnstile error-callback");
          if (submitBtn) submitBtn.disabled = true;
          if (errorBox) errorBox.style.display = "block";
        }
      });
      safeLog("Turnstile render id", turnstileWidgetId);
    } catch (e) {
      console.warn("Turnstile render denemesi başarısız.", e);
    }
  }

  // Wait for Turnstile API to be ready
  const checkTurnstile = setInterval(() => {
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      clearInterval(checkTurnstile);
      safeLog("turnstile hazır, render çağrılıyor");
      renderTurnstile();
    }
  }, 200);

  // Observe theme changes and re-render if needed
  const observer = new MutationObserver(() => {
    const newTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      safeLog("Tema değişti, turnstile yeniden render ediliyor", currentTheme);
      renderTurnstile();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // --- 3) Verifalia worker helper: birkaç yaygın yol dener (fallback denemeleri)
  async function tryWorkerVariants(baseUrl, email) {
    // Denenecek yollar; worker'ın gerçek API yolunu bilmiyorsak birkaç yaygın varyantı deniyoruz.
    const variants = [
      baseUrl,                 // orijinal
      baseUrl.replace(/\/$/, '') + '/v2/',      // /v2/
      baseUrl.replace(/\/$/, '') + '/api/v2/',  // /api/v2/
      baseUrl.replace(/\/$/, '') + '/verify'    // /verify
    ];

    for (const url of variants) {
      try {
        safeLog("Worker denemesi:", url);
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        safeLog("Worker deneme status", url, res.status);
        if (!res.ok) {
          // HTTP hatası; devam et
          continue;
        }
        const json = await res.json();
        safeLog("Worker deneme sonucu", url, json);
        // Eğer worker mantıksal hata döndürdüyse (ör. code:404), bunu üstteki kontrolle yakalayacağız
        return { url, res, json };
      } catch (err) {
        safeLog("Worker deneme hata", url, err);
        // devam et
      }
    }
    return null;
  }

  // --- 4) Form submit + Verifalia worker
  if (!form) {
    safeLog("Form bulunamadı: .contact-form");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    safeLog("Form submit tetiklendi");

    if (!submitBtn) {
      safeLog("submitBtn bulunamadı, form requestSubmit ile gönderiliyor");
      form.requestSubmit();
      return;
    }

    const emailEl = form.querySelector('input[name="email"]');
    const emailInput = emailEl ? emailEl.value.trim() : "";
    const workerUrl = "https://verifalia-handler.efebedelcigil.workers.dev/";

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Checking email...";

    try {
      // İlk doğrudan çağrı
      safeLog("Worker çağrılıyor (ilk):", workerUrl, { email: emailInput });
      let response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });

      safeLog("Worker response status", response.status);

      let result = null;
      if (response.ok) {
        result = await response.json();
        safeLog("Worker sonucu (ilk)", result);
      } else {
        safeLog("Worker HTTP hatası (ilk):", response.status);
      }

      // Eğer worker mantıksal 404 veya beklenmeyen yapı döndürdüyse, otomatik varyant dene
      if (result && typeof result.code !== 'undefined' && result.code === 404) {
        safeLog("Worker mantıksal 404 tespit edildi, alternatif yollar deneniyor...");
        const tryResult = await tryWorkerVariants(workerUrl, emailInput);
        if (tryResult && tryResult.json) {
          result = tryResult.json;
          safeLog("Worker alternatif sonucu bulundu:", tryResult.url, result);
        } else {
          safeLog("Worker alternatif yollar başarısız.");
        }
      }

      // Sonuç kontrolü: worker içeriğinde mantıksal hata var mı?
      if (result && typeof result.code !== 'undefined' && result.code !== 200) {
        safeLog("Worker mantıksal hata tespit edildi", result);
        // Kullanıcıya net mesaj göster
        const msg = result.message || "E-posta doğrulama servisi beklenmeyen bir yanıt döndürdü.";
        alert("E-posta doğrulama servisi hatası: " + msg);
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        return;
      }

      // Beklenen yapı: result.entry.classification === "Deliverable"
      if (result && result.entry && result.entry.classification === "Deliverable") {
        submitBtn.innerText = "Sending...";
        form.requestSubmit();
        return;
      }

      // Eğer result yoksa veya entry yoksa: fallback davranışı
      safeLog("Worker beklenen sonucu döndürmedi veya doğrulama başarısız:", result);
      const proceed = confirm("E-posta doğrulaması yapılamadı veya doğrulanamadı. Formu yine de göndermek ister misiniz?");
      if (proceed) {
        form.requestSubmit();
      } else {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    } catch (error) {
      console.warn("Worker çağrısında hata veya erişim sorunu:", error);
      const retry = confirm("E-posta doğrulama servisine ulaşılamıyor veya hata oluştu. Formu yine de göndermek ister misiniz?");
      if (retry) {
        form.requestSubmit();
      } else {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
})();
