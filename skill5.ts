// A different advice slip

// I'm unable to find fetchAdviceById. It seems maby you forgot to link to the example code? I know it is available in the video, but since I'm short of time I don't have time to search for it right now. Sorry.

// I will try to solve it anyway:

const fetchAdviceAndLog = (id: number) => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

fetchAdviceAndLog(1);
fetchAdviceAndLog(2);
fetchAdviceAndLog(3);
fetchAdviceAndLog(9999999);