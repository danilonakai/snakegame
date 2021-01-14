window.onload = function() {
    var stage = document.querySelector('#stage');
    var context = stage.getContext("2d");

    const velocity = 1; // quantas casas anda a cada vez que o jogo stage atualizar
    var moveX = moveY = 0; //Velocidade para cada lado
    var snakeX = snakeY = 10; //Ponto de inicio
    var pieceSize = 25; //Tamanho de cada peça
    var pieceQuantity = 25; //Quantidade de peças que tem no stage
    var orangeX = orangeY = 18;

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
        context.fillStyle = "#2d3436";
        context.fillRect(0, 0, stage.width, stage.height);

        // Fill goal
        context.fillStyle = "#ffeaa7";
        context.fillRect(orangeX * pieceSize, orangeY * pieceSize, pieceSize, pieceSize);

        // Fill snake
        context.fillStyle = "#fdcb6e";
        for(var i = 0; i < trail.length; i++){
            context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize, pieceSize);
            if(trail[i].x == snakeX && trail[i].y == snakeY){
                moveX = moveY = 0;
                tail = 5;
            }
        }
        
        trail.push({x:snakeX, y:snakeY});

        while(trail.length > tail){
            trail.shift();
        }

        if(orangeX == snakeX && orangeY == snakeY){
            tail++;
            orangeX = Math.floor(Math.random() * pieceQuantity);
            orangeY = Math.floor(Math.random() * pieceQuantity);
        }
    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: //left
                moveX = -velocity;
                moveY = 0;
            break;
            
            case 38: //up
                moveX = 0;
                moveY = -velocity;
            break;

            case 39: //right
                moveX = velocity;
                moveY = 0;
            break;

            case 40: //down
                moveX = 0;
                moveY = velocity;
            break;
        }
    }
    
}