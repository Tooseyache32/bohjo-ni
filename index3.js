document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('.video-bg');
    if (document.hidden) video.pause();
    else video.play();
});
