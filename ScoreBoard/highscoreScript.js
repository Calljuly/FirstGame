import{sortHighScoreList, updateHighScore} from '../highScoreModule.js';

ref.once('value', function(data){
    var arr = [];
    var scores = data.val();
    var keys = Object.keys(scores);
    for(let i = 0; i < keys.length; i++ ){
        var k = keys[i];
        var name = scores[k].name;
        var score = scores[k].score;
        arr.push({nameKey: name, scoreKey: score})
    }
    sortHighScoreList(arr);
    updateHighScore(arr);
})