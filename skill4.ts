// Your own promise

const checkStock = new Promise((resolve, reject) => {
  console.log("inside executor function");
  const inStock = true;
  if (inStock) {
    resolve("in stock");
  } else {
    reject("not in stock");
  }
});

checkStock
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(message);
  });
console.log("main script");

// Not sure how to type. If I write "message : string" then I get a warning.

// "inside executor function" will be logged when promise is fulfilled. "main script" will be logged synchronously.
// in this code the promise is fulfilled without a delay, so it will be logged before "main script"

// Tracing execution order
// I'm unable to find the myPromise example. No example code was attached to the assignment.