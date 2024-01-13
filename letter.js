class Letter {
    constructor(letter) {
        this.position = {x: -1, y: -1};
        this.letter = letter;
        this.alive = true;
        this.spawn();
    }

    kill() {
        this.alive = false;
        this.position = {x: -100, y: -100};
    }

    spawn() {
        if (this.alive) {
            let positionSafe = false;

            while (!positionSafe) {
                this.position = randomLocation();
                const _this = this;

                var positionOk = true;

                letters.forEach((letter) => {
                    if (letter.position.x > -1 && letter.position.y > -1) {
                        if (letter !== _this) {
                            if (Math.abs(letter.position.x - _this.position.x) < 5 * gridSize
                                && Math.abs(letter.position.y - _this.position.y) < 5 * gridSize
                            ) {
                                positionOk = false;
                            }
                        }
                    }
                });

                if (positionOk) {
                    positionSafe = true;
                }
            }
        }
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.font = gridSize*1.5 + 'px serif';
        ctx.fillText(this.letter.toUpperCase(), this.position.x, this.position.y + gridSize);
    }
}