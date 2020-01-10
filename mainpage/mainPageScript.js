
const audioMode = document.getElementById('audioMode');
const audio = new Audio("/mainpage/audio/spacemusic.wav");

audioMode.addEventListener('click', () => {
    if (audio.paused) {

        audio.play();
        document.getElementById("audioImg").src = "/mainpage/mainImages/on.png";
    }
    else {

        audio.pause();
        document.getElementById("audioImg").src = "/mainpage/mainImages/mute.png";


    }

});

