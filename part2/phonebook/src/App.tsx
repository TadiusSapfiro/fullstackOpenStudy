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

	return (
		<>
			<h1>Phonebook</h1>
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<PersonForm persons={filteredPersons} setPersons={setPersons} />
			<PersonsList persons={filteredPersons} />
		</>
	);
};

export default App;
