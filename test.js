const numbers = [];

for (let i = 0; i < 100; i++) {
  let randomNumber = Math.random() * 256;
  randomNumber = Math.floor(randomNumber);
  numbers.push(randomNumber);
}

console.log(numbers.sort((a, b) => a - b));

// console.log(Math.floor());

/*


for (let i = 0; i < 100; i++) {
  const x = Math.floor(Math.random() * 20) * 20;
  numbers.push(x);
}

*/