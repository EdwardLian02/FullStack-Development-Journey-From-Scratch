
import { addToCart, cart, changeDeliveryOption, fetchFromLocalStorage, removeFromCart } from "../../data/cart.js";

describe('Test suit: addToCart function', ()=> {

    it("Adding existing product to the cart", ()=>{
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                    qty: 1, 
                    deliveryOption: '1'   
                }
            ]);

        });

        fetchFromLocalStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
         expect(cart.length).toEqual(1);
         expect(cart[0].qty).toEqual(2);
         expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    });

    it("Adding a product to the cart", ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([])
        });
        fetchFromLocalStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].qty).toEqual(1);
    }); 

});


describe('Removing item from cart', ()=>{

    it('Should successfully remove from cart', ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                  {
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                    qty: 1, 
                    deliveryOption: '1'   
                }
            ]);
        });

        fetchFromLocalStorage();
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);   

    }) 
    
    it('should display error if remove something that doesn\'t exist ', ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                 {
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                    qty: 1, 
                    deliveryOption: '1'   
                }

            ]);
        });

        fetchFromLocalStorage();
        removeFromCart('wrong-id-test');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)

    });

});


describe('changeDeliveryOption function', ()=>{
    it('should update old delivery option id with new deliveryOptionId',()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
                return JSON.stringify([
                    {
                        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                        qty: 1, 
                        deliveryOptionId: '1'   
                    }

                ]);
            });

        fetchFromLocalStorage();
        expect(cart[0].deliveryOptionId).toEqual('1')
        changeDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',  '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('2');
    });

    it('should update nothing if productId is not exist',()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
                return JSON.stringify([
                    {
                        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                        qty: 1, 
                        deliveryOptionId: '1'   
                    }

                ]);
            });

        fetchFromLocalStorage();
        expect(cart[0].deliveryOptionId).toEqual('1')
        changeDeliveryOption('wrong-product-Id',  '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
    })

});