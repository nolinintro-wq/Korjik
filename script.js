const KorzhData = {
    name: "Обворожительный Коржик",
    darkName: "Коржик зла 🥀",
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
    ],
    journal: [
        { date: "19.01", text: "Система инициирована. Начал вспоминать базу ради одного обворожительного Коржика." },
        { date: "23.01", text: "Личное: Думал, писать тебе или нет... Я ведь не подарок. Стараюсь обходить тех, кого уважаю." },
        { date: "25.01", text: "DELETED..." },
        { date: "25.01", text: "Внимание: Обнаружен избыток 'ванильной' энергии. Провожу рефакторинг. Режим 'Мужик' восстановлен. 🦾" }
    ]
};

function fillProfile() {
    const isDark = document.body.classList.contains('dark-mood');
    document.querySelector('h1').textContent = isDark ? KorzhData.darkName : KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('vibe-birthday').textContent = KorzhData.vibe.birthday;
    document.getElementById('vibe-born').textContent = KorzhData.vibe.born;
    document.getElementById('vibe-poetry').textContent = KorzhData.vibe.poetry;
    document.getElementById('vibe-music').textContent = KorzhData.vibe.music;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
    calculateBirthday();
}

function renderBlitz() { 
    const container = document.querySelector('.blitz-container');
    container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';
    KorzhData.blitz.forEach(item => { 
        const row = document.createElement('div');
        row.className = 'blitz-row'; 
        row.innerHTML = `<span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span><span class="divider"> / </span><span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span>`; 
        container.appendChild(row);
    });
}

function initBlitzInteractivity() {
    document.querySelector('.blitz-container').onclick = (e) => {
        if (e.target.classList.contains('choice')) {
            const row = e.target.closest('.blitz-row');
            row.querySelectorAll('.choice').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    };
}

function showCustomAlert(message) {
    document.getElementById('modal-text').textContent = message;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() { document.getElementById('custom-modal').style.display = 'none'; }

function checkAccess() {
    const val = document.getElementById('password-input').value.toLowerCase().trim();
    if (val === 'коржик' || val === 'корж') {
        localStorage.setItem('isAuth', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); renderBlitz(); initBlitzInteractivity();
        showCustomAlert(`Доступ разрешен. Привет, ${KorzhData.name}! ❤️`); 
    } else {
        const lb = document.getElementById('login-screen');
        lb.classList.add('shake');
        setTimeout(() => lb.classList.remove('shake'), 400);
        showCustomAlert('Не-а, попробуй еще раз... ❌');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mood');
    const isDark = document.body.classList.contains('dark-mood');
    setTimeout(() => { document.querySelector('h1').textContent = isDark ? KorzhData.darkName : KorzhData.name; }, 1500);
    setTimeout(() => { showCustomAlert(isDark ? "Добро пожаловать в 'Цветы зла'... 🥀" : "Возвращаемся к звездам. 🛰️"); }, 3000);
}

function calculateBirthday() {
    const diff = new Date(2026, 1, 26) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    document.getElementById('days-left').textContent = days > 0 ? days : "СЕГОДНЯ! 🥳";
}

function renderJournal() {
    const container = document.getElementById('journal-container');
    container.innerHTML = '';
    KorzhData.journal.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'journal-entry';
        div.innerHTML = `<span class="entry-date">${entry.date}</span><p class="entry-text">${entry.text}</p>`;
        container.appendChild(div);
    });
}

function toggleJournal() {
    const c = document.getElementById('journal-container');
    const t = document.getElementById('journal-trigger');
    const isHidden = c.classList.contains('journal-hidden');
    c.className = isHidden ? 'journal-visible' : 'journal-hidden';
    t.textContent = isHidden ? "🔒 Закрыть архив" : "📂 Открыть бортовой журнал";
    if (isHidden) renderJournal();
}

const audio = document.getElementById('vibe-player');
const mBtn = document.getElementById('music-btn');
if (mBtn) {
    mBtn.onclick = () => {
        if (audio.paused) { audio.play(); mBtn.classList.add('music-on'); document.getElementById('music-icon').textContent = '⏸'; }
        else { audio.pause(); mBtn.classList.remove('music-on'); document.getElementById('music-icon').textContent = '▶'; }
    };
}

document.getElementById('tg-button').onclick = (e) => {
    e.preventDefault();
    showCustomAlert('Коржик... я старался... а ссылки на тг нету... ай-яй-яй 😉');
};

window.onload = () => {
    if (localStorage.getItem('isAuth') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); renderBlitz(); initBlitzInteractivity();
    }
};

function handleLogout() {
    if (confirm("Вернуть экран блокировки?")) {
        localStorage.removeItem('isAuth');
        location.reload();
    }
}