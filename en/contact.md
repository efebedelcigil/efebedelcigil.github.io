---
seo_title: "Contact - Efe Varol Bedelcigil"
title: "Contact Me 📬"
excerpt: "Contact channels for projects, potential job/internship roles, or other professional matters."
permalink: /en/contact/
lang_ref: contact_page
layout: single
author_profile: true
author: efe_en
lang: en
---

<meta http-equiv="Content-Security-Policy"
content="
  default-src 'self';
  script-src 'self' https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  frame-src https://challenges.cloudflare.com;
  connect-src https://challenges.cloudflare.com;
">

<style>
/* ============================= */
/* LIGHT MODE (DEFAULT) */
/* ============================= */

.contact-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  color: #000000;
}

/* ============================= */
/* DARK MODE – SAYFA ARKAPLANI */
/* ============================= */

/* ASIL SORUNLU BEYAZ BLOK */
html.dark-mode .page__inner-wrap,
html.dark-mode .page__inner-wrap > section,
html.dark-mode .page__content,
html.dark-mode .initial-content {
  background-color: #121212 !important;
}

/* Layout padding boşlukları beyaz kalmasın */
html.dark-mode body {
  background-color: #121212 !important;
}

/* ============================= */
/* DARK MODE – FORM KENDİSİ */
/* ============================= */

html.dark-mode .contact-form {
  background-color: #121212 !important;
  padding: 24px;
  border-radius: 8px;
}

html.dark-mode .contact-form label {
  color: #e0e0e0 !important;
}

html.dark-mode .contact-form input,
html.dark-mode .contact-form textarea {
  background-color: #1e1e1e !important;
  color: #eeeeee !important;
  border: 1px solid #444444 !important;
}

/* Focus durumu */
html.dark-mode .contact-form input:focus,
html.dark-mode .contact-form textarea:focus {
  background-color: #252525 !important;
  border-color: #007acc !important;
  outline: none !important;
}

/* Chrome autofill beyazlığı */
html.dark-mode .contact-form input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #1e1e1e inset !important;
  -webkit-text-fill-color: #eeeeee !important;
}

/* Spam field */
.hidden-field {
  display: none !important;
}

/* DARK MODE – PLACEHOLDER RENGİ */
html.dark-mode .contact-form ::placeholder {
  color: #aaaaaa;
  opacity: 0.8;
}

<style>
.turnstile-error {
  display: none;
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: #ffecec;
  color: #8a1f1f;
  border: 1px solid #f5c2c2;
}

html.dark-mode .turnstile-error {
  background-color: #3a1f1f;
  color: #ffb3b3;
  border-color: #663333;
}

/* Cloudflare Turnstile spacing */
.cf-turnstile {
  margin: 20px 0 24px 0;
}
</style>

<p>Feel free to contact me regarding projects, potential job/internship roles, or other professional matters.</p>

<noscript>
  <div style="
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 6px;
    background-color: #fdecea;
    color: #b71c1c;
    font-size: 0.95rem;
  ">
    This contact form requires JavaScript to function properly.
    Please enable JavaScript or contact me directly via email.
  </div>
</noscript>

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">

  <input type="hidden" name="form_title" value="Contact Form (EN)">
  <input type="hidden" name="_subject" value="New message from contact page">

  <div class="hidden-field" aria-hidden="true">
    <label>Leave this field empty</label>
    <input type="text" name="company">
  </div>

  <label>
    Your Email:
    <input type="email" name="email" placeholder="example@email.com" required>
  </label>

  <label>
    Subject (optional):
    <input type="text" name="subject" placeholder="e.g. Collaboration request">
  </label>

  <label>
    Message:
    <textarea name="message" placeholder="Your message here..." required></textarea>
  </label>

  <!-- Turnstile error message -->
  <div id="turnstileError" class="turnstile-error">
    Please verify that you are human to send the message.
  </div>

  <!-- Cloudflare Turnstile -->
  <div
    class="cf-turnstile"
    data-sitekey="0x4AAAAAACULU4HpGNkW9SVM"
    data-callback="turnstileDone"
    data-expired-callback="turnstileExpired"
    data-error-callback="turnstileError">
  </div>

  <button type="submit" class="btn btn--primary" disabled id="submitBtn">
    Send
  </button>

</form>

<script>
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("turnstileError");

  function isDarkMode() {
    return document.documentElement.classList.contains("dark-mode");
  }

  function renderTurnstile() {
    const container = document.querySelector(".cf-turnstile");
    container.innerHTML = "";

    window.turnstile.render(container, {
      sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
      theme: isDarkMode() ? "dark" : "light",
      callback: turnstileDone,
      "expired-callback": turnstileExpired,
      "error-callback": turnstileError
    });
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
    if (window.turnstile) {
      renderTurnstile();
    }
  });
</script>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>