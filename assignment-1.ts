// Hello Callback

type helloFunction = (message : string) => void;

const sendMessage = (f : helloFunction) => {
  setTimeout(() => {
    f('Hello from callback');
  },
  1000);
}

const logMessage = (msg : string) => {
  console.log(msg);
};

sendMessage(logMessage);