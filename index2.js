const galaxiesData = [
    {
        id: 1,
        name: "Млечный Путь",
        type: "spiral",
        typeName: "Спиральная",
        distance: "0 св. лет",
        diameter: "100,000 св. лет",
        stars: "100-400 миллиардов",
        mass: "1.5 триллиона M☉",
        age: "13.6 млрд лет",
        description: "Наша родная галактика. Представляет собой barred спиральную галактику с перемычкой, содержащую Солнечную систему примерно в 26,000 световых лет от центра.",
        features: "Имеет четыре основных спиральных рукава и сверхмассивную чёрную дыру Стрелец A* в центре."
    },
    {
        id: 2,
        name: "Андромеда",
        type: "spiral",
        typeName: "Спиральная",
        distance: "2.537 млн св. лет",
        diameter: "220,000 св. лет",
        stars: "1 триллион",
        mass: "1.5 триллиона M☉",
        age: "10 млрд лет",
        description: "Ближайшая крупная галактика к Млечному Пути. Приближается к нам со скоростью 110 км/с и столкнётся с Млечным Путём через 4.5 миллиарда лет.",
        features: "Имеет двойное ядро и более 20 известных спутников."
    },
    {
        id: 3,
        name: "Туманность Андромеды",
        type: "elliptical",
        typeName: "Эллиптическая",
        distance: "2.48 млн св. лет",
        diameter: "6,000 св. лет",
        stars: "~10 миллиардов",
        mass: "100 млн M☉",
        age: "10 млрд лет",
        description: "Спутник галактики Андромеда, эллиптическая карликовая галактика. Одна из самых ярких спутниковых галактик.",
        features: "Содержит много старых звёзд и почти лишена межзвёздного газа."
    },
    {
        id: 4,
        name: "Большое Магелланово Облако",
        type: "irregular",
        typeName: "Неправильная",
        distance: "163,000 св. лет",
        diameter: "14,000 св. лет",
        stars: "30 миллиардов",
        mass: "10 млрд M☉",
        age: "3 млрд лет",
        description: "Крупнейший спутник Млечного Пути. Активно формирует новые звёзды, содержит гигантскую звёздную ассоциацию Тарантул.",
        features: "Содержит сверхгигантскую звезду R136a1 — самую массивную известную звезду."
    },
    {
        id: 5,
        name: "Малое Магелланово Облако",
        type: "irregular",
        typeName: "Неправильная",
        distance: "200,000 св. лет",
        diameter: "7,000 св. лет",
        stars: "3 миллиарда",
        mass: "2 млрд M☉",
        age: "7-8 млрд лет",
        description: "Второй по величине спутник Млечного Пути. Соединён с Большим Магеллановым Облаком мостом из газа.",
        features: "Одна из самых удалённых галактик, видимых невооружённым глазом."
    },
    {
        id: 6,
        name: "Галактика Треугольника",
        type: "spiral",
        typeName: "Спиральная",
        distance: "2.73 млн св. лет",
        diameter: "60,000 св. лет",
        stars: "40 миллиардов",
        mass: "50 млрд M☉",
        age: "11 млрд лет",
        description: "Третья по величине галактика в Местной группе. Не имеет связи с центральной сверхмассивной чёрной дырой.",
        features: "Содержит одно из крупнейших известных областей звездообразования NGC 604."
    },
    {
        id: 7,
        name: "Галактика Кольцо",
        type: "ring",
        typeName: "Кольцевая",
        distance: "600 млн св. лет",
        diameter: "150,000 св. лет",
        stars: "~100 миллиардов",
        mass: "100 млрд M☉",
        age: "~10 млрд лет",
        description: "Уникальная галактика с почти идеальным кольцом ярких молодых звёзд. Результат столкновения двух галактик.",
        features: "Кольцевая структура расширяется со скоростью 100 км/с."
    },
    {
        id: 8,
        name: "Галактика Мессье 87",
        type: "elliptical",
        typeName: "Эллиптическая",
        distance: "53 млн св. лет",
        diameter: "120,000 св. лет",
        stars: "~1 триллион",
        mass: "2.4 триллиона M☉",
        age: "~13 млрдз лет",
        description: "Гигантская эллиптическая галактика. Содержит первую в истории сфотографированную чёрную дыру (2019 год).",
        features: "Сверхмассивная чёрная дыра массой 6.5 миллиардов масс Солнца."
    }
];

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
            document.querySelectorAll('.galaxy-card').forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 100);
            });
        }, 500);
    }
    loaderPercent.textContent = percent + '%';
}, 150);

function generateStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
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

document.querySelectorAll('button, a, .galaxy-card, .favorite-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.getElementById('nebula1').style.transform = `translateY(${scrollY * 0.5}px)`;
    document.getElementById('nebula2').style.transform = `translateY(${scrollY * 0.3}px)`;
    document.getElementById('nebula3').style.transform = `translateY(${scrollY * 0.7}px)`;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressTop').style.width = scrolled + '%';
});

let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
updateFavCount();

function toggleFavorite(e, id) {
    e.stopPropagation();
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavCount();
    renderGalaxies(currentFilter);
}

function updateFavCount() {
    document.getElementById('favCount').textContent = favorites.length;
}

function showFavorites() {
    if (favorites.length === 0) {
        alert('У вас пока нет избранных галактик!');
        return;
    }
    renderGalaxies('favorites');
}

let currentFilter = 'all';
const grid = document.getElementById('galaxiesGrid');

function createGalaxyVisual(type) {
    let className = '';
    switch (type) {
        case 'spiral': className = 'spiral-galaxy'; break;
        case 'elliptical': className = 'elliptical-galaxy'; break;
        case 'irregular': className = 'irregular-galaxy'; break;
        case 'ring': className = 'ring-galaxy'; break;
        default: className = 'spiral-galaxy';
    }
    return `<div class="${className}"></div>`;
}

function renderGalaxies(filter = 'all') {
    currentFilter = filter;
    grid.innerHTML = '';

    let filtered = filter === 'all' ? galaxiesData :
        filter === 'favorites' ? galaxiesData.filter(g => favorites.includes(g.id)) :
            galaxiesData.filter(g => g.type === filter);

    filtered.forEach((galaxy, index) => {
        const card = document.createElement('div');
        card.className = 'galaxy-card';
        if (favorites.includes(galaxy.id)) card.classList.add('favorite');

        card.innerHTML = `
            <div class="galaxy-visual">
                ${createGalaxyVisual(galaxy.type)}
            </div>
            <div class="galaxy-info">
                <span class="galaxy-type">${galaxy.typeName}</span>
                <h3>${galaxy.name}</h3>
                <div class="galaxy-distance">${galaxy.distance}</div>
            </div>
            <button class="favorite-btn ${favorites.includes(galaxy.id) ? 'active' : ''}" 
                    onclick="toggleFavorite(event, ${galaxy.id})" title="В избранное">
                ${favorites.includes(galaxy.id) ? '★' : '☆'}
            </button>
        `;

        card.addEventListener('click', () => openModal(galaxy));
        grid.appendChild(card);

        setTimeout(() => card.classList.add('visible'), index * 100);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        renderGalaxies(btn.dataset.filter);
    });
});

const modal = document.getElementById('modal');
let scene, camera, renderer, galaxyMesh, animationId;

function openModal(galaxy) {
    document.getElementById('modalTitle').textContent = galaxy.name;

    document.getElementById('modalInfo').innerHTML = `
        <div class="info-item">
            <div class="info-label">Тип</div>
            <div class="info-value">${galaxy.typeName}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Расстояние</div>
            <div class="info-value">${galaxy.distance}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Диаметр</div>
            <div class="info-value">${galaxy.diameter}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Звёзд</div>
            <div class="info-value">${galaxy.stars}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Масса</div>
            <div class="info-value">${galaxy.mass}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Возраст</div>
            <div class="info-value">${galaxy.age}</div>
        </div>
    `;

    document.getElementById('modalDesc').innerHTML = `
        <p>${galaxy.description}</p>
        <h4>Особенности</h4>
        <p>${galaxy.features}</p>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => initThreeJS(galaxy.type), 100);
}

function initThreeJS(type) {
    const container = document.getElementById('canvas-container');
    container.innerHTML = '';

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    let geometry, material;

    if (type === 'spiral' || type === 'ring') {
        geometry = new THREE.CylinderGeometry(2, 2, 0.1, 32, 1, true);
        material = new THREE.MeshPhongMaterial({
            color: type === 'ring' ? 0x64ffda : 0x4a90e2,
            emissive: type === 'ring' ? 0x004433 : 0x001144,
            side: THREE.DoubleSide,
            wireframe: true
        });
    } else if (type === 'elliptical') {
        geometry = new THREE.SphereGeometry(2, 32, 32);
        material = new THREE.MeshPhongMaterial({
            color: 0xffaa66,
            emissive: 0x442200,
            shininess: 100
        });
    } else {
        geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 50);
        material = new THREE.MeshPhongMaterial({
            color: 0xff66aa,
            emissive: 0x440022,
            wireframe: true
        });
    }

    galaxyMesh = new THREE.Mesh(geometry, material);
    scene.add(galaxyMesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    function animate() {
        animationId = requestAnimationFrame(animate);
        galaxyMesh.rotation.x += 0.005;
        galaxyMesh.rotation.y += 0.01;
        particlesMesh.rotation.y -= 0.002;
        renderer.render(scene, camera);
    }
    animate();
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('videoBg');
    if (document.hidden) {
        video.pause();
    } else {
        video.play();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
    if (e.key === 'f' || e.key === 'F') {
        showFavorites();
    }
    if (e.key === 'a' || e.key === 'A') {
        renderGalaxies('all');
    }
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
}

renderGalaxies();
