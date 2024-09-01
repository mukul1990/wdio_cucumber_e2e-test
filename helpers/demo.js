//ToDo add two integer numbers


export const add = function(a, b) {
    return a + b;
  };
  
  export const addFloat = function(a, b) {
    return a + b;
  };
  
  //ToDo find prime numbers between 1 and 100 and return them in an array in ascending order and refactor below code in javascript
 
  async function findPrimeNumbers() {
    const primeNumbers = [];
    for (let i = 2; i <= 100; i++) {
      let isPrime = true;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primeNumbers.push(i);
      }
    }
    return primeNumbers;
  }


  //ToDo find duplicates in an array
  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  export default factorial
  export  {findPrimeNumbers};






