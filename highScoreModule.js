//Variabler
let highScoreList = [];
let count = 1;

//Set or get localStorage
if(localStorage.getItem("score")== null)
{
    localStorage.setItem("score", JSON.stringify(highScoreList));
}
else
{
    highScoreList = JSON.parse(localStorage.getItem("score"));
}

//Class to create player
export class Player 
{
    constructor(name, score)
    {
        this.name = name;
        this.score = score;
    }
}

//Add player to highScoreList
export function addPlayer(name, points)
{
    if(name.length == ""){
        alert("User name can't be empty");
    }
    else{
        highScoreList.push(new Player(name, Number(points)));
        
        sortHighScoreList(highScoreList);
        localStorage.setItem("score", JSON.stringify(highScoreList));
        
        window.location.href = "/ScoreBoard/Score.html";
    }

    
}
//Sorting highScoreList based on players score
function sortHighScoreList(points) 
{
    points.sort((a, b) => (a.score < b.score) ? 1 : -1)
}

//Insert row, cells and information to highScore table
function insertToBoard(name, score)
{
    let tableScore = document.getElementById('scoreList');
    let currentRow;
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
    
    
    let cell1 = currentRow.insertCell(0);
    let cell2 = currentRow.insertCell(1);
    let cell3 = currentRow.insertCell(2);
    cell1.textContent = name;
    cell2.textContent = score;
    cell3.textContent = 1;
    count++;
}

//Get array from storage and create the highscorelist with table
export function updateHighScore()
{
    $("#scoreList tr").next().remove(); 
    count = 1;
    var arrayFromStorage = JSON.parse(localStorage.getItem("score"));

    for(let p in arrayFromStorage)
    {
        insertToBoard(arrayFromStorage[p].name, arrayFromStorage[p].score, arrayFromStorage[p].time);
    }
}
