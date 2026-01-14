import { useState } from "react";
import Button from "./Button.tsx";

const App = () => {
	const anecdotesList = [
		{
			text: "If it hurts, do it more often.",
			votes: 0,
		},
		{
			text: "Adding manpower to a late software project makes it later!",
			votes: 0,
		},
		{
			text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
			votes: 0,
		},
		{
			text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
			votes: 0,
		},
		{
			text: "Premature optimization is the root of all evil.",
			votes: 0,
		},
		{
			text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
			votes: 0,
		},
		{
			text: "Programming without any extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
			votes: 0,
		},
		{
			text: "The only way to go fast, is to go well.",
			votes: 0,
		},
	];

	interface Anecdote {
		text: string;
		votes: number;
	}

	const [anecdotes, setAnecdote] = useState<Anecdote[]>(anecdotesList);
	const [selected, setSelected] = useState(0);

	const handleNextAnecdote = () => {
		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * anecdotes.length);
		} while (randomIndex === selected);
		setSelected(randomIndex);
	};

	const handleVote = () => {
		const copy = [...anecdotes];
		copy[selected].votes++;
		setAnecdote(copy);
	};

	return (
		<>
			<Button text="Next anecdote" onClick={handleNextAnecdote} />
			<Button text="Vote" onClick={handleVote} />

			<div>{anecdotes[selected].text}</div>
			<div>Votes: {anecdotes[selected].votes}</div>
		</>
	);
};

export default App;
