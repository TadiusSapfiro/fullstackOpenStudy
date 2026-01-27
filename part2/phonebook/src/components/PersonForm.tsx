import { useState } from "react";
import type { FormEvent, InputEvent, Person } from "../types";

interface PersonFormProps {
	onAddPerson: (newPerson: Omit<Person, "id">) => Promise<boolean>;
}

const PersonForm = ({ onAddPerson }: PersonFormProps) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleNameChange = (event: InputEvent) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event: InputEvent) => {
		setNewNumber(event.target.value);
	};

	const handleAddPerson = async (event: FormEvent) => {
		event.preventDefault();

		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const success = await onAddPerson(newPerson);
		if (success) {
			setNewName("");
			setNewNumber("");
		}
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
