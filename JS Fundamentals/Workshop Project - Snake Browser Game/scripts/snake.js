; const snake = (function () {
    const snakeData = {
        headPositionX: null,
        headPositionY: null,
        body: [],
        move: null
    };
    const consts = {
        direction: {
            left: "left",
            right: "right",
            up: "up",
            down: "down"
        },
        className: {
            snake: "snake",
            noName: ""
        }
    };

    function createPositionID(x, y) {
        return `${x}a${y}`;
    }

    function generateSnakeUI(boardSize, snakeSize) {
        snakeData.headPositionX = parseInt(boardSize / 2);
        snakeData.headPositionY = parseInt(boardSize / 2);

        for (let i = 0; i < snakeSize; i++) {
            snakeData.body.push(createPositionID(snakeData.headPositionX - i, snakeData.headPositionY));
        }

        snakeData.body.forEach((snakeElement) => {
            document.getElementById(snakeElement).className = consts.className.snake;
        });
    }
    
    function createSnake(config) {
        generateSnakeUI(config.boardSize, config.snakeSize);
    }
    
    function moveHead() {
        snakeData.move();
    }
    
    function updateSnakePosition() {
        const head = createPositionID(snakeData.headPositionX, snakeData.headPositionY);

        snakeData.body.unshift(head);

        const tail = snakeData.body.pop();

        document.getElementById(tail).className = consts.className.noName;
        document.getElementById(head).className = consts.className.snake;
    }
    
    function setMoveDirection(direction) {
        if (direction === consts.direction.right) {
            snakeData.move = () => { snakeData.headPositionX += 1; };
        } else if (direction === consts.direction.left) {
            snakeData.move = () => { snakeData.headPositionX -= 1; };
        } else if (direction === consts.direction.down) {
            snakeData.move = () => { snakeData.headPositionY += 1; };
        } else if (direction === consts.direction.up) {
            snakeData.move = () => { snakeData.headPositionY -= 1; };
        }
    }
    
    function grow() {
        //TODO: when the food is near border and snake eating it,
        //TODO: the head will grow and will die coz will crash into the border
        snakeData.body.unshift(createPositionID(snakeData.headPositionX, snakeData.headPositionY));
        snakeData.move();
    }
    
    function getSnake() {
        return snakeData;
    }
    
    return {
        createSnake,
        moveHead,
        setMoveDirection,
        getSnake,
        updateSnakePosition,
        grow
    };
})();