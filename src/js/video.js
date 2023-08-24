// script.js
let currentGifIndex = 0;
let currentVideoIndex = 0;
let video = document.getElementById("video");
const videoNumber = 11;
window.addEventListener("resize", resizeVideo);

init();

function resizeVideo() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (video.videoWidth / video.videoHeight > viewportWidth / viewportHeight) {
    video.style.width = viewportWidth + "px";
    video.style.height = "auto";
  } else {
    video.style.width = "auto";
    video.style.height = viewportHeight + "px";
  }
}

function init() {
  resizeVideo();
  onAnimationEnd();
}

function nextVideo() {
  // Listen for the end of the fade-out animation
  video.addEventListener("animationend", onAnimationEnd);
}

function onAnimationEnd() {
  video.removeEventListener("animationend", onAnimationEnd);

  // Load the next random video
  const newVideoSource = getVideoSource();
  video.src = newVideoSource;
  video.load();
  video.play();
  video.style.animation = "fadeIn 1s ease-in-out forwards";
  video.addEventListener(
    "loadedmetadata",
    () => {
      setTimeout(() => {
        video.addEventListener("animationend", onAnimationEnd);
        video.style.animation = "fadeOut 1s ease-in-out";
      }, (video.duration - 2) * 1000);
    },
    { once: true }
  );
}


function getVideoSource() {
  const randomVideoNumber = getRandomVideoNumber();
  return `videos/${randomVideoNumber}.mp4`;
}

function getRandomVideoNumber() {
  return Math.floor(Math.random() * videoNumber) + 1;
}
