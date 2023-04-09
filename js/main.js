let categories = document.querySelector('.categories');
let productBox = document.querySelector('.products');
let loadmore = document.querySelector('.load-more');
let bestseller_title = document.querySelector('.bestseller-title');
let cartIcon = document.querySelector('.cart');
let price = document.querySelector('.price');
let cartCount = document.querySelector('.cart-count');

const BASE_URL = 'https://fakestoreapi.com/products';
let products = [];
let cartArr = [];
let j = [];

// getting data

totalPrice();

function getCategory() {
	fetch(`${BASE_URL}/categories`)
		.then(res => res.json())
		.then(data => renderCategories(data));
}

function getProduct() {
	fetch(`${BASE_URL}?limit=8`)
		.then(res => res.json())
		.then(data => {
			renderProducts(data);
			for (let i in data) {
				products.push(data[i]);
			}
		});
	;
}

function getFullProduct() {
	fetch(`${BASE_URL}`)
		.then(res => res.json())
		.then(data => {
			renderProducts(data);
			for (let i in data) {
				products.push(data[i]);
			}
		});
}

function reGet(cat) {
	fetch(`https://fakestoreapi.com/products/category/${cat}`)
		.then(res => res.json())
		.then(data => {
			renderProducts(data);
			for (let i in data) {
				products.push(data[i]);
			}
		});
}

getCategory();
getProduct();

// rendering

function renderCategories(data) {
	categories.innerHTML = data
		.map(
			el => `
		<li class='bestseller-category-item'>${el}</li>
	`
		)
		.join('');
}

function renderProducts(data) {
	productBox.innerHTML = data
		.map(
			el => `
	<div class="card">
	<img
		src="${el.image}"
		alt="img"
		class="card-img"
	/>
	<h3 class="car-title">${el.title}</h3>
	<div class="card-price">$${el.price}</div>
	<button id='${el.id}' class='btn'>Add to cart</button>
</div>
	`
		)
		.join('');
}
// event listeners
categories.addEventListener('click', e => {
	if (e.target.className == 'bestseller-category-item') {
		reGet(e.target.innerText);
		loadmore.innerHTML = '';
	}
});

loadmore.addEventListener('click', e => {
	getFullProduct();
	loadmore.innerHTML = '';
});

bestseller_title.addEventListener('click', e => {
	getProduct();
	loadmore.innerHTML = 'load more';
});

cartIcon.addEventListener('click', e => {
	window.location.href = '../cart.html';
	totalPrice();
});

productBox.addEventListener('click', e => {
	if (e.target.className == 'btn') {
		let product = products.find(item => item.id == e.target.id);
		const check = j.find(item => item.id == e.target.id);
		if (!check) {
			j.push(product);
		}
		localStorage.setItem('cart', JSON.stringify(j));
		
		totalPrice();
	}
});

function totalPrice() {
	let res = JSON.parse(localStorage.getItem('cart'));
	let total = 0;
	for (let i in res) {
		total += res[i].price;
	}
	price.innerHTML = '$' + total;
}
