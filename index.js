const coolSubmit = document.querySelector('#coolSubt');
const coolUserInput = document.querySelector('#coolGuessField');
const coolGuessSlot = document.querySelector('.coolGuesses');
const coolRemaining = document.querySelector('.coolRemaining');
const coolLowOrHi = document.querySelector('.coolLowOrHi');
const coolStartOver = document.querySelector('.coolResultParas');

const coolP = document.createElement('p');
coolP.classList.add('coolButton');

let coolPrevGuess = [];
let coolNumGuess = 1;
let coolPlayGame = true;
let coolRandomNumber = coolGenerateRandomNumber();

coolSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  if (coolPlayGame) {
    const coolGuess = parseInt(coolUserInput.value);
    if (coolValidateGuess(coolGuess)) {
      coolPrevGuess.push(coolGuess);
      if (coolNumGuess === 10 || coolGuess === coolRandomNumber) {
        coolEndGame(coolGuess);
      } else {
        coolCheckGuess(coolGuess);
      }
    }
  }
});

function coolGenerateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function coolValidateGuess(coolGuess) {
  if (isNaN(coolGuess) || coolGuess < 1 || coolGuess > 100) {
    alert('Please enter a valid number between 1 and 100');
    return false;
  } else if (coolPrevGuess.includes(coolGuess)) {
    alert('You already guessed this number');
    return false;
  }
  return true;
}

function coolCheckGuess(coolGuess) {
  coolDisplayGuess(coolGuess);
  if (coolGuess === coolRandomNumber) {
    coolDisplayMessage('You guessed it right');
    coolEndGame(coolGuess);
  } else {
    coolDisplayMessage(coolGuess < coolRandomNumber ? 'Number is too low' : 'Number is too high');
  }
}

function coolDisplayGuess(coolGuess) {
  coolUserInput.value = '';
  coolGuessSlot.innerHTML += ` ${coolGuess}   `;
  coolNumGuess++;
  coolRemaining.innerHTML = `${10 - coolNumGuess} `;
}

function coolDisplayMessage(message) {
  coolLowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function coolEndGame(coolGuess) {
  coolUserInput.setAttribute('disabled', '');
  coolP.innerHTML = '<h2 id="coolNewGame">Start new Game</h2>';
  coolStartOver.appendChild(coolP);
  coolPlayGame = false;

  const coolNewGameButton = document.querySelector('#coolNewGame');
  coolNewGameButton.addEventListener('click', function (e) {
    coolRandomNumber = coolGenerateRandomNumber();
    coolPrevGuess = [];
    coolNumGuess = 1;
    coolGuessSlot.innerHTML = '';
    coolRemaining.innerHTML = `${10 - coolNumGuess} `;
    coolUserInput.removeAttribute('disabled');
    coolStartOver.removeChild(coolP);
    coolLowOrHi.innerHTML = '';
    coolPlayGame = true;
  });
}
