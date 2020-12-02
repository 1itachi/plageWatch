// Naive fibonacci.
function fibonacci(n) {
  if (n <= 1) {
      return n;
  } else {
      return fibonacci(n-1) + fibonacci(n-2)
  }
}
// plagiarism in the test case
var copied1 = fibonacci(50);
console.log(copied1);