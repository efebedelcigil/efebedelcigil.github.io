(function() {
  // --- 1. KISIM: Renk Ayarları (Hemen Çalışır - Flash'ı önler) ---
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // Açılışta rengi ver
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(systemDark.matches ? 'dark' : 'light');
  }

  // Preload (Geçişleri yumuşat)
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

  // --- 2. KISIM: Tıklama Mantığı (Event Delegation) ---
  // Burası çok önemli: Sayfadaki herhangi bir tıklamayı dinliyoruz.
  // Tıklanan şey bizim butonumuz mu diye kontrol ediyoruz.
  
  document.addEventListener('click', function(event) {
    // Tıklanan element veya onun kapsayıcısı #theme-toggle ID'sine sahip mi?
    const toggleBtn = event.target.closest('#theme-toggle');

    if (toggleBtn) {
      // Eğer bizim butonsa (veya içindeki topa tıklandıysa):
      const isDark = document.documentElement.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';
      
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  });

})();