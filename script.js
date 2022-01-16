'use strict';
//selecting elements

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0element = document.getElementById('current--0');
const current1element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//starting condition
    let scores ;
    let currentScore ;
    let activePlayer ;
    let playing ;
const init = function () {
  scores=[0,0];
  currentScore = 0;
  activePlayer = 0;
  playing = true

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0element.textContent = 0;
  current1element.textContent = 0;

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  diceElement.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//rolling dice functionalitaty

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3.check for rolled 1,
    if (dice !== 1) {
      //add dice to curent score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
    //if true switch to next player
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add curent score to score of active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. if not switch o next player
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    //finish game
    //3.check if score alreay 20
  }
});
// btnNew.addEventListener('click',function(){
//     diceElement.classList.add('hidden');
//     activePlayer = 0;
//     document.querySelector('#score--0').textContent = 0;
//     document.getElementById('score--1').textContent = 0;
//     document.getElementById('current--0').textContent = 0;
//     document.getElementById('current--1').textContent = 0;
//     document.querySelector(`.player--1`).classList.remove('player--winner');
//     document.querySelector(`.player--0`).classList.remove('player--winner')
// });
btnNew.addEventListener('click', init);
