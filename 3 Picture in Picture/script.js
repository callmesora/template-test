const videoElement = document.getElementById("video");
const startbutton = document.getElementById("startbutton");
const chooseButton = document.getElementById("choosebutton");

// Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("whoops, error here: SelectMediaStream", error);
  }
}

startbutton.addEventListener("click", async () => {
  // Disable startbutton so user can't spam
  startbutton.disabled = true;

  //Start Picture in Picture
  await videoElement.requestPictureInPicture();

  //Reset startbutton
  startbutton.disabled = false;
});

chooseButton.addEventListener("click", selectMediaStream);

// On Load
//selectMediaStream();
