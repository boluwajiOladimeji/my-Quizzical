function shuffleArray(array) {
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[randIndex];
    array[randIndex] = temp;
  }
  return array;
}

const changeResults = (arr) => {
  const newArr = arr.map((item) => {
    let options = [...item.incorrect_answers, item.correct_answer];
    const shuffledOptions = shuffleArray(options);
    return { ...item, shuffledOptions };
  });

  return newArr;
};

export { shuffleArray, changeResults };
