import { decode } from 'html-entities';

const Question = ({ question, handleQuestion, isFinished }) => {
  return (
    <div className='question'>
      <h3>{decode(question.question)}</h3>
      <div className='options'>
        {question.shuffledOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleQuestion(question, option)}
            className={`option ${
              !isFinished && question.selected === option && 'blue'
            } ${
              isFinished &&
              question.selected === option &&
              question.selected !== question.correct_answer &&
              'red'
            }
            ${isFinished && option === question.correct_answer && 'green'}
            `}
            disabled={isFinished}
          >
            {decode(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
