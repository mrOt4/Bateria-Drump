const drumPads = document.querySelectorAll(".drum-pad");
const audios = document.querySelectorAll("audio");

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    console.log("Clicked:", pad.getAttribute("data-key"));
    playSound(pad);
  });
});

window.addEventListener("keydown", (e) => {
  const key = e.keyCode.toString();
  const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
  if (pad) {
    playSound(pad);
  }
});

function playSound(pad) {
  const key = pad.getAttribute("data-key");
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  if (!audio) return;
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
  const light = document.getElementById("light-sun");
  const dark = document.getElementById("dark-moon");

  light.addEventListener("click", function () {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  });

  dark.addEventListener("click", function () {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  });
});