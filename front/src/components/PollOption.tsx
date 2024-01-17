import axios from 'axios';
import { useState, useEffect } from 'react';

type Option = {
  id: number;
  title: string;
  votes: number;
};

export const GetPollOptions = ({ id }: { id: number; }) => {
  //console.log(id)
  const [options, SetOptions] = useState<Option[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/polls/' + id)
      .then(response => {
        //console.log(response.data.options)
        SetOptions(response.data.options);
      });
  }, [id]);

  const handleVote = (voteid, voteoption) => {

    axios.post('http://localhost:8081/polls/' + voteid + '/vote/' + voteoption, {
      id: voteid,
      option: voteoption
    })
      .then(function (response) {
        //console.log(response.data.options)
        SetOptions(response.data.options);
      });
  };

  return (
    <div>
      {options.map((option) => (
        <div className='poll-option' key={option.id}>
          <p>{option.title} {option.votes}</p>
          <button onClick={() => handleVote(id, option.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};
