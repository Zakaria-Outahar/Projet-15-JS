const video = document.querySelector('.video');
const btnPausePlay = document.getElementById('play-pause');
const imgPlayPause = document.querySelector('#play-pause img')
const barreOrange = document.querySelector('.barre-orange');
const juice = document.querySelector('.juice');
const muteBtn = document.getElementById('mute');
const fullScreen = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume-slider');

btnPausePlay.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

function togglePlayPause(){
    if(video.paused){
        imgPlayPause.src = "ressources/pause.svg";
        video.play();
    }
    else{
        imgPlayPause.src = "ressources/play.svg";
        video.pause();
    }
}


// la barre orange

video.addEventListener('timeupdate', () => {
    let juicePos = video.currentTime / video.duration;
    juice.style.width = `${juicePos * 100}%`;
    if(video.ended){
        imgPlayPause.src = "ressources/play.svg";
    }
})

// Volume

volumeSlider.addEventListener('change', () => {
    video.volume = volumeSlider.value / 100;
    if(video.volume === 0){
        muteBtn.innerText = "Unmute";
    } else{
        muteBtn.innerText = "Mute";
    }
})

// Mute

let volume;

muteBtn.addEventListener('click', () => {
    if(video.volume === 0){
        // video.muted = false;
        volumeSlider.value = volume;
        video.volume = volumeSlider.value / 100;
        muteBtn.innerText = "Mute";
    } else{
        // video.muted = true;
        volume = volumeSlider.value;
        volumeSlider.value = 0;
        video.volume = volumeSlider.value / 100;
        muteBtn.innerText = "Unmute";
    }
})

barreOrange.addEventListener('click', (e) => {
    let rect = barreOrange.getBoundingClientRect();
    let largeur = rect.width;
    let x = e.clientX - rect.left;

    let widthPercent = x*100 / largeur;
    let durationVideo = video.duration;

    video.currentTime = durationVideo * (widthPercent / 100);
})

// window.addEventListener('resize', () => {
//     rect = barreOrange.getBoundingClientRect();
//     largeur = rect.width;
// })

video.addEventListener('dblclick', () => {
    video.requestFullscreen();
})

fullScreen.addEventListener('click', () => {
    video.requestFullscreen();
})