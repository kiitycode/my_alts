---
theme: default
layout: cover
background: ./projectimg.jpg
class: 'text-center'
css: 'styles.css'
---

<h1 class="mb-4">Welcome to Circle-17 JavaScript Presentation</h1>

<v-click>
  <div class="mt-8 space-y-2">
    <h4 class="text-blue-300 text-xl">A quick summary of topics covered in JS class</h4>
    <h4 class="text-blue-300 text-lg">Second semester, 2025</h4>
  </div>
</v-click>

<div class="absolute bottom-10 left-0 right-0 text-white">
  <div class="text-sm opacity-80">
    Presented by <span class="text-blue-300">Team Circle-17</span>
  </div>
  <div class="text-xs opacity-70 mt-2">
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.totalPages }}
  </div>
</div>

<v-click at="2">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: 'default'
---

<h3 class="mb-4">Circle Members</h3>

<v-click>
  <div class="grid grid-cols-2 gap-4 mt-8 transition-all duration-500">
    <div 
      v-for="member in members" 
      class="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300"
    >
      <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110">
        {{ member.initials }}
      </div>
      <span class="text-gray-200 transition-colors duration-300">{{ member.name }}</span>
    </div>
  </div>
</v-click>

<v-click at="2">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>

<script setup>
const members = [
  { name: 'Ogunwa Chioma', initials: 'OC' },
  { name: 'Ayodimeji Barakat', initials: 'AB' },
  { name: 'Bolumole Oluwatosin', initials: 'BO' },
  { name: 'Abiodun Elizabeth', initials: 'AE' },
  { name: 'Toluwalade Jesudarasimi', initials: 'TJ' },
  { name: 'Taiwo Saidat', initials: 'TS' },
  { name: 'Obasi Obinna', initials: 'OO' }
]
</script>

<style>
.slidev-layout ul,
.slidev-layout div {
  view-transition-name: slide-content;
}
</style>
---
layout: 'default'
---

<div class="card">
  <h3 class="text-xl text-blue-400 mb-4">Let's dive into our first month's learnings...</h3>

<h4 class="mb-4">Recommended Resources:</h4>
  <ul class="space-y-3">
    <v-clicks>
      <li><strong>Learning How To Learn</strong> <span class="text-gray-400">(Coursera - 4 weeks)</span></li>
      <li><strong>Frontend Handbook 2024</strong> <span class="text-gray-400">(Cody Lindley)</span></li>
      <li><strong>Refactoring UI</strong> <span class="text-gray-400">(Adam Wathan & Steve Schoger)</span></li>
      <li><strong>Building Large Scale Web Apps</strong> <span class="text-gray-400">(React Field Guide)</span></li>
    </v-clicks>
  </ul>
</div>

<v-click at="5">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: 'default'
---

<h3 class="mb-4">Functions</h3>

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4">
    A <em>Function</em> is a block of code designed to perform a particular task
  </h4>

  <h4 class="text-lg text-blue-400 mb-4">Key Characteristics:</h4>
  <ul class="space-y-3">
    <v-clicks>
      <li>Accepts <strong>parameters</strong> as input</li>
      <li>Can <strong>return</strong> values</li>
      <li>Helps organize code into <strong>reusable</strong> blocks</li>
      <li>Without return statement, yields <em>undefined</em></li>
    </v-clicks>
  </ul>
</div>

<v-click at="5">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Examples of Functions</h4>

```javascript
// Regular Functions only - a basic way to assign a task
function greet(name) {
    return 'Hello, $[name]';
}

// Arrow functions only - a very simple and concise syntax for creating functions.
const greet = (name) => {
    return 'Hello, $[name]';
};
```

<v-click at="1">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: 'default'
---

<h4 class="text-xl text-blue-400 mb-4">Cont'd</h4>

```js
// Practical use of Functions - A Shopping Cart Price Calculator
function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0); // Start with total = 0, then add each item's price
}

const myCart = [      // Example Cart with 3 items & 3 differnt prices
  { name: "Book", price: 10 }, 
  { name: "Pen", price: 2 },
  { name: "Notebook", price: 5 }
];

const grandTotal = calculateTotal(myCart);   // Calculates items in the cart as they are scanned and shows total cost of items
console.log(`Your total is $${grandTotal}`); // "Your total is $17"
```

<v-click at="1">
  <div class="absolute bottom-10 left-0 right-0 text-center">
    <div class="text-yellow-300 animate-pulse inline-block">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Arrays</h4>

<div class="card">
  <h4 class="text-l text-blue-400 mb-4">
    Arrays are ordered collections that store multiple values. Properties of arrays include:
  </h4>

  <ul class="space-y-3">
    <v-clicks>
      <li>Indexed from <strong>0</strong></li>
      <li>Can mix data types: (1, 'text', true)</li>
      <li>Dynamic size (grows/shrinks automatically)</li>
    </v-clicks>
  </ul>
</div>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Array Examples</h4>

```javascript
// Correct expressions of Arrays
const colors = ['red', 'green', 'blue'];
// Problematic
const numbers = [1, 2 3];  // Missing comma
const empty = [];
empty[0].name;  // Access undefined
```

<h4 class="text-xl text-blue-400 mb-4">Array Errors Explanations</h4>

<div class="card">
  <ol class="space-y-3">
    <v-clicks>
      <li>Syntax Error: <span style="color: #ff6600;">❌ Missing comma</span>(1, 2 3) → Crashes with "Unexpected number"</li>
      <li>Undefined Access: <span style="color: #ff6600;">❌ empty[0].name</span>Fails with "Cannot read property (name) of undefined"</li>
    </v-clicks>
  </ol>
</div>

<v-click at="1">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Array Methods are <em>functions</em> we can call on an array. Some essential methods include;</h4>

```js
// Transform Data with `map()`
  const numbers = [1, 2, 3];
  const doubled = numbers.map(num => num * 2); // [2, 4, 6] (Creates new array)

// Filter Data with `filter()`
  const scores = [80, 45, 90];
  const passing = scores.filter(score => score >= 70); // [80, 90] (Keeps matching items)

// Sum Data with `reduce()`
  const cart = [{price: 10}, {price: 2}];
  const total = cart.reduce((sum, item) => sum + item.price, 0); // 12 (Accumulates values)

// Find Data with `find()`
  const users = [{id: 1, name: 'Alice'}];
  const user = users.find(u => u.id === 1); // {id: 1, name: 'Alice'} (First match)
```

<v-click at="2">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Rest Parameters and Spread Operators</h4>
  <div class="card">
    <h4 class="text-xl text-blue-400 mb-4">Rest Parameters: allows a function to accept any number of arguments as an array. This is useful when you don’t know how many arguments will be passed in or when you want to simplify handling multiple inputs. 
    </h4>
    <ul class="space-y-3">
      <v-clicks>
        <li>The rest parameter is represented by three dots `…`</li>
        <li>A function can have only one rest parameter</li>
        <li>The rest parameter must be the last parameter in the function definition</li>
        <li>The rest parameter can not have a default value</li>
      </v-clicks>
    </ul>
  </div>

<v-click at="5">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Practical Usage of Rest Parameters: </h4>

  ```js
// 1. Collecting arguments
  function sumAll(...numbers) {  // Any number of arguments → array
  return numbers.reduce((sum, num) => sum + num, 0);
}
  console.log(sumAll(1, 2, 3));  // 6 (1+2+3)
  console.log(sumAll(5, 10));    // 15 (5+10)

// 2. Combining with regular parameters
  function orderPizza(size, ...toppings) {
  console.log(`Size: ${size}, Toppings: ${toppings.join(', ')}`);
}
orderPizza('Large', 'Mushrooms', 'Olives', 'Onions'); // "Take Size Order & Toppings: Large, Toppings: Mushrooms, Olives, Onions"
  ```

<v-click at="1">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Spread Operator(...)</h4>
<div class="card">
    <h4 class="text-xl text-blue-400 mb-4">Spread operator(...) works on expanding iterables such as arrays and objects. spread operators are used to make new copies or clones to be used in your code later on.
    </h4>
  </div>

<v-click at="1">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Practical usage of Spread Parameters & Rest Operators: </h4>

<v-click>
```js
// 1. Rest Parameter - When collecting arguments
function orderSandwich(bread, ...toppings) {
  console.log(`Bread: ${bread}, Toppings: ${toppings.join(', ')}`);  // Items are collected into an array and then stored
}
orderSandwich('Wheat', 'Lettuce', 'Tomato', 'Mayo'); // Output: "Bread: Wheat, Toppings: Lettuce, Tomato, Mayo"
```
</v-click>

<v-click>
```js
// When simulating unlimited numbers
  function calculateTotal(...prices) {
  return prices.reduce((total, p) => total + p, 0);
}
console.log(calculateTotal(5, 10, 15)); // Output: 30
```
</v-click>

<v-click at="3">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Cont'd</h4>

<v-click>
```js
// Spread operators - When combining arrays
  const teamA = ['John', 'Sarah'];
  const teamB = ['Mike', ...teamA]; 
  console.log(teamB); // ['Mike', 'John', 'Sarah'] Arrays have been combined
```
</v-click>

<v-click>
```js
// When cloning objects
  const user = { name: 'Alice', age: 30 };
  const userCopy = { ...user, age: 31 }; // Updates age
  console.log(userCopy); // Output: { name: 'Alice', age: 31 } A new data cloned 
```
</v-click>

<v-click>
```js
// When converting stings to arrays
  const greeting = "Hello";
  const chars = [...greeting]; 
  console.log(chars); // Output: ['H', 'e', 'l', 'l', 'o'] Strings have been converted to arrays
```
</v-click>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4">NB: A Simple way to differentiate between Rest Parameter and Spread Operator is:</h4>
    <ul class="space-y-3">
      <v-clicks>
        <li><strong>Rest:</strong> Think of a backpack collects items into one bag</li>
        <li>Rest parameters can only used in function parameters and their purpose is to collect individual elements in a single array</li>
        <br>
        <li><strong>Spread:</strong> Think of pouring marbles, they roll/spreads out individually</li>
        <li>Spread operators can be used array/object literals or function calls and their purpose is to unpack/expand arrays/objects</li>
      </v-clicks>
    </ul>
</div>

<v-click at="6">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Callback Functions</h4>

<div class="card">
<h4 class="text-xl text-blue-400 mb-4">A callback function is a function passed into another function as an argument which is then invoked inside the outer function to complete some kind of routine or action. It is mostly used in asynchronous operations eg JavaScript.
</h4>
</div>

<v-click>

```javascript
function callbackEx(message, yesFn, noFn) {
  let result = confirm(message);
  if (result) {
    yesFn();
  } else {
    noFn();
  }
}

callbackEx(
  'Continue?',
  () => console.log('User clicked OK'),
  () => console.log('User clicked Cancel')
);
```
</v-click>

<v-click at="2">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Event Handlers:</h4>

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4"> Event Handlers are functions that run in case of an event. We can set event handlers using three methods:
  </h4>

  <h4 class="text-xl text-blue-400 mb-4"> HTML Attribute (Inline)</h4>
   <ul class="space-y-3">
      <v-clicks>
        <li><strong>Pros:</strong> Allows quick prototyping</li>
        <br>
        <li><strong>Cons:</strong> It mixes HTML & JS and is hard to maintain</li>
      </v-clicks>
    </ul>
</div>

<v-click>
```html
<!-- Syntax -->
<element event="JavaScriptCode">

<!-- Example -->
<button onclick="alert('Button clicked!')">Click Me</button>
```

</v-click>

<v-click at="5">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4"> DOM Property</h4>
   <ul class="space-y-3">
      <v-clicks>
        <li><strong>Pros:</strong> Seperates HTML & JS and uses a simple syntax command</li>
        <br>
        <li><strong>Cons:</strong> It allows only one handler per event</li>
      </v-clicks>
    </ul>
</div>

<v-click>
```js
// Syntax
element.eventType = function() { /* handler */ };
// Example
<button id="myBtn">Click Me</button>
<script>
  const btn = document.getElementById('myBtn');
  btn.onclick = function() {
    alert('Button clicked!');
  };
</script>
```
</v-click>

<v-click at="5">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4"> addEventListener (Recommended)</h4>
   <ul class="space-y-3">
      <v-clicks>
        <h4 class="text-xl text-blue-400 mb-4">Pros: </h4>
        <li>Allows multiple handlers per event</li>
        <li>Allows more control (capturing/bubbling phases)</li>
        <li>Remove handlers with `removeEventListener`</li>
      </v-clicks>
    </ul>
</div>

<v-click>
```js
// Syntax 
element.addEventListener(eventType, handler);
// Example
<button id="myBtn">Click Me</button>
<script>
  const btn = document.getElementById('myBtn');
  btn.addEventListener('click', function() {
    alert('Button clicked!');
  });
</script>
```
</v-click>

<v-click at="6">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Promises</h4>

<div class="card">
    <h4 class="text-xl text-blue-400 mb-4">Promise is an API that is a cleaner way of handling asynchronous operations. It represents the future result of an asynchronous operation, a future we do not know. Promises are used to prevent callback hell or pyramid of doom. A promise has 3 states</h4>
    <ul class="space-y-3">
      <v-clicks>
        <li>Pending: operation in progress</li>
        <li>Fulfilled: success</li>
        <li>Rejected: error</li>
      </v-clicks>
    </ul>
</div>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Cont'd</h4>

<v-clicks>
```javascript
// Basic syntax for a promise
const promise = new Promise((resolve, reject) => {
  // Async operation here
  if (success) resolve("Success value");
  else reject("Error reason");
});
// A practical example that simulates ordering of food online
const orderFood = new Promise((resolve, reject) => {
  const isKitchenOpen = true;
  setTimeout(() => {
    isKitchenOpen 
      ? resolve("🍔 Burger ready!") 
      : reject("🚪 Kitchen closed");
  }, 2000); // Simulate 2 sec delay
});
// Handle result
orderFood
  .then(food => console.log(food)) // Success case
  .catch(error => console.log(error)); // Error case
```
</v-clicks>

<v-click at="1">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Quick Notes</h4>

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4">In JavaScript, everything is truthy except for these 6 specific values that are considered falsy. These falsy values are:</h4>
    <ul class="space-y-3">
      <v-clicks>
        <li>false — the boolean value false.</li>
        <li>0 — the number zero.</li>
        <li>"" (empty string) — an empty string.</li>
        <li>null — the absence of any object value.</li>
        <li>undefined — a variable that has been declared but not assigned a value.</li>
        <li>NaN — "Not-a-Number", a value that represents an invalid number.</li>
      </v-clicks>
    </ul>
</div>

<v-click at="7">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Async/Await</h4>

<div class="card">
  <h4 class="text-xl text-blue-400 mb-4">The addition of the keyword ‘async’ to any regular function automatically converts that function to a ‘promise’ and then we ‘await’ the data.</h4>
  <h4 class="text-xl text-blue-400 mb-4">Example:</h4>
</div>

<v-click>
```js
// Simple marriage proposal example
async function proposal() {
  const answer = await askQuestion("Will you marry me?");
  console.log(answer); // Prints "Yes!" or "No..."
}
// Simulate asking a question (returns a promise)
function askQuestion(question) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Yes!"), 1000); // Simulate delay
  });
}
// Call the function
proposal();
```
</v-click>

<v-click at="2">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Important Points</h4>

<div class="card">
  <ul class="space-y-3">
    <v-clicks>
      <li>Global Await allows the use of (await) outside (async). It is a modern innovation as opposed to the Immediately Invoked Function (IIF) used in the past.</li>
      <li>Async/Await does not allow proper error catching unlike promises. It uses try and catch</li>
    </v-clicks>
  </ul>
</div>

<v-click>
```js
async function getTodo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const todo = await response.json();
    console.log(todo); // { userId: 1, id: 1, title: "...", completed: false }
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}
// Call the function
getTodo();
```
</v-click>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <h5 class="text-xl text-blue-400 mb-4">An API (Application Programming Interface) is a set of rules and protocols that allows one piece of software or system to communicate with another.</h5>
  <h5 class="text-xl text-blue-400 mb-4">In simple terms: an API is like a Menu in a Resturant</h5>
    <ul class="space-y-3">
      <v-clicks>
        <li>The menu shows you what dishes (functions/data) you can order (use).</li>
        <li>When you place your order (make a request), the kitchen (the system/server) prepares it and brings it back to you (response).</li>
        <li>You don’t need to know how the kitchen works—you just use the menu (API) to interact with it.</li>
      </v-clicks>
    </ul>
    <h5 class="text-xl text-blue-400 mb-4">Making API Calls allows us to:</h5>
    <ul class="space-y-3">
      <v-clicks>
        <li>Get or send data from/to a server</li>
        <li>Authenticate users.</li>
        <li>Interact with Databases.</li>
        <li>Trigger actions (like sending emails or starting a process).</li>
      </v-clicks>
    </ul>
</div>

<v-click at="8">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">Making Network Requests</h4>

<div class="card">
  <ul class="space-y-3">
    <v-clicks>
      <li>In JavaScript the XML-Http Request is an API that can be used to make network requests. Although this API is no longer in use because it does not support ‘Promise’.</li>
      <li>Fetch is a modern JavaScript API for making network requests that allows you to submit forms/order, load user information, receive server updates and make any HTTP request.</li>
    </v-clicks>
  </ul>
</div>

<v-click>
```js
// Basic syntax to GET request
fetch('https://api.example.com/data') // Starts the request
  .then(res => res.json())            // Converts response to JSON
  .then(data => console.log(data))    // Handles the Data
  .catch(err => console.error('Error:', err)); // Catches any error
```
</v-click>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">GET and POST Request</h4>

<div class="card">
  <v-clicks>
    <h4 class="text-xl text-blue-400 mb-4">GET Request is a way of fetching information from a url. (illustrated in previous slide)</h4>
    <h4 class="text-xl text-blue-400 mb-4">POST Request: This sends the browser an information. The browser can not make a pOST request as its first request. An example of a post request is filling a sign up form which sends your details to the browser for storage enabling you to log in with those same details.</h4>
  </v-clicks>
</div>

<v-click>
```js
// Basic syntax POST example
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```
</v-click>

<v-click at="4">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<h4 class="text-xl text-blue-400 mb-4">DOcument: DOM, CSSOM, BOM</h4>

<div class="card">
  <v-clicks>
    <h4 class="text-xl text-blue-400 mb-4">DOM is simply a representation of all HTML contents in JavaScript. It is a tree-like structure made up of HTML tags.</h4>
      <ul class="space-y-3">
        <li>Tree representation of HTML/XML documents</li>
        <li>JavaScript can manipulate DOM to change content/structure</li>
        <li>Example: document.getElementById()</li>
        <li>Events: Click, submit, keypress handlers</li>
      </ul>
  </v-clicks>
</div>

<v-click at="3">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <v-click>
    <h4 class="text-xl text-blue-400 mb-4">CSSOM is an interface between CSS and JavaScript. It allows JavaScript to interact with CSS.</h4>
      <ul class="space-y-3">
        <li>Tree representation of CSS styles</li>
        <li>Works with DOM to form Render Tree</li>
        <li>Controls visual styling through JavaScript</li>
        <li>Example: element.style.backgroundColor</li>
      </ul>
  </v-click>
</div>

<v-click at="2">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: default
---

<div class="card">
  <v-click>
    <h4 class="text-xl text-blue-400 mb-4">BOM is the interface between the browser and JavaScript. It allows JavaScript to interact with the browser.</h4>
      <ul class="space-y-3">
        <li>Browser-level objects beyond the document</li>
        <li>Includes: window (global object), navigator (browser info), location (URL handling), localStorage (client-side storage)</li>
        <li>Example: window.open()</li>
      </ul>
  </v-click>
</div>

<v-click at="2">
  <div class="absolute bottom-10 text-center w-full">
    <div class="text-yellow-300 animate-pulse">
      ↓ Scroll to continue ↓
    </div>
  </div>
</v-click>
---
layout: center
class: 'text-center'
background: ./projectimg.jpg
---

<h1 class="text-4xl font-bold mb-8 text-white drop-shadow-lg">Key Takeaways</h1>

<div class="grid grid-cols-2 gap-8 mx-auto max-w-4xl">
  <div class="bg-gray-800/80 p-6 rounded-xl border border-blue-500/30">
    <h3 class="text-blue-300 text-xl mb-4">What We Covered</h3>
    <ul class="text-left space-y-3 text-gray-200">
      <v-clicks>
        <li>Core JavaScript Concepts</li>
        <li>Functions & Array Methods</li>
        <li>Async Patterns (Callbacks → Async/Await)</li>
        <li>DOM Manipulation & Browser APIs</li>
        <li>Network Requests with Fetch</li>
      </v-clicks>
    </ul>
  </div>

  <div class="bg-gray-800/80 p-6 rounded-xl border border-blue-500/30">
    <h3 class="text-blue-300 text-xl mb-4">Next Steps</h3>npm
    <ul class="text-left space-y-3 text-gray-200">
      <v-clicks>
        <li>Build Projects to Practice</li>
        <li>Explore Frameworks (React, Vue)</li>
        <li>Learn Advanced Patterns</li>
      </v-clicks>
    </ul>
  </div>
</div>

<v-click>
<div class="mt-12 text-white">
  <h2 class="text-2xl mb-2">Thank You!</h2>
  <p class="opacity-80">Team Circle-17 • JavaScript Fundamentals • 2025</p>
</div>
</v-click>

<style>
.slidev-layout.center {
  background-size: cover;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>
