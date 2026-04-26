let percent = document.getElementById("percent");
const preloader = document.getElementById("preloader");
const percentLoader = document.getElementById("percent-loader");
const Interval = setInterval(() => {
    if (percent >= 100) {
        percent = 100;
        clearInterval(Interval);

    }
    percentLoader.textContent = percent + '%';
}, 150);