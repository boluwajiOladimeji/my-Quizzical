/* eslint-disable react/prop-types */
const HomePage = ({ setStarted }) => {
  return (
    <div className='intro'>
      <div className='intro-text'>
        <h1>Quizzical</h1>
        <h2>
          <em>Welcome to Elias Trivia Quiz 🤔</em>
        </h2>
        <p>Test yourself with vast variety of Questions </p>
        <div className='home-btn-container'>
          <button className='btn home-btn' onClick={() => setStarted(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
