// --- Skill 1: Union Types (| means OR)

// ID Card
type IDType = number | string;
const showID = (id : IDType) : string => {
  return `Your ID is: ${id}`;
}
console.log(showID("Arnold"));
console.log(showID(123));

// Fruit Basket
type Fruit = "apple" | "banana" | "orange";
const eatFruit = (f : Fruit) : string => {
  return `You ate an ${f}.`;
}
console.log(eatFruit("apple"));
console.log(eatFruit("banana"));

// --- Skill 2: Interfaces & Type Aliases (& means AND)

// Book Interface
interface Book {
  title: string;
  pages: number;
}

const describeBook = (b : Book) : string => {
  return `The book Dune has ${b.pages} pages.`;
}

console.log(describeBook({
  title : "Typescript for dummies",
  pages : 1234,
}));

// Combining Interfaces
interface Teacher {
  name: string;
  subject: string;
}
interface Employee {
  id: number;
  email: string;
}
type SchoolTeacher = Teacher & Employee;

const printTeacherInfo = (t : SchoolTeacher) => {
    console.log(`${t.name}, id:${t.id}, teaches ${t.subject} and can be contacted at ${t.email}`);
}

printTeacherInfo({
  name : "Larry",
  subject: "Math",
  id: 1,
  email: "larry@gmail.com"
});

// --- Skill 3: Enums (fixed list of options)

// Color Picker
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

const showColor = (c : Color) : string => {
  return `You chose ${c}`
}

console.log(showColor(Color.Red));
console.log(showColor(Color.Green));
console.log(showColor(Color.Blue));

// Pizza Order

enum PizzaSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

const orderPizza = (p : PizzaSize) : string => {
  return `You ordered a ${p} pizza.`;  
}

console.log(orderPizza(PizzaSize.Small));
console.log(orderPizza(PizzaSize.Medium));
console.log(orderPizza(PizzaSize.Large));

// --- Skill 4: Generics (<T> means reusable placeholder)

// Wrap It Up

const wrapInArray = <T>(input1: T): T[] => {
  return [input1];
};

console.log(wrapInArray("cat"));
console.log(wrapInArray(10));

// First in Line

const firstItem = <T>(input1: T[]): T => {
  return input1[0];
};

console.log(firstItem([1, 2, 3]));
console.log(firstItem(["a", "b", "c"]));
