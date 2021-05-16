import "./styles.scss";

window.addEventListener("keydown", playSound);
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (!audio) return;
  audio.play();
}
