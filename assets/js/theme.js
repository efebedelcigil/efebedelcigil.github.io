(function() {
  // --- BÖLÜM 1: Hemen Çalışacak Kısım (Renk Ataması) ---
  // Sayfa daha görünmeden rengi verelim ki beyaz patlama olmasın.
  
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // İlk açılış kontrolü
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(systemDark.matches ? 'dark' : 'light');
  }

  // Preload (Transition engelleme)
  document.documentElement.classList.add('preload');
  window.addEventListener('load', () => {
    document.documentElement.classList.remove('preload');
  });

  // Sistem teması değişirse canlı güncelle
  systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- BÖLÜM 2: Gecikmeli Çalışacak Kısım (Buton İşlevselliği) ---
  // HTML tamamen yüklendikten sonra butonu arayıp bulacağız.
  
  document.addEventListener('DOMContentLoaded', function() {
      const toggleBtn = document.querySelector('.theme-toggle'); // Veya senin buton class'ın neyse
      
      if (toggleBtn) {
          // Butonun mevcut duruma göre ikonunu vs. ayarlamak istersen buraya ekleyebilirsin
          
          toggleBtn.addEventListener('click', () => {
              // Güncel durumu class üzerinden oku (localStorage bazen gecikir)
              const isDark = document.documentElement.classList.contains('dark-mode');
              const newTheme = isDark ? 'light' : 'dark';
              
              setTheme(newTheme);
              localStorage.setItem('theme', newTheme);
          });
      } else {
          console.warn("Tema değiştirme butonu sayfada bulunamadı.");
      }
  });

})();