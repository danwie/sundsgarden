// SKILL 1

// Student profile
interface Student {
  name: string,
  age: number,
  isEnrolled?: boolean,
}

const s : Student = {
  name : "Michiel",
  age : 47,
}

const describeStudent = (s : Student) => {
  console.log(`${s.name} is ${s.age} years old.`);
}

describeStudent(s);

// Greeting with options
const formatGreeting = (name: string, formal?: boolean) => {
  return formal?`Good day, ${name}.`:`Hi, ${name}`;
}

console.log(formatGreeting('Daniel'));
console.log(formatGreeting('Daniel', true));

// SKILL 2

// Doubling ages
const ages : number[] = [1,2,3,4,5];
const agesInFiveYears = ages.map(n => n + 5);
console.log(ages);
console.log(agesInFiveYears);

// Filtering names
const names : string[] = ["Bob", "Donald", "Ricky", "Michael", "Sven"];
const shortNames = names.filter(n => n.length <= 4);
console.log(shortNames);

// SKILL 3

// Book interface
interface Book {
  title: string,
  author: string,
  pages: number,
}

const b : Book = {
  title : "The Bible",
  author : "God",
  pages : 1500,
}

console.log(b.title);

// Nested and optional properties
interface Address {
  city: string,
  postalCode? : string,
}

interface Person {
  name: string,
  age: number,
  address: Address
}

const p1 : Person = {
  name : "Stefan",
  age: 35,
  address: {
    city: "Stockholm"
  }
}

const p2 : Person = {
  name : "Dolly",
  age: 80,
  address: {
    city: "Tennessee",
    postalCode: "38589",
  }
}

console.log(p1.address.city);
console.log(p2.address.city);

// SKILL 4

// Filter only
interface Product {
  id: number,
  name: string,
  price: number,
  tags: string[],
}

const products : Product[] = [
  { id: 1, name: "Banana", price: 5, tags: ["fruits", "yellow"] },
  { id: 2, name: "Blueberry", price: 0.1, tags: ["fruits", "blue"] },
  { id: 3, name: "Bottle of water", price: 10, tags: ["drinks", "transparent"] },
  { id: 4, name: "Diamond", price: 100000, tags: ["accessories", "transparent"] },
]

const cheapProducts = products.filter((p) => p.price < 1000);
console.log(cheapProducts);

// Filter + Map

const fruitProducts = products.filter((p) => p.tags.indexOf('fruits') >= 0).map((p) => p.name);
console.log(fruitProducts);