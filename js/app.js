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

//creating a for loop to create multiple cards

function createCards () {
  for (let i = 0; i < list.length; i++) {
    let card = document.createElement('li');
    card.className = 'card';
    card.classList.add('fa');
    card.classList.add(list[i]);
    const deck = document.querySelector('.deck');
    deck.appendChild(card);
  }
}

createCards();



/*
 * set up the event listener for a card. If a card is clicked:



 // if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)


 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//creating an event listener to check for clicks on the deck

const deck = document.querySelector('.deck');

// √ display the card's symbol (put this functionality in another function that you call from this one)

deck.addEventListener('click', revealCard);
function revealCard () {
  event.target.classList.toggle('open');
  event.target.classList.toggle('show');
}

// √ add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

// √ if the list already has another card, check to see if the two cards match

// if the cards do not match, remove the cards from the list and hide the card's symbol TODO:Create a MATCH function. Didn't work with trying to access the array of FlippedCards to apply .toggle or .remove (put this functionality in another function that you call from this one)


deck.addEventListener('click', checkFlippedCards);
function checkFlippedCards () {
  let flippedCards = document.querySelectorAll('.open');
  if (flippedCards.length === 2) {
    let flippedCard_A = flippedCards[0]
    let flippedCard_B = flippedCards[1]

    if (flippedCard_A.className === flippedCard_B.className) {
      console.log("It's a match");
      flippedCard_A.classList.toggle('match');
      flippedCard_B.classList.toggle('match');
      flippedCard_A.classList.toggle('locked');
      flippedCard_B.classList.toggle('locked');
    }
    else {
      console.log("Not a match!")
    }

    //TODO: disable pointer while setTimeout is functioning
    setTimeout(function(){
    flippedCard_A.classList.remove('open', 'show');
    flippedCard_B.classList.remove('open', 'show');
  }, 600);


  }
  else {
    console.log("Only one card flipped!")
  }
}

// function matched (array) {
//   array.forEach.classList.toggle('match')
// }



//
// If there are more than two cards open i.e. length of the constant = 2, then compare the two. If they match then add the class match. If not toggle off show and open.
