//Variabler
let count = 1;

//Add player to highScoreList
export function addPlayer(name, points)
{
    if(name.length == ""){
        alert("User name can't be empty");
    }
    else{
        var date = getDateInDesiredFormat();
        ref.push({name: name, score: points, date: date});
        window.location.href = "/ScoreBoard/Score.html";
    }

    
}

function getDateInDesiredFormat(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var today = dd + '/' + mm + '/' + yyyy;
    
    return today;
}
//Sorting highScoreList based on players score
export function sortHighScoreList(arr) 
{
    arr.sort((a, b) => (a.score < b.score) ? 1 : -1)
}

//Insert row, cells and information to highScore table
function insertToBoard(name, score, date)
{
    let tableScore = document.getElementById('scoreList');
    let currentRow = tableScore.insertRow(count);
    if(count == 1)
    {
        currentRow.style.backgroundColor ="#ffd700";
        currentRow.style.color = 'black';
    } 
    else if(count == 2)
    {
        currentRow.style.backgroundColor ="#c0c0c0";
        currentRow.style.color = 'black';
    }
    else if(count == 3)
    {
        currentRow.style.backgroundColor ="#cd7f32";
        currentRow.style.color = 'black';
    }
    else{
        currentRow = tableScore.insertRow(count);
    }
    
    
    let cell1 = currentRow.insertCell(0);
    let cell2 = currentRow.insertCell(1);
    let cell3 = currentRow.insertCell(2);
    cell1.textContent = name;
    cell2.textContent = score;
    cell3.textContent = date;
    count++;
}

//Get array from database and create the highscorelist with table
export function updateHighScore(arr)
{
    $("#scoreList tr").next().remove(); 
    count = 1;

    for(let p in arr)
    {
        insertToBoard(arr[p].name, arr[p].score, arr[p].date);
    }
}
