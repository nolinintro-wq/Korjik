const KorzhData = {
    name: "Обворожительный Коржик",
    tagline: "«Не горят в небе звезды для тех, кому это не нужно..»",
    stats: {
        power: "Записывать сны на пленку 😴",
        music: "Би - 2 Полковнику никто не пишет 🫡",
        decree: "Смертная казнь за жестокое обращение с животными 🐾"
    },
    vibe: {
        birthday: "26 Февраля ❄️",
        born: "Рано утром 🌅",
        poetry: "Сергей Есенин 📖",
        music: "Операция Пластилин / СДП 🎸"
    },
    blitz: [ 
        { q1: '🍵 Чай', q2: '☕️ Кофе', active: 2 }, 
        { q1: '🐈 Кошка', q2: '🐩 Собака', active: 2 }, 
        { q1: '🎼 Классика', q2: '🎸 Рок', active: 2 }, 
        { q1: '🏏 Бита', q2: '🎻 Скрипка', active: 2 } 
    ]
};

function fillProfile() {
    document.querySelector('h1').textContent = KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('vibe-birthday').textContent = KorzhData.vibe.birthday;
    document.getElementById('vibe-born').textContent = KorzhData.vibe.born;
    document.getElementById('vibe-poetry').textContent = KorzhData.vibe.poetry;
    document.getElementById('vibe-music').textContent = KorzhData.vibe.music;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
}

function renderBlitz() { 
    const container = document.querySelector('.blitz-container');
    calculateBirthday(); 
    container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';
    KorzhData.blitz.forEach(item => { 
        const row = document.createElement('div');
        row.className = 'blitz-row'; 
        row.innerHTML = `<span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span><span class="divider">/</span><span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span>`; 
        container.appendChild(row);
    });
}

function initBlitzInteractivity() {
    const container = document.querySelector('.blitz-container');
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('choice')) {
            const row = e.target.closest('.blitz-row');
            row.querySelectorAll('.choice').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

// КАСТОМНЫЙ АЛЕРТ
function showCustomAlert(message) {
    const modal = document.getElementById('custom-modal');
    document.getElementById('modal-text').textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

function checkAccess() {
    const val = document.getElementById('password-input').value.toLowerCase().trim();
    if (val === 'коржик' || val === 'корж') {
        localStorage.setItem('isAuth', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); renderBlitz(); initBlitzInteractivity();
        showCustomAlert(`Доступ разрешен. Привет, ${KorzhData.name}! ❤️`); 
    } else {
        showCustomAlert('Не-а, попробуй еще раз... ❌');
    }
}

// Кнопка ТГ
document.getElementById('tg-button').addEventListener('click', (e) => {
    e.preventDefault();
    showCustomAlert('Коржик... я старался... а ссылки на тг нету... ай-яй-яй 😉');
});

// Автоматический вход
window.onload = function() {
    if (localStorage.getItem('isAuth') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); 
        renderBlitz(); 
        initBlitzInteractivity();
    } 
};

// СБРОС
function handleLogout() {
    if (confirm("Вернуть экран блокировки?")) {
        localStorage.removeItem('isAuth');
        location.reload();
    }
}
function calculateBirthday() {
    const now = new Date();
    // 26 февраля 2026 года (Месяц 1, так как Январь это 0)
    const bday = new Date(2026, 1, 26); 

    const diff = bday - now;
    // Округляем вверх до целого числа дней
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    const timerSpan = document.getElementById('days-left');
    if (timerSpan) {
        // Если дней больше 0, пишем число, если наступил ДР - пишем "Сегодня!"
        timerSpan.textContent = days > 0 ? days : "СЕГОДНЯ! 🥳";
    }
}