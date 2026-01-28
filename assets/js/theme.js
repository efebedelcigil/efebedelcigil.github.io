(function() {
  // 1. Kullanıcının daha önce seçtiği bir tercih var mı?
  const savedTheme = localStorage.getItem('theme');
  
  // 2. Sistem tercihi karanlık mı?
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Tema Uygulama Fonksiyonu
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // Başlangıç Kararı:
  if (savedTheme) {
    // Kayıtlı tercih varsa onu kullan
    setTheme(savedTheme);
  } else {
    // Kayıt yoksa sistem tercihine bak
    setTheme(systemDark.matches ? 'dark' : 'light');
  }

  // Preload sınıfını ekle (CSS geçişlerini yumuşatmak için)
  document.documentElement.classList.add('preload');
  window.addEventListener('load', () => {
    document.documentElement.classList.remove('preload');
  });

  // Sistem temasını dinle (Kullanıcı manuel seçim yapmadıysa sistem değişince site de değişsin)
  systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle Butonu Mantığı (Eğer sayfada varsa)
  const toggleBtn = document.querySelector('.theme-toggle'); // Buton sınıfın neyse burayı ona göre ayarla
  if(toggleBtn) {
      toggleBtn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.contains('dark-mode');
          const newTheme = isDark ? 'light' : 'dark';
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme);
      });
  }
})();