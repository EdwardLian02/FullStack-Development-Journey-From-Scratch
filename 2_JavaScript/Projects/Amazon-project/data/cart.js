export const cart = [];


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
}