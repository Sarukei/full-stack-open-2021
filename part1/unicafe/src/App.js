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

const Statistics = ({
  stat1,
  stat2,
  stat3,
  totalFeedback,
  avgFeedback,
  positiveFeedbackPercentage,
}) => {
  const feedbackGiven = stat1.value + stat2.value + stat3.value > 0;

  if (feedbackGiven) {
    return (
      <>
        feedbackGiven ?
        <Statistic title={stat1.title} value={stat1.value} />
        <Statistic title={stat2.title} value={stat2.value} />
        <Statistic title={stat3.title} value={stat3.value} />
        <Statistic title="all" value={totalFeedback} />
        <Statistic title="average" value={avgFeedback} />
        <Statistic title="positive" value={positiveFeedbackPercentage} />
      </>
    );
  }
  return <p>"No feedback given"</p>;
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

      <Statistics
        stat1={{ title: "good", value: good }}
        stat2={{ title: "neutral", value: neutral }}
        stat3={{ title: "bad", value: bad }}
        totalFeedback={totalFeedback}
        avgFeedback={avgFeedback}
        positiveFeedbackPercentage={positiveFeedbackPercentage}
      />
    </div>
  );
};

export default App;
