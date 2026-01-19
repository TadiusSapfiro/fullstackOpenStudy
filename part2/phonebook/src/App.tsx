import { useState } from "react";
// import type { Person } from "./types";

interface Person {
	name: string;
	number: string;
}
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;
interface PersonFormProps {
	onAddPerson: (event: FormEvent) => void;
	newName: string;
	setNewName: React.Dispatch<React.SetStateAction<string>>;
	newNumber: string;
	setNewNumber: React.Dispatch<React.SetStateAction<string>>;
}
const PersonForm = ({
	onAddPerson,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
}: PersonFormProps) => {
	const handleNameChange = (event: InputEvent) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event: InputEvent) => {
		setNewNumber(event.target.value);
	};

	return (
		<>
			<h2>Phonebook</h2>
			<form onSubmit={onAddPerson}>
				<label>
					Name: <input onChange={handleNameChange} value={newName} />
				</label>
				<label>
					Number: <input onChange={handleNumberChange} value={newNumber} />
				</label>
				<div>
					<button type="submit">Add new contact</button>
				</div>
			</form>
		</>
	);
};

interface PersonProps {
	person: Person;
}
const Person = ({ person }: PersonProps) => {
	return (
		<p>
			{person.name} - {person.number}
		</p>
	);
};

interface PersonsListProps {
	persons: Person[];
}
const PersonsList = ({ persons }: PersonsListProps) => {
	return (
		<>
			<h2>Persons</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.name}>
						<Person person={person} />
					</li>
				))}
			</ul>
		</>
	);
};

const App = () => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [persons, setPersons] = useState<Person[]>([
		{ name: "Arto Hellas", number: "55903663" },
	]);
	const handleAddPerson = (event: FormEvent) => {
		event.preventDefault();
		const personExist = persons.some(
			(person) => person.name.toLowerCase() === newName.toLowerCase(),
		);
		if (personExist) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber,
		};

		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	return (
		<>
			<PersonForm
				onAddPerson={handleAddPerson}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
			<PersonsList persons={persons} />
		</>
	);
};

export default App;
