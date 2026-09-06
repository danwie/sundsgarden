// Pizza Order

type orderStatusFunction = () => void;

const pizzaStatus = (status : orderStatusFunction) => {
  setTimeout(() => {
    status();
  },
  3000);
}

const orderStatus = () => {
  console.log('Your pizza is ready');
};

pizzaStatus(orderStatus);