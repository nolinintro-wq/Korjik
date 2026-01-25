const KorzhData = {
    name: "Обворожительный Коржик", darkName: "Коржик зла 🥀",
    tagline: "«Не горят в небе звезды для тех, кому это не нужно..»",
    stats: { power: "Записывать сны на пленку 😴", music: "Би - 2 Полковнику никто не пишет 🫡", decree: "Смертная казнь за жестокое обращение с животными 🐾" },
    vibe: { birthday: "26 Февраля ❄️", born: "Рано утром 🌅", poetry: "Сергей Есенин 📖", music: "Операция Пластилин / СДП 🎸" },
    blitz: [ { q1: '🍵 Чай', q2: '☕️ Кофе', active: 2 }, { q1: '🐈 Кошка', q2: '🐩 Собака', active: 2 }, { q1: '🎼 Классика', q2: '🎸 Рок', active: 2 }, { q1: '🏏 Бита', q2: '🎻 Скрипка', active: 2 } ],
    journal: [
        { date: "19.01.2026", text: "СТАДИЯ: Инициация. В расположении холод, но код греет." },
        { date: "23.01.2026", text: "ЛИЧНОЕ: Думал написать или нет... Я ведь не подарок." },
        { date: "25.01.2026", text: "DELETED..." },
        { date: "25.01.2026", text: "ВНИМАНИЕ: Обнаружен избыток 'ванильной' энергии. Режим 'Мужик' восстановлен. 🦾" }
    ]
};

function fillProfile() {
    const isDark = document.body.classList.contains('dark-mood');
    document.getElementById('main-title').textContent = isDark ? KorzhData.darkName : KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('vibe-birthday').textContent = KorzhData.vibe.birthday;
    document.getElementById('vibe-born').textContent = KorzhData.vibe.born;
    document.getElementById('vibe-poetry').textContent = KorzhData.vibe.poetry;
    document.getElementById('vibe-music').textContent = KorzhData.vibe.music;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
    calculateBirthday();
}

function calculateBirthday() {
    const diff = new Date(2026, 1, 26) - new Date();
    document.getElementById('days-left').textContent = Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function toggleTheme() {
    document.body.classList.toggle('dark-mood');
    const isDark = document.body.classList.contains('dark-mood');
    setTimeout(() => { document.getElementById('main-title').textContent = isDark ? KorzhData.darkName : KorzhData.name; }, 1500);
    setTimeout(() => { showCustomAlert(isDark ? "Цветы зла расцвели... 🥀" : "Световые системы восстановлены. 🛰️"); }, 3000);
}

function checkAccess() {
    const val = document.getElementById('password-input').value.toLowerCase().trim();
    if (val === 'коржик' || val === 'корж') {
        localStorage.setItem('isAuth', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); renderBlitz();
        showCustomAlert(`Доступ разрешен. Привет, ${KorzhData.name}! ❤️`); 
    } else {
        const lb = document.getElementById('login-screen'); lb.classList.add('shake');
        setTimeout(() => lb.classList.remove('shake'), 400);
        showCustomAlert('Не-а, попробуй еще раз... ❌');
    }
}

function renderBlitz() { 
    const container = document.querySelector('.blitz-container');
    container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';
    KorzhData.blitz.forEach(item => { 
        const row = document.createElement('div'); row.className = 'blitz-row'; 
        row.innerHTML = `<span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span><span class="divider"> / </span><span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span>`; 
        container.appendChild(row);
    });
    container.onclick = (e) => {
        if (e.target.classList.contains('choice')) {
            const row = e.target.closest('.blitz-row');
            row.querySelectorAll('.choice').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    };
}

function toggleJournal() {
    const gate = document.getElementById('journal-gate');
    const container = document.getElementById('journal-container');
    const trigger = document.getElementById('journal-trigger');
    const isHidden = container.classList.contains('journal-hidden') && gate.classList.contains('journal-hidden');
    if (isHidden) { gate.className = 'journal-visible'; trigger.textContent = "🚫 Отмена"; }
    else { gate.className = 'journal-hidden'; container.className = 'journal-hidden'; trigger.textContent = "📂 Открыть архив мыслей"; }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const val = input.value.toLowerCase().trim();
    if (!val) return;
    addChatMessage(input.value, 'user'); input.value = '';
    setTimeout(() => {
        if (val === 'немой') {
            addChatMessage("Личность подтверждена. Архив разблокирован.", "bot");
            setTimeout(() => {
                document.getElementById('journal-gate').className = 'journal-hidden';
                document.getElementById('journal-container').className = 'journal-visible';
                renderJournal();
            }, 1000);
        } else if (val.includes('пароль')) { addChatMessage("Ключ — это имя того, кто всегда молчит.", "bot"); }
        else { addChatMessage("Запрос отклонен.", "bot"); }
    }, 600);
}

function addChatMessage(text, sender) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('p'); msg.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
    msg.textContent = text; box.appendChild(msg); box.scrollTop = box.scrollHeight;
}

function renderJournal() {
    const container = document.getElementById('journal-container'); container.innerHTML = '';
    KorzhData.journal.forEach(entry => {
        const div = document.createElement('div'); div.className = 'journal-entry';
        div.innerHTML = `<span class="entry-date">${entry.date}</span><p class="entry-text">${entry.text}</p>`;
        container.appendChild(div);
    });
}

function showCustomAlert(message) { document.getElementById('modal-text').textContent = message; document.getElementById('custom-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('custom-modal').style.display = 'none'; }

const audio = document.getElementById('vibe-player');
document.getElementById('music-btn').onclick = () => {
    if (audio.paused) { audio.play(); document.getElementById('music-icon').textContent = '⏸'; }
    else { audio.pause(); document.getElementById('music-icon').textContent = '▶'; }
};

window.onload = () => {
    if (localStorage.getItem('isAuth') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.card').style.display = 'block'; 
        fillProfile(); renderBlitz();
    }
};

function handleLogout() {
    if (confirm("Вернуть экран блокировки?")) { localStorage.removeItem('isAuth'); location.reload(); }
}