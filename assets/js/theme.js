(function() {
  // Tema uygulama fonksiyonu
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // 1. Önce kayıtlı tercih var mı?
  const savedTheme = localStorage.getItem('theme');
  // 2. Yoksa sistem tercihine bak
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  if (savedTheme) {
    // Kayıtlıyı uygula
    applyTheme(savedTheme);
  } else if (systemPrefersDark && systemPrefersDark.matches) {
    // Sistem karanlıksa uygula
    applyTheme('dark');
  }

  // 3. Sistem temasını dinamik dinle (Kullanıcı manuel seçim yapmadıysa)
  if (systemPrefersDark) {
    systemPrefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // CSS transition flash'ı engelleme
  document.documentElement.classList.add('preload');
  window.addEventListener('load', () => {
    document.documentElement.classList.remove('preload');
  });
})();