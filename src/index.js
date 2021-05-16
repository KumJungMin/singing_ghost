import "./styles.scss";
import "./default.css";

// get dom
const leftEye = document.querySelector(".left-eye");
const rightEye = document.querySelector(".right-eye");
const mouse = document.querySelector(".mouse");
const wrap = document.querySelector(".wrap");
const sunglass = document.querySelector("#sunglass");
const html = document.documentElement;
const container = document.querySelector("#container");
const startButton = document.querySelector(".btn-start");
const popover = document.querySelector("#popover");
const hintButton = document.querySelector(".btn-hint");

//global variable
let aniDuration = "";

// set background square
const SQUARE_NUM = 5000;
for (let i = 0; i < SQUARE_NUM; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}

// set music text dom
const musicSize = ["80", "65", "40", "70", "60", "50", "40", "65", "70", "85"];
const musicWrap = document.querySelector(".music-wrap");
for (let i = 1; i < musicSize.length; i++) {
  const dom = document.createElement("div");
  dom.classList.add(`music`);
  musicWrap.appendChild(dom);
  dom.style.fontSize = `${musicSize[i - 1]}px`;
}

// event
wrap.addEventListener("mousemove", faceMoving);
wrap.addEventListener("mouseenter", faceMoving);
wrap.addEventListener("mouseout", function (e) {
  leftEye.style.left = "126px";
  rightEye.style.left = "151px";
  mouse.style.left = "134px";
  sunglass.style.left = "110px";
});
window.addEventListener("keydown", function (e) {
  const musics = document.querySelectorAll(".music");
  const isVaildKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const texts = ["DO", "RE", "Mi", "PA", "SOL", "LA", "SHI", "DO", "RE", "MI"];
  if (e.key === "Enter") {
    aniDuration = "0";
    html.style.setProperty("--iteration", aniDuration);
    wrap.style.background = "skyblue";
    wrap.style.boxShadow = "20px 20px 28px #1a1a1a, -20px -20px 28px #242424";
    mouse.style.transform = `scaleY(1)`;
    container.style.background = "#1d1d1d";
    container.style.opacity = 1;
    sunglass.style.top = "27px";
    sunglass.style.opacity = 1;
    for (let i = 1; i < 9; i++) {
      for (let j = 0; j < musics.length; j++) {
        getMusicText("", musics[j]);
      }
    }
  } else if (isVaildKeys.includes(e.key)) {
    if (aniDuration !== "infinite") {
      html.style.setProperty("--iteration", aniDuration);
      aniDuration = "infinite";
    }
    sunglass.style.top = "50px";
    sunglass.style.opacity = 0.8;
  }
  for (let i = 0; i <= isVaildKeys.length; i++) {
    if (e.key === i + "") {
      const textIdx = e.key === "0" ? 9 : i - 1;
      const backColor = getRandomColor();
      const mouseOpen = i !== 0 ? 1 + i / 5 : 3.2;
      container.style.background = backColor;
      container.style.opacity = 0.6;
      wrap.style.background = backColor;
      wrap.style.boxShadow = `0 0 2px ${backColor}, 0  0 10px ${backColor}`;
      mouse.style.transform = `scaleY(${mouseOpen})`;
      for (let j = 0; j < musics.length; j++) {
        getMusicText(texts[textIdx], musics[j]);
      }
    }
  }
});
window.addEventListener("mousemove", function (e) {
  html.style.setProperty("--x", e.clientX / 50 + "px");
  html.style.setProperty("--y", e.clientY / 50 + "px");
});
window.addEventListener("load", function () {
  html.style.setProperty("--x", 0);
  html.style.setProperty("--y", 0);
});
startButton.addEventListener("click", function () {
  popover.style.display = "none";
});
hintButton.addEventListener("mouseenter", function () {
  popover.style.display = "flex";
});

// function
function faceMoving(e) {
  const boxX = wrap.getBoundingClientRect().left;
  const xCenter = boxX + wrap.clientWidth / 2;
  if (e.clientX < xCenter) {
    leftEye.style.left = "118px";
    rightEye.style.left = "143px";
    mouse.style.left = "126px";
    sunglass.style.left = "102px";
  }
  if (e.clientX > xCenter) {
    leftEye.style.left = "134px";
    rightEye.style.left = "159px";
    mouse.style.left = "142px";
    sunglass.style.left = "118px";
  }
}
function getMusicText(text, dom) {
  const randomX = Math.floor(Math.random() * 75 + 10);
  const randomY = Math.floor(Math.random() * 75 + 10);
  dom.style.left = `${randomX}%`;
  dom.style.top = `${randomY}%`;
  dom.innerText = text;
  setColorToEl(dom);
}
function setColorToEl(element) {
  const color = getRandomColor();
  element.style.color = color;
  element.style.opacity = "1";
  element.style.textShadow = "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue";
}
function getRandomColor() {
  const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// TODO: safari audio preload bug
const body = document.body;
const ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1) {
  if (ua.indexOf("chrome") > -1) {
  } else {
    alert("we don't apply safari, please open chorme! safati coming soon~"); // Safari
    body.style.display = "none";
    html.style.background = "black";
    html.style.backgroundPosition = "center center";
    html.style.backgroundSize = "50%";
    html.style.backgroundRepeat = "no-repeat";
    html.style.backgroundImage = "url('../music/sorry_message.png')";
  }
}
