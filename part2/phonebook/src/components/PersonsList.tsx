import type { Person as PersonType } from "../types";
import Person from "./Person";

interface PersonsListProps {
	persons: PersonType[];
}
const PersonsList = ({ persons }: PersonsListProps) => {
	return (
		<>
			<h2>Persons</h2>
			<ul>
				{persons.map((person) => {
					return (
						<li key={person.id}>
							<Person person={person} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default PersonsList;
