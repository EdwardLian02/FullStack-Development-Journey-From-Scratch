import { removeFromCart, cart,getCartQty, saveToStorage, changeDeliveryOption, getCartItemSummeryPrice } from '../data/cart.js';
import { products } from "../data/products.js";
import { deliveryOption } from '../data/deliveryOptions.js';
import { formatPrice } from '../utils/money.js';
import timeFormatter from '../utils/timeFormat.js';
import renderPaymentSummary from './payment_summary.js';


function renderingOrderSummary(){

    
    // updateCheckoutItemCount()
    
    
    //Checkout item count
    function updateCheckoutItemCount() {
        document.querySelector('.js-return-to-home-link').innerHTML = `${cart.length} ${cart.length > 1 ? 'Items' : 'Item'}`
    
    }
    
    //update quantity label 
    // function updateQuantityLabel(productId, qty) {
    //     document.querySelector(`.js-quantity-label-${productId}`).innerHTML = qty;
    // }
    
    const cartDisplayGridEl = document.querySelector(".js-order-summery");
    
    let cartItemDisplayHTML = "";
    
    function deliveryOptionHTML(product, cartItem) {
        let html = ""
        deliveryOption.forEach((option) => {
        
                html += `
                    <div class="delivery-option" 
                    data-option-id="${option.id}"
                    data-product-id = "${product.id}"
                    >
                          <input type="radio"  ${option.id === cartItem.deliveryOptionId ? 'checked' : ''}
                            class="delivery-option-input"
                            name="delivery-option-${product.id}">
                          <div>
                            <div class="delivery-option-date">
                              ${timeFormatter(option.deliveryDays)}
                            </div>
                            <div class="delivery-option-price">
                               ${option.priceCents === 0 ? 'Free Shipping' : `$${formatPrice(option.priceCents)} - Shipping`}
                            </div>
                          </div>
                    </div>
                `
            });
    
            return html;
    }
    
    
    
    
    //Generate Cart 
    cart.forEach((cartItem) => {
        const product = products.find(prod => prod.id === cartItem.id);
    
       
        const deliOption = deliveryOption.find((opt)  => opt.id === cartItem.deliveryOptionId);
    
    
    
        cartItemDisplayHTML +=
            `
          <div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">
                  Delivery date: ${timeFormatter(deliOption.deliveryDays)}
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
                   
                    ${ deliveryOptionHTML(product, cartItem)}
                    
                    </div>
                  </div>
                </div>
              </div>
        `;
    })
    
    cartDisplayGridEl.innerHTML = cartItemDisplayHTML;
    
    
    //Add CHANGES listener -> delivery option. 
    document.querySelectorAll('.delivery-option').forEach((option) => {
        option.addEventListener('change', () => {
            const productId = option.dataset.productId;
            const deliOptionId = option.dataset.optionId;
    
            //Change 
            changeDeliveryOption(productId, deliOptionId);

            //
            renderingOrderSummary();
            //update payment 
            renderPaymentSummary();
        })
    });
    
    //Add listener update quantity button 
    document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const productId = updateLink.dataset.productId;
    
            const quantityContainerEl = updateLink.parentElement.querySelector(`.js-update-quantity-container-${productId}`);
            const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    
            quantityContainerEl.classList.add('is-editing-quantity');
            quantityLabelEl.style.display = "none"
    
    
            quantityInput.value = cart.find((cartItem) => cartItem.id === productId).qty;
            updateLink.classList.add('is-hidden');
    
    
        });
    });
    
    
    //Add listener to all save link
    document.querySelectorAll('.js-save-link').forEach((saveBtn) => {
        saveBtn.addEventListener('click', () => {
            const productId = saveBtn.dataset.productId;
    
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    
            cart.map((cartItem) => {
                if (cartItem.id === productId) {
                    cartItem.qty = Number(quantityInput.value)
                }
    
                return cartItem;
    
            });
    
    
            saveToStorage();
    
    
            const quantityContainerEl = document.querySelector(`.js-update-quantity-container-${productId}`);
            const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
            const updatebutton = document.querySelector(`.js-update-btn-${productId}`);
    
            quantityContainerEl.classList.remove('is-editing-quantity');
            quantityLabelEl.style.display = "inline"
            updatebutton.classList.remove('is-hidden')
    
    
            quantityInput.value = cart.find((cartItem) => cartItem.id === productId).qty;
            
            renderingOrderSummary();
            // updateQuantityLabel(productId, quantityInput.value);

                   //update payment 
            renderPaymentSummary();
    
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

            //update payment 
            renderPaymentSummary();
        })
    });
    
}  

export default renderingOrderSummary;
