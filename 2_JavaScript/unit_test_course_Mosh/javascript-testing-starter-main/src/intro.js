// Lesson: Writing your first tests
export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAvg(nums) {
  if (nums.length === 0)
    return 'NaN'


  const result = nums.reduce((sum, num) => sum + num, 0) / nums.length
  return result;
}

export function factorialFunc(n){
  // if(n < 0) return 'Can not be negative value';
  // let result =1 ;
  // for (let i = 1; i <= n; i++) {
  //     result *= i;
    
  // }

  // return result;


  if(n< 0) return undefined;
  if(n===0 || n===1) return 1;
  return n * factorialFunc(n-1)
}



