const KorzhData = {
    name: "Обворожительный Коржик",
    tagline: "Не горят в небе звезды для тех, кому это не нужно..",
    stats: {
        power: "Записывать сны на пленку 😴",
        music: "Би - 2 Полковнику никто не пишет 🫡",
        decree: "Смертная казнь за жестокое обращение с животными 🐾"
    },
    vibe: { 
    poetry: "Сергей Есенин 📖", 
    music: "Операция Пластилин / СДП 🎸",
    born: "Рано утром 🌅", 
    birthday: "26 Февраля ❄️" 
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
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
                document.getElementById('vibe-born').textContent =
                KorzhData.vibe.born;              document.getElementById('vibe-birthday').textContent =
                KorzhData.vibe.birthday; document.getElementById('vibe-poetry').textContent =
                KorzhData.vibe.poetry; document.getElementById('vibe-music').textContent =
                KorzhData.vibe.music;
}

function renderBlitz() { 
    const container = document.querySelector('.blitz-container');
    container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';
    KorzhData.blitz.forEach(item => { 
        const row = document.createElement('div');
        row.className = 'blitz-row'; 
        row.innerHTML = ` 
            <span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span>
            <span class="divider">/</span>
            <span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span> 
        `; 
        container.appendChild(row);
    });
}

function initBlitzInteractivity() {
    const container = document.querySelector('.blitz-container');
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('choice')) {
            const row = e.target.closest('.blitz-row');
            row.querySelectorAll('.choice').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

function checkAccess() {
    const val = document.getElementById('password-input').value.toLowerCase().trim();
    const card = document.querySelector('.card');
    const login = document.getElementById('login-screen');

    if (val === 'коржик' || val === 'корж') {
        login.style.display = 'none';
        card.style.display = 'block'; 
        localStorage.setItem('isAuth', 'true');
        fillProfile();
        renderBlitz();
        initBlitzInteractivity();
        showAlert(`Доступ разрешен. Привет, ${KorzhData.name}! ❤️`);
    } else {
        showAlert('Не-а, попробуй еще раз... ❌');
    }
}

// Кнопка ТГ
const btn = document.getElementById('tg-button');
if (btn) { 
    btn.addEventListener('click', function(e) {           
        e.preventDefault(); 
        showAlert('Коржик... я старался, старался... а ссылки на тг нету... ай,ай,ай 🤭');
    });
}

// Вход по Enter
document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkAccess();
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

// 8. ФУНКЦИЯ СБРОСА (Logout) 
function handleLogout() { 
// Вызываем системное окно подтверждения
const confirmReset = confirm("Вернуть экран блокировки?"); if (confirmReset) {  
// 1. Стираем метку входа из памяти
localStorage.removeItem('isAuth'); 
// 2. Мгновенно перезагружаем страницу
location.reload(); } }
// Универсальная функция показа сообщения
function showAlert(message) {
    const modal = document.getElementById('custom-modal');
    const text = document.getElementById('modal-text');
    const closeBtn = document.getElementById('modal-close');

    text.textContent = message;
    modal.style.display = 'flex';

    // Закрытие при клике на кнопку
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
}