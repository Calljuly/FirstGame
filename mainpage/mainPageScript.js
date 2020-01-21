
// This is the sound for the whole page. Using toggle 
const audioOn = function () {
    // get the div id
    const audioMode = document.getElementById('audioMode');
    // get the audio file
    const audio = new Audio("/mainpage/audio/spacemusic.wav");

    // toggle the button

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

}

audioOn();


// This is the sound for the menu
const menuSound = function () {

    // Get the div
    const list = document.querySelectorAll('.sound');
    // Get the video file
    const audio = new Audio("/mainpage/audio/click.wav");    

    // loop through the links and let it play the sound
    list.forEach(link => {

        link.addEventListener('mousedown',() => {
                audio.play();          
        });
    });
}

menuSound();



