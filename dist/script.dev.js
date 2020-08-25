"use strict";

/* https://forismatic.com/en/api/ */
var quoteContainer = document.getElementById("quote-container");
var quoteText = document.getElementById("quote");
var authorText = document.getElementById("author");
var buttonTwitter = document.getElementById("twitter");
var newQuoteBtn = document.getElementById("new-quote"); // get quote from api

function GetQuote() {
  var proxyUrl, apiUrl, response, data;
  return regeneratorRuntime.async(function GetQuote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          proxyUrl = 'https://cors-anywhere.herokuapp.com/';
          apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
          console.log("keep refreshing");
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(proxyUrl + apiUrl));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;

          // if author is blank 
          if (data.quoteAuthor === "") {
            authorText.innerText = "Unknow";
          } else {
            authorText.innerText = data.quoteAuthor;
          } //change the font size according to lenght of the quote


          if (data.quoteText.length > 100) {
            quoteText.classList.add("long-quote");
          } else {
            quoteText.classList.remove("long-quote");
          }

          quoteText.innerText = data.quoteText;
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
}

function tweetQuote() {
  var quote = quoteText.innerText;
  var author = authorText.innerText;
  var tweetUrl = "https://twitter.com/intent/tweet?text=".concat(quote, " - ").concat(author);
  window.open(tweetUrl, '_blank'); // open this page at another url
}

newQuoteBtn.addEventListener('click', GetQuote);
buttonTwitter.addEventListener('click', tweetQuote);
GetQuote();