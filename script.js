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
    ],
    journal: [
    {
        date: "19.01.2026",
        text: "Этап 1: Проектирование. Решил собрать для Коржика что-то уникальное. База вспоминается тяжело, но код идет. Интрига создана, пароль установлен. Системы запущены."
    },
    {
        date: "20.01.2026",
        text: "Первый контакт с пользователем. Сайт открыт, 'баг' с ВК найден и зафиксирован. Улыбка на том конце провода получена — это главный KPI (показатель успеха) проекта."
    },
    {
        date: "22.01.2026",
        text: "Этап 2: Глубокое погружение. Узнал секрет её звезд — это 'Пилот'. Внедряю аудио-движок. Теперь визитка не просто светит, она звучит. Связь со спутником стабильна."
    },
    {
        date: "23.01.2026",
        text: "Личное. Периодически натыкаясь на твой профиль, думал написать или нет. Как ты отнесешься к моему стуку в дверь... Я ведь далеко не подарок, и стараюсь обходить стороной тех, кого... уважаю."
    },
    {
        date: "24.01.2026",
        text: "Этап 3: Режим Медведя. Чай с мёдом в расположении против её температуры на гражданке. Обмен культурными кодами: Есенин, Бродский, СДП. Код пишется, время до 26 февраля тает."
    },
    {
        date: "25.01.2026",
        text: "Наблюдение: Белый фудин и разговоры ни о чем — лучший сценарий, который рисует мозг. Но пока только код, только 'Цветы зла' и ожидание момента, когда звезды загорятся для обоих."
    },
    {
    date: "25.01.2026 / day",
    text: "DELETED..."
},
{
    date: "25.01.2026 / day 2",
    text: "Внимание: Обнаружен избыток 'ванильной' энергии в системе. Провожу экстренный рефакторинг. Кажется, предыдущая запись была слишком глубокой для 3.0 версии — списал на магнитные бури и крепкий чай. 😅 Откатываемся к настройкам 'сдержанный оптимизм'. Главное — стабильность системы, а мимику и кресла оставим на потом. Режим 'Мужик' восстановлен. 🦾🛰️"
}
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
        renderJournal(); 
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
        initMusicPlayer(); 
        renderJournal(); 
    } 
};
function initMusicPlayer() {
    const player = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');

    if (playBtn && player) {
        playBtn.addEventListener('click', () => {
            if (player.paused) {
                player.play();
                playIcon.textContent = '⏸'; // Меняем иконку на Паузу
                playBtn.classList.add('playing');
            } else {
                player.pause();
                playIcon.textContent = '▶'; // Меняем обратно
                playBtn.classList.remove('playing');
            }
        });
    }
}
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
function renderJournal() {
    const container = document.getElementById('journal-container');
    if (!container) return;
    container.innerHTML = '';

    // УБРАЛИ .reverse(), теперь порядок прямой (от старых к новым)
    KorzhData.journal.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'journal-entry';
        entryDiv.innerHTML = `
            <span class="entry-date">${entry.date}</span>
            <p class="entry-text">${entry.text}</p>
        `;
        container.appendChild(entryDiv);
    });
}
function toggleJournal() {
    const container = document.getElementById('journal-container');
    const trigger = document.getElementById('journal-trigger');

    if (container.classList.contains('journal-hidden')) {
        // Открываем
        container.classList.remove('journal-hidden');
        container.classList.add('journal-visible');
        trigger.textContent = "🔒 Закрыть архив";
        renderJournal(); // Отрисовываем только при открытии
    } else {
        // Закрываем
        container.classList.remove('journal-visible');
        container.classList.add('journal-hidden');
        trigger.textContent = "📂 Открыть бортовой журнал";
    }
}
function toggleTheme() {
    // Команда .toggle добавляет класс, если его нет, и удаляет, если он есть
    document.body.classList.toggle('dark-mood');
    
    // Маленький бонус: покажем уведомление
    const isDark = document.body.classList.contains('dark-mood');
    showCustomAlert(isDark ? "Добро пожаловать в 'Цветы зла'... 🥀" : "Возвращаемся к звездам. 🛰️");
}