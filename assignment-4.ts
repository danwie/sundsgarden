// Uppercase Callback

type uppercaseTextFunction = (s : string) => void;

const uppercaseLater = (s : string, f : uppercaseTextFunction) => {
  setTimeout(() => {
    f(s.toUpperCase());
  },
  1000);
}

const uppercaseText = (s : string) => {
  console.log(s);
};

uppercaseLater("hello world",uppercaseText);