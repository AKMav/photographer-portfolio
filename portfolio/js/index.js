import i18Obj from './translate.js';
// импортирую модуль с языковым объектом

// бургер меню, скрытие боковой панели
const burger_btn = document.querySelector('.header__burger');
const navPage = document.querySelector('.header__nav');
const menu_items = document.querySelectorAll('.header__menu');

burger_btn.addEventListener('click', () => {
	if (theme == 'light') {
		document.querySelectorAll('.header__link').forEach((elem) => {
			elem.classList.add('light');
		});
		navPage.classList.add('light');
	} else {
		document.querySelectorAll('.header__link').forEach((elem) => {
			elem.classList.remove('light');
		});
		navPage.classList.remove('light');
	}
	burger_btn.classList.toggle('burger__close');
	navPage.classList.toggle('nav-open');
	document.querySelector('body').classList.toggle('non-scroll');
});

for (let item of menu_items) {
	item.addEventListener('click', () => {
		document.querySelector('body').classList.remove('non-scroll');
		navPage.classList.remove('nav-open');
		btn.classList.toggle('burger__close');
	});
}

// смена изображений в блоке портфолио
const portfolio_btns = document.querySelectorAll('.portfolio__btn-item');
const portolio_images = document.querySelectorAll('.gallery-picture');

for (let btn of portfolio_btns) {
	function changeImage() {
		setTimeout(() => {
			let i = 1;
			portolio_images.forEach((img) => {
				img.src = `./source/img/${btn.value}/${i}.jpg`;
				i++;
			});
		}, 300); // небольшая задержка чтобы было плавное переключение
	}
	btn.addEventListener('click', changeImage);

	btn.addEventListener('click', () => {
		portfolio_btns.forEach((elem) => {
			elem.classList.remove('active');
		});
	}) // обнуляет класс active для каждого элемента

	btn.addEventListener('click', function active() {
		this.classList.add('active');
	}) // добавляет класс active по нажатой кнопке
}

let language = 'en';
const btnEn = document.querySelector('.lang-btn-en');
const btnRu = document.querySelector('.lang-btn-ru');

// меняет цвет активной кнопки в зависимости от переменной language
function changeActiveBtn() {
	if (language == 'en') {
		btnRu.classList.remove('lang_active');
		btnEn.classList.add('lang_active');
	} else if (language == 'ru') {
		btnEn.classList.remove('lang_active');
		btnRu.classList.add('lang_active');
	}
}

// подключение функции на кнопки
btnEn.addEventListener('click', function () {
	language = 'en';
	localStorage.setItem('lang', language);
	textTranslate();
	changeActiveBtn();
})

btnRu.addEventListener('click', function () {
	language = 'ru';
	localStorage.setItem('lang', language);
	textTranslate();
	changeActiveBtn();
})

// перевод текстовых файлов, помеченных дата-атрибутом data-lang
function textTranslate() {
	const text = document.querySelectorAll('[data-lang]');
	setTimeout(() => {
		text.forEach((elem) => {
			if (elem.placeholder) {
				elem.placeholder = i18Obj[language][elem.dataset.lang];
			}
			elem.innerHTML = i18Obj[language][elem.dataset.lang];
		})
	}, 300)
}


let theme = 'dark'; // default value
const switchThemeBtn = document.querySelector('.switch-theme');
switchThemeBtn.addEventListener('click', changeThemeValue);
switchThemeBtn.addEventListener('click', setTheme);

// меняет значение глобальной переменной theme
function changeThemeValue() {
	if (theme == 'light') {
		theme = 'dark';
	} else if (theme == 'dark') {
		theme = 'light';
	}
	localStorage.setItem('theme', theme);
}

// в зависимости от значения переменной theme меняет тему
function setTheme() {
	const elementsToSwitchTheme = ['html', 'body', '.section-title', '.title-box', '.skills__item', '.price__title', '.price__subtitle', '.portfolio__btn-item',];
	if (theme == 'light') {
		document.querySelector('.switch-theme').classList.add('sun');
		elementsToSwitchTheme.forEach((elem) => {
			document.querySelectorAll(elem).forEach((domElem) => {
				domElem.classList.add('light');
			});
		})
	} else if (theme == 'dark') {
		document.querySelector('.switch-theme').classList.remove('sun');
		elementsToSwitchTheme.forEach((elem) => {
			document.querySelectorAll(elem).forEach((domElem) => {
				domElem.classList.remove('light');
			});
		})
	}
}

function getlocalStorage() {
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme');
		setTheme();
	}
	if (localStorage.getItem('lang')) {
		language = localStorage.getItem('lang');
		textTranslate();
		changeActiveBtn();
	}
}

window.addEventListener('load', getlocalStorage);

console.log(`
	1. Смена изображений в секции portfolio +25
	2. Перевод страницы на два языка +25
	3. Переключение светлой и тёмной темы +25. На страницу добавлен переключатель при клике по которому
	4. Выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы. +5 (но почему-то при добавлении на удаленный репозиторий не работает)
	5. Total score: 80 баллов.
`)