import { removeFromCart, cart, saveToStorage} from '../data/cart.js';
import { products } from "../data/products.js";
import { formatPrice } from '../utils/money.js';
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const today = dayjs();
console.log(today);

updateCheckoutItemCount()
//Checkout item count
function updateCheckoutItemCount() {
    document.querySelector('.js-return-to-home-link').innerHTML = `${cart.length} ${cart.length > 1 ? 'Items' : 'Item'}`

}

function updateQuantityLabel(productId, qty){
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = qty;
}

const cartDisplayGridEl = document.querySelector(".js-order-summery");
let cartItemDisplayHTML = "";
cart.forEach((cartItem) => {
    const product = products.find(prod => prod.id === cartItem.id);

    cartItemDisplayHTML +=
        `
      <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${product.name}
                </div>
                <div class="product-price">
                  $${formatPrice(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}">${cartItem.qty} </span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link js-update-btn-${product.id} link-primary"
                  data-product-id=${product.id}
                  >
                    Update
                  </span>
                    <div class="update-quantity-container js-update-quantity-container-${product.id}">
                        <input class="update-quantity-input js-quantity-input-${product.id}" type="text"> 
                        <span class="link-primary save-link js-save-link"
                        data-product-id = ${product.id}
                        > Save </span>
                    </div>
                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id=${product.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
})

cartDisplayGridEl.innerHTML = cartItemDisplayHTML;



//Add listener update quantity button 
document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) =>{
    updateLink.addEventListener('click',() => {
        const productId = updateLink.dataset.productId;

        const quantityContainerEl = updateLink.parentElement.querySelector(`.js-update-quantity-container-${productId}`);
        const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        quantityContainerEl.classList.add('is-editing-quantity');
        quantityLabelEl.style.display = "none"

     
        quantityInput.value =   cart.find((cartItem) => cartItem.id === productId).qty;
        updateLink.classList.add('is-hidden');
       

    });
});

document.querySelectorAll('.js-save-link').forEach((saveBtn) =>{
    saveBtn.addEventListener('click', ()=>{
        const productId = saveBtn.dataset.productId;

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        cart.map((cartItem) =>{
            if(cartItem.id === productId){
                cartItem.qty = Number(quantityInput.value)
            }
     
            return cartItem;

        } );

       
        saveToStorage();





        const quantityContainerEl =  document.querySelector(`.js-update-quantity-container-${productId}`);
        const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
        const updatebutton = document.querySelector(`.js-update-btn-${productId}`);

        quantityContainerEl.classList.remove('is-editing-quantity');
        quantityLabelEl.style.display = "inline"
        updatebutton.classList.remove('is-hidden')

     
        quantityInput.value =   cart.find((cartItem) => cartItem.id === productId).qty;

        updateQuantityLabel(productId, quantityInput.value);
      
    });
});

//Add listener to delete buttons
document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {

    deleteLink.addEventListener('click', () => {
        const productId = deleteLink.dataset.productId;

        removeFromCart(productId);


        //Remove the item from the webpage
        document.querySelector(`.js-cart-item-container-${productId}`).remove();

        //UPdate checkout item count
        updateCheckoutItemCount()
    })
});







