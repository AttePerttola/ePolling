import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import { Polls } from "./components/Polls";
import { CreatePoll } from "./components/CreatePoll";

const App = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = () => {
    axios.get("http://localhost:5033/Poll/getAll").then((response) => {
      setPolls(response.data);
    });
  };

  // fetch all polls on mount
  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <h1>ePoll</h1>
      {polls && <Polls polls={polls} />}
      <CreatePoll handler={fetchPolls} />
    </div>
  );
};

export default App;
