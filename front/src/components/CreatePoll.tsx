import axios from 'axios';
import { useState } from 'react';

type CreatePollProps = {
  handler: (data: any) => void;
};
export const CreatePoll = ({ handler }: CreatePollProps) => {
  const [options, SetOptions] = useState(['']);
  const [title, SetTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //const poll = { title, options }
    //console.log(poll)
    axios.post('http://localhost:8081/polls/add', {
      title: title,
      options: options
    })
      .then(function (response) {
        //console.log(response)
        handler(response.data.polls);
        SetTitle('');
        SetOptions(['']);
      });
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    //console.log(value)
    const list = [...options];
    list[index] = value;
    SetOptions(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...options];
    list.splice(index, 1);
    SetOptions(list);
  };

  const handleAddClick = () => {
    SetOptions([...options, '']);
  };

  return (
    <div className='create-poll'>
      <h2>Add a new poll</h2>
      <form onSubmit={handleSubmit}>
        <label>Poll title: </label>
        <input
          type='text'
          required
          value={title}
          placeholder='Enter poll title'
          onChange={(e) => SetTitle(e.target.value)} />
        {options.map((element, index) => (
          <div className='options' key={index}>
            <label>Option </label>
            <input
              name="option"
              placeholder='Enter poll option'
              value={element}
              required
              onChange={e => handleChange(e, index)} />
            <div className='btn-box'>
              {options.length !== 1 && <button
                className='rem'
                onClick={() => handleRemoveClick(index)}>Remove</button>}
              {options.length - 1 === index && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};
