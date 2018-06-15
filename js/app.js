
/*
 * Define variables
 */


//Create a list that holds all of your cards
const list = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond'];

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

//Message box variables
let msg_box = document.querySelector('.msg_box');

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

restartButton.addEventListener('click', function() {
  resetTimer();
  clearGameboard();
  createCards();

});

function clearGameboard() {
    allCards.forEach(function(card) {
        card.remove();
        //or deck.innerHTML = '';
    })
}

//Create gameboard function that loops through each card
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

function activateCards() {
    document.querySelectorAll('.card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            //when clicked, add the card to the openCards array
            console.log('clicked card')
            openCards.push(card);
            card.classList.add('open', 'show', 'locked')
            if (openCards.length === 2){

                let flippedCard_A = openCards[0];
                let flippedCard_B = openCards[1];

                //If cards match, change class to match
                if (flippedCard_A.className === flippedCard_B.className) {
                  console.log("It's a match");

                  openCards.forEach(function(card) {
                    card.classList.remove('open', 'show');
                    card.classList.add('match')
                    matchedCards.push(card)
                  });
                  openCards = []; //clear out openCards array
                }
                // If cards don't match, flip back over after 600ms
                else {
                  console.log("Not a match!")

                  setTimeout(function() {
                    openCards.forEach(function(card) {
                      card.classList.remove('open', 'show', 'locked');
                    });
                    openCards = [];
                  }, 600);
                moves++//increment moves tracker
                movesCounter.innerText = moves + ' Moves';
                }
                console.log ('Moves:', moves)
                // setTimeout(function() {
                //   checkGameOver();
                // }, 250);
                checkGameOver();

            }
            else {
              console.log("Only one card flipped!")
            }

        })
    })
}

function init_Timer() {
    deck.addEventListener('click', function(e) {
        let myTimer = setInterval(insertTime, 1000);
    })
}

function insertTime() {
    seconds++;
        if (seconds < 10) {
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':0' + seconds;
        }

        else if (seconds === 60) {
            seconds = '00';
            minutes++;
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':' + seconds;
        }
        else {
            document.querySelector('.timer').innerHTML = 'Timer: ' + minutes + ':' + seconds;
        }
}

function stopTimer() {
    clearInterval(myTimer);
}

function resetTimer() {
    clearInterval(myTimer);
    let seconds = 0;
    let minutes = 0;
}


function startGame() {
    createCards();
    activateCards();
    init_Timer();
};

//TODO: Add a minute timeout, too.
function checkGameOver() {
    if (matchedCards.length === 16 || moves == 10) {
    gameOver();
    }
}

function gameOver() {
    deck.classList.add('locked');
    if (moves < 10) {
    msg_box.innerText = 'You win!';
    }
    else {
    msg_box.innerText = 'You lose';
    }
    msg_box.classList.remove('hide_msg')
    setTimeout(function() {
    alert(msg_box.innerText);
    })
}

startGame();
