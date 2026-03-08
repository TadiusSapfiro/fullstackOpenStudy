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
			name: newName.trim(),
			number: newNumber.trim(),
		};
		const success = await onAddPerson(newPerson);
		if (success) {
			setNewName("");
			setNewNumber("");
		}
	};

	const inputStyle =
		"border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
	const labelStyle = "block text-gray-700 font-medium mb-1";

	return (
		<form
			onSubmit={handleAddPerson}
			className="space-y-4 bg-gray-50 p-4 rounded-lg border"
		>
			<div>
				<label className={labelStyle}>Name:</label>
				<input
					className={inputStyle}
					onChange={handleNameChange}
					value={newName}
				/>
			</div>
			<div>
				<label className={labelStyle}>Number:</label>
				<input
					className={inputStyle}
					onChange={handleNumberChange}
					value={newNumber}
				/>
			</div>
			<div>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
				>
					Add new contact
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
