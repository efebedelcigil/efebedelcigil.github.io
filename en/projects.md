---
title: "Projects"
permalink: /en/projects/
layout: single
author_profile: true
classes: wide
lang_ref: projects
---

<style>
.feature__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
</style>

## 🛠️ Technical Projects
<div class="feature__wrapper">
  {% assign tech = site.data.projects | where: "category", "technical" %}
  {% for project in tech %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>

<hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;">

## 🎓 Education & Workshops
<div class="feature__wrapper">
  {% assign edu = site.data.projects | where: "category", "educational" %}
  {% for project in edu %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>

<hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;">

## 🤝 Social Responsibility & Volunteering
<div class="feature__wrapper">
  {% assign soc = site.data.projects | where: "category", "social" %}
  {% for project in soc %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>