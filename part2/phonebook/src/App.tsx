import { useState } from "react";
// import type { Person } from "./types";

interface Person {
	name: string;
}
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;
interface PersonFormProps {
	onAddPerson: (event: FormEvent) => void;
	newName: string;
	setNewName: React.Dispatch<React.SetStateAction<string>>;
}
const PersonForm = ({ onAddPerson, newName, setNewName }: PersonFormProps) => {
	const handleNameChange = (event: InputEvent) => {
		setNewName(event.target.value);
	};

	return (
		<>
			<h2>Phonebook</h2>
			<form onSubmit={onAddPerson}>
				<div>
					Name: <input onChange={handleNameChange} value={newName} />
				</div>
				<div>
					<button type="submit">Add new name</button>
				</div>
			</form>
		</>
	);
};

interface NumberProps {
	person: Person;
}
const Number = ({ person }: NumberProps) => {
	return <p>{person.name}</p>;
};

interface NumberListProps {
	persons: Person[];
}
const NumbersList = ({ persons }: NumberListProps) => {
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.name}>
						<Number person={person} />
					</li>
				))}
			</ul>
		</>
	);
};

const App = () => {
	const [newName, setNewName] = useState("");
	const [persons, setPersons] = useState<Person[]>([{ name: "Arto Hellas" }]);
	const handleAddPerson = (event: FormEvent) => {
		event.preventDefault();
		const personExist = persons.find((person) => person.name === newName);
		if (personExist) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons(persons.concat({ name: newName }));
		setNewName("");
	};

	return (
		<>
			<PersonForm
				onAddPerson={handleAddPerson}
				newName={newName}
				setNewName={setNewName}
			/>
			<NumbersList persons={persons} />
		</>
	);
};

export default App;
