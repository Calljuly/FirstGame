import{highscoreModule} from '../highScoreModule.js';

//Creating a query to our database, requesting data from our 'scores' database, asking firebase to sort
//the data according to the 'score' entries (it will be sorted in ascending order) and requesting the last
//10 (to get the top 10 scores)
const query = firebase.database().ref('scores')
        .orderByChild('score')
        .limitToLast(10);


//Using the 'once' method to process the data from our query. The 'snapshot' represents the entire data
//from the query. Then we use a foreach() to loop through the seperate keys in the snapshot, represented 
//by childsnapshot. childsnapshot.val() extracts the actual object we have stored in that specific key
//and so we can push the entire object into the tempArr. Lastly we reverse the tempArr to get the scores 
//In right order and then we use highscoreModules.updateHighScore() to build the highscore table.
query.once('value', function (snapshot) {
   let tempArr = [];
    snapshot.forEach(function (childSnapshot) {
        let childData = childSnapshot.val();
        tempArr.push(childData);
    });
    tempArr.reverse();
    highscoreModule.updateHighScore(tempArr);
});