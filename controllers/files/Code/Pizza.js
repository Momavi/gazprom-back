const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pizzas = [
  { name: "Margherita", price: 5.99 },
  { name: "Pepperoni", price: 6.99 },
  { name: "Hawaiian", price: 7.99 },
  { name: "Supreme", price: 8.99 }
];

let customerOrder = [];

console.log("Welcome to our pizza shop!");

const showMenu = () => {
  console.log("\nHere is our menu:");
  pizzas.forEach((pizza, i) => {
    console.log(`${i + 1}. ${pizza.name} ($${pizza.price})`);
  });
  console.log("5. Show my order");
  console.log("6. Checkout");
};

const askQuestion = () => {
  rl.question("What would you like to do? ", answer => {
    if (answer >= 1 && answer <= 4) {
      customerOrder.push(pizzas[answer - 1]);
      console.log(`You added a ${pizzas[answer - 1].name} pizza to your order.`);
    } else if (answer == 5) {
      console.log("Here is your order so far:");
      customerOrder.forEach((pizza, i) => {
        console.log(`${i + 1}. ${pizza.name} ($${pizza.price})`);
      });
    } else if (answer == 6) {
      let total = customerOrder.reduce((sum, pizza) => sum + pizza.price, 0);
      console.log(`Your total is $${total.toFixed(2)}. Thank you for your order!`);
      rl.close();
      return;
    } else {
      console.log("Sorry, I don't understand. Please enter a number between 1 and 6.");
    }
    showMenu();
    askQuestion();
  });
};

showMenu();
askQuestion();
