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
  .contact-form input, .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  html.dark-mode .contact-form label {
    color: #e0e0e0 !important;
  }

  html.dark-mode .contact-form input, 
  html.dark-mode .contact-form textarea {
    background-color: #1e1e1e !important;
    border-color: #444 !important;
    color: #eeeeee !important;
  }

  html.dark-mode .contact-form input:focus, 
  html.dark-mode .contact-form textarea:focus {
    background-color: #252525 !important;
    border-color: #007acc !important;
    color: #ffffff !important;
    outline: none;
  }

  html.dark-mode .contact-form input::placeholder,
  html.dark-mode .contact-form textarea::placeholder {
    color: #888 !important;
  }

  .hidden-field {
    display: none !important;
  }
</style>

Projelerim veya iş hakkında konuşmak veya iş birliği yapmak için aşağıdaki formu kullanabilirsiniz.

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">

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