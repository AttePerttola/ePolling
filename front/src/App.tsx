import axios from 'axios';
import { useState, useEffect } from 'react';

import './App.css';
import { Polls } from './components/Polls';
import { CreatePoll } from './components/CreatePoll';

const App = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:8081/polls').then((response) => {
      //console.log(response.data.polls)
      setPolls(response.data.polls);
    });
  }, []);
  //console.log(polls)

  return (
    <div>
      <h1>ePoll</h1>
      {polls && <Polls polls={polls} />}
      <CreatePoll handler={setPolls} />
    </div>
  );
};

export default App;
