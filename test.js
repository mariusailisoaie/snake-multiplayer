const numbers = [];


for (let i = 0; i < 100; i++) {
  const x = Math.floor(Math.random() * 20) * 20;
  numbers.push(x);
}

console.log(numbers.sort((a, b) => a - b));