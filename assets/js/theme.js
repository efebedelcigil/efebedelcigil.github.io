(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    document.documentElement.classList.add('dark-mode');
  }

  // Preload sınıfını ekle (CSS transitionlarını engellemek için)
  document.documentElement.classList.add('preload');

  // Sayfa yüklendikten kısa süre sonra preload'ı kaldır
  window.addEventListener('load', () => {
    document.documentElement.classList.remove('preload');
  });
})();