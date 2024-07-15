const canvas = document.querySelector("canvas")

const context = canvas.getContext('2d')
let divScore = document.getElementById('score')
let startBtn = document.getElementById('start')
let box = 20
let gameOverDiv = document.getElementById('gameOver')
let snake = [{ x: 10 * box, y: 10 * box }, { x: 11 * box, y: 10 * box }]

let speed = 500

let game = ''
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = 'G';
let score = 0;
function reset() {
    snake = [{ x: 10 * box, y: 10 * box }, { x: 11 * box, y: 10 * box }]
    score = 0
    gameOverDiv.style.display = 'none'
    speed = 500
    
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    direction = 'G';
    score = 0;
    clearInterval(game)
    game = ''
    
    start()
}

const setDirection = (dir) => {
    if (dir == 'G' && direction != 'D') {
        direction = dir
    }
    if (dir == 'D' && direction != 'G') {
        direction = dir
    }
    if (dir == 'H' && direction != 'B') {
        direction = dir
    }
    if (dir == 'B' && direction != 'H') {
        direction = dir
    }
}


function draw() {
    context.clearRect(0, 0, 400, 400)
    if (speed != 0 && speed % 5 == 0) {
        speed -= 50
    }
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if (direction == 'G') {
        snakeX -= box
    }
    if (direction == 'D') {
        snakeX += box
    }
    if (direction == 'H') {
        snakeY -= box
    }
    if (direction == 'B') {
        snakeY += box
    }


    for (let index = 0; index < snake.length; index++) {
        let x = snake[index].x
        let y = snake[index].y

        snake[index].x = snakeX
        snake[index].y = snakeY
        context.fillStyle = (index == 0) ? 'green' : 'yellow'
        context.fillRect(snake[index].x, snake[index].y, box, box)

        snakeX = x
        snakeY = y
    }
    context.fillStyle = 'orange'
    context.fillRect(food.x, food.y, box, box)
    if (snake[0].x < 0 || snake[0].x > 19 * box || snake[0].y < 0 || snake[0].y > 19 * box) {
        clearInterval(game)
        // game over
        gameOverDiv.style.display = 'block'
        speed = 500
        startBtn.innerText = 'Start'
    }
    if (snake[0].x == food.x && snake[0].y == food.y) {
        score++
        divScore.innerText = score
        snake.push({
            x: snakeX,
            y: snakeY
        })
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } for (let index = 1; index < snake.length; index++) {
        if (snake[0].x == snake[index].x && snake[0].y == snake[index].y) {
            clearInterval(game)
        
            //game over
            gameOverDiv.style.display = 'block'
            speed = 500
            startBtn.innerText = 'Start'
        }

    }

    //console.log(snakeX, snakeY)
}

function start() {
    if (game == '') {
        game = setInterval(draw, speed)

        startBtn.innerText = 'Pause'
    } else {
        clearInterval(game)
        game = ''
        startBtn.innerText = 'Start'
        gameOverDiv.style.display = 'none'
    }
}

