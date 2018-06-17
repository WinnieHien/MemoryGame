
/*
 * Define variables
 */

// List of Card Classes
const list = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond'];

//variables and arrays for creating the deck/cards
const deck = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];

//Move Counter variables
let movesCounter = document.querySelector('.movesCounter');
let moves = 5;

//Timer variables
let timer = document.querySelector('.timer');
let myTimer = null;
let seconds = 0;
let minutes = 0;
let clockOff = true;

//Pop-up message variables
let pop_up = document.querySelector('.pop_up');
let starStats = document.querySelector('.starStats');
let moveStats = document.querySelector('.moveStats');
let timeStats = document.querySelector('.timeStats');
let win_lose_msg = document.querySelector('.win_lose_msg');
let replayButton = document.querySelector('.replayButton');

//Star Counter variables
let stars = 5;
let starCounter = document.querySelector('.stars');

//Restart button variables
let restartButton = document.querySelector('.restart');

//Close button variables
let closeButton = document.querySelector('.closeButton');

/*
Create Gameboard
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
            // msg_box.classList.add('hide_msg'); TODO: Delete
            //when clicked, add the card to the openCards array
            openCards.push(card); //add to the openCards array. Use this to keep track if two cards are clicked to check for the match.
                if (openCards.length < 3) { //prevent user from clicking more than 2 at a time.
                    card.classList.add('open', 'show', 'locked');    //locked disables pointer functions on those cards via css.
                    if (openCards.length === 2){

                        let flippedCard_A = openCards[0];
                        let flippedCard_B = openCards[1];

                        //Check if class names match. If cards match, update class to match.
                        if (flippedCard_A.className === flippedCard_B.className) {
                          console.log("It's a match");
                          openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                            card.classList.add('match');
                            matchedCards.push(card);//move cards to the matchedCards array
                          });
                          openCards = []; //clear out openCards array
                        }
                        // If cards don't match, flip back over after 600ms
                        else {
                          console.log("Not a match!");
                          removeStars();
                          setTimeout(function() {
                            openCards.forEach(function(card) {
                              card.classList.remove('open', 'show', 'locked');
                            });
                            openCards = [];
                          }, 600);
                        moves--;//increment moves tracker
                        movesCounter.innerText = moves + ' Moves';
                        }
                        checkGameOver();
                    }
                }
        });
    });
}


/*
 * Timer
 */

function init_Timer() {
    deck.addEventListener('click', function(e) {
        //clockOff checks if clock is unactivated. Prevents bug of multiple clicks causing timer to speed up.
        if (clockOff) {
            myTimer = setInterval(insertTime, 1000);
            clockOff = false;
        }
    });
}

function insertTime() {
    seconds++;
        if (seconds < 10) { //adds the leading zero
            document.querySelector('.timer').innerHTML = 'Time: ' + minutes + ':0' + seconds;
        }

        else if (seconds === 60) { //converts to minutes
            seconds = '00';
            minutes++;
            document.querySelector('.timer').innerHTML = 'Time: ' + minutes + ':' + seconds;
        }
        else {
            document.querySelector('.timer').innerHTML = 'Time: ' + minutes + ':' + seconds;
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

/*
 * Star Counter
 */


 function removeStars () {
         starCounter.firstElementChild.remove();
         stars--;
 }

 //add Back stars on reset game by building the html
 function resetStars () {
     starCounter.innerHTML = '';
     stars = 5;
     for (let i = 0; i < 5; i++) {
         let newStar = document.createElement('li');
         starCounter.appendChild(newStar);
         let newItag = document.createElement('i');
         newItag.className = 'fa';
         newItag.classList.add('fa-star');
         newStar.appendChild(newItag);
     }
 }



/*
 * Restart and Play Again Button
 */

//restart button at top right corner of game. Always present
restartButton.addEventListener('click', resetGame);

//Play Again button on end of game pop up
replayButton.addEventListener('click', resetGame);

// Close pop-up Button

function resetGame () {
    console.log('restart button clicked');
    clearGameboard();
    startGame();
    resetTimer();
    moves = 5;
    matchedCards = [];
    movesCounter.innerText = moves + ' Moves';
    deck.classList.remove('locked');
    movesCounter.classList.remove('red');
    timer.classList.remove('red');
    resetStars();
    pop_up.close();
}

function displayPopup (){
    if (stars === 0) {
        starStats.innerHTML = 'Stars: '+ stars;
    }
    else {
        starStats.innerHTML = 'Stars: '+ starCounter.innerHTML;
    }
    moveStats.innerHTML = 'Moves: '+ moves + ' remaining';
    timeStats.innerHTML = timer.innerHTML;
    pop_up.showModal(); //showModal is a pre-defined function in JS
}

function closePopup() {
    pop_up.close();
}


// Close pop-up Button
closeButton.addEventListener('click', closePopup);


/*
 * Flash Card at beginnning of game
 */

//TODO: known bug: if you click twice on the reset button, the flash disappears faster... as if sped up
function flashCards () {
    console.log('flash cards');
    document.querySelectorAll('.card').forEach(function(card) {
        card.classList.add('open', 'show', 'locked');
    });
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function(card) {
            card.classList.remove('open', 'show', 'locked');
        });
    }, 3000);
}



/*
 * Starting and Ending the Game
 */

function startGame() {
    console.log('Game Started');
    createCards();
    activateCards();
    init_Timer();
    flashCards();
}

function checkGameOver() {
    if (matchedCards.length === 16 || moves === 0 || minutes === 2) {
    gameOver();
    }
}

function gameOver() {
    deck.classList.add('locked');
    if (matchedCards.length === 16 ) {
        win_lose_msg.innerHTML = 'You Win!'
    }

    else if (minutes ===2 ) {
        document.querySelector('.timer').classList.add('red');
        win_lose_msg.innerHTML = 'You Lose!'
    }
    else {
        document.querySelector('.movesCounter').classList.add('red');
        win_lose_msg.innerHTML = 'You Lose!'
    }
    stopTimer();
    setTimeout(function() {
        displayPopup();
    }, 250);
}

//Intialize Game

startGame();
