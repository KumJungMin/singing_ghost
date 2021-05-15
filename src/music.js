import "./styles.scss";

window.addEventListener("keydown", playSound);
function playSound(e) {
  let currentTime = 1.8;
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (!audio) return;
  if (e.key === "5" || e.key === "8") currentTime = 1.5;
  audio.currentTime = currentTime;
  audio.play();
}
