function setCanvasDimensions() {
    canvas.width = document.getElementById('main').offsetWidth;
    canvas.height = document.getElementById('main').offsetHeight;
}

window.onresize = () => {
    setCanvasDimensions();
}

window.onload = () => {
    setCanvasDimensions();

    snake = new Snake();

    possibleLetters.forEach((possibleLetter) => {
        letters.push(new Letter(possibleLetter));
    });

    setInterval(() => {
        if (state === STATE_PLAY) {
            update();
        }

        render();
    }, 1000 / 5);
}

function update() {
    snake.update();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.draw();

    letters.forEach((letter) => {
        letter.draw();
    });
}

