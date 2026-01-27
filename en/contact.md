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
  /* Light Mode (Varsayılan) */
  .contact-form input, 
  .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  /* 🔽 DARK MODE DÜZELTMELERİ */
  html.dark-mode .contact-form label {
    color: #e0e0e0 !important;
  }

  html.dark-mode .contact-form input, 
  html.dark-mode .contact-form textarea {
    background-color: #1e1e1e !important;
    border-color: #444 !important;
    color: #eeeeee !important;
  }

  /* Tıklayınca (Focus) beyaz olmasını engelle */
  html.dark-mode .contact-form input:focus, 
  html.dark-mode .contact-form textarea:focus {
    background-color: #252525 !important;
    border-color: #007acc !important;
    color: #ffffff !important;
    outline: none;
  }

  /* Placeholder rengi */
  html.dark-mode .contact-form input::placeholder,
  html.dark-mode .contact-form textarea::placeholder {
    color: #888 !important;
  }

  /* Honeypot alanı gizle */
  .hidden-field {
    display: none !important;
  }
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