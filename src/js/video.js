// script.js
const apiKey = "6fobEFX4FuOFIpuNpk5RNUBFffdoOU0BV8qozv6KxZBAfPI74GEgE1xD"; //dont touch this ever if you are not lex (super high security comment to prevent hackers)
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

let page =
  "https://api.pexels.com/v1/videos/search/?page=1&per_page=15&query=Drone Footage&orientation=landscape";
let currentGifIndex = 0;
let currentVideoIndex = 0;
let vidIndex = 0;
let video = document.getElementById("video");
let returnData = null;

window.addEventListener("resize", resizeVideo);

init();

async function init() {
  try {
    returnData = await fetchFromAPI();
  } catch (error) {
    console.error("Error in init:", error);
  }
  resizeVideo();
  onAnimationEnd();
}

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

async function onAnimationEnd() {
  video.removeEventListener("animationend", onAnimationEnd);

  // Load the next random video
  if (returnData) {
    const newVideoSource = await getVideoSource();
    video.src = newVideoSource;
    video.load();
    video.play();
    video.style.animation = "fadeIn 1s ease-in-out forwards";
    video.addEventListener(
      "loadedmetadata",
      () => {
        setTimeout(() => {
          video.addEventListener("animationend", onAnimationEnd);
          video.style.animation = "fadeOut 1s ease-in-out forwards";
        }, (video.duration - 1) * 1000);
      },
      { once: true }
    );
  }
}

async function getVideoSource() {
  let highRes = 0;
  let highResVideo = null;

  if (vidIndex % returnData.videos.length === 0) {
    returnData = await fetchFromAPI();
  }

  const currentVid = returnData.videos[vidIndex];

  currentVid.video_files.every((video) => {
    const videoWidth = video.width;
    const videoHeight = video.height;
    const videoResolution = videoWidth * videoHeight;

    if (videoResolution > highRes) {
      if (videoResolution > 3456 * 2234) {
        if (highResVideo == null) {
            highResVideo = video;
        }
        return false;
    }
      highRes = videoResolution;
      highResVideo = video;
    }
    return true;
  });
  try {
    console.log(highResVideo.link);
  }
  catch {
    console.log(currentVid);
  }
  
  return highResVideo.link;
}

async function fetchFromAPI() {
  try {
    const response = await fetch(page, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    page = data.next_page;

    return data;
  } catch (error) {
    throw error;
  }
}
