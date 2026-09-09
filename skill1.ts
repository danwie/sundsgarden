// Order confirmation

type orderCallback = () => void;

const placeOrder = (item : string, callback : orderCallback) => {
  console.log(`Order placed for ${item}`);
  callback();
}

placeOrder("Pizza", () => {
    console.log("Thanks for you order");
});

// Sum with a named type

type SumCallback = (result : number) => void;

const sumNumbers = (a : number, b: number, callback : SumCallback) => {
  const result = a + b;
  callback(result);
}

sumNumbers(5,7,(result : number) => {
  console.log(result);
});