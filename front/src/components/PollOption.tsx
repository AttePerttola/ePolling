import axios from "axios";
import { useState, useEffect } from "react";

type Option = {
  id: number;
  title: string;
  votes: number;
};

type Poll = {
  id: number;
  title: string;
  options: Option[];
};

type VoteRequest = {
  id: number;
  option: number;
};

export const GetPollOptions = ({ id }: { id: number }) => {
  //console.log(id)
  const [options, SetOptions] = useState<Option[]>([]);

  // fetch poll options
  useEffect(() => {
    axios.get<Poll>("http://localhost:5033/Poll/" + id).then((response) => {
      //console.log(response.data.options);
      SetOptions(response.data.options);
    });
  }, [id]);

  // vote for an option
  const handleVote = (optionId) => {
    const voteData: VoteRequest = { id: id, option: optionId };
    axios
      .put<Poll>(
        "http://localhost:5033/Poll/" + id + "/vote/" + optionId,
        voteData
      )
      .then(function (response) {
        //console.log(response.data.options)
        SetOptions(response.data.options);
      });
  };

  return (
    <div>
      {options.map((option) => (
        <div className="poll-option" key={option.id}>
          <p>
            {option.title} {option.votes}
          </p>
          <button onClick={() => handleVote(option.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};
