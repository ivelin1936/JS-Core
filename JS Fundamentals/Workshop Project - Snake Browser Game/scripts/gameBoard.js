;const gameBoard = (function () {
    let configData;
    const food = {
        x: null,
        y: null
    };
    let score = 0;
    let loop;

    const consts = {
        eventListener: {
            keydown: "keydown"
        },
        gameOver: "Game Over",
        keyCodes: {
            left: 37,
            up: 38,
            right: 39,
            down: 40
        },
        direction: {
            startDirectionOnRight: "right",
            left: "left",
            right: "right",
            up: "up",
            down: "down"
        },
        className: {
            food: "food",
            noName: ""
        },
        elementID: {
            game: "game",
            score: "score"
        }
    };

    function getPositionID(x, y) {
        return `${x}a${y}`;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateGameBoardUI(size) {
        let gameBoard = "<table>";
        for (let row = 0; row < size; row++) {
            gameBoard += "<tr>";
            for (let col = 0; col < size; col++) {
                gameBoard += `<td id='${getPositionID(col, row)}'></td>`;
            }
            gameBoard += "</tr>";
        }
        gameBoard += "</table>";

        document.getElementById(consts.elementID.game).innerHTML = gameBoard;
    }

    function createGameBoard(config) {
        configData = config;

        generateGameBoardUI(config.boardSize);
        snake.createSnake(config);
    }

    function checkSnakeHeadPosition() {
        const snakeData = snake.getSnake();

        if (snakeData.headPositionX < 0
            || snakeData.headPositionX >= configData.boardSize) {
            gameOver();
        }
        if (snakeData.headPositionY < 0
            || snakeData.headPositionY >= configData.boardSize) {
            gameOver();
        }

        if (snakeData.body.includes(getPositionID(snakeData.headPositionX, snakeData.headPositionY))) {
            gameOver();
        }
    }

    function setupUserInput() {
        document.addEventListener(consts.eventListener.keydown, (eventObj) => {
            if (eventObj.keyCode === consts.keyCodes.left) {
                snake.setMoveDirection(consts.direction.left);  //keyCod 37 --> left
            } else if (eventObj.keyCode === consts.keyCodes.up) {
                snake.setMoveDirection(consts.direction.up);  //keyCod 38 --> up
            } else if (eventObj.keyCode === consts.keyCodes.right) {
                snake.setMoveDirection(consts.direction.right);  //keyCod 39 --> right
            } else if (eventObj.keyCode === consts.keyCodes.down) {
                snake.setMoveDirection(consts.direction.down);  //keyCod 40 --> down
            }
        });
    }

    function gainPoint() {
        score++;
        document.getElementById(consts.elementID.score).innerText = `Score: ${score}`;
    }

    function checkSnakeEating() {
        const snakeData = snake.getSnake();

        if (snakeData.headPositionX === food.x
            && snakeData.headPositionY === food.y) {
            gainPoint();
            snake.grow();
            generateFood();

            updateGamePlay();
        }
    }

    function updateGamePlay() {
        let newSpeed = calculateNewSpeed();
        if (configData.speed !== newSpeed) {
            updateSpeed(newSpeed);
        }

        function updateSpeed(newSpeed) {
            configData.speed = newSpeed;
            clearInterval(loop);
            looper();
        }

        function calculateNewSpeed() {
            if (score <= 25 && score % 5 === 0) {
                return configData.speed - 20;
            } else if (score % 10 === 0 && score > 25) {
                return configData.speed - 25;
            }
            return configData.speed;
        }
    }

    function looper() {
        loop = setInterval(() => {
            snake.moveHead();
            checkSnakeHeadPosition();
            checkSnakeEating();
            snake.updateSnakePosition();
        }, configData.speed);
    }

    function setupSnake() {
        snake.setMoveDirection(consts.direction.startDirectionOnRight);  //set beginning direction
        looper();
    }

    function generateFood() {
        const x = getRandomInt(configData.boardSize);
        const y = getRandomInt(configData.boardSize);

        const snakeDate = snake.getSnake();

        if (snakeDate.body.includes(getPositionID(x, y))) {
            return generateFood();
        }

        food.x = x;
        food.y = y;

        document.getElementById(getPositionID(x, y)).className = consts.className.food;
    }

    function start() {
        setupSnake();
        setupUserInput();
        generateFood();
    }

    function gameOver() {
        clearInterval(loop);
        alert(consts.gameOver);
    }

    return {
        createGameBoard,
        start
    };
})();