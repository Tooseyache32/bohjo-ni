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
            loadSettings();
        }, 500);
    }
    loaderPercent.textContent = percent + '%';
}, 150);

function generateStars() {
    const starsContainer = document.getElementById('stars');
    const count = 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        starsContainer.appendChild(star);
    }
}
generateStars();

const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

document.querySelectorAll('button, a, .planet, .sun, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    document.getElementById('nebula1').style.transform = `translateY(${scrollY * 0.5}px)`;
    document.getElementById('nebula2').style.transform = `translateY(${scrollY * 0.3}px)`;
});

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 50;
    const y = (e.clientY / window.innerHeight - 0.5) * 50;
    document.getElementById('nebula1').style.transform = `translate(${x}px, ${y + scrollY * 0.5}px)`;
    document.getElementById('nebula2').style.transform = `translate(${-x}px, ${-y + scrollY * 0.3}px)`;
});

const speedSlider = document.getElementById('speedSlider');
const orbits = document.querySelectorAll('.orbit');
let currentSpeed = 100;

speedSlider.addEventListener('input', (e) => {
    currentSpeed = e.target.value;
    updateOrbitSpeed();
    localStorage.setItem('orbitSpeed', currentSpeed);
});

function updateOrbitSpeed() {
    orbits.forEach(orbit => {
        const baseDuration = parseFloat(orbit.dataset.speed);
        const newDuration = baseDuration * (100 / (currentSpeed || 1));
        orbit.style.animationDuration = newDuration + 's';
    });
}

function loadSettings() {
    const savedSpeed = localStorage.getItem('orbitSpeed');
    if (savedSpeed) {
        currentSpeed = savedSpeed;
        speedSlider.value = savedSpeed;
        updateOrbitSpeed();
    }
}

let isPaused = false;
const pauseBtn = document.getElementById('pauseBtn');

function togglePause() {
    isPaused = !isPaused;
    orbits.forEach(orbit => {
        orbit.style.animationPlayState = isPaused ? 'paused' : 'running';
    });
    pauseBtn.textContent = isPaused ? '▶' : '⏸';
    localStorage.setItem('isPaused', isPaused);
}

pauseBtn.addEventListener('click', togglePause);

if (localStorage.getItem('isPaused') === 'true') {
    togglePause();
}

let scale = 1;
const solarSystem = document.getElementById('solarSystem');

document.getElementById('zoomIn').addEventListener('click', () => {
    scale = Math.min(scale + 0.2, 2);
    updateScale();
});

document.getElementById('zoomOut').addEventListener('click', () => {
    scale = Math.max(scale - 0.2, 0.5);
    updateScale();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    scale = 1;
    updateScale();
});

function updateScale() {
    solarSystem.style.transform = `translate(-50%, -50%) scale(${scale})`;
    localStorage.setItem('solarScale', scale);
}

const savedScale = localStorage.getItem('solarScale');
if (savedScale) {
    scale = parseFloat(savedScale);
    updateScale();
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalInfo = document.getElementById('modalInfo');
let scene, camera, renderer, planetMesh, animationId;

document.querySelectorAll('.planet, .sun').forEach(planet => {
    planet.addEventListener('click', () => openModal(planet));
});

function openModal(element) {
    const name = element.dataset.name;
    const type = element.dataset.type;
    const temp = element.dataset.temp;
    const desc = element.dataset.desc;

    modalTitle.textContent = name;
    modalInfo.innerHTML = `
                <div class="info-card">
                    <div class="info-label">Тип</div>
                    <div class="info-value">${type}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Температура</div>
                    <div class="info-value">${temp}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Описание</div>
                    <div class="info-value">${desc}</div>
                </div>
            `;

    modal.classList.add('active');

    setTimeout(() => initThreeJS(name), 100);
}

function initThreeJS(planetName) {
    const container = document.getElementById('canvas-container');
    container.innerHTML = '';

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    let color = 0x4a90e2;

    if (planetName === 'Солнце') color = 0xffd700;
    else if (planetName === 'Меркурий') color = 0xa0a0a0;
    else if (planetName === 'Венера') color = 0xffd700;
    else if (planetName === 'Земля') color = 0x4a90e2;
    else if (planetName === 'Марс') color = 0xff6b6b;
    else if (planetName === 'Юпитер') color = 0xd4a574;
    else if (planetName === 'Сатурн') color = 0xf4d03f;
    else if (planetName === 'Уран') color = 0x7de3f4;
    else if (planetName === 'Нептун') color = 0x4169e1;

    const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: planetName === 'Солнце' ? 0xff8c00 : 0x000000,
        shininess: 100,
        wireframe: false
    });

    planetMesh = new THREE.Mesh(geometry, material);
    scene.add(planetMesh);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    if (planetName === 'Солнце') {
        const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glow);
    }

    camera.position.z = 5;

    function animate() {
        animationId = requestAnimationFrame(animate);
        planetMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function closeModal() {
    modal.classList.remove('active');
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function updateProgress() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    const filled = Array.from(inputs).filter(i => i.value.length > 0).length;
    const percent = (filled / inputs.length) * 100;
    document.getElementById('progressBar').style.width = percent + '%';

    const formData = {
        name: document.getElementById('nameInput').value,
        email: document.getElementById('emailInput').value,
        message: document.getElementById('msgInput').value
    };
    localStorage.setItem('contactForm', JSON.stringify(formData));
}

const savedForm = localStorage.getItem('contactForm');
if (savedForm) {
    const data = JSON.parse(savedForm);
    document.getElementById('nameInput').value = data.name || '';
    document.getElementById('emailInput').value = data.email || '';
    document.getElementById('msgInput').value = data.message || '';
    updateProgress();
}

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('nameInput').value,
        email: document.getElementById('emailInput').value,
        message: document.getElementById('msgInput').value
    };

    emailjs.send('service_52psn9m', 'template_5zrjr9x', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
    })
        .then(function () {
            alert('Сообщение успешно отправлено!');
            localStorage.removeItem('contactForm');
            document.getElementById('contactForm').reset();
            updateProgress();
        }, function (error) {
            console.error('Ошибка отправки:', error);
            alert('Ошибка отправки. Попробуйте позже.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});


function toggleContact() {
    document.getElementById('contactSection').classList.toggle('visible');
}

document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('videoBg');
    if (document.hidden) {
        video.pause();
        if (!isPaused) {
            orbits.forEach(orbit => orbit.style.animationPlayState = 'paused');
        }
    } else {
        video.play();
        if (!isPaused) {
            orbits.forEach(orbit => orbit.style.animationPlayState = 'running');
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById('contactSection').classList.remove('visible');
    }
    if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
    }
    if (e.key === '+' || e.key === '=') {
        document.getElementById('zoomIn').click();
    }
    if (e.key === '-') {
        document.getElementById('zoomOut').click();
    }
    if (e.key.toLowerCase() === 'r') {
        document.getElementById('resetBtn').click();
    }
    if (e.key.toLowerCase() === 'c') {
        toggleContact();
    }
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}