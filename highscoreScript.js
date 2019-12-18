import{updateHighScore} from './highScoreModule.js';

updateHighScore();

document.getElementById('backToStart').onclick = function() {window.location.href = "game.html";}