document.addEventListener("DOMContentLoaded", function () {

	// Custom JS

	const btnSpin = document.querySelector(".content__spin");
	const whell = document.querySelector(".content__wheel-inside");
	const popupFirst = document.querySelector('.popup--one');
	const close = document.querySelector('.popup__close');
	const boxWheel = document.querySelector('.content__wheel');
	const tires = document.querySelector('.content__tires-number');
	const popupBtn = document.querySelector('.popup__btn--one');
	const popupSecond = document.querySelector('.popup--two')

	function animate({ timing, draw, duration }) {
		let start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction изменяется от 0 до 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;
			// вычисление текущего состояния анимации
			let progress = timing(timeFraction);
			draw(progress); // отрисовать её
			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	}

	btnSpin.addEventListener('click', function () {

		animate({
			duration: 5000,
			timing: function quart(timeFraction) {
				return 1 - Math.pow(1 - timeFraction, 4); // вид анимации https://easings.net/uk
			},
			draw(progress) {
				whell.style.transform = 'rotate(' + progress * 1500 + 'deg';
			}
		});

		setTimeout(
			() => {
				tires.textContent = ' 1 ';
				popupFirst.classList.add('open');
			}, 6000
		);

	});

	close.addEventListener('click', function () {
		popupFirst.classList.remove('open');
	});

	let plug = document.createElement('div');
	plug.classList.add('.content__spin--plug');
	plug.style.cssText = `position: absolute;
        padding: 7vw;
		width: 30px;
		height: 30px;
        top: 30%;
        left: 35%;
        cursor: pointer;`;

	popupBtn.addEventListener('click', function (e) {
		popupFirst.classList.remove('open');
		boxWheel.appendChild(plug);
		e.preventDefault();
	});

	plug.addEventListener('click', function () {

		animate({
			duration: 5000,
			timing: function quart(timeFraction) {
				return 1 - Math.pow(1 - timeFraction, 4);
			},
			draw(progress) {
				whell.style.transform = 'rotate(' + progress * 1455 + 'deg';
			}
		});

		setTimeout(
			() => {
				popupSecond.classList.add('open');
				tires.textContent = ' 0 ';
			}, 6000
		);

	});

});
