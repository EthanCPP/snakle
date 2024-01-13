class Snake {
    constructor() {
        this.direction = {x: 1, y: 0};
        this.tail = [];

        this.bindKeys();
        this.spawn();
    }

    bindKeys() {
        const _this = this;

        document.addEventListener('keydown', function(e) {
            if (e.key === 'w' && !_this.direction.y) {
                _this.direction.x = 0;
                _this.direction.y = -1;
            } else if (e.key === 'a' && !_this.direction.x) {
                _this.direction.x = -1;
                _this.direction.y = 0;
            } else if (e.key === 's' && !_this.direction.y) {
                _this.direction.x = 0;
                _this.direction.y = 1;
            } else if (e.key === 'd' && !_this.direction.x) {
                _this.direction.x = 1;
                _this.direction.y = 0;
            }
        });

        // initially temporary but kept as an easter egg.
        document.addEventListener('keyup', function(e) {
            if (e.key === 'r') {
                _this.grow();
            }
        })
    }

    spawn() {
        this.tail.push(randomLocation());
    }

    update() {
        if (this.tail.length > 1) {
            for (let i = this.tail.length - 1; i > 0; i--) {
                this.tail[i].x = this.tail[i - 1].x;
                this.tail[i].y = this.tail[i - 1].y;
            }
        }

        this.tail[0].x += this.direction.x * gridSize;
        this.tail[0].y += this.direction.y * gridSize;

        // wrapping
        if (this.tail[0].x < 0) {
            this.tail[0].x = (Math.floor(canvas.width / gridSize) * gridSize) - gridSize;
        } else if (this.tail[0].x >= Math.floor(canvas.width / gridSize) * gridSize) {
            this.tail[0].x = 0;
        } else if (this.tail[0].y < 0) {
            this.tail[0].y = (Math.floor(canvas.height / gridSize) * gridSize) - gridSize;
        } else if (this.tail[0].y >= Math.floor(canvas.height / gridSize) * gridSize) {
            this.tail[0].y = 0;
        }

        this.checkCollisionWithSelf();
        this.checkCollisionWithLetter();
    }

    checkCollisionWithSelf() {
        if (this.tail.length > 1) {
            this.tail.forEach((tailItem, index) => {
                if (index > 0) {
                    if (this.tail[0].x === tailItem.x && this.tail[0].y === tailItem.y) {
                        failGame();
                    }
                }
            });
        }
    }

    checkCollisionWithLetter() {
        const _this = this;

        letters.forEach((letter) => {
            if (this.tail[0].x === letter.position.x && this.tail[0].y === letter.position.y) {
                // collided with letter
                letter.spawn();
                _this.grow();
                guessLetter(letter.letter);
            }
        });
    }

    draw() {
        ctx.fillStyle = 'white';

        this.tail.forEach((tailItem) => {
            ctx.fillRect(tailItem.x, tailItem.y, gridSize, gridSize);
        })
    }

    grow() {
        let x = this.tail[0].x;
        let y = this.tail[0].y;

        this.tail.push({x, y});
    }
}