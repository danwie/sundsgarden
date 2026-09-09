// Async callbacks

const countdown = (seconds : number, callback : () => void) => {
  setTimeout(() => {
    console.log("Time's up!");
    callback();
  },1000*seconds);
}

countdown(3, () => {
    console.log("Countdown finished");
});

// Delayed greeting

const delayedGreeting = (name : string, delay: number, callback : () => void) => {
  setTimeout(() => {
    console.log(`Hi ${name}, thanks for waiting!`);
    callback();
  },delay);
}

delayedGreeting("Bob", 1500, () => {
  console.log("Callback executed!");
});