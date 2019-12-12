
// Variables

    // Canvas
var canvas = document.getElementById("myCanvas");
var canvasContent = canvas.getContext("2d");
var video = document.getElementById("myVideo");

var x = 60;
var y = 60;

var treatX = 30;
var treatY = 30;


    // Direction
var direction = 39;

function directionPermitted(e){
    if (direction == 39 && (e.keyCode == 40 || e.keyCode == 38)){
        return true;
    }
    else if (direction == 37 && (e.keyCode == 40 || e.keyCode == 38)){
        return true;
    }
    else if (direction == 38 && (e.keyCode == 37 || e.keyCode == 39)){
        return true;
    }
    else if (direction == 40 && (e.keyCode == 37 || e.keyCode == 39)){
        return true;
    }
    else{
        return false;
    }
}


    // Snake
var snake = [[60, 60], [40, 60], [20, 60], [0, 60]];

    // other
var score = 0;
var interval = 500;
var intervalFunction;
var updatePending = false;
var paused = false;

var backgroundOpacity = 1;
var backgroundSaturation = 0;
var backgroundBlur = 5;

  // Sounds
var eatSound = new sound('eat.mp3');
var failSound = new sound('failure.mp3');

//Events
document.onkeydown = function(e) { 
    
    if (directionPermitted(e) && !updatePending)
    {
        direction = e.keyCode;
        updatePending = true;
    }
    else if(e.keyCode == 80){
        changePauseStatus();
        
    }
};

$('.virtualBtn').on('click', (event) =>{
    var e = {};
    var id = event.target.getAttribute('id');
    switch(id){
        case 'up':
            e.keyCode = 38;
            break;
        case 'down':
                e.keyCode = 40;
                break;
        case 'left':
                e.keyCode = 37;
                break;
        case 'right':
                e.keyCode = 39;
                break;
        case 'playPause':
                changePauseStatus();
                break;
        default:
                alert('unknown');
    }

    if (directionPermitted(e) && !updatePending)
    {
        direction = e.keyCode;
        updatePending = true;
    }
})

// Call methods on start
drawSnake();
startNewInterval();


// Update
function drawSnake(){
    for (var i = 0; i < snake.length; i++){
        canvasContent.beginPath();
        var procent = ((i / snake.length) - 1) * -1;
        canvasContent.fillStyle = "rgba(255,255,255," + procent +")";
        canvasContent.fillRect(snake[i][0],snake[i][1],20,20);
    }
}

function drawTreat(){
    canvasContent.beginPath();
    canvasContent.fillStyle = "rgba(255,255,255,0.8)";
    canvasContent.arc(treatX,treatY,10,0,2*Math.PI);
    canvasContent.fill();

}

function changePauseStatus(){
    if (paused){
        startNewInterval();
        paused = false;
    }
    else{
        clearInterval(intervalFunction);
        paused = true;
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
        eatSound.play();
        score += 10;
        var h2 = document.getElementsByTagName("h2");
        h2[0].textContent = "Score: " + score;
        newTreatPosition();
        interval *= 0.95;
        drawSnake();
        drawTreat();
        updatePending = false;

        if (backgroundOpacity < 0.1){
            backgroundSaturation += 10;
            backgroundBlur -= 0.5;
            video.style.filter = "saturate("+ backgroundSaturation + "%) blur(" + backgroundBlur + "px)";
        }
        else{
            backgroundOpacity -= 0.1;
            canvas.style.backgroundColor = "rgba(0, 0, 0, " + backgroundOpacity + ")";
        }
        
        startNewInterval(); 
    }

    else {
        drawSnake();
        drawTreat();
        updatePending = false;
        snake.pop();
    }

    
    
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
        failSound.play();
        return true;
    }

    else if (snake[0][1] < 0 || snake[0][1] >= canvas.height){
        failSound.play();
        return true;
    }
    
    else{

        for (var i = 1; i < snake.length; i++){
            if (snake[0][0] == snake[i][0] && (snake[0][1] == snake[i][1])){
                failSound.play();
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

//This is a function constructor that will create a variable representing an 'invisible' <audio> element on the page. 
//The audio element is then played in the script.js depending on different events.
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }