import axios from "axios";
import { useState } from "react";
import "./CreatePoll.css";

type Option = {
  id?: number;
  title: string;
  votes?: number;
};

export const CreatePoll = ({ handler }) => {
  const [options, SetOptions] = useState<Option[]>([{ title: "" }]);
  const [title, SetTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //const poll = { title, options }
    //console.log(poll)
    axios
      .post("http://localhost:5033/Poll", {
        title: title,
        options: options,
      })
      .then(function (response) {
        console.log(response);
        handler();
        SetTitle("");
        SetOptions([]);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    //console.log(value)
    const list = [...options];
    list[index] = { title: value };
    SetOptions(list);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...options];
    list.splice(index, 1);
    SetOptions(list);
  };

  const handleAddClick = () => {
    SetOptions([...options, { title: "" }]);
  };

  //console.log(options);
  return (
    <div className="create-poll">
      <h2>Add a new poll</h2>
      <form onSubmit={handleSubmit}>
        <label>Poll title: </label>
        <input
          type="text"
          required
          value={title}
          placeholder="Enter poll title"
          onChange={(e) => SetTitle(e.target.value)}
        />
        {options.map((element, index) => (
          <div className="options" key={index}>
            <label>Option </label>
            <input
              name="option"
              placeholder="Enter poll option"
              value={element.title}
              required
              onChange={(e) => handleChange(e, index)}
            />
            <div className="btn-box">
              {options.length !== 1 && (
                <button onClick={() => handleRemoveClick(index)}>Remove</button>
              )}
              {options.length - 1 === index && (
                <button onClick={handleAddClick}>Add Option</button>
              )}
            </div>
          </div>
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};
