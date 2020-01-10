import{highscoreModule} from '../highScoreModule.js';

const query = firebase.database().ref('scores')
        .orderByChild('score')
        .limitToLast(10);


query.once('value', function (snapshot) {
   let tempArr = [];
    snapshot.forEach(function (childSnapshot) {
        let childData = childSnapshot.val();
        tempArr.push(childData);
    });
    tempArr.reverse();
    highscoreModule.updateHighScore(tempArr);
});