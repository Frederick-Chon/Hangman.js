const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'scope',
  'loop',
  'closure',
  'debugger',
  'const',
  'async',
  'function',
  'conditional',
  'object',
  'hoisting',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

console.log(selectedWord);

// Display hidden word
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
      )
      .join('')}
    `;

  const innerWord = wordElement.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You won :)`;
    popup.style.display = 'flex';
  }
}

// Update wrong letters
function updateWrongLettersElement() {
  // Display wrong letters
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost :(';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

// Restarting game
playAgainBtn.addEventListener('click', () => {
  // Empty correct/wrong arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersElement();
  popup.style.display = 'none';
});

displayWord();
