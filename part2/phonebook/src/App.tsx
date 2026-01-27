import { useState, useEffect } from "react";
import type { Person } from "./types";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";

const App = () => {
	const [newFilter, setNewFilter] = useState("");
	const [persons, setPersons] = useState<Person[]>([]);

	useEffect(() => {
		personsService.getAll().then((response) => {
			setPersons(response);
		});
	}, []);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

	const addPerson = async (newPerson: Omit<Person, "id">) => {
		const personExist = persons.some(
			(person) => person.name.toLowerCase() === newPerson.name.toLowerCase(),
		);
		if (personExist) {
			alert(`${newPerson.name} is already added to phonebook`);
			return false;
		}
		try {
			const returnedPerson = await personsService.create(newPerson);
			setPersons(persons.concat(returnedPerson));
			return true;
		} catch (error) {
			alert("Error adding person to server");
			console.error(error);
			return false;
		}
	};

	return (
		<>
			<h1>Phonebook</h1>
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<PersonForm onAddPerson={addPerson} />
			<PersonsList persons={filteredPersons} />
		</>
	);
};

export default App;
