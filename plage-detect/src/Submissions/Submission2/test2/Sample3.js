// Fibonacci iterative.
function fibonacci(n) {
  // memoization array
  let arr = [0,1];
      for (let i = 2; i < n + 1; i++) {
          arr.push(arr[i-2] + arr[i-1])
      }
      return arr[n];
}
// plagiarism in the test case
let copy1 = fibonacci(50);
console.log(copy1);