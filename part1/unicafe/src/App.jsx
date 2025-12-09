import { useState } from "react";

const initialState = {
  header: "give feedback",
  feedback: { good: 0, neutral: 0, bad: 0 },
  statistics: "statistics",
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    let incrementedGood = good + 1;
    let incrementedTotal = total + 1;
    let average = (incrementedGood - bad) / incrementedTotal;
    let positive = (incrementedGood / incrementedTotal) * 100 + " %";
    setAverage(average);
    setPositive(positive);
    setGood(incrementedGood);
    setTotal(incrementedTotal);
    setAverage(average);
    setPositive(positive);
  };
  const handleNeutralClick = () => {
    let incrementedTotal = total + 1;
    let incrementedNeutral = neutral + 1;
    let average = (good - bad) / incrementedTotal;
    let positive = (good / incrementedTotal) * 100 + " %";
    setNeutral(incrementedNeutral);
    setTotal(incrementedTotal);
    setAverage(average);
    setPositive(positive);
  };
  const handleBadClick = () => {
    let incrementedTotal = total + 1;
    let incrementedBad = bad + 1;
    let average = (good - incrementedBad) / incrementedTotal;
    let positive = (good / incrementedTotal) * 100 + " %";
    setBad(incrementedBad);
    setTotal(incrementedTotal);
    setAverage(average);
    setPositive(positive);
  };

  return (
    <div>
      <Header text={initialState.header} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header text={initialState.statistics} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
