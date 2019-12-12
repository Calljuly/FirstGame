var highScoreList = new Array();
var choosenName;
var count = 1;
var startBTN = document.getElementById('startButton');
var showScoreBTN = document.getElementById('showScore');
var submittBTN = document.getElementById('submittBTN');
var deleteBTN = document.getElementById('deleteBTN');

class Player 
{
    constructor(name, score, time)
    {
        this.name = name;
        this.score = score ;
        this.time = time;
    }
}
deleteBTN.onclick = function(){
    localStorage.removeItem("score");

}
startBTN.onclick = function()
{
    $('#myForm').show();
}
submittBTN.onclick = function()
{

    choosenName = document.getElementById('userName').value;
    var myTest = document.getElementById('userPoint').value;
    if(choosenName == null || choosenName == undefined){
        alert('Invallid name');
    }
    
    $('#myForm').hide();

    highScoreList.push(new Player(choosenName, Number(myTest),1));
    
    localStorage.setItem("score", highScoreList);
    sortHighScoreList(highScoreList);
    updateHighScore();
}

function sortHighScoreList(points) 
{
    points.sort((a, b) => (a.score < b.score) ? 1 : -1)
}

function insertToBoard(name, score, time)
{
    var tableScore = document.getElementById('scoreList'); 
    var currentRow = tableScore.insertRow(count);
    var cell1 = currentRow.insertCell(0);
    var cell2 = currentRow.insertCell(1);
    var cell3 = currentRow.insertCell(2);
    cell1.textContent = name;
    cell2.textContent = score;
    cell3.textContent = time;
    count++;
}

function updateHighScore()
{
    $("#scoreList tr").next().remove(); 
    count = 1;
    var ww = localStorage.getItem("score");
    alert(ww[0]);

    for(var p in ww)
    {
        insertToBoard(ww[p].name, ww[p].score, ww[p].time);
    }
}
