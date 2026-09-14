const fetch2AdviceWithID = async (id1: number, id2: number): Promise<void> => {
  try {
    const response1 = await fetch(`https://api.adviceslip.com/advice/${id1}`);
    if (!response1.ok) {
      throw Error("Fetching error 1");
    }
    const data1 = await response1.json();

    const response2 = await fetch(`https://api.adviceslip.com/advice/${id2}`);
    if (!response2.ok) {
      throw Error("Fetching error 2");
    }
    const data2 = await response2.json();

    const advice1 = data1.slip.advice;
    const advice2 = data2.slip.advice;
    console.log(`Advice 1: ${advice1}`);
    console.log(`Advice 2: ${advice2}`);
  } catch (error) {
    console.log("Error fetching advice:" + error.message);
  }
};

fetch2AdviceWithID(1,2);