import { useEffect, useRef, useState } from 'react';
import { changeResults } from '../utils/util';
import Question from './Question';

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const numQuestions = quiz.length;

  let total = useRef(0);
  let numOfAnsweredQuestions = quiz.filter(
    (questions) => questions.selected
  ).length;

  const handleQuestion = (question, option) => {
    setQuiz((prevQuestions) =>
      prevQuestions.map((questions) =>
        questions.question === question.question
          ? { ...questions, selected: option }
          : questions
      )
    );
  };

  const handleFinished = () => {
    setIsFinished(true);
    for (let questions of quiz) {
      if (questions.correct_answer === questions.selected) total.current += 1;
    }
    return total.current;
  };

  const handleRestart = () => {
    getQuiz();
    // setStarted(false);
    setIsFinished(false);
    total.current = 0;
  };

  const getQuiz = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
      );

      if (!res.ok) {
        throw new Error('Something went wrong, please try again');
      }

      const data = await res.json();
      if (data['response_code'] === 2) {
        throw new Error('Something went wrong, unable to fetch results');
      }

      const usedResults = changeResults(data.results);
      setQuiz(usedResults);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // const usedResults = changeResults(results);
    // setQuiz(usedResults);
    getQuiz();
  }, []);

  if (isLoading) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
        <p>Getting Questions</p>
      </div>
    );
  }

  if (error) {
    return <div className='loader-container'>{error}</div>;
  }

  return (
    <section>
      <div className='quiz'>
        <div className='questions-container'>
          {quiz.map((question, id) => (
            <Question
              key={id}
              question={question}
              handleQuestion={handleQuestion}
              isFinished={isFinished}
            />
          ))}
        </div>
        <div className='footer'>
          {!isFinished && numOfAnsweredQuestions === quiz.length && (
            <button className='btn' onClick={handleFinished}>
              Check Answers
            </button>
          )}
          {isFinished && (
            <p>
              <strong>
                You scored {total.current} / {numQuestions} correct answers
              </strong>
              <span>
                <button
                  className='btn'
                  style={{ marginLeft: '1rem' }}
                  onClick={handleRestart}
                >
                  Try again
                </button>
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Quiz;

function sumOfNumbersTo(destination) {
  let sum = 0;
  for (let i = 1; i <= destination; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumOfNumbersTo(4));

//  * Calculate count, sum and put in an array the even numbers from 1 to a destination. Object keys are count, sum, arrayOfEvenNumbers.

function countEvenNumbersWithin(destination) {
  // Write your code here
  // get the number from 1 to destination
  let sum = 0;
  let count = 0;
  let arrayOfEvenNumbers = [];

  for (let i = 1; i <= destination; i++) {
    if (i % 2 === 0) {
      sum += i;
      count += 1;
      arrayOfEvenNumbers.push(i);
    }
  }

  return {
    // property value shorthand
    // when the property name and the value name are the same
    // you can just write the property name in your object
    count,
    sum,
    arrayOfEvenNumbers,
  };
}
