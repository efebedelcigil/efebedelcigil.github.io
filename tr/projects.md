---
title: "Projelerim"
permalink: /tr/projeler/
layout: single
author_profile: true
classes: wide
---

<style>
.feature__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
</style>

## 🛠️ Teknik Projeler
<div class="feature__wrapper">
  {% assign tech = site.data.projects | where: "category", "technical" %}
  {% for project in tech %}
    {% include project-card.html %}
  {% endfor %}
</div>

<hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;">

## 🎓 Eğitim & Atölye Çalışmaları
<div class="feature__wrapper">
  {% assign edu = site.data.projects | where: "category", "educational" %}
  {% for project in edu %}
    {% include project-card.html %}
  {% endfor %}
</div>

<hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;">

## 🤝 Sosyal Sorumluluk & Gönüllülük
<div class="feature__wrapper">
  {% assign soc = site.data.projects | where: "category", "social" %}
  {% for project in soc %}
    {% include project-card.html %}
  {% endfor %}
</div>