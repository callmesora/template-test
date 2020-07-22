const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash API
let count = 5;
const apiKey = "BPbOEiHA53LqXHuzQ_XhfCn0a_5NzwVykG5bPUW2Kwo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready=", ready);
    count = 30;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, atributes) {
  for (const key in atributes) {
    element.setAttribute(key, atributes[key]);
  }
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //Run Function for each object in photosArray

  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");

    //One way to implement, vs Helper Function

    // item.setAttribute("href", photo.links.html);
    //item.setAttribute("target", "_blank");

    setAttributes(item, { href: photo.links.html, target: "_blank" });

    //Create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, check when each is finished Loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch Error Here
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("loading more");
  }
});

// On Load
getPhotos();
