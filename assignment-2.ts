// Delayed Greeting

type sayHalloFunction = (message : string) => void;

const sayHelloLater = (f : sayHalloFunction) => {
  setTimeout(() => {
    f("Hi, I'm late");
  },
  2000);
}

const sayHallo = (msg : string) => {
  console.log(msg);
};

sayHelloLater(sayHallo);