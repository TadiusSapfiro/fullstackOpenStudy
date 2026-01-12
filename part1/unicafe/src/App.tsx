import { useState } from "react";
interface ButtonProps {
	text: string;
	onClick: () => void;
}

interface FeedbackProps {
	onGoodClick: () => void;
	onNeutralClick: () => void;
	onBadClick: () => void;
}

interface StatisticLineProps {
	value: number | string;
	label: string;
}

interface StatisticsProps {
	good: number;
	neutral: number;
	bad: number;
}
const Button = ({ text, onClick }: ButtonProps) => (
	<button onClick={onClick}>{text}</button>
);

const Feedback = ({
	onGoodClick,
	onNeutralClick,
	onBadClick,
}: FeedbackProps) => {
	return (
		<>
			<h1>Leave your feedback</h1>
			<Button text="Good" onClick={onGoodClick} />
			<Button text="Neutral" onClick={onNeutralClick} />
			<Button text="Bad" onClick={onBadClick} />
		</>
	);
};

const StatisticLine = ({ value, label }: StatisticLineProps) => {
	return (
		<tr>
			<td>{label}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
	const total = good + neutral + bad;
	if (total === 0) {
		return (
			<>
				<h1>Feedback statistics</h1>
				<div>No Feedback given</div>
			</>
		);
	}
	const average = (good - bad) / total;
	const positive = (good / total) * 100;
	return (
		<>
			<h1>Feedback statistics</h1>
			<table>
				<tbody>
					<StatisticLine value={good} label="Good" />
					<StatisticLine value={neutral} label="Neutral" />
					<StatisticLine value={bad} label="Bad" />
					<StatisticLine value={total} label="Total" />
					<StatisticLine value={average} label="Average" />
					<StatisticLine value={positive + " %"} label="Positive" />
				</tbody>
			</table>
		</>
	);
};

const App = () => {
	const [good, setGood] = useState<number>(0);
	const [neutral, setNeutral] = useState<number>(0);
	const [bad, setBad] = useState<number>(0);

	const handleGoodBtnClick = () => setGood((prevGood) => prevGood + 1);
	const handleNeutralBtnClick = () =>
		setNeutral((prevNeutral) => prevNeutral + 1);
	const handleBadBtnClick = () => setBad((prevBad) => prevBad + 1);
	return (
		<div>
			<Feedback
				onGoodClick={handleGoodBtnClick}
				onNeutralClick={handleNeutralBtnClick}
				onBadClick={handleBadBtnClick}
			/>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
