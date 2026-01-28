(function() {
  // 1. ADIM: Sayfa açılır açılmaz rengi belirle (Flash'ı önler)
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemDark ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }

  // 2. ADIM: Tıklama Olayı (En Garanti Yöntem)
  // DOMContentLoaded beklemeden, global tıklamayı dinliyoruz.
  // Minimal Mistakes temasının menü kopyalama huyu yüzünden bu şart.
  document.addEventListener('click', function(event) {
    // Tıklanan şey bizim #theme-toggle veya onun içindeki bir parça mı?
    const toggleBtn = event.target.closest('#theme-toggle');

    if (toggleBtn) {
      event.preventDefault(); // Sayfanın zıplamasını engelle
      
      const isDark = document.documentElement.classList.contains('dark-mode');
      
      if (isDark) {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    }
  });
})();