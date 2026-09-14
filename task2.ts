
const myPromise = async () : Promise<string> => {
  try {
    const success = true;
    const outcome = await Promise.resolve(success);
    return(outcome?"Resolved operation successfully!":"Resolved operation rejected!");
  } catch (e) {
    return "rejected reason:" + e.message;
  }
}
myPromise().then(result => console.log(result));
