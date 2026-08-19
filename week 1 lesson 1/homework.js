const firstName = "Daniel";
const favouriteNumber = 7;
const likesCoding = true;

console.log(`Hallo world and hallo Michail! My first name is ${firstName}, my favourite number is ${favouriteNumber} and I ${likesCoding ? "like" : "do not like"} coding.`);

const birthYear = 1975;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

console.log(`This year I will be ${age} years old.`);

const birthDate = new Date('1975-09-17');
const currentDate = new Date();
const ageInSeconds = currentDate - birthDate;
const realAge = Math.floor((ageInSeconds / (365*24*60*60))/1000);

console.log(`I'm currently ${realAge} years old.`);

const foods = ['pizza', 'eggs', 'pancakes'];
const student = {
  firstName: firstName,
  favouriteNumber: favouriteNumber,
  likesCoding: likesCoding,
  foods: foods,
};

console.log(student);
console.log(student.foods[2]);