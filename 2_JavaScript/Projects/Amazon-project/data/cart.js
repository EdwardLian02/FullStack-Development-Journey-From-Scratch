import { products } from "../data/products.js";
import { formatPrice } from "../utils/money.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || []

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

  let product = cart.find(prod => prod.id === productId);
  //get selected qty
  const selectedQty = Number(document.querySelector(`.js-query-selector-${productId}`).value);


  //Added to cart
  if (product) {
    product.qty += selectedQty;
  } else {
    cart.push({
      id: productId,
      qty: selectedQty,
      deliveryOptionId: "1"
    })
  }

  saveToStorage(cart);
}


export function removeFromCart(productid) {
  cart = cart.filter((cartItem) => cartItem.id !== productid);
  saveToStorage(cart);
}


export function changeDeliveryOption(productId, newDeliOptionId) {
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.deliveryOptionId = newDeliOptionId;
    }
  })

    //save cart update to local storage. 
    saveToStorage();
}


export function getCartQty() {
  return cart.length;
}


export function getCartItemSummeryPrice(){
  let summeryPrice = 0;
    cart.forEach((cartItem) => {
        const qty = cartItem.qty;
        const product = products.find((pro) => pro.id === cartItem.id);
        summeryPrice += product.priceCents * qty;
    });

   return formatPrice(summeryPrice);
}
