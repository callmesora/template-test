// Get Quote From API

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quote from API
async function getQuote() {
  //Loader
  loading();

  //Aux URl
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    //Tries to get response from fetch , store the data from json
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);

    //If author is blank , Add "Unkown"
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unkown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    //Change Quote
    quoteText.innerHTML = data.quoteText;

    //Stop Loader, Show Quote
    complete();
  } catch (error) {
    getQuote();
    console.log("whoops, no quote", error);
  }
}

// Tweet Quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load

getQuote();
//loading();
