---
title: "Özgeçmiş"
permalink: /tr/ozgecmis/
lang_ref: cv_page
layout: single
author_profile: true
toc: true # İçindekiler tablosunu otomatik oluşturur
toc_label: "İçerik"
toc_icon: "file-alt"
---

<div style="text-align: center; margin-bottom: 2rem;">
  <a href="https://drive.google.com/file/d/1wCTw0azxwId-kzBdHv2tG7ZkstrnXRFW/view?usp=sharing" class="btn btn--success btn--large">
  <i class="fas fa-file-pdf"></i> PDF Olarak İncele/İndir
</a>
</div>

## 🎓 Eğitim

**Ege Üniversitesi** | *İzmir, Türkiye*
* **Bölüm:** Elektrik-Elektronik Mühendisliği
* **Tarih:** 2023 - 2027 (Beklenen)
* **Not:** 3. Sınıf Öğrencisi
* **Odak Alanları:** Kontrol Sistemleri, Devre Teorisi, Elektromanyetik Alanlar

---

## 💼 Deneyim & Liderlik

**IEEE Ege Üniversitesi Öğrenci Kolu** | *Yönetim Kurulu Başkanı*
* *Temmuz 2025 - Günümüz*
* 1000+ üyeli öğrenci topluluğunun stratejik yönetimi ve ekip koordinasyonu.
* Teknik projelerin (V2X, İHA) takibi ve sponsorluk görüşmelerinin yönetilmesi.
* Ege Üniversitesi bünyesinde teknoloji zirveleri ve hackathon organizasyonları.

**IEEE Ege SB** | *Eğitmen & Mentor*
* *Aralık 2025*
* Liseli ve üniversiteli öğrencilere yönelik "DC-DC Konvertörler" workshop'u düzenlendi.
* NotebookLM ve simülasyon araçları kullanılarak interaktif eğitim teknikleri uygulandı.

---

## 🛠️ Teknik Yetkinlikler

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