document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    document.documentElement.classList.add('dark-mode');
  }

  document.documentElement.classList.add('preload');
});
