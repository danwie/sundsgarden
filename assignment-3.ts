// Math Callback

type showResultFunction = (n : number) => void;

const calculateLater = (a : number, b : number, s : showResultFunction) => {
  setTimeout(() => {
    s(a + b);
  },
  1000);
}

const showResult = (n : number) => {
  console.log(n);
};

calculateLater(5,7,showResult);