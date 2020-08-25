"use strict";

/* https://forismatic.com/en/api/ */
var quoteContainer = document.getElementById("quote-container");
var quoteText = document.getElementById("quote");
var authorText = document.getElementById("author");
var buttonTwitter = document.getElementById("twitter");
var newQuoteBtn = document.getElementById("new-quote");
var loader = document.getElementById("loader"); // get quote from api

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function GetQuote() {
  var apiUrl, response, data, quoteId, displayQuote;
  return regeneratorRuntime.async(function GetQuote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          loading(); //before anything happens

          apiUrl = 'https://type.fit/api/quotes';
          console.log("keep refreshing");
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          console.log(data.length);
          quoteId = Math.floor(Math.random() * Math.floor(data.length));
          displayQuote = data[quoteId];
          console.log(displayQuote);
          authorText.innerText = displayQuote.author; //change the font size according to lenght of the quote

          if (displayQuote.text.length > 100) {
            quoteText.classList.add("long-quote");
          } else {
            quoteText.classList.remove("long-quote");
          }

          quoteText.innerText = displayQuote.text;
          hideLoading(); // stop loader

          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 20]]);
}

function tweetQuote() {
  var quote = quoteText.innerText;
  var author = authorText.innerText;
  var tweetUrl = "https://twitter.com/intent/tweet?text=".concat(quote, " - ").concat(author); // thanks to this link you can tweet at your app

  window.open(tweetUrl, '_blank'); // open this page at another url
}

newQuoteBtn.addEventListener('click', GetQuote);
buttonTwitter.addEventListener('click', tweetQuote);
GetQuote();