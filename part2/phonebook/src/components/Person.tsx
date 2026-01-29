import type { Person as PersonType } from "../types";

interface PersonProps {
	person: PersonType;
	onDelete: () => Promise<void>;
}
const Person = ({ person, onDelete }: PersonProps) => {
	return (
		<p>
			{person.name} - {person.number}
			<button onClick={onDelete}>Delete</button>
		</p>
	);
};

export default Person;
