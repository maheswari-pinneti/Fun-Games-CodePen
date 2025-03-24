const startBtn = document.getElementById('start-btn');
const wordInput = document.getElementById('word-input');
const sentenceDisplay = document.getElementById('sentence-display');
const result = document.getElementById('result');
const timeDisplay = document.getElementById('time-display');
const speedDisplay = document.getElementById('speed-display');
const keyboardKeys = document.querySelectorAll('.key');

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Good things come to those who wait."
];
let currentSentence = '';
let startTime, endTime, typedChars = 0;
let gameStarted = false;

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function startGame() {
  gameStarted = true;
  wordInput.value = '';
  result.textContent = '';
  wordInput.disabled = false;
  sentenceDisplay.textContent = getRandomSentence();
  currentSentence = sentenceDisplay.textContent;
  startTime = Date.now();
  startBtn.textContent = 'Restart Game';
  wordInput.focus();
}

function updateTime() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timeDisplay.textContent = elapsedTime;
}

function calculateWPM() {
  const elapsedTime = (Date.now() - startTime) / 60000;
  const typedWords = typedChars / 5; // Calculate words based on 5 characters per word
  return Math.floor(typedWords / elapsedTime);
}

function updateSpeed() {
  const wpm = calculateWPM();
  speedDisplay.textContent = wpm;
}

function checkInput() {
  if (!gameStarted) return;

  typedChars = wordInput.value.length;

  if (wordInput.value === currentSentence) {
    result.textContent = 'Correct! Great job!';
    wordInput.value = '';
    currentSentence = getRandomSentence();
    sentenceDisplay.textContent = currentSentence;
  } else {
    result.textContent = 'Keep going! Type faster!';
  }
  updateSpeed();
}

function handleKeyPress(event) {
  const pressedKey = event.key.toUpperCase();
  const keyElement = document.querySelector(`.key:contains(${pressedKey})`);
  if (keyElement) {
    keyElement.classList.add('active');
    setTimeout(() => {
      keyElement.classList.remove('active');
    }, 200);
  }
}

wordInput.addEventListener('input', checkInput);
startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);

// Initialize the first sentence when the page loads
sentenceDisplay.textContent = getRandomSentence();