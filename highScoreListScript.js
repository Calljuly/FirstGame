//Variabler
var highScoreList = new Array();
var choosenName;
var count = 1;
var startBTN = document.getElementById('startButton');
var submittBTN = document.getElementById('submittBTN');
var deleteBTN = document.getElementById('deleteBTN');

//Set or get localStorage
if(localStorage.getItem("score")== null)
{
    localStorage.setItem("score", JSON.stringify(highScoreList));
}
else
{
    highScoreList = JSON.parse(localStorage.getItem("score"));
}

//Get data sent from user to add to scoreboard
if(localStorage.getItem("data") != null)
{
    var data = JSON.parse(localStorage.getItem('data'));
    var name = data[0];
    var scorePlay = data[1];

    highScoreList.push(new Player(name, scorePlay,1));
        
    sortHighScoreList(highScoreList);
    localStorage.setItem("score", JSON.stringify(highScoreList));
    updateHighScore();
    localStorage.removeItem("data");
}

updateHighScore();

//Class to create player
class Player 
{
    constructor(name, score, time)
    {
        this.name = name;
        this.score = score;
        this.time = time;
    }
}

deleteBTN.onclick = function()
{
    localStorage.removeItem("score");

}
//Show form to enter name
startBTN.onclick = function()
{
    $('#myForm').show();
}
//Add name and points to player and add to highScore
submittBTN.onclick = function()
{
    choosenName = document.getElementById('userName').value;
    var myTest = document.getElementById('userPoint').value;

    if(choosenName =="")
    {
        alert('Invallid name');
    }
    else
    {
        $('#myForm').hide();

        highScoreList.push(new Player(choosenName, Number(myTest),1));
        
        sortHighScoreList(highScoreList);
        localStorage.setItem("score", JSON.stringify(highScoreList));
        updateHighScore();
    }
}
//Sorting Array of players by thier score
function sortHighScoreList(points) 
{
    points.sort((a, b) => (a.score < b.score) ? 1 : -1)
}

//Insert row, cells and their information
function insertToBoard(name, score, time)
{
    var tableScore = document.getElementById('scoreList');
    var currentRow;
    if(count == 1)
    {
        currentRow = tableScore.insertRow(count);
        currentRow.style.backgroundColor ="#ffd700";
    } 
    else if(count == 2)
    {
        currentRow = tableScore.insertRow(count);
        currentRow.style.backgroundColor ="#c0c0c0";
    }
    else if(count == 3)
    {
        currentRow = tableScore.insertRow(count);
        currentRow.style.backgroundColor ="#cd7f32";
    }
    else{
        currentRow = tableScore.insertRow(count);
    }
    
    
    var cell1 = currentRow.insertCell(0);
    var cell2 = currentRow.insertCell(1);
    var cell3 = currentRow.insertCell(2);
    cell1.textContent = name;
    cell2.textContent = score;
    cell3.textContent = time;
    count++;
}

//Get array from storage and create the highscorelist with table
function updateHighScore()
{
    $("#scoreList tr").next().remove(); 
    count = 1;
    var arrayFromStorage = JSON.parse(localStorage.getItem("score"));

    for(var p in arrayFromStorage)
    {
        insertToBoard(arrayFromStorage[p].name, arrayFromStorage[p].score, arrayFromStorage[p].time);
    }
}
