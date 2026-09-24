
import { addToCart, cart, fetchFromLocalStorage } from "../../data/cart.js";

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