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

<link rel="stylesheet" href="/assets/css/contact.css">

<p>Feel free to contact me regarding projects, potential job/internship roles, or other professional matters.</p>

<noscript>
  <div style="margin: 1.5rem 0; padding: 1rem; border-radius: 6px; background-color: #fdecea; color: #b71c1c; font-size: 0.95rem;">
    JavaScript is required for this contact form to function properly.
    Please enable JavaScript or contact me directly by email.
  </div>
</noscript>

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form" id="contactForm">
  <input type="text" name="_gotcha" style="display:none !important">
  
  <input type="hidden" name="form_title" value="Contact Form (TR)">
  <input type="hidden" name="_subject" value="Websitesinden Yeni Mesaj Var!">

  <label>
    Your Email Address:
    <input type="email" name="email" placeholder="ornek@email.com" required>
  </label>

  <label>
    Subject (optional):
    <input type="text" name="subject" placeholder="Örn: Proje İşbirliği">
  </label>

  <label>
    Your Message:
    <textarea name="message" placeholder="Mesajınız..." required></textarea>
  </label>

  <div id="turnstileError" class="turnstile-error" style="display:none; color: red; margin-bottom: 10px;">
    Please verify that you are a human.
  </div>

  <div id="turnstile-widget"></div>

  <button type="submit" class="btn btn--primary" id="submitBtn" disabled>
    Send
  </button>
</form>

<script src="/assets/js/contact.js"></script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" async defer></script>