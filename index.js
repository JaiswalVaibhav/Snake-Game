let board = document.getElementById("canvas");

let board_ctx = board.getContext("2d");

let size = 25 ;

let score = 0 ;

let direction  ;

let snake = [{ x : 300, y : 250 }] ;

let dx = snake[0].x
let dy = snake[0].y

let food = [] ;

food[0] = {
    x : Math.round( Math.random() * 32 ) * size ,
    y : Math.round( Math.random() * 20 ) * size
}

let displayScore = document.getElementById("score");

document.addEventListener("keydown",function(event){

    if(event.key=="ArrowLeft"  && direction!="right"){
        direction = "left"
    }else if(event.key=="ArrowUp"  && direction!="down"){
        direction = "up"
    }else if(event.key=="ArrowRight"  && direction!="left"){
        direction = "right"
    }else if(event.key=="ArrowDown"  && direction!="up"){
        direction = "down"
    }
});


function main(){

        if(is_gameOver()){
            board_ctx.fillStyle = "red" ;
            board_ctx.font = "30px monospace"
            board_ctx.fillText("Game Over...",280,250)
            return; 
        }

        clear_board();
        drawSnake();
        drawFood();
        movement(direction);
        move_snake();

}

let game = setInterval(main,100);

function clear_board(){

        board_ctx.fillStyle = "aquamarine";
        board_ctx.strokestyle = "red";
        board_ctx.fillRect(0, 0, board.width, board.height);
        board_ctx.strokeRect(0, 0, board.width, board.height);
}

function drawSnake(){
    for(let i = 0 ; i < snake.length ; i++){
        board_ctx.fillStyle = (i==0) ? "black" : "yellowgreen" ;
        board_ctx.fillRect(snake[i].x,snake[i].y,size,size);
    }
}


function drawFood(){
    board_ctx.fillStyle = "blue" ;
    board_ctx.fillRect(food[0].x,food[0].y,size,size);
}


function movement(direction){

    switch (direction){
        case "left" :
            dx -= size ;  
            break
        
        case "up" : 
            dy -= size ;
            break
        
        case "right" : 
            dx += size ;
            break

        case "down" : 
            dy += size ;
            break
    }

}       

function move_snake() {
    

    const head = {
        x: dx , 
        y: dy 
    };
    
    snake.unshift(head);

    if (dx == food[0].x && dy == food[0].y) {
        food[0].x = Math.round( Math.random() * 32 ) * size ,
        food[0].y = Math.round( Math.random() * 20 ) * size
        score++;
        displayScore.innerHTML=score;
        drawFood();
        drawSnake()
    } else {
        snake.pop();
    }
}



function is_gameOver(){
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true
        }
    }

    if(snake[0].x<0 || snake[0].x>800-25 || snake[0].y<0 || snake[0].y>500-25){
        return true
    }

    return false
}


