import { formatPrice } from "../utils/money.js";

describe('Suit: formatPrice', () =>{
    it("Convert cents into dollars", ()=>{
        expect(formatPrice(2095)).toEqual('20.95');
    });

    it("Works with 0", ()=>{
        expect(formatPrice(0)).toEqual('0.00')
    })

    it('Rounds up to the nearest cent', ()=>{
        expect(formatPrice(2000.5)).toEqual('20.01')
    })
})