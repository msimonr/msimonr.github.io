class Snake{
    constructor(){
        this.speed = 10;
        this.body = [{x: 200, y: 200}, {x: 200, y: 190}, {x: 200, y: 180}];
        this.direction = {x:0, y:1};
    }

    addBody(){
        let lastPosition = this.body[this.body.length-1];
        this.move();
        this.body.push({x: lastPosition.x, y: lastPosition.y});
    }

    move(){
        for (let i=this.body.length-1; i > 0; i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.body[0].x += this.speed*this.direction.x;
        this.body[0].y += this.speed*this.direction.y;
    }

    setDirection(x, y){
        this.direction.x = x;
        this.direction.y = y;
    }
}

//Fruta:


window.onload = function() {
    canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    // context.font = "10px Arial";
    // snake = new Snake();
    // fruta = {x: 350, y:250};
    // lost = false;
    init();
    setInterval(game, 1000/12);
}

function init(){
    gameUnit = 10;
    context.font = "10px Arial";
    snake = new Snake();
    fruta = {x: 350, y:250};
    lost = false;
}

function game(){
    if(!lost){
        if(Math.abs(snake.body[0].x-fruta.x) < gameUnit && Math.abs(snake.body[0].y - fruta.y) < gameUnit){
            createFruta();
            snake.addBody();
            draw();
        }else if(snake.body.some(headIsTouchingBody) || snake.body[0].x === 0 || snake.body[0].x === canvas.width || snake.body[0].y === 0 || snake.body[0].y === canvas.height){
            lost = true;
            //Fondo
            context.fillStyle = "#24252A";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "20px Arial";
            context.fillStyle = "#FFFFFF";
            context.fillText("Perdiste, R para reiniciar.", Math.floor(canvas.width/4), 200);
            context.fillText("Puntaje: "+(snake.body.length-3).toString() , Math.floor(canvas.width/3), 230);
        }else{
            snake.move();
            draw();
        }
        // draw();
    }

}

function draw(){
    
    //Fondo
    context.fillStyle = "#24252A";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Puntaje
    context.fillStyle = "#FFFFFF";
    context.fillText("Puntos: "+(snake.body.length-3).toString(), 20, 20);
    console.log("hola: "+ (snake.body.length-3).toString());
        
    
    //Fruta
    context.fillStyle = "#9d32a8";
    context.fillRect(fruta.x, fruta.y, snake.speed, snake.speed);

    //Snake
    context.fillStyle = "#13ad3c";
    for (let elem of snake.body){
        context.fillRect(elem.x, elem.y, snake.speed-1, snake.speed-1);
    }

}

//Movimiento
function keyPush(event){
    switch(event.keyCode){
        case 37: //Izquierda
            if(snake.direction.x == 1 && snake.direction.y == 0){
                break;
            }
            snake.direction.x = -1;
            snake.direction.y = 0;
            break;
        case 38: //Arriba
            if(snake.direction.x == 0 && snake.direction.y == 1){
                break;
            }
            snake.direction.x = 0;
            snake.direction.y = -1;
            break;
        case 39: //Derecha
            if(snake.direction.x == -1 && snake.direction.y == 0){
                break;
            }
            snake.direction.x = 1;
            snake.direction.y = 0;
            break;
        case 40: //Abajo
            if(snake.direction.x == 0 && snake.direction.y == -1){
                break;
            }
            snake.direction.x = 0;
            snake.direction.y = 1;
        case 82:
            if(lost){
                init();
            }
            break;
    }
}

function createFruta(){
    do{
        newFruta = {x: Math.floor(Math.random()*(canvas.width-10)), y: Math.floor(Math.random()*(canvas.height-10))};
    } while(snake.body.find(cuerpo => Math.abs(cuerpo.x - newFruta.x) < 9  && Math.abs(cuerpo.y - newFruta.y) < 9) && Math.abs(newFruta.x - canvas.width) > 9 && Math.abs(newFruta.y - canvas.height) > 9);
    fruta.x = newFruta.x;
    fruta.y = newFruta.y;
}

function headIsTouchingBody(value, index, array){
    return (index != 0 && Math.abs(value.x - array[0].x) < 10 && Math.abs(value.y - array[0].y) < 10);
}