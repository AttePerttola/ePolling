import { GetPollOptions } from "./PollOption";
import "./Polls.css";

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
    <>
      <h2> All polls: </h2>
      <div className="polls">
        {polls.map((poll) => (
          <div className="poll-preview" key={poll.id}>
            <h2>{poll.title}</h2>
            <GetPollOptions id={poll.id} />
          </div>
        ))}
      </div>
    </>
  );
};
