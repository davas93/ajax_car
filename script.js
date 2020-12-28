document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const select = document.getElementById('cars'),
		output = document.getElementById('output');

	select.addEventListener('change', () => {
		let data;

		const getData = () => {
			return new Promise((resolve, reject) => {
				const request = new XMLHttpRequest();
				request.open('GET', './cars.json');
				request.setRequestHeader('Content-type', 'application/json');
				request.send();
				request.addEventListener('readystatechange', () => {
					if (request.readyState !== 4) {
						return;
					}
					if (request.status === 200) {
						data = JSON.parse(request.responseText);
						resolve();
					} else {
						reject(request.status);
					}
				});
			});
		};
		getData()
			.then(() => {
				data.cars.forEach((item) => {
					if (item.brand === select.value) {
						const { brand, model, price } = item;
						output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
					}
				});
			})
			.catch((error) => {
				output.innerHTML = 'Произошла ошибка';
				console.error(error);
			});
	});
});
