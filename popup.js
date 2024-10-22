let gameLetters = '';
let possibleWords = [];
let foundWords = [];

document.addEventListener('DOMContentLoaded', () => {
  const startGameBtn = document.getElementById('start-game');
  const submitWordBtn = document.getElementById('submit-word');
  const endGameBtn = document.getElementById('end-game');
  const playAgainBtn = document.getElementById('play-again');

  startGameBtn.addEventListener('click', startGame);
  submitWordBtn.addEventListener('click', submitWord);
  endGameBtn.addEventListener('click', endGame);
  playAgainBtn.addEventListener('click', resetGame);
});

function startGame() {
  const lettersInput = document.getElementById('letters-input');
  gameLetters = lettersInput.value.toLowerCase().replace(/[^a-z]/g, '');

  if (gameLetters.length < 3) {
    alert('Please enter at least 3 letters.');
    return;
  }

  document.getElementById('input-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
  document.getElementById('game-letters').textContent = gameLetters;

  // Generate possible words
  chrome.runtime.sendMessage({ action: 'generateWords', letters: gameLetters }, (response) => {
    possibleWords = response.words;
  });
}

function submitWord() {
  const wordInput = document.getElementById('word-input');
  const word = wordInput.value.toLowerCase().trim();

  if (word.length < 3) {
    alert('Words must be at least 3 letters long.');
    return;
  }

  if (!isValidWord(word)) {
    alert('Invalid word. Please use only the given letters.');
    return;
  }

  if (foundWords.includes(word)) {
    alert('You already found this word.');
    return;
  }

  if (possibleWords.includes(word)) {
    foundWords.push(word);
    updateWordList(word);
  } else {
    alert('Not a valid English word.');
  }

  wordInput.value = '';
}

function isValidWord(word) {
  const letterCounts = {};
  for (const letter of gameLetters) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  for (const letter of word) {
    if (!letterCounts[letter]) return false;
    letterCounts[letter]--;
  }

  return true;
}

function updateWordList(word) {
  const wordList = document.getElementById('word-list');
  const li = document.createElement('li');
  li.textContent = word;
  wordList.appendChild(li);
}

function endGame() {
  const score = (foundWords.length / possibleWords.length) * 100;
  
  document.getElementById('game-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('score').textContent = score.toFixed(2);
  document.getElementById('found-words').textContent = foundWords.join(', ');
  document.getElementById('all-words').textContent = possibleWords.join(', ');
}

function resetGame() {
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('input-section').style.display = 'block';
  document.getElementById('letters-input').value = '';
  document.getElementById('word-list').innerHTML = '';
  gameLetters = '';
  possibleWords = [];
  foundWords = [];
}
