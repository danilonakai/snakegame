var points = 0;
var best = localStorage.getItem('best');

function sum_points(add){    
    points = (add - 5) * 10;
    
    if(points > best){
        best = points;
        localStorage.setItem('best',best);
    }

    document.querySelector('#points strong').textContent = points;
    document.querySelector('#best strong').textContent = best;

}
function reset_points(){
    points = 0;
    document.querySelector('#points strong').textContent = points;
}

window.onload = function() {
    if(best == undefined){
        best = 0;
    }else{
        document.querySelector('#best strong').textContent = best;
    }

    var stage = document.querySelector('#stage');
    var context = stage.getContext("2d");

    const velocity = 1; // quantas casas anda a cada vez que o jogo stage atualizar
    var moveX = moveY = 0; //Velocidade para cada lado
    var snakeX = snakeY = 10; //Ponto de inicio
    var pieceSize = 25; //Tamanho de cada peça
    var pieceQuantity = 25; //Quantidade de peças que tem no stage
    var appleX = appleY = 18;

    var trail = []; //Rastro da cobra
    var tail = 5; //Rabo da cobra

    document.addEventListener("keydown", keyPush);
    setInterval(game, 60);

    function game(){
        snakeX += moveX;
        snakeY += moveY;

        if(snakeX < 0){
            snakeX = pieceQuantity - 1;
        }
        if(snakeX > pieceQuantity - 1){
            snakeX = 0;
        }
        if(snakeY < 0){
            snakeY = pieceQuantity - 1;
        }
        if(snakeY > pieceQuantity - 1){
            snakeY = 0;
        }
        
        // Fill the stage
        context.fillStyle = "#ffdc6e";
        context.fillRect(0, 0, stage.width, stage.height);

        // Fill apple
        context.fillStyle = "#d63031";
        context.fillRect(appleX * pieceSize, appleY * pieceSize, pieceSize, pieceSize);

        // Fill snake
        context.fillStyle = "#252525";
        for(var i = 0; i < trail.length; i++){
            context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize, pieceSize);
            if(trail[i].x == snakeX && trail[i].y == snakeY){
                moveX = moveY = 0;
                tail = 5;
                reset_points();
            }
        }
        
        trail.push({x:snakeX, y:snakeY});

        while(trail.length > tail){
            trail.shift();
        }

        if(appleX == snakeX && appleY == snakeY){
            tail++;
            sum_points(tail);
            count = (tail - 5) * 10;
            appleX = Math.floor(Math.random() * pieceQuantity);
            appleY = Math.floor(Math.random() * pieceQuantity);
        }
    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: //left
                if(moveX != 1){
                    moveX = -velocity;
                    moveY = 0;
                }
            break;
            
            case 38: //up
                if(moveY != 1){
                    moveX = 0;
                    moveY = -velocity;
                }
            break;

            case 39: //right
                if(moveX != -1){
                    moveX = velocity;
                    moveY = 0;
                }
            break;

            case 40: //down
                if(moveY != -1){
                    moveX = 0;
                    moveY = velocity;
                }
            break;
        }
    }
    
}