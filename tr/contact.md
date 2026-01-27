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
  /* 1. LIGHT MODE (Temiz Başlangıç) */
  .contact-form input, 
  .contact-form textarea {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #ccc !important;
  }

  /* 2. DARK MODE (Yüksek Özgünlükçü Seçici) */
  /* Hem html.dark-mode hem de sayfa içeriği sınıflarını birlikte kullanarak temayı eziyoruz */
  html.dark-mode .page__content .contact-form input, 
  html.dark-mode .page__content .contact-form textarea {
    background: #1e1e1e !important;       /* background-color yerine direkt background */
    background-color: #1e1e1e !important;
    color: #eeeeee !important;
    border: 1px solid #444 !important;
  }

  /* 3. ODAKLANMA VE OTOMATİK DOLDURMA (BEYAZLIĞIN ASIL SEBEBİ OLABİLİR) */
  /* Tarayıcı kutuya tıkladığında ya da kendi doldurduğunda beyaz yapmasını engelliyoruz */
  html.dark-mode .page__content .contact-form input:focus, 
  html.dark-mode .page__content .contact-form textarea:focus,
  html.dark-mode .page__content .contact-form input:-webkit-autofill {
    background-color: #252525 !important;
    -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
    -webkit-text-fill-color: #eeeeee !important;
    border-color: #007acc !important;
    outline: none !important;
  }

  /* Label Rengi */
  html.dark-mode .page__content .contact-form label {
    color: #e0e0e0 !important;
  }

  .hidden-field { display: none !important; }
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