const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("turnstileError");
const turnstileContainer = document.querySelector(".cf-turnstile");
let turnstileWidgetId;

function isDarkMode() {
  return document.documentElement.classList.contains("dark-mode");
}

function renderTurnstile() {
  if (!window.turnstile) return;
  turnstileContainer.innerHTML = "";
  turnstileWidgetId = window.turnstile.render(turnstileContainer, {
    sitekey: "0x4AAAAAACULU4HpGNkW9SVM",
    theme: isDarkMode() ? "dark" : "light",
    callback: turnstileDone,
    "expired-callback": turnstileExpired,
    "error-callback": turnstileError
  });
  submitBtn.disabled = true;
}

function turnstileDone(token) {
  submitBtn.disabled = false;
  errorBox.style.display = "none";
}
function turnstileExpired() {
  submitBtn.disabled = true;
  errorBox.style.display = "block";
}
function turnstileError() {
  submitBtn.disabled = true;
  errorBox.style.display = "block";
}

window.addEventListener("load", () => {
  renderTurnstile();
});

const darkModeObserver = new MutationObserver(() => {
  renderTurnstile();
});
darkModeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"]
});
