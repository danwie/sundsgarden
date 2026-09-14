const fetchAdvice = async (): Promise<void> => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice`);
    const data = await response.json();
    const advice = data.slip.advice;
    console.log(`${advice}`);
  } catch (error) {
    console.log("Error fetching advice:" + error.message);
  }
};

fetchAdvice();