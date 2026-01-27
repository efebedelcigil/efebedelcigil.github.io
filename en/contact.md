---
seo_title: "Contact - Efe Varol Bedelcigil"
title: "Contact Me 📬"
excerpt: "Contact channels for projects, collaborations, or just to say hi."
permalink: /en/contact/
lang_ref: contact_page
layout: single
author_profile: true
author: efe_en
lang: en
---

<style>
  /* 1. VARSAYILAN AYARLAR (LIGHT MODE) */
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
    background-color: #ffffff; /* Beyaz arka plan */
    color: #000000;            /* Siyah yazı */
    transition: background-color 0.3s ease;
  }

  /* 2. DARK MODE AYARLARI (ÖNCELİKLİ) */
  /* Seçiciliği artırmak için html.dark-mode ile başlıyoruz */
  html.dark-mode .contact-form label {
    color: #e0e0e0 !important;
  }

  html.dark-mode .contact-form input, 
  html.dark-mode .contact-form textarea {
    background-color: #1e1e1e !important; /* Koyu Gri/Siyah */
    color: #eeeeee !important;           /* Kırık Beyaz Yazı */
    border: 1px solid #444444 !important; /* Koyu Çerçeve */
  }

  /* 3. TIKLAYINCA (FOCUS) VE OTOMATİK DOLDURMA (AUTOFILL) */
  /* Tarayıcının 'beyazlatma' inatçılığını burada kırıyoruz */
  html.dark-mode .contact-form input:focus, 
  html.dark-mode .contact-form textarea:focus {
    background-color: #252525 !important;
    border-color: #007acc !important;
    outline: none !important;
  }

  /* Chrome/Safari'nin kayıtlı e-postayı doldurunca kutuyu beyaz yapmasını engeller */
  html.dark-mode .contact-form input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
    -webkit-text-fill-color: #eeeeee !important;
  }

  /* Spam Koruması */
  .hidden-field { display: none !important; }
</style>

Feel free to contact me for collaborations, business inquiries or questions.

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">

  <input type="hidden" name="_subject" value="New message from contact page">

  <div class="hidden-field">
    <label>Leave this field empty</label>
    <input type="text" name="company">
  </div>

  <label>
    Your Email:
    <input type="email" name="email" placeholder="example@email.com" required>
  </label>

  <label>
    Message:
    <textarea name="message" placeholder="Your message here..." required></textarea>
  </label>

  <button type="submit" class="btn btn--primary">Send</button>
</form>