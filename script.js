
// Variables

    // Canvas
var canvas = document.getElementById("myCanvas");
var canvasContent = canvas.getContext("2d");

var x = 60;
var y = 60;

var treatX = 30;
var treatY = 30;


    // Direction
var direction = 39;

function directionPermitted(e){
    if (direction == 39 && e.keyCode == 37){
        return false;
    }
    else if (direction == 37 && e.keyCode == 39){
        return false;
    }
    else if (direction == 38 && e.keyCode == 40){
        return false;
    }
    else if (direction == 40 && e.keyCode == 38){
        return false;
    }
    else{
        return true;
    }
}


    // Snake
var snake = [[60, 60], [40, 60], [20, 60], [0, 60]];


    // other
var score = 0;
var interval = 500;
var intervalFunction;
var updatePending = false;

//Events
document.onkeydown = function(e) { 
    
    if (directionPermitted(e) && !updatePending)
    {
        direction = e.keyCode;
        updatePending = true;
    }
     };


// Call methods on start
drawSnake();
startNewInterval();


// Update
function drawSnake(){
    for (var i = 0; i < snake.length; i++){
        canvasContent.beginPath();
        canvasContent.rect(snake[i][0],snake[i][1],20,20);
        canvasContent.stroke();
    }
}

function updateState() {

    updatePending = true;

    if (collisionDetected()){
        alert("Game over");
    }

    if (direction == 37)
    {
        newY = snake[0][1];
        newX = snake[0][0] -20;
        snake.unshift([newX, newY]);
    }
    else if (direction == 38){
        newY = snake[0][1] - 20;
        newX = snake[0][0];
        snake.unshift([newX, newY]);
    }
    else if (direction == 39){
        newY = snake[0][1];
        newX = snake[0][0] + 20;
        snake.unshift([newX, newY]);
    }
    else if (direction == 40){
        newY = snake[0][1] + 20;
        newX = snake[0][0];
        snake.unshift([newX, newY]);
    }
    
    canvasContent.clearRect(0, 0, canvas.width, canvas.height); 

    if (treatX == snake[0][0] + 10 && treatY == snake[0][1] + 10){
        score += 10;
        var h2 = document.getElementsByTagName("h2");
        h2[0].textContent = "Score: " + score;
        newTreatPosition();
        interval *= 0.95;
        drawSnake();
        drawTreat();
        updatePending = false;
        startNewInterval(); 
    }
    else {
        drawSnake();
        drawTreat();
        updatePending = false;
        snake.pop();
    }

    
    
}

function drawTreat(){
    canvasContent.beginPath();
    canvasContent.arc(treatX,treatY,10,0,2*Math.PI);
    canvasContent.stroke();
}

function newTreatPosition(){
    do {
        // - 10 means the minimum number to be randomized and for some reason you then do + that number. 
        treatY = Math.floor(Math.random() * (canvas.height - 10)) + 10;
    } while(treatY % 20 !== 10)

    do {
        treatX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
    } while (treatX % 20 !== 10)
}

function collisionDetected(){
    if (snake[0][0] < 0 || snake[0][0] >= canvas.width){
        return true;
    }

    else if (snake[0][1] < 0 || snake[0][1] >= canvas.height){
        return true;
    }
    
    else{

        for (var i = 1; i < snake.length; i++){
            if (snake[0][0] == snake[i][0] && (snake[0][1] == snake[i][1])){
                return true;
            }
        }
        return false;
    }
}

function startNewInterval(){
    clearInterval(intervalFunction)
    intervalFunction = setInterval(function(){ 
        
        updateState();
       
   }, interval);

}