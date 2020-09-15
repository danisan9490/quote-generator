const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const hackBtn = document.getElementById('new-haker-quote');
const loader = document.getElementById('loader')

// Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide remove Loading Spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API

async function getQuote() {
  const countErr = 0;
  showLoadingSpinner();
  // Proxy URL to make sure our API call
  const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if no author add unknown
    if (data.quoteAuthor === '') authorText.innerText = 'Unknown';
    else authorText.innerText = data.quoteAuthor;
    // reduce fontsize for long quotes
    if (data.quoteText.length > 120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote')
    quoteText.innerText = data.quoteText;
  } catch (error) {
    if (countErr < 10) getQuote();
    else console.log(error);
  }
  // Stop Loader, sow Quote
  removeLoadingSpinner();
}

async function getHackerQuote() {
  showLoadingSpinner();

  // Proxy URL to make sure our API call
  const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://hackerman.wtf/api';


  try {
    const response = await fetch(proxyURL + apiUrl);
    const data = await response.json();
    authorText.innerText = 'Unknown'
    // reduce fontsize for long quotes
    if (data.quotes[0].length > 120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote')
    quoteText.innerText = data.quotes[0];
  } catch (error) {
    console.log('Error with Hacker API: ', error);
    alert("Hacker API is down");
    getQuote();
  }
  removeLoadingSpinner();

}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
hackBtn.addEventListener('click', getHackerQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
