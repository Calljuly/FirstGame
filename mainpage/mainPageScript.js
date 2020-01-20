
// This is the sound for the whole page. Using toggle 
const audioOn = function () {
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

}

audioOn();


// This is the sound for the menu
const menuSound=function(){

    const list = document.querySelectorAll('.sound');
    const audio = new Audio("/mainpage/audio/click.wav");
    

    list.forEach(link=>{

        link.addEventListener('mouseenter',()=>{

            audio.play();
        });

    });
}

menuSound();



