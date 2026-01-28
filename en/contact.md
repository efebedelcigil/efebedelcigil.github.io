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

  <div id="turnstileError" class="turnstile-error">
    Please verify that you are human to send the message.
  </div>

  <div class="cf-turnstile"
       data-sitekey="0x4AAAAAACULU4HpGNkW9SVM"
       data-callback="turnstileDone"
       data-expired-callback="turnstileExpired"
       data-error-callback="turnstileError">
  </div>

  <button type="submit" class="btn btn--primary" disabled id="submitBtn">
    Send
  </button>
</form>

<script src="/assets/js/contact.js"></script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>