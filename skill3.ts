// Temperature converter

type ConvertCallback = (celsius : number) => number;

const convertTemperature = (celsius : number, callback : ConvertCallback) => {
  return callback(celsius);
}

const farenheit = convertTemperature(10, (celsius : number) => {
    return celsius * 5; // not sure how to convert
});

const kelvin = convertTemperature(10, (celsius : number) => {
    return celsius * 8; // not sure how to convert
});

console.log(farenheit);
console.log(kelvin);

// Array processor with return value

type ReduceCallback = (accumulator : number, current : number) => number;

const processNumbers = (arr : number[], callback : ReduceCallback) => {
  let sum = 0;
  arr.forEach ((n : number) => {
    sum = callback(sum, n);
  });
  return sum;
}

const reduced = processNumbers([1,2,3,4,5], (accumulator, current) => {
  return accumulator + current
});
console.log(reduced);
