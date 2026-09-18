export let cart = JSON.parse(localStorage.getItem('cart') ) ||  []

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){

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
      })
    }

    saveToStorage(cart);
}


export function removeFromCart(productid){
    cart = cart.filter((cartItem) => cartItem.id !== productid);
    saveToStorage(cart);
}


export function getCartQty (){
    return 
}
