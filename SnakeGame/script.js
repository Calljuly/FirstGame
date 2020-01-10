import {addPlayer } from '../highScoreModule.js';


//Highscore functionality
let name = "";
let score = 0;


submitHighscore.onclick =  function(){
    name = document.getElementById('userName').value;
    addPlayer(name, score)
};

// Remove the gameOver div, reset the highscore and reload the page/game.
tryAgain.onclick = function(){
    document.getElementById("gameOver").style.display = "none";
    score = 0;
    location.reload()
};

backToStart.onclick = function(){
window.location.href = "/mainpage/main.html";
};

// Increases the score and update the score shown. 
function increaseScoreBy(amount){
    score += amount;
    let h2 = document.getElementsByTagName("h2");
    h2[0].textContent = "Score: " + score;
};


// Random variables
let intervalFunction;
let paused = false; 

let backgroundOpacity = 1;
let backgroundSaturation = 0;
let backgroundBlur = 5;
let backgroundHue = 0;
let time;



// Canvas
const canvas = document.getElementById("myCanvas");
const canvasContent = canvas.getContext("2d");
const video = document.getElementById("myVideo");
const bubble = document.getElementById("treat");

     
    
class Position{
    constructor(X, Y){
        this.X = X;
        this.Y = Y;
    }
}

// Gets a random position within the frames of the canvas. 
function getRandomPosition(){

    let newPosition = new Position(0, 0);

    do {
        // There is no advanced collission detection in this game. This demands
        // carefully calculation of the following things: The size of the canvas, how much the snake 
        // can move each step and of course where the treat can be positioned.
        // The reason for this is that if the treat is at a certain XY position, the head of the snake 
        // has to be able to reach that XY position exactly.  

        // This was a game of trail and error. I figured I needed to use "% 20 == 0" since the snake
        // moves +20 or -20 depending on direction. That worked well until I changed the start position of

        newPosition.Y = Math.floor(Math.random() * (canvas.height - 25)) + 25;

    } while(newPosition.Y % 20 !== 10)

    do {
        // Here a value between 25 and (canvas.height - 25) is randomized. That becomes the new Y position of the new treat. This loops checks of it's
        // an acceptable position and randomizes a new number if it's not.
        newPosition.X = Math.floor(Math.random() * (canvas.width - 25)) + 25;
    } while (newPosition.X % 20 !== 10)

    return newPosition;
}



// Snake
class Snake{
    constructor(body, color, invincible, speed){
        this.body = body;
        this.color = color;
        this.invincible = invincible;
        this.speed = speed;
    }
    
    increaseSpeed(){
        this.speed = Math.max(this.speed *= 0.95, 45); 
    }

    // Changes the speed of the snake, changes visuals and resets all after a cetain amount of time. 
    becomeInvincible(){
        this.invincible = true;
        this.color = "0, 0, 0,";
        let initialSpeed = this.speed;
        video.style.filter = "invert(100%) hue-rotate(190deg)";
        bubble.style.filter = "invert(100%)";
        this.speed = 100; 
        startNewInterval(); 
        let thisSnake = this;
        setTimeout(function(){ 
            thisSnake.invincible = false; 
            thisSnake.color = "255, 255, 255,";
            thisSnake.speed = initialSpeed;
            video.style.filter = "hue-rotate(" + backgroundHue + "deg" + ")";
            bubble.style.filter = "invert(0%)";
            startNewInterval();
        }, powerUp.timeLimit);
    }

}

let bodyAtStart = [new Position(60, 60), new Position(40, 60), new Position(20, 60), new Position(0, 60)];
let snake = new Snake(bodyAtStart, "255, 255, 255,", false, 300);

function newSnakePosition(){
    let newY = [];
    let newX = [];

    // Inserts a new head position into the snake array. If it is on it's way into the edge then
    // make it show up on the opposite site of that edge.
     if (direction == "left")
    {
        if (edgeDetected()){
            newY = snake.body[0].Y;
            newX = canvas.width - 20;
        }
        else{
            newY = snake.body[0].Y;
            newX = snake.body[0].X -20;
        }

        snake.body.unshift(new Position(newX, newY));
    }
    else if (direction == "up"){

        if (edgeDetected()){
            newY = canvas.height - 20;
            newX = snake.body[0].X;
        }
        else{
        newY = snake.body[0].Y - 20;
        newX = snake.body[0].X;

        }

        snake.body.unshift(new Position(newX, newY));
    }
    else if (direction == "right"){

        if (edgeDetected()){
            newY = snake.body[0].Y;
            newX = 0;
        }
        else{
        newY = snake.body[0].Y;
        newX = snake.body[0].X + 20;

        }

        snake.body.unshift(new Position(newX, newY));
    }
    else if (direction == "down"){

        if (edgeDetected()){
            newY = 0;
            newX = snake.body[0].X;
        }
        else{
        newY = snake.body[0].Y + 20;
        newX = snake.body[0].X;

        }

        snake.body.unshift(new Position(newX, newY));
    }
}

function drawSnake(){

    // The first element in the array (the head) should always have opacity 1 And the last element should always have
    // opacity around 0.25 (Because lower values in opacity aren't visible enough). The value of the rest of the elements
    // depend on how long the snake is. It's important though that the values are equally spaced, so that you get that
    // smooth toning effect once the snake gets longer.

    /* To acheive this we set the opacity of the head of the snake to 1, then calculate how big of a jump in values we
    need to make between each element in order to end up at the last element with a value of around 0.25.
    Then we loop through the elements, and for each loop subtract that "jumpValue" to the opacity value*/

    /* For my own memory the jump value is calculated by taking the value I want to start with "1", subtract that by the
    value I want to end up with "0,25". Then devide that value by snake.length - 1.*/

    canvasContent.beginPath();
    canvasContent.fillStyle = "rgba(" + snake.color + "1)";
    canvasContent.fillRect(snake.body[0].X, snake.body[0].Y,20,20);
    let jumpValue = 0.75  / (snake.body.length -1);
    let opacity = 1 - jumpValue;

    for (let i = 1; i < snake.body.length; i++){
        canvasContent.beginPath();
        canvasContent.fillStyle = "rgba(" + snake.color + opacity +")";
        // First two values are the position and the other two are the size. So this writes out the snake at the positions in the
        // array in the correct size.
        canvasContent.fillRect(snake.body[i].X,snake.body[i].Y,20,20);
        opacity -= jumpValue;
    }
}



// Treats and powerups
class PowerUp{
    constructor(position, activated, timeLimit){
        this.position = position;
        this.activated = activated;
        this.timeLimit = timeLimit;
    }
}

// Setting a dummy position for the powerUp just for now. Then adding the other values needed. 
var powerUp = new PowerUp(new Position(0,0), false, 10000); 

// The position of the first treat. 
let treatPosition = new Position(210, 70);

function drawTreat(){

    // The position of the treat will change appearance depending on your score. 
    if (score < 100){
        canvasContent.beginPath();

        // Getting the image from an html-element, then drawing that image at the correct position.
        canvasContent.drawImage(bubble, treatPosition.X - 12.5, treatPosition.Y -12.5, 25, 25);
    }
    else if (score < 200){
        canvasContent.beginPath();
        canvasContent.fillStyle = "rgba(255,255,255,0.8)";
        canvasContent.arc(treatPosition.X, treatPosition.Y,12.5,0,2*Math.PI);
        canvasContent.fill();
    }
    else{
        canvasContent.beginPath();
        bubble.src = "Images/treat1.png";

        // The treat also needs to change appearance if the snake is invincible.
        if (snake.invincible){
            canvasContent.filter = "invert(100%)";
        }
        
        canvasContent.drawImage(bubble, treatPosition.X - 12.5, treatPosition.Y -12.5, 25, 25);
        canvasContent.filter = "invert(0%)";
    }
}

function drawPowerUp(){
    
    canvasContent.beginPath();
    let img = document.getElementById("powerUp");
    canvasContent.drawImage(img, powerUp.position.X - 12.5, powerUp.position.Y -12.5, 25, 25);

}



// Direction
let direction = "right";

    /* The thought behind the directionArray is this: Look at the processNewDirection-method below. 
    It stops you from going left if your current direction is right. This way, you won't instantly eat yourself. 
    However, I can get around that by quickly pressing up and then left. If I do it quickly the snake won't have time
    to move up, but the current direction will still be registered as up, meaning that it will allow the snake to
    go left, even if the actual direction still is right. Saving both keys will force the snake to go up before it
    goes left. At the same time your timing won't matter. You will not have to wait for the right timing to first press
    up then left. You can just press the buttons and the snake will move accordingly.  
     */
let directionArray = [];

    // Taking the desired direction and compare it with the current.
    // Ex: You cannot go right when the current directions is left since the
    // snake will instantly collide with it's own body.
function processNewDirection(newDirection){

        if (newDirection == "left" && (direction == "up" || direction == "down")){
            direction = "left";
        }
        else if (newDirection == "up" && (direction == "left" || direction == "right")){
            direction = "up";
        }
        else if (newDirection == "right" && (direction == "up" || direction == "down")){
            direction = "right";
        }
        else if (newDirection == "down" && (direction == "left" || direction == "right")){
            direction = "down";
        }
    
}



    // KeyEvents
document.onkeydown = function(e) {

    if(e.keyCode == 80 || e.keyCode == 32){
        changePauseState();
    }

    // As explained above, here we register the keys and add them to the directionArray. 
    // Limit is 2 directions saved at once. More isn't needed. 
    else if (directionArray.length < 2){
        if (e.keyCode == 37){
            
            directionArray.push("left");
            
        }
        else if (e.keyCode == 38){
            
            directionArray.push("up");
            
        }
        else if (e.keyCode == 39){
            
            directionArray.push("right");
            
        }
        else if (e.keyCode == 40){
            
            directionArray.push("down");
            
        }
    }
   
    
};


    // Touchevents. 

// First we check where the user first put their finger. Then we compare that XY position
// with the XY positions registered while swiping in order to figure out what direction the finger is going. 
let XStart;
let YStart;

document.ontouchstart = function(e){
    XStart = e.touches[0].clientX;
    YStart = e.touches[0].clientY;
}

// Just pressing the screen without sliding (change the position of your finger) then it should pause. 
document.ontouchend = function(e){
    if (XStart == e.changedTouches[0].clientX && YStart == e.changedTouches[0].clientY){
        changePauseState();
    }
}

document.ontouchmove = function(e) {

    // Checking if the finger movement is horisontal. In other words, if the x-value has changed more than the y value has
    // compared to the start position.  
    if (Math.abs(e.touches[0].clientX - XStart) > Math.abs(e.touches[0].clientY - YStart)){

        // If the movement is horisontal, then in what direction is it going? If the number increases in relation to the start position then it's towards right. 
        if (directionArray.length < 2){
            if (e.touches[0].clientX > XStart){
                directionArray.push("right");
            }
            else{
                directionArray.push("left");
            }
        }
        
    }

    // Same but for the vertical movement. 
    else if (Math.abs(e.touches[0].clientY - YStart) > Math.abs(e.touches[0].clientX - XStart)){
        if (directionArray.length < 2){
            if (e.touches[0].clientY > YStart){
                directionArray.push("down");
            }
            else{
                directionArray.push("up");
            }
    }
    }
};


// Sounds
let eatSound = new Sound("/SnakeGame/Snakeaudio/eat.mp3");
let failSound = new Sound("/SnakeGame/Snakeaudio/failure.mp3");
let powerUpSound = new Sound("/SnakeGame/Snakeaudio/powerUp.mp3");

//This is a function constructor that will create a variable representing an 'invisible' <audio> element on the page.
//The audio element is then played in the script.js depending on different events.
function Sound(src) {
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



// Updates

  // Method for pausing
function changePauseState(){
    if (paused){
        paused = false;
        startNewInterval();
        
    }
    else{

        paused = true;

        // Stops the intervalForUpdate
        clearInterval(intervalFunction);

        // Writes out the text Paused when the game is... well... paused.
        canvasContent.font = "80px Calibri";
        canvasContent.fillStyle = "white";
        canvasContent.textAlign = "center";

        // This aligns the text in the middle. The above line is not enough.
        canvasContent.fillText("Paused", canvas.width / 2, canvas.height / 2 );
        
    }
}


function updateState() {

    // If a direction has been pressed then change to the direction pressed first and then delete that. 
    if (directionArray != 0){
        processNewDirection(directionArray[0]);
        directionArray.shift();
    }
    
    newSnakePosition();

    // Clears the canvas of all previous images.
    canvasContent.clearRect(0, 0, canvas.width, canvas.height);

    // If the snake found a treat, then skip snake.pop() once so that it get's longer.. Also
    // update the score, get a new position of treat, speed up the game slightly, and draw.
    // The x and y position of each rectangle of the snake is at the top left corner. The + 10
    // makes sure that it registers a fruit as eaten when approaching it head on, as opposed to
    // touching the side of the fruit.

    if (score % 200 == 0 && score != 0 && score != 200 && powerUp.activated == false){
        powerUp.position = getRandomPosition();
        powerUp.activated = true;

        setTimeout(function(){ 
            powerUp.activated = false;
            if (!snake.invincible){
                increaseScoreBy(10);
            }
            
        }, 10000);
    }

    // If it reaches a powerup then become invincible. 
    if (powerUp.position.X == snake.body[0].X + 10 && powerUp.position.Y == snake.body[0].Y + 10 && powerUp.activated){
        snake.becomeInvincible();
        powerUpSound.play();
        powerUp.activated = false;  
        increaseScoreBy(10);
    }

    // Here is what happens when the snakes reaches a treat. 
    if (treatPosition.X == snake.body[0].X + 10 && treatPosition.Y == snake.body[0].Y + 10){
        eatSound.play();
        increaseScoreBy(10);

        // Insert a new treat. 
        treatPosition = getRandomPosition();

        snake.increaseSpeed();
        drawSnake();
        drawTreat();

        updateBackground();
        startNewInterval();
    }

    else {
        snake.body.pop();
        drawSnake();
        drawTreat();
    }

    if (powerUp.activated == true){
        drawPowerUp();
    }

    checkCollision();
}

let videoPlaying = false;

function updateBackground(){
    // Makes the background change gradually each eaten fruit. If the opacity is is 0 meaning that
    // the video is fully visible then start making the video sharper and more colorful. After that
    // then change the color of the background. 

    if (score <= 100){
        backgroundOpacity -= 0.1;
        backgroundOpacity = Math.round(backgroundOpacity * 10) / 10;
        canvas.style.backgroundColor = "rgba(0, 0, 0, " + backgroundOpacity + ")";
    }
    else if (score <= 200){
        if (!videoPlaying){
            video.play();
            videoPlaying = true;
        }
        backgroundSaturation += 10;
        backgroundBlur -= 0.5;
        video.style.filter = "saturate("+ backgroundSaturation + "%) blur(" + backgroundBlur + "px)";
    }
    else if(score <= 400){
        backgroundHue += 10.5;
        video.style.filter = "hue-rotate(" + backgroundHue + "deg" + ")";
    }
}

function edgeDetected(){
    // In order to detect if the snake should be appearing on the opposite side of the canvas we need
    // both position and direction. You can for example move parallell with the right edge and press left
    // and that shouldn't do anything. So need to be by the edge and still going towards it.

    if (snake.body[0].X <= 0 && direction == "left"){

        return true;
    }

    else if (snake.body[0].X >= canvas.width - 20 && direction == "right"){
        return true;
    }

    else if (snake.body[0].Y <= 0 && direction == "up"){
        return true;
    }

    else if (snake.body[0].Y >= canvas.height - 20 && direction == "down"){

        return true;
    }


    else{
        return false;
    }
}

function checkCollision(){

    // Loops through all the body parts of the snake, except the head and checks if the head is
    // in the same position as either of these parts. If so then Game over.
    if (!snake.invincible){
        for (let i = 1; i < snake.body.length; i++){
            if (snake.body[0].X == snake.body[i].X && (snake.body[0].Y == snake.body[i].Y)){
                failSound.play();
                gameOver();
            }               
        }
    }

    
}

function gameOver(){
    // Display gameOver graphics and take input from user. 
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("myForm").style.display = "block";
    document.getElementById("totalPoints").textContent = "You've got " + score + " points";
    
    clearInterval(intervalFunction);
    
    document.addEventListener('keypress', function(e){
        let key = e.which || e.keyCode;
        
        if(key == 13){
            e.preventDefault();
            name = document.getElementById('userName').value;
            addPlayer(name, score);
        }
    })
}

// This is what makes the snake move forward automatically. The state is updated through an interval. 
// But if it's paused, then nothing happens.  
function startNewInterval(){
    if (!paused){

        clearInterval(intervalFunction)
        intervalFunction = setInterval(function(){

            updateState();

    }, snake.speed);

    }
}

// Call methods on start
drawSnake();
startNewInterval();
