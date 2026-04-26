let percent = 0;
const preloader = document.getElementById('preloader');
const loaderPercent = document.getElementById('loaderPercent');

const loadInterval = setInterval(() => {
    percent += Math.floor(Math.random() * 10) + 5;
    if (percent >= 100) {
        percent = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
    loaderPercent.textContent = percent + '%';
}, 150);

function createStars() {
    const container = document.getElementById('stars');
    const count = 200;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

createStars();