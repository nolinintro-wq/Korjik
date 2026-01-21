const KorzhData = {
    name: "Обворожительный Коржик",
    tagline: "Не горят в небе звезды для тех, кому это не нужно..",
    stats:{
        power: "Записывать сны на пленку 😴",
        music: "Би - 2 Полковнику никто не пишет 🫡",
        decree:"Смертная казнь за жестокое обращение с животными 🐾"
    },
    blitz: [ 
    { q1: '🍵 Чай', q2: '☕️ Кофе', active: 2 }, 
    { q1: '🐈 Кошка', q2: '🐩 Собака', active: 2 }, 
    { q1: '🎼 Классика', q2: '🎸 Рок', active: 2 }, 
    { q1: '🏏 Бита', q2: '🎻 Скрипка', active: 2 } ]
    
};
function fillProfile(){
    document.querySelector('h1').textContent = KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
};

function renderBlitz() { 
const container = document.querySelector('.blitz-container');
container.innerHTML = '<p class="blitz-title">Блиц-опрос: Выбор королевы 👑</p>';

KorzhData.blitz.forEach(item => { 
const row = document.createElement('div');
row.className = 'blitz-row'; 
row.innerHTML = ` 
<span class="choice ${item.active === 1 ? 'active' : ''}">${item.q1}</span>
<span class="divider">/</span>
<span class="choice ${item.active === 2 ? 'active' : ''}">${item.q2}</span> `; container.appendChild(row);
});
}


    function checkAccess() {
        const val = document.getElementById('password-input').value.toLowerCase().trim();
        const card = document.querySelector('.card');
        const login = document.getElementById('login-screen');

        if (val === 'коржик' || val === 'корж') {
            login.style.display = 'none';
            card.style.display = 'block'; 
            fillProfile();
            renderBlitz();
            alert('Доступ разрешен. Привет, Коржик! ❤️'); 
        } else {
            alert('Не-а, попробуй еще раз... ❌');
    }
}

 // ТГ
    const btn = document.getElementById('tg-button');
if (btn) { 
    btn.addEventListener('click', 
function(e) {           
        e.preventDefault(); 
        alert('Коржик... я старался, старался... а ссылки на тг нету... ай,ай,ай 🤭');
        });
    }
const passInput = document.getElementById('password-input');
if(passInput){
    
passInput.addEventListener('keypress', 
    function (e) {
        if (e.key === 'Enter') {
            checkAccess();
        }
    });
    }
