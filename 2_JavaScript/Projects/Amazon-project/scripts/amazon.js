import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let productGridEl = document.querySelector('.js-product-grid');

let productGridHtml = "";

//display cart qty at first load
updateCartQty();

products.forEach((product) => {
  productGridHtml += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-query-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>


          <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

productGridEl.innerHTML = productGridHtml;


function updateCartQty(){

    //Get cart QTY
    let cartQty = 0;
    cart.forEach((item) => {
      cartQty += item.qty;
    });

    //display cart qty
    document.querySelector('.js-cart-quantity').innerHTML = cartQty;
}

function displayAddedToCartMessage(productId){
 //Display Added to Cart message
    const addToCartMsgEl =  document.querySelector(`.js-added-to-cart-message-${productId}`);
    addToCartMsgEl.classList.add("visible");
    setTimeout(() => {
      addToCartMsgEl.classList.remove('visible');

    }, 1000);
}

document.querySelectorAll('.js-add-to-cart-btn').forEach((btn) => {

  const productId = btn.dataset.productId;
  btn.addEventListener('click', () => {
     //get selected qty
      const selectedQty = Number(document.querySelector(`.js-query-selector-${productId}`).value);


    addToCart(productId, selectedQty);

    updateCartQty();

    displayAddedToCartMessage(productId);
   
  })
});



