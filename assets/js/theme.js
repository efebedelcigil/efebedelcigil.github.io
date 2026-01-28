(function() {
  // --- BÖLÜM 1: Hemen Çalışacak Kısım (Renk Ataması) ---
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
  document.addEventListener('DOMContentLoaded', function() {
      // DİKKAT: Burayı ID (#) olarak değiştirdik
      const toggleBtn = document.getElementById('theme-toggle'); 
      
      if (toggleBtn) {
          toggleBtn.addEventListener('click', () => {
              const isDark = document.documentElement.classList.contains('dark-mode');
              const newTheme = isDark ? 'light' : 'dark';
              
              setTheme(newTheme);
              localStorage.setItem('theme', newTheme);
          });
      } else {
          console.warn("Tema butonu (#theme-toggle) bulunamadı.");
      }
  });

})();