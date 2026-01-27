---
seo_title: "İletişim - Efe Varol Bedelcigil"
title: "Bana Ulaşın 📬"
excerpt: "Projeler, iş birlikleri veya tanışmak için iletişim kanallarım."
permalink: /tr/iletisim/
lang_ref: contact_page
layout: single
author_profile: true
lang: tr
---

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

</style>

Projelerim veya iş hakkında konuşmak veya iş birliği yapmak için aşağıdaki formu kullanabilirsiniz.

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">

  <input type="hidden" name="form_title" value="İletişim Formu (TR)">
  <input type="hidden" name="_subject" value="İletişim Sayfasından Yeni Mesaj">

  <div class="hidden-field">
    <label>Bu alanı boş bırakın</label>
    <input type="text" name="company">
  </div>

  <label>
    E-posta Adresiniz:
    <input type="email" name="email" placeholder="ornek@eposta.com" required>
  </label>

  <label>
    Mesajınız:
    <textarea name="message" placeholder="Mesajınızı buraya yazın..." required></textarea>
  </label>

  <button type="submit" class="btn btn--primary">Gönder</button>
</form>