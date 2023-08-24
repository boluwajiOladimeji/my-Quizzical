import { useState } from 'react';
import '../index.css';

import HomePage from './Homepage';
import Quiz from './Quiz';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <main>{!started ? <HomePage setStarted={setStarted} /> : <Quiz />}</main>
  );
}

export default App;
