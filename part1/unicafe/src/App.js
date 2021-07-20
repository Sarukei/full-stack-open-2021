import React, { useState } from "react";

const Section = (props) => <h2>{props.title}</h2>;

const Button = (props) => {
  return <button onClick={props.clickHandler}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <div>
      {props.title} {props.value}
    </div>
  );
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const avgFeedback = (good - bad) / totalFeedback;
  const positiveFeedbackPercentage = (good / totalFeedback) * 100 + "%";

  const handleGoodFeedback = () => setGood(good + 1);
  const handleNeutralFeedback = () => setNeutral(neutral + 1);
  const handleBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <Section title="give feedback" />
      <Button clickHandler={handleGoodFeedback} text="good" />
      <Button clickHandler={handleNeutralFeedback} text="neutral" />
      <Button clickHandler={handleBadFeedback} text="bad" />

      <Section title="statistics" />
      <Statistic title="good" value={good} />
      <Statistic title="neutral" value={neutral} />
      <Statistic title="bad" value={bad} />
      <Statistic title="all" value={totalFeedback} />
      <Statistic title="average" value={avgFeedback} />
      <Statistic title="positive" value={positiveFeedbackPercentage} />
    </div>
  );
};

export default App;
