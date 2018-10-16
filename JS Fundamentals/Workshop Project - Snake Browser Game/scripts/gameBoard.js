; const gameBoard = (function () {
    let configData;
    const food = {
        x: null,
        y: null
    };
    let score = 0;
    let loop;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateGameBoardUI(size) {
        let gameBoard = "<table>";
        for (let row = 0; row < size; row++) {
            gameBoard += "<tr>";
            for (let col = 0; col < size; col++) {
                    gameBoard += `<td id='${col}${row}'></td>`;
            }
            gameBoard += "</tr>";
        }
        gameBoard += "</table>";

        document.getElementById("game").innerHTML = gameBoard;
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

        if (snakeData.body.includes(`${snakeData.headPositionX}${snakeData.headPositionY}`)) {
            gameOver();
        }
    }
    
    function setupUserInput() {
        document.addEventListener("keydown", (eventObj) => {
            if (eventObj.keyCode === 37) {
                snake.setMoveDirection("left");  //keyCod 37 --> left
            } else if (eventObj.keyCode === 38) {
                snake.setMoveDirection("up");  //keyCod 38 --> up
            } else if (eventObj.keyCode === 39) {
                snake.setMoveDirection("right");  //keyCod 39 --> right
            } else if (eventObj.keyCode === 40) {
                snake.setMoveDirection("down");  //keyCod 40 --> down
            }
        });
    }
    
    function gainPoint() {
        score++;
        
        document.getElementById("score").innerText = `Score: ${score}`;
    }
    
    function checkSnakeEating() {
        const snakeData = snake.getSnake();

        if (snakeData.headPositionX === food.x
                && snakeData.headPositionY === food.y) {
            gainPoint();
            snake.grow();
            generateFood();
        }
    }
    
    function setupSnake() {
        snake.setMoveDirection("right");  //set beginning direction

        loop = setInterval(() => {
            snake.moveHead();
            checkSnakeHeadPosition();
            checkSnakeEating();
            snake.updateSnakePosition();
        }, configData.speed);
    }
    
    function generateFood() {
        const x = getRandomInt(configData.boardSize);
        const y = getRandomInt(configData.boardSize);

        const snakeDate = snake.getSnake();

        if (snakeDate.body.includes(`${x}${y}`)) {
            return generateFood();
        }

        food.x = x;
        food.y = y;

        document.getElementById(`${x}${y}`).className = "food";
    }
    
    function start() {
        setupSnake();
        setupUserInput();
        generateFood();
    }
    
    function gameOver() {
        clearInterval(loop);
        alert("Game Over");
    }
    
    return {
        createGameBoard,
        start
    };
})();