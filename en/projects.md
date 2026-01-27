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
  .contact-form input, .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
  }

  /* Dark Mode Styles */
  html.dark-mode .contact-form input, 
  html.dark-mode .contact-form textarea {
    background-color: #1e1e1e !important;
    border-color: #444 !important;
    color: #e0e0e0 !important;
  }

  html.dark-mode .contact-form label {
    color: #e0e0e0;
  }

  /* 🔽 EK: placeholder görünürlüğü */
  html.dark-mode .contact-form input::placeholder,
  html.dark-mode .contact-form textarea::placeholder {
    color: #9a9a9a;
  }

  /* 🔽 EK: honeypot alanı gizle */
  .hidden-field {
    display: none;
  }

  /* 🔥 Dark mode'da formu saran beyaz kartı düzelt */
  html.dark-mode .page__content,
  html.dark-mode .initial-content,
  html.dark-mode .archive__item,
  html.dark-mode .page__inner-wrap {
    background-color: transparent !important;
  }
</style>


Feel free to contact me for collaborations, business inquiries or questions.

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">

  <!-- 🔽 EK: Formspree mail başlığı -->
  <input type="hidden" name="_subject" value="New message from contact page">

  <!-- 🔽 EK: Honeypot spam koruması -->
  <div class="hidden-field">
    <label>Leave this field empty</label>
    <input type="text" name="company">
  </div>

  <label>
    Your Email:
    <input type="email" name="email" required>
  </label>

  <label>
    Message:
    <textarea name="message" required></textarea>
  </label>

  <button type="submit" class="btn btn--primary">Send</button>
</form>