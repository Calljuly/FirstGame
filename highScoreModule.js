//Variabler
let count = 1;

//Add player to highScoreList
export function addPlayer(name, points)
{
    if(name.length == ""){
        alert("User name can't be empty");
    }
    else{
        let date = getDateInDesiredFormat();
        database.push({name: name, score: points, date: date});
        window.location.href = "/ScoreBoard/Score.html";
    }

    
}

function getDateInDesiredFormat(){
    //current date
    let currentTime = new Date();
    
    //extracting day, month, year. Adding 1 to month since january starts at 0.
    let dd = currentTime.getDate();
    let mm = currentTime.getMonth() + 1;
    let yyyy = currentTime.getFullYear();
    
    //adding 0 before dd and mm if its less than 10 so format becomes 01/01/2020 instead of 1/1/2020
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    
    let currentTimeFormatted = dd + '/' + mm + '/' + yyyy;
    
    return currentTimeFormatted;
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
