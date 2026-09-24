import { products } from "../data/products.js";
import { formatPrice } from "../utils/money.js";




function Cart(localStorageKey) {

    const cart = {
        cartItems: undefined,
        fetchFromLocalStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
                {
                    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    qty: 1,
                    deliveryOptionId: '1'
                },

            ]
        },
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(cart));
        },
        addToCart(productId, selectedQty = 1) {

            let product = this.cartItems.find(prod => prod.id === productId);

            //Added to cart
            if (product) {
                product.qty += selectedQty;
            } else {
                this.cartItems.push({
                    id: productId,
                    qty: selectedQty,
                    deliveryOptionId: "1"
                })
            }

            saveToStorage(this.cartItems);
        },
        removeFromCart(productid) {
            this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== productid);
            this.saveToStorage(this.cartItems);
        },
        changeDeliveryOption(productId, newDeliOptionId) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.id === productId) {
                    cartItem.deliveryOptionId = newDeliOptionId;
                }
            })

            //save cart update to local storage. 
            this.saveToStorage();
        },

        getCartQty() {
            return this.cartItems.length;
        }
        ,
        getCartItemSummeryPrice() {
            let summeryPrice = 0;
            this.cartItems.forEach((cartItem) => {
                const qty = cartItem.qty;
                const product = products.find((pro) => pro.id === cartItem.id);
                summeryPrice += product.priceCents * qty;
            });

            return formatPrice(summeryPrice);
        }


    }

    return cart;

}


// const cart = Cart('cart')
// const businessCart = Cart('cart-business')

// cart.fetchFromLocalStorage();
// businessCart.fetchFromLocalStorage();

// console.log(cart)
// console.log(businessCart);

