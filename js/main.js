const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/playground.png";//картинка поля

const foodImg = new Image();
foodImg.src = "img/food.png";//картинка еды

let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,//1-17 один блок оставлять справа
    y: Math.floor((Math.random() * 15 + 3)) * box,//3-15 3 блока оставлять снизу
};
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(e) {
    if(e.keyCode == 37 && dir != "right")
        dir = "left";
    else if(e.keyCode == 38 && dir != "down")
        dir = "up";
    else if(e.keyCode == 39 && dir != "left")
        dir = "right";
    else if(e.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTale(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);//функиця рисующяя канвас с площадкой и координатами

    ctx.drawImage(foodImg, food.x, food.y);//draw foodimg on random

    for(let i = 0; i < snake.length; i++){//snake
        ctx.fillStyle = i == 0 ? "green" : "red";//green kvadrat
        ctx.fillRect(snake[i].x, snake[i].y, box, box);//draw kvadrat
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;//where is had of snake
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;//score +!
        food = {//create food
            x: Math.floor((Math.random() * 17 + 1)) * box,//1-17 один блок оставлять справа
            y: Math.floor((Math.random() * 15 + 3)) * box,//3-15 3 блока оставлять снизу
        };
    } else {
        snake.pop();//для удаления последнего блока змейки если еда не сьедена
    }

    if(snakeX < box || snakeX > box * 17
       || snakeY < 3 * box || snakeY > box * 17 )
       clearInterval(game);

    if(dir == "left") snakeX -= box;// как будет перемещаться змейка
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x:snakeX,
        y:snakeY
    };

    eatTale(newHead, snake);
    snake.unshift(newHead);
}
let game = setInterval(drawGame, 100);// without this picture is dont view
