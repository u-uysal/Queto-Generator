/* https://forismatic.com/en/api/ */

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const buttonTwitter = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

// get quote from api

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true;
    }
}


async function GetQuote() {
    loading() //before anything happens

    const apiUrl = 'https://type.fit/api/quotes';
    console.log("keep refreshing")
    try {
        const response = await fetch(apiUrl);
        const data = await response.json()
        console.log(data.length)


        let quoteId = Math.floor(Math.random() * Math.floor(data.length));

        let displayQuote = data[quoteId]
        console.log(displayQuote)

        authorText.innerText = displayQuote.author


        //change the font size according to lenght of the quote
        if (displayQuote.text.length > 100) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.innerText = displayQuote.text

        hideLoading() // stop loader
    } catch (error) {

        console.log(error)
    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; // thanks to this link you can tweet at your app

    window.open(tweetUrl, '_blank') // open this page at another url
}

newQuoteBtn.addEventListener('click', GetQuote)
buttonTwitter.addEventListener('click', tweetQuote)



GetQuote()