'use strict';

//Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const currScore0 = document.getElementById('current--0');
const currScore1 = document.getElementById('current--1');

//Starting Conditions
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  playing = true;
};

init();

// Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceValue}.png`;
    console.log(diceValue);

    //3. Check if rolled 1. If true, switch to next playe
    if (diceValue !== 1) {
      // Add dice to current player
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current Score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
