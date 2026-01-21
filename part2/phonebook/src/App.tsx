import { useState } from "react";
// import type { Person } from "./types";

interface Person {
	name: string;
	number: string;
	id: number;
}
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface FilterProps {
	newFilter: string;
	setNewFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ newFilter, setNewFilter }: FilterProps) => {
	const handleFilterChange = (event: InputEvent) => {
		setNewFilter(event.target.value);
	};

	return (
		<>
			<h2>Phonebook</h2>
			<form>
				<label>
					Filter shown with:{" "}
					<input onChange={handleFilterChange} value={newFilter} />
				</label>
			</form>
		</>
	);
};

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
	filter: string;
}
const PersonsList = ({ persons, filter }: PersonsListProps) => {
	return (
		<>
			<h2>Persons</h2>
			<ul>
				{persons.map((person) => {
					if (!person.name.toLowerCase().includes(filter.toLowerCase())) return;
					return (
						<li key={person.id}>
							<Person person={person} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

const App = () => {
	const [newName, setNewName] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [persons, setPersons] = useState<Person[]>([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
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
			id: persons.length + 1,
		};

		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	return (
		<>
			<h1>Phonebook</h1>
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<PersonForm
				onAddPerson={handleAddPerson}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
			<PersonsList persons={persons} filter={newFilter} />
		</>
	);
};

export default App;
