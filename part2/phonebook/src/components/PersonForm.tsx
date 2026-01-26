import { useState } from "react";
import type { FormEvent, InputEvent, Person } from "../types";
import personsService from "../services/persons";

interface PersonFormProps {
	persons: Person[];
	setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}

const PersonForm = ({ persons, setPersons }: PersonFormProps) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
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

		personsService.create(newPerson).then((response) => {
			setPersons(persons.concat(response));
			setNewName("");
			setNewNumber("");
		});
	};

	const handleNameChange = (event: InputEvent) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event: InputEvent) => {
		setNewNumber(event.target.value);
	};

	return (
		<>
			<h2>Add new Person</h2>
			<form onSubmit={handleAddPerson}>
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

export default PersonForm;
