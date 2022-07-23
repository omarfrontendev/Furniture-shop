//  variables :==

const cartContainer = document.querySelector('.products-content');
const cartBtns = document.querySelectorAll('.nav-icons');
const cartOverLay = document.querySelector('.cart-overlay');
const cart = document.querySelector('.cart');
const closeCartBrn = document.querySelector('.fa-window-close');
const cartItemContainer = document.querySelector('.cart-content');
const totalPriceItem = document.querySelector('.total-price');
const notification = document.querySelector('.counter');
const clearAllBtn = document.querySelector('.btn-clear-cart');

const items = [
    {
        id: 1,
        title: "queen panel bed",
        price: 10.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-1.jpeg?raw=true"
    },
    {
        id: 2,
        title: "king panel bed",
        price: 12.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-2.jpeg?raw=true"
    },
    {
        id: 3,
        title: "single panel bed",
        price: 12.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-3.jpeg?raw=true"
    },
    {
        id: 4,
        title: "twin panel bed",
        price: 22.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-4.jpeg?raw=true"
    },
    {
        id: 5,
        title: "fridge",
        price: 88.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-5.jpeg?raw=true"
    },
    {
        id: 6,
        title: "dresser",
        price: 32.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-6.jpeg?raw=true"
    },
    {
        id: 7,
        title: "couch",
        price: 45.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-7.jpeg?raw=true"
    },
    {
        id: 8,
        title: "table",
        price: 33.99,
        image: "https://github.com/john-smilga/setup-files-js-comfy-house/blob/master/images/product-8.jpeg?raw=true"
    }
]

document.addEventListener("DOMContentLoaded", () => {
    let item = items.map(item => {
        return `<div class="product-box" id = "${item.id}">
                <div class="img-product">
                    <img src="${item.image}" class="imgproduct">
                    <button class="btn-product"><i class="fas fa-shopping-cart"></i>add to bag</button>
                </div>
                <h2 class="title-product">${item.title}</h2>
                <h3 class="price-product" id = "${item.id}">$${item.price}</h3>
            </div>`;
    })
    cartContainer.innerHTML = item.join("");
    const addBtns = cartContainer.querySelectorAll('.btn-product');
    addBtns.forEach(addBtn => { addBtn.addEventListener('click', addToCart) });
});

// ==== Add EventListener =====
cartBtns.forEach(cartBtn => { cartBtn.addEventListener('click', openCart); });
closeCartBrn.addEventListener('click', closeCart);

// ======= functions ========
function openCart() {
    cartOverLay.classList.add("show-overlay");
    cart.classList.add("show-cart");
}
function closeCart() {
    cartOverLay.classList.remove("show-overlay");
    cart.classList.remove("show-cart");
}

function addToCart(e) {
    // openCart();
    const currentBtn = e.currentTarget;
    currentBtn.disabled = true;
    currentBtn.innerHTML = 'in bag';
    currentBtn.classList.add('in-bag');
    const img = currentBtn.previousElementSibling;
    const parent = currentBtn.parentElement;
    const title = parent.nextElementSibling;
    const price = title.nextElementSibling;
    // const dataId = price.getAttribute('data-id')
    cartItemContainer.innerHTML += `<div class="cart-item" data-id = "${price.getAttribute('id')}">
                    <img src="${img.src}" alt="">
                    <div class="item-info">
                        <h4 class = "title">${title.textContent}</h4>
                        <h5>$<span class="item-price" data-id = "${price.getAttribute('id')}">${price.textContent.replace("$", "")}</span></h5>
                        <p class="btn-remove-item">remove</p>
                    </div>
                    <div class="cart-item-mount">
                        <i class="fas fa-angle-up"></i>
                        <p class="amount-item">1</p>
                        <i class="fas fa-angle-down"></i>
                    </div>
                </div>`;
    calcTotalPrices();
    navIcons();
};

cartItemContainer.addEventListener('click', increaseAmount);
cartItemContainer.addEventListener('click', increaseAmount);

function increaseAmount(e) {
    const btn = e.target;
    if (btn.classList.contains('fa-angle-up')) {
        const parent = btn.parentElement;
        const amount = parent.querySelector('.amount-item');
        amount.innerHTML++;
        priceItem(btn);
    }
    if (btn.classList.contains('fa-angle-down')) {
        const parent = btn.parentElement;
        const amount = parent.querySelector('.amount-item');
        if (amount.innerHTML > 1) {
            amount.innerHTML--;
            priceItem(btn);
        }
    }
    if (btn.classList.contains('btn-remove-item')) {
        const parent = btn.parentElement.parentElement;
        parent.remove();
        const productsBox = cartContainer.querySelectorAll('.product-box');
        productsBox.forEach(productBox => {
            if (productBox.getAttribute('id') === parent.dataset.id) {
                productBox.querySelector('.btn-product').disabled = false;
                productBox.querySelector('.btn-product').innerHTML = "add to bag";
            };
        });
        calcTotalPrices();
        navIcons();
    };
};

function priceItem(element) {
    const parent = element.parentElement;
    const amount = parent.querySelector('.amount-item');
    const parentOfParent = parent.parentElement;
    const itemPrice = parentOfParent.querySelector('.item-price');
    const priceProducts = cartContainer.querySelectorAll('.price-product');
    priceProducts.forEach(priceProduct => {
        if (priceProduct.getAttribute('id') === itemPrice.dataset.id) {
            itemPrice.innerHTML = Math.round(priceProduct.innerHTML.replace('$', "") * amount.innerHTML * 100) / 100;
        }
    });
    calcTotalPrices();
    navIcons();
}

function calcTotalPrices() {
    const prices = cartItemContainer.querySelectorAll('.item-price');
    let array = [];
    prices.forEach(price => {
        array.push(Math.round(price.innerHTML * 100) / 100);
    });
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    totalPriceItem.innerHTML = Math.round(sum * 100) / 100;
}

function navIcons() {
    const amounts = cartItemContainer.querySelectorAll('.amount-item');
    let array = [];
    amounts.forEach(amount => {
        array.push(parseInt(amount.innerHTML));
    });
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    notification.innerHTML = parseInt(sum);
}

clearAllBtn.addEventListener('click', () => {
    const cartItems = cartItemContainer.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        cartItem.remove();
        const productsBox = cartContainer.querySelectorAll('.product-box');
        productsBox.forEach(productBox => {
            productBox.querySelector('.btn-product').disabled = false;
            productBox.querySelector('.btn-product').innerHTML = "add to bag";
        });
    });
    navIcons();
})