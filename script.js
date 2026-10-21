// ===== СЛОВАРЬ ПЕРЕВОДОВ =====
const translations = {
    uk: {
        nav_works: "Роботи",
        nav_about: "Про мене",
        nav_contact: "Контакти",
        btn_book: "Записатися",
        hero_subtitle: "Дизайн інтер'єрів · Онлайн",
        hero_title: "Створюю простори,<br>у яких хочеться жити",
        hero_text: "Мене звати Юлія. Допомагаю створити затишний і функціональний інтер'єр — від ідеї до реалізації. Працюю з житловими та комерційними просторами.",
        btn_portfolio: "Дивитися роботи",
        btn_consult: "Онлайн-консультація"
    },
    en: {
        nav_works: "Works",
        nav_about: "About",
        nav_contact: "Contact",
        btn_book: "Book a Call",
        hero_subtitle: "Interior Design · Online",
        hero_title: "Creating spaces<br>you want to live in",
        hero_text: "My name is Yuliia. I help create cozy and functional interiors — from concept to realization. I work with residential and commercial spaces.",
        btn_portfolio: "View Works",
        btn_consult: "Online Consultation"
    }
};

// ===== ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА =====
function setLang(lang) {
    // 1. Находим все элементы с data-lang-key
    const elements = document.querySelectorAll('[data-lang-key]');

    // 2. Проходим по каждому и подставляем текст из словаря
    elements.forEach(el => {
        const key = el.getAttribute('data-lang-key');
        const translation = translations[lang]?.[key];
        if (translation) {
            el.innerHTML = translation; // innerHTML, т.к. в hero_title есть <br>
        }
    });

    // 3. Подсвечиваем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 4. Меняем атрибут lang у <html> — важно для SEO и доступности
    document.documentElement.lang = lang;

    // 5. Запоминаем выбор
    localStorage.setItem('preferredLang', lang);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    // Если пользователь раньше выбирал язык — применяем его
    const savedLang = localStorage.getItem('preferredLang') || 'uk';
    setLang(savedLang);
});

// Находим нашу форму по ID
const contactForm = document.getElementById('contactForm');

// Вешаем на нее событие "отправка"
contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Запрещаем браузеру перезагружать страницу

    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = "Надсилання...";
    formStatus.style.color = "black";

    // Собираем данные из полей в объект
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    try {
        // Отправляем POST-запрос на наш Java-сервер
        const response = await fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Говорим, что шлем JSON
            },
            body: JSON.stringify(data) // Превращаем объект в JSON-строку
        });

        // Если сервер ответил успешно (код 200)
        if (response.ok) {
            formStatus.textContent = "Дякую! Ваша заявка прийнята.";
            formStatus.style.color = "green";
            contactForm.reset(); // Очищаем поля формы
        } else {
            formStatus.textContent = "Помилка відправки. Спробуйте пізніше.";
            formStatus.style.color = "red";
        }
    } catch (error) {
        // Если сервер вообще выключен или недоступен
        console.error("Ошибка:", error);
        formStatus.textContent = "Сервер недоступний. Перевірте, чи запущений Java.";
        formStatus.style.color = "red";
    }
});