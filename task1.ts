const flipCoin = async () : Promise<string> => {
  try {
    const outcome = await Promise.resolve(Math.random() > 0.5);
    return(outcome?"You win":"You lose");
  } catch (e) {
    return e;
  }
}
flipCoin().then(result => console.log(result));