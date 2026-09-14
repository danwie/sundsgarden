
const delayedMessage = async (message: string, delay: number): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return message;
};

delayedMessage("Hi after delay", 2000).then(result => console.log(result));
