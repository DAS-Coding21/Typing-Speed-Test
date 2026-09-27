let quoteDisplayEl = document.getElementById("quoteDisplay");

let timerEl = document.getElementById("timer");

let quoteInputEl = document.getElementById("quoteInput");

let submitBtnEl = document.getElementById("submitBtn");

let resultEl = document.getElementById("result");

let resetBtnEl = document.getElementById("resetBtn");

let spinnerEl = document.getElementById("spinner");

let uniqueId;

let clearTimer = function() {
    clearInterval(uniqueId);
};

function displayQuote(quote) {
    spinnerEl.classList.add("d-none");
    quoteDisplayEl.textContent = quote.content;
}

function testTypingSpeed() {
    if (quoteDisplayEl.textContent === quoteInputEl.value) {
        clearInterval(uniqueId);
        resultEl.textContent = "You typed in " + timerEl.textContent + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentences.";
    }
}

function accessQuote() {
    timerEl.textContent = 0;
    let timeInSec = 0;

    uniqueId = setInterval(function() {
        timeInSec = timeInSec + 1;
        timerEl.textContent = timeInSec;
    }, 1000);

    let URL = "https://apis.ccbp.in/random-quote";
    let OPTIONS = {
        method: "GET"
    };


    fetch(URL, OPTIONS)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            resultEl.textContent = "";
            spinnerEl.classList.remove("d-none");
            displayQuote(result);
        });
}

accessQuote();

submitBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    testTypingSpeed();
});

resetBtnEl.addEventListener("click", function() {
    clearTimer();
    accessQuote();
});