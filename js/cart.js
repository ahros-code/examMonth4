let boxes = document.querySelector('.boxes');
let total_price = document.querySelector('.total_price');
let total_price2 = document.querySelector('.total_price2');
let cart = JSON.parse(localStorage.getItem('cart'));
let priceInCart = document.querySelector('.price');

function render(arr = []) {
	boxes.innerHTML = arr
		.map(
			el => `
<div class="cart-item">
<img class='del' id=${el.id} src='../img/del.svg'/>
<img style='width: 137px' src="${el.image}" alt="img">
<h4>${el.title}</h4>
<p class='cart-item-price'>$${el.price}</p>
</div>
`
		)
		.join('');
}

render(cart);

boxes.addEventListener('click', e => {
	if (e.target.className == 'del') {
		let finded = JSON.parse(localStorage.getItem('cart'));
		let finished = finded.find(item => item.id == e.target.id);
		let index = finded.indexOf(finished);
		if (index > -1) {
			finded.splice(index, 1);
		}
		localStorage.setItem('cart', JSON.stringify(finded));
		render(finded);
		totalPrice();
	}
});

function totalPrice() {
	let res = JSON.parse(localStorage.getItem('cart'));
	let total = 0;
	for (let i in res) {
		total += res[i].price;
	}
	total_price.innerHTML = `$${total.toFixed(2)}`;
	total_price2.innerHTML = `$${total.toFixed(2)}`;
	JSON.stringify(localStorage.setItem('total_price', JSON.stringify(total)));
}

totalPrice();