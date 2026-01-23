import { useState, useEffect } from "react";
import type { Person, FormEvent } from "./types";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import axios, { type AxiosResponse } from "axios";

const App = () => {
	const [newName, setNewName] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [persons, setPersons] = useState<Person[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then((response: AxiosResponse) => {
				setPersons(response.data);
			});
	}, []);

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
