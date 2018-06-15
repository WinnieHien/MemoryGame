
/*
 * Define variables
 */

// List of Card Classes
const list = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond'];

//variables and arrays for creating the deck/cards
const deck = document.querySelector('.deck');
let openCards = []
let matchedCards = []

//Move Counter variables
let movesCounter = document.querySelector('.movesCounter');
let moves = 0;

//Timer variables
let timer = document.querySelector('.timer');
let myTimer = null;
let seconds = 0;
let minutes = 0;
let clockOff = true;

//Message box variables
let msg_box = document.querySelector('.msg_box');

//Star Counter variables
let starCounter = document.querySelector('.stars');
let starRemoved = false;

//Restart button variables
let restartButton = document.querySelector('.restart'); //see if this works, or if it needs to be called directly like with thisTimer

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Clears board of all cards and html
function clearGameboard() {
    deck.innerHTML = '';
}

//Create gameboard function that loops through each card and adds html
function createCards () {
    shuffle(list);
    for (let i = 0; i < list.length; i++) {
        let newCard = document.createElement('li');
        newCard.className = 'card';
        newCard.classList.add('fa');
        newCard.classList.add(list[i]);
        deck.appendChild(newCard);
    }
}

//Activates the click funcationality on the cards/deck
function activateCards() {
    document.querySelectorAll('.card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            //when clicked, add the card to the openCards array
            openCards.push(card); //add to the openCards array. Use this to keep track if two cards are clicked to check for the match.
                if (openCards.length < 3) { //prevent user from clicking more than 2 at a time.
                    card.classList.add('open', 'show', 'locked')    //locked disables pointer functions on those cards via css.
                    if (openCards.length === 2){

                        let flippedCard_A = openCards[0];
                        let flippedCard_B = openCards[1];

                        //Check if class names match. If cards match, update class to match.
                        if (flippedCard_A.className === flippedCard_B.className) {
                          console.log("It's a match");
                          openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                            card.classList.add('match')
                            matchedCards.push(card) //move cards to the matchedCards array
                          });
                          openCards = []; //clear out openCards array
                        }
                        // If cards don't match, flip back over after 600ms
                        else {
                          console.log("Not a match!")
                          removeStars();
                          setTimeout(function() {
                            openCards.forEach(function(card) {
                              card.classList.remove('open', 'show', 'locked');
                            });
                            openCards = [];
                          }, 600);
                        moves++//increment moves tracker
                        movesCounter.innerText = moves + ' Moves';
                        }
                        checkGameOver();
                    }
                }
        })
    })
}


function removeStars () {
        starCounter.firstElementChild.remove();
}

function init_Timer() {
    deck.addEventListener('click', function(e) {
        //clockOff checks if clock is unactivated. Prevents bug of multiple clicks causing timer to speed up.
        if (clockOff) {
            myTimer = setInterval(insertTime, 1000);
            clockOff = false;
        }
    })
}

function insertTime() {
    seconds++;
        if (seconds < 10) { //adds the leading zero
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':0' + seconds;
        }

        else if (seconds === 60) { //converts to minutes
            seconds = '00';
            minutes++;
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':' + seconds;
        }
        else {
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':' + seconds;
        }
    checkGameOver();
}

function stopTimer() {
    clearInterval(myTimer);
}

function resetTimer() {
    clearInterval(myTimer);
    seconds = 0;
    minutes = 0;
    document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':0' + seconds; //resets visual timer
    clockOff = true;
}

function startGame() {
    console.log('Game Started');
    createCards();
    activateCards();
    init_Timer();
    flashCards();
};

//Game is over if all cards are matched, moves = 5 or minutes = 2
function checkGameOver() {
    if (matchedCards.length === 16 || moves === 5|| minutes === 2) {
    gameOver();
    }
}

function gameOver() {
    deck.classList.add('locked');
    if (matchedCards.length === 16 ) {
    msg_box.innerText = 'You win!';
    }

    else if (minutes ===2 ) {
        document.querySelector('.timer').classList.add('red');
        msg_box.innerText = 'You lose';
    }
    else {
        document.querySelector('.movesCounter').classList.add('red');
        msg_box.innerText = 'You lose';
    }
    msg_box.classList.remove('hide_msg')
    stopTimer();
    setTimeout(function() {
        alert(msg_box.innerText);
    }, 250);
}


setTimeout(function() {
    document.querySelectorAll('.card').forEach(function(card) {
        card.classList.remove('open', 'show', 'locked');
    })
}, 4000);


restartButton.addEventListener('click', function() {

  console.log('restart button clicked');
  clearGameboard();
  startGame();
  resetTimer();
  moves = 0;
  matchedCards = []
  movesCounter.innerText = moves + ' Moves';
  msg_box.classList.add('hide_msg');
  deck.classList.remove('locked');
  movesCounter.classList.remove('red');
  timer.classList.remove('red');
  resetStars();
});

//add Back stars on reset game by building the html

function resetStars () {
    starCounter.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        let newStar = document.createElement('li');
        starCounter.appendChild(newStar);
        let newItag = document.createElement('i')
        newItag.className = 'fa';
        newItag.classList.add('fa-star');
        newStar.appendChild(newItag);
    }
}

function flashCards () {
    console.log('flash cards')
    document.querySelectorAll('.card').forEach(function(card) {
        card.classList.add('open', 'show', 'locked');
    });
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function(card) {
            card.classList.remove('open', 'show', 'locked');
        })
    }, 3000);
}

startGame();
