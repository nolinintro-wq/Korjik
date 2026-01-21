const KorzhData = {
    name: "Обворожительный Коржик",
    tagline: "Не горят в небе звезды для тех, кому это не нужно..",
    stats:{
        power: "Записывать сны на пленку 😴",
        music: "Би - 2 Полковнику никто не пишет 🫡",
        decree:"Смертная казнь за жестокое обращение с животными 🐾"
    }
    
};
function fillProfile(){
    document.querySelector('h1').textContent = KorzhData.name;
    document.querySelector('.tagline').textContent = KorzhData.tagline;
    document.getElementById('power').textContent = KorzhData.stats.power;
    document.getElementById('music').textContent = KorzhData.stats.music;
    document.getElementById('decree').textContent = KorzhData.stats.decree;
};

    // 1. ФУНКЦИЯ ДЛЯ ВХОДА (Пароль)
    function checkAccess() {
        const val = document.getElementById('password-input').value.toLowerCase().trim();
        const card = document.querySelector('.card');
        const login = document.getElementById('login-screen');

        if (val === 'коржик' || val === 'корж') {
            login.style.display = 'none'; // Прячем замок
            card.style.display = 'block'; 
                fillProfile();// Показываем визитку и заполняем поля спан
            alert('Доступ разрешен. Привет, Коржик! ❤️'); 
        } else {
            alert('Не-а, попробуй еще раз... ❌');
       }
    }

 
    const btn = document.getElementById('tg-button');
    if (btn) {
        btn.addEventListener('click', function(e) {
            
            e.preventDefault(); 
            
            
            alert('Коржик... я старался, старался... а ссылки на тг нету... ай,ай,ай 🤭');
        });
    
    document.getElementById('password-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkAccess();
        }
    });
    };