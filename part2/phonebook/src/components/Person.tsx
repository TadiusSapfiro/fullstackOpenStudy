import type { Person as PersonType } from "../types";

interface PersonProps {
	person: PersonType;
}
const Person = ({ person }: PersonProps) => {
	return (
		<p>
			{person.name} - {person.number}
		</p>
	);
};

export default Person;
