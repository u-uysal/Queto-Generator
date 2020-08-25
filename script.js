/* https://forismatic.com/en/api/ */

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const buttonTwitter = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

// get quote from api

async function GetQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    console.log("keep refreshing")
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json()

        // if author is blank 
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknow"
        } else {

            authorText.innerText = data.quoteAuthor
        }

        //change the font size according to lenght of the quote
        if (data.quoteText.length > 100) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.innerText = data.quoteText
    } catch (error) {

        console.log(error)
    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(tweetUrl, '_blank') // open this page at another url
}

newQuoteBtn.addEventListener('click', GetQuote)
buttonTwitter.addEventListener('click', tweetQuote)



GetQuote()