 import { removeFromCart, cart,getCartQty, saveToStorage, changeDeliveryOption, getCartItemSummeryPrice } from '../data/cart.js';
import { products, getProduct} from "../data/products.js";
import { deliveryOption, getDeliveryOption } from '../data/deliveryOptions.js';
import { formatPrice } from '../utils/money.js';

import timeFormatter from '../utils/timeFormat.js';



function renderPaymentSummary(){
    console.log(cart)
    let totalItemCost = 0;
    let shippingHandlingCost = 0;
    let paymentSummaryHTML = "";
    let totalBeforeTax = 0;

    cart.forEach((cartItem) => {
        //get total item cost
        const product = getProduct(cartItem.id);
        if(!product) return;
        totalItemCost += product.priceCents * cartItem.qty;

        //Get shipping total 
        const deliOpt = getDeliveryOption(cartItem.deliveryOptionId)
        if(!deliOpt) return;
        shippingHandlingCost += deliOpt.priceCents;


        totalBeforeTax = totalItemCost + shippingHandlingCost;

    })    

    paymentSummaryHTML = `
    
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-order-summery-item-count-display">Items (${cart.length}):</div>
            <div class="payment-summary-money js-payment-summery-money">$${formatPrice(totalItemCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatPrice(shippingHandlingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax*0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax*0.9)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;



    
}

export default renderPaymentSummary;


