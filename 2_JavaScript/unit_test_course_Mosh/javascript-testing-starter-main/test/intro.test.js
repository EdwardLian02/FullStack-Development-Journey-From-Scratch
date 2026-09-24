import {describe, it, test, expect} from "vitest"
import { calculateAvg, factorialFunc, fizzBuzz, max } from "../src/intro";

describe('max', ()=>{
    it("Should return teh first argument if it is greater", ()=>{
        //AAA - parttern 
        //Arrange 
        //Act
        //Assert
        
        expect( max(2, 1)).toBe(2);

    });

    it('should return second argument if it is greater', ()=>{
        expect(max(1, 2)).toBe(2)
    });
    it('should return first argument if arguments are equal', ()=>{
        expect(max(1, 1)).toBe(1)
    });
});

describe('fizzBuzz', ()=>{


    it('should return Fizz if number is divisible by 3', ()=>{
        expect(fizzBuzz(3)).toBe('Fizz')
    });

    it('should return Buzz if number is divisible by 5', () => {
          expect(fizzBuzz(10)).toBe('Buzz')
    });

    it('should return FizzBuzz if number is divisible by both 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    });

    it('should return number string if not divisible by 3 and 5', ()=>{
        expect(fizzBuzz(17)).toBe('17')
    });
});


describe('Calculate average' , ()=>{

    it('should return num if only one number', ()=> {
        expect(calculateAvg([1])).toBe(1);
    })

    it('should return Nan if there is nothing in array', ()=>{
        expect(calculateAvg([])).toBe('NaN');
    })

    it('should return total sum of length 2 array', ()=>{
        expect(calculateAvg([2,2])).toBe(2)
    })
    it('should return total sum of length 2 array', ()=>{
        expect(calculateAvg([2,2, 2,4])).toBe(2.5)
    })

});


describe('Factorial function', ()=>{
    it('should return undefined if it is negative value', ()=>{
        expect(factorialFunc(-1)).toBe( undefined)
    });
    it('should return 1 if value is 0', ()=>{
        expect(factorialFunc(0)).toBe(1)
    });

    it('should return factorial value of 1', ()=> {
        expect(factorialFunc(1)).toBe(1)
    })
    it('should return factorial value of 5', ()=> {
        expect(factorialFunc(5)).toBe(120)
    })
    it('should return factorial value of 3', ()=> {
        expect(factorialFunc(3)).toBe(6)
    })

    

});
