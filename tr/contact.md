---
seo_title: "İletişim - Efe Varol Bedelcigil"
title: "Bana Ulaşın 📬"
excerpt: "Projeler, olası iş/staj pozisyonları veya diğer profesyonel konular için iletişim kanallarım."
permalink: /tr/iletisim/
lang_ref: contact_page
layout: single
author_profile: true
author: efe_tr
lang: tr
---

<link rel="stylesheet" href="/assets/css/contact.css">

<p>Projeler, olası iş/staj pozisyonları veya diğer profesyonel konular hakkında benimle iletişime geçebilirsiniz.</p>

<noscript>
  <div style="
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 6px;
    background-color: #fdecea;
    color: #b71c1c;
    font-size: 0.95rem;
  ">
    Bu iletişim formunun düzgün çalışması için JavaScript gereklidir.
    Lütfen JavaScript'i etkinleştirin veya doğrudan e-posta ile bana ulaşın.
  </div>
</noscript>

<form action="https://formspree.io/f/xlgjvlev" method="POST" class="contact-form">
  <input type="hidden" name="form_title" value="Contact Form (EN)">
  <input type="hidden" name="_subject" value="New message from contact page">

  <div class="hidden-field" aria-hidden="true">
    <label>Bu alanı boş bırakın</label>
    <input type="text" name="company" autocomplete="off">
  </div>

  <label>
    E-posta Adresiniz:
    <input type="email" name="email" placeholder="example@email.com" required>
  </label>

  <label>
    Konu (isteğe bağlı):
    <input type="text" name="subject" placeholder="e.g. Collaboration request">
  </label>

  <label>
    Mesajınız:
    <textarea name="message" placeholder="Your message here..." required></textarea>
  </label>

  <div id="turnstileError" class="turnstile-error" style="display:none;">
    Lütfen mesaj göndermek için insan olduğunuzu doğrulayın.
  </div>

  <div class="cf-turnstile"></div>

  <button type="submit" class="btn btn--primary" disabled id="submitBtn">
    Gönder
  </button>
</form>

<script src="/assets/js/theme.js"></script>
<script src="/assets/js/contact.js"></script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
