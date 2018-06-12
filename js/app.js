/*
 * Create a list that holds all of your cards
 */

const list = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond']
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

shuffle(list);

//define variables
const deck = document.querySelector('.deck');

//creating a for loop to create multiple cards

function createCards () {
  for (let i = 0; i < list.length; i++) {
    let cardz = document.createElement('li');
    cardz.className = 'card';
    cardz.classList.add('fa');
    cardz.classList.add(list[i]);

    deck.appendChild(cardz);
  }
}

createCards();



/*
 * set up the event listener for a card. If a card is clicked:

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

// √ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
// √ display the card's symbol (put this functionality in another function that you call from this one)
// √ add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
// √ if the list already has another card, check to see if the two cards match
// √if the cards do not match, remove the cards from the list and hide the card's symbol

let allCards = document.querySelectorAll('.card');
let msg_box = document.querySelector('.msg_box');
let movesCounter = document.querySelector('.movesCounter');


let openCards = []
let matchedCards = []


//TODO: Use Set Time Interval to add a Timer.
//TODO: To stop a timer, use clearInterval() function. Might need to pass the actual number to clear it out. Do more research.

let moves = 0;

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
        //when clicked, add the card to the openCards array
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
            }
            moves++//increment moves tracker
            console.log ('Moves:', moves)
            movesCounter.innerText = moves;
        }
        else {
          console.log("Only one card flipped!")
        }

  })
})


//need to figure out where to insert this.

if (matchedCards.length === 16 || moves == 10) {
  gameOver();
}

function gameOver() {
  deck.classList.add('locked');
  msg_box.innerText = 'You lose';
  msg_box.classList.remove('hide_msg')
  //TODO: Need a pop up message for your stats, and then if you win or lose.
}
