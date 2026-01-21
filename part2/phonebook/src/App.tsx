import { useState } from "react";
import type { Person, FormEvent } from "./types";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";

const modelData = [
	{ name: "Arto Hellas", number: "040-123456", id: "1" },
	{ name: "Ada Lovelace", number: "39-44-5323523", id: "2" },
	{ name: "Dan Abramov", number: "12-43-234345", id: "3" },
	{ name: "Mary Poppendieck", number: "39-23-6423122", id: "4" },
];

const App = () => {
	const [newName, setNewName] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [persons, setPersons] = useState<Person[]>(modelData);

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
			id: crypto.randomUUID(),
		};

		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

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
			<PersonsList persons={filteredPersons} />
		</>
	);
};

export default App;
