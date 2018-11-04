'use strict'

let video = document.querySelector('video');
let play_pause = document.querySelector('#play-pause');
let seek_bar = document.querySelector('.progress');
let buffer_bar = document.querySelector('.buffer-bar');
let progress_bar = document.querySelector('.progress-bar');
let buffer_screen = document.querySelector('#buffer-screen');
let video_time_remaining = document.querySelector('#video-time');


const ConvertToHMS = d => {
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}


play_pause.addEventListener('click', e => {
    if(video.paused) {
        video.play();
        play_pause.className = 'fas fa-pause';
    } else {
        video.pause();
        play_pause.className = 'fas fa-play'
    }
})

video.addEventListener('timeupdate', e => {
    seek_bar.style.width = (video.currentTime / video.duration) * 100 + '%';
    buffer_bar.style.width = (video.buffered.end(0) / video.duration) * 100 + '%';
    video_time_remaining.innerHTML = ConvertToHMS(video.currentTime)
})

video.onwaiting = () => {
    if (video.ended) {
        buffer_screen.className = 'no-buffer-screen';
    } else {
        buffer_screen.className = 'buffer-screen';
    }
    console.log('waiting')
}

video.onplaying = () => {
    buffer_screen.className = 'no-buffer-screen';
    console.log('Playing');
}

video.onended = () => {
    play_pause.className = 'fas fa-play'
}

progress_bar.addEventListener('click', e => {
    var rect = progress_bar.getBoundingClientRect();    // event propagation 
    var clickPos = ((e.clientX - rect.left) / rect.width) * 100;
    let seekPos = (video.duration / 100) * clickPos;

    video.currentTime = seekPos;
    console.log(video.currentTime)
})