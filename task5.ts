const fetchAdviceWithID = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    if (!response.ok) {
      throw Error("Fetching error");
    }
    const data = await response.json();
    const advice = data.slip.advice;
    console.log(`Advice ID ${id} : ${advice}`);
  } catch (error) {
    console.log("Error fetching advice:" + error.message);
  }
};

fetchAdviceWithID(1);