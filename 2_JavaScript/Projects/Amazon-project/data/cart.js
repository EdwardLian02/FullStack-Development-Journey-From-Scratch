import { products } from "../data/products.js";
import { formatPrice } from "../utils/money.js";

export let cart ;

fetchFromLocalStorage();
export function fetchFromLocalStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
      qty: 1, 
      deliveryOptionId: '1'
    }
]
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selectedQty = 1) {

  let product = cart.find(prod => prod.id === productId);
 
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
