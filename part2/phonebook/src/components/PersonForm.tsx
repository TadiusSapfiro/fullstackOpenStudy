import type { FormEvent, InputEvent } from "../types";

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
			<h2>Add new Person</h2>
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

export default PersonForm;
