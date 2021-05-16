import "./styles.scss";

window.addEventListener("keydown", playSound);
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (!audio) return;
  audio.currentTime = 0.4;
  audio.play();
}
