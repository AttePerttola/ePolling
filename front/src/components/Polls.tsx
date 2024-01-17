import { GetPollOptions } from './PollOption';

type Poll = {
  id: number;
  title: string;
};
type PollsProps = {
  polls: Poll[];
};
export const Polls = ({ polls }: PollsProps) => {
  //console.log(polls)
  return (
    <div>
      <h2> All polls: </h2>
      {polls.map((poll) => (
        <div className='poll-preview' key={poll.id}>
          <h2>{poll.title}</h2>
          <GetPollOptions id={poll.id} />
        </div>
      ))}

    </div>
  );
};
