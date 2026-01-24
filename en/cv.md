---
title: "Resume / CV"
permalink: /en/cv/
layout: single
author_profile: true
author: efe_en
toc: true
toc_label: "Contents"
toc_icon: "file-alt"
---

<div style="text-align: center; margin-bottom: 2rem;">
  <a href="https://drive.google.com/file/d/1P20Ni544yW1lxc5FQGxbP42w82eBpjj_/view?usp=sharing" class="btn btn--success btn--large">
  <i class="fas fa-file-pdf"></i> View/Download as PDF
</a>
</div>

## 🎓 Education

**Ege University** | *Izmir, Turkey*
* **Major:** Electrical & Electronics Engineering (B.Sc.)
* **Date:** 2023 - 2027 (Expected)
* **Details:** 3rd Year Student. Focus on Control Systems & Robotics.

---

## 💼 Experience & Leadership

**IEEE Ege University Student Branch** | *Chair of the Board*
* *July 2025 - Present*
* Leading a student branch with 1000+ members.
* Coordinating technical projects (UAV, V2X) and managing sponsorship relations.

---

## 🛠️ Technical Skills

<div class="robust-grid-container">
  {% for category in site.data.skills %}
  <div class="feature__item">
    <div class="archive__item">
      <div class="archive__item-teaser">
        <i class="{{ category[1].icon }} fa-3x"></i>
      </div>
      <div class="archive__item-body">
        <h3 class="archive__item-title">{{ category[1].title }}</h3>
        <div style="text-align: center;">
          {% for item in category[1].items %}
            <span class="skill-tag">
              {{ item }}
            </span>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
  {% endfor %}
</div>