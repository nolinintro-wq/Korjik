const KorzhData = {
    name: "Обворожительный Коржик",
    tagline: "«Не горят в небе звезды для тех, кому это не нужно..»",
    stats: { power: "Записывать сны на пленку 😴", music: "Би - 2 Полковнику никто не пишет 🫡", decree: "Смертная казнь за жестокое обращение с животными 🐾" },
    vibe: { birthday: "26 Февраля ❄️", born: "Рано утром 🌅", poetry: "Сергей Есенин 📖", music: "Операция Пластилин / СДП 🎸" },
    blitz: [ { q1: '🍵 Чай', q2: '☕️ Кофе', active: 2 }, { q1: '🐈 Кошка', q2: '🐩 Собака', active: 2 }, { q1: '🎼 Классика', q2: '🎸 Рок', active: 2 }, { q1: '🏏 Бита', q2: '🎻 Скрипка', active: 2 } ],
    finalLeitmotif: `Мы выпали из реальности друг друга на добрый десяток а то и более лет, и мой внезапный стук в твою дверь был подобен сбою в законах физики. Я ворвался в твой покой потрёпанный, в заплатках от старых ран, принеся с собой запах металла и холода. 

Наверное, я совершил стратегическую ошибку: я обрушил на тебя всё сразу, превратив своё внимание в тяжелый снежный ком. Или быть может мы просто живём в разных скоростных режимах... Для меня миг — это жизнь. В моём мире нет времени на 'потом' и длинные паузы. Мой алгоритм прост: увидел своего человека — и забрал, вложил всё, что есть в груди, здесь и сейчас. Потому что завтра может не наступить. 
Испытываю двоякое чувство, с одной стороны так хотелось что бы все было иначе. С другой стороны, я не хочу что бы кто то переживал,жив я сегодня или отдал концы.

Я — человек с оголёнными нервами, и моя чувствительность стала моим проклятием. Я искренне хотел синхронизироваться на самых глубоких частотах. Но сегодня я зафиксировал отсутствие интереса. С чем это связано? Я не знаю. 
Правильно ли я все понял? не знаю.
Это не имеет значения.

Но знаете что? Да пошло оно всё на хуй. Я попытался. Я созидал там, где привыкли только разрушать. Сейчас вокруг меня — настоящий ад, и в этом пламени мне точно есть в чем убить, сжечь и переплавить свои лишние чувства. Это мой способ очистки и выживания. 

Глубоко сомневаюсь что кто то дочитает это до конца или же вообще зайдёт на эту страничку, самое важное в этой писанине то что я это сказал, чисто, что бы потом понять, на сколько это имело место быть. Системы переведены в Offline. Не прощаемся. Мы обязательно увидимся — возможно, в другой жизни, где режимы наших скоростей совпадут. А пока — конец связи.`
};

function fillProfile() {
    document.getElementById('main-title').textContent = KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('vibe-birthday').textContent = KorzhData.vibe.birthday;
    document.getElementById('vibe-born').textContent = KorzhData.vibe.born;
    document.getElementById('vibe-poetry').textContent = KorzhData.vibe.poetry;
    document.getElementById('vibe-music').textContent = KorzhData.vibe.music;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
    // ВСТАВЛЯЕМ ЛЕЙТМОТИВ СРАЗУ
    document.getElementById('final-logic-text').textContent = KorzhData.finalLeitmotif;
    calculateBirthday();
}

function checkAccess() {
    const val = document.getElementById('password-input').value.toLowerCase().trim();
    if (val === 'коржик' || val === 'корж') {
        localStorage.setItem('isAuth', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-card').style.display = 'block'; 
        fillProfile(); renderBlitz();
        showCustomAlert(`Привет, ${KorzhData.name}. Система активна.`); 
    } else {
        const lb = document.getElementById('login-screen'); lb.classList.add('shake');
        setTimeout(() => lb.classList.remove('shake'), 400);
        showCustomAlert('Доступ отклонен. ❌');
    }
}

function renderBlitz() { 
    const container = document.querySelector('.blitz-container');
    container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';
    KorzhData.blitz.forEach(item => { 
        const row = document.createElement('div'); row.className = 'blitz-row'; 
        row.innerHTML = `<span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span><span> / </span><span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span>`; 
        container.appendChild(row);
    });
}

function calculateBirthday() {
    const diff = new Date(2026, 1, 26) - new Date();
    document.getElementById('days-left').textContent = Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const audio = document.getElementById('audio-player');
document.getElementById('music-btn').onclick = () => {
    if (audio.paused) { audio.play(); document.getElementById('music-icon').textContent = '⏸'; }
    else { audio.pause(); document.getElementById('music-icon').textContent = '▶'; }
};

function showCustomAlert(msg) { document.getElementById('modal-text').textContent = msg; document.getElementById('custom-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('custom-modal').style.display = 'none'; }

window.onload = () => { if (localStorage.getItem('isAuth') === 'true') { document.getElementById('login-screen').style.display = 'none'; document.getElementById('main-card').style.display = 'block'; fillProfile(); renderBlitz(); } };

function handleLogout() { if (confirm("Вернуть экран блокировки?")) { localStorage.removeItem('isAuth'); location.reload(); } }