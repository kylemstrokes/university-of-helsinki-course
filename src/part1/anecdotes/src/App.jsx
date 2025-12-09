import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVoteIncrease = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const handleNextAnecdote = () => {
    const randomNumber = getRandomNumber(selected, anecdotes.length);
    setSelected(randomNumber);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteIncrease} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote
        text={anecdotes[getIndexOfMostVotes(votes)]}
        votes={votes[getIndexOfMostVotes(votes)]}
      />
    </div>
  );
};

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>{`has ${votes} votes`}</p>
  </div>
);

const getIndexOfMostVotes = (votes) => {
  let mostVotes = Math.max(...votes);
  let indexOfMaxVotes = votes.indexOf(mostVotes);
  return indexOfMaxVotes ?? 0;
};

const Header = ({ text }) => <h1>{text}</h1>;

const getRandomNumber = (selected, max) => {
  //Added this so that the same anecdote is not shown twice in a row
  let number;
  do {
    number = Math.floor(Math.random() * max);
  } while (number === selected);
  return number;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
