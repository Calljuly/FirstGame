import{updateHighScore} from '../highScoreModule.js';

const query = firebase.database().ref('scores')
        .orderByChild('score')
        .limitToLast(10);


query.once('value', function (snapshot) {
   var tempArr = [];
    snapshot.forEach(function (childSnapshot) {    
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        tempArr.push(childData);
    });
    tempArr.reverse();
    updateHighScore(tempArr);
});