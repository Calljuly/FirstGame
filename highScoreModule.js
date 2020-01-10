//Here we have implemented a module pattern to encasulate all code concering the highscore list. All functionality concerning the highscorelist is put in the variable highscoreModule.
//The highscoreModule itsel'f concists of a function that is immediatly executed upon decleration. The function returns an object with the two functions
//that we want other parts of our program to be able to access (addPlayer, updatehighScore), keeping everything else private within the function itself (we have prepended
//all private members with a _underscore). This returned object is what is actually kept in the highscoreModule. We export the highscoreModule and so we can import it and use the
//functionality in other parts of or program.

export let highscoreModule = (function(){
    //Variabler
    let _count = 1;
    
    //Add player to highscore database
    function addPlayer(name, points)
    {
        if(name.length == ""){
            alert("User name can't be empty");
        }
        else{
            let date = _getDateInDesiredFormat();
            database.push({name: name, score: points, date: date});
            window.location.href = "/ScoreBoard/Score.html";
        }    
    }
    
    //Takes an array and creates the highscorelist from that array
    function updateHighScore(arr)
    {
        $("#scoreList tr").next().remove(); 
        _count = 1;
    
        for(let p in arr)
        {
            _insertToBoard(arr[p].name, arr[p].score, arr[p].date);
        }
    }

    //This function creates and returnes a current date in desired format of DD/MM/YYYY 
    function _getDateInDesiredFormat(){
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

    //Insert row, cells and information to highScore table, also coloring the first three rows as "gold", "silver" and "bronz".
    function _insertToBoard(name, score, date)
    {
        let tableScore = document.getElementById('scoreList');
        let currentRow = tableScore.insertRow(_count);
        if(_count == 1)
        {
            currentRow.style.backgroundColor ="#ffd700";
            currentRow.style.color = 'black';
        } 
        else if(_count == 2)
        {
            currentRow.style.backgroundColor ="#c0c0c0";
            currentRow.style.color = 'black';
        }
        else if(_count == 3)
        {
            currentRow.style.backgroundColor ="#cd7f32";
            currentRow.style.color = 'black';
        }
        else{
            currentRow = tableScore.insertRow(_count);
        }
        
        
        let cell1 = currentRow.insertCell(0);
        let cell2 = currentRow.insertCell(1);
        let cell3 = currentRow.insertCell(2);
        cell1.textContent = name;
        cell2.textContent = score;
        cell3.textContent = date;
        _count++;
    }

    //Returning an object with the functionality we want other parts of our program to be able to use.
    return {
        addplayer: addPlayer,
        updateHighScore: updateHighScore
    }

}());





