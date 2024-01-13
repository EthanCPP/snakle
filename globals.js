const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const STATE_START = 0;
const STATE_PLAY = 1;
const STATE_FAIL = 2;
const STATE_WIN = 3;

var state = STATE_START;

const gridSize = 32;

var possibleLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var snake;
var letters = [];

function randomLocation() {
    return {
        x: Math.round((Math.floor(Math.random() * (canvas.width - (5*gridSize))) / gridSize) + 1) * gridSize,
        y: Math.round((Math.floor(Math.random() * (canvas.height - (5*gridSize))) / gridSize) + 1) * gridSize
    }
}

const word = words[Math.floor(Math.random() * words.length)];

var thisGuess = 0;
var thisColumn = 0;

const guessList = document.querySelector('.guess-list');
const guessRows = guessList.querySelectorAll('.guess-row');

const overlay = document.querySelector('.overlay');

function guessLetter(letter) {
    if (thisColumn < 5) {
        guessRows[thisGuess].querySelectorAll('.guess-column')[thisColumn].innerHTML = letter;

        thisColumn++;
    }
}

document.addEventListener('keyup', function(e) {
    if (e.key === 'Backspace') {
        if (thisColumn > 0) {
            thisColumn--;
            guessRows[thisGuess].querySelectorAll('.guess-column')[thisColumn].innerHTML = '';
        }
    } else if (e.key === 'Enter') {
        if (state === STATE_START) {
            state = STATE_PLAY;
            overlay.classList.remove('visible');
        }

        if (state === STATE_FAIL || state === STATE_WIN) {
            window.location.reload();
        }

        if (state === STATE_PLAY) {
            if (thisColumn >= 5) {
                var chosenLetters = [];
                var correctLetters = [];

                // First check for GREENS
                guessRows[thisGuess].querySelectorAll('.guess-column').forEach((column, index) => {
                    chosenLetters.push(column.innerHTML);

                    if (column.innerHTML === word.substring(index, index + 1)) {
                        column.classList.add('green');
                        correctLetters.push(column.innerHTML);
                    }
                });

                if (correctLetters.length === 5) {
                    winGame();
                }

                // Remove the correct letters from the chosen letters, to avoid confusion
                chosenLetters = chosenLetters.map((chosenLetter) => {
                    if (!correctLetters.includes(chosenLetter)) {
                        return chosenLetter;
                    }

                    return '';
                });

                var yellowLetters = [];

                guessRows[thisGuess].querySelectorAll('.guess-column').forEach((column, index) => {
                    if (word.includes(column.innerHTML)) {
                        yellowLetters.push(column.innerHTML);

                        // get how many occurrences of this letter exist in the word
                        const occurrences = word.split(column.innerHTML).length - 1;

                        if (yellowLetters.filter((yellowLetter) => {
                            return yellowLetter === column.innerHTML
                        }).length <= occurrences) {
                            column.classList.add('yellow');
                        }
                    }
                });

                // set wrongs
                guessRows[thisGuess].querySelectorAll('.guess-column').forEach((column, index) => {
                    if (!column.classList.contains('yellow') && !column.classList.contains('green')) {
                        column.classList.add('wrong');

                        letters.forEach((letter) => {
                            if (letter.letter === column.innerHTML) {
                                letter.kill();
                            }
                        })
                    }
                });

                thisGuess++;
                thisColumn = 0;

                if (thisGuess >= 6 && state === STATE_PLAY) {
                    failGame();
                }
            }
        }
    }
})

function failGame() {
    state = STATE_FAIL;

    overlay.classList.add('visible');
    overlay.querySelectorAll('.overlay-inner').forEach((overlayInner) => {
        if (overlayInner.classList.contains('overlay-fail')) {
            overlayInner.querySelector('.overlay-fail-word').innerHTML = 'The word was ' + word.toUpperCase();
            overlayInner.classList.add('visible');
        } else {
            overlayInner.classList.remove('visible');
        }
    })
}

function winGame() {
    state = STATE_WIN;

    overlay.classList.add('visible');
    overlay.querySelectorAll('.overlay-inner').forEach((overlayInner) => {
        if (overlayInner.classList.contains('overlay-win')) {
            overlayInner.classList.add('visible');
        } else {
            overlayInner.classList.remove('visible');
        }
    })
}