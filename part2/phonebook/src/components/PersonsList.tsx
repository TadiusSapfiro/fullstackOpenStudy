import type { Person as PersonType } from "../types";
import Person from "./Person";

interface PersonsListProps {
	persons: PersonType[];
	onDelete: (event: MouseEvent) => Promise<void>;
}
const PersonsList = ({ persons, onDelete }: PersonsListProps) => {
	return (
		<>
			<h2>Persons</h2>
			<ul>
				{persons.map((person) => {
					return (
						<li id={person.id} key={person.id}>
							<Person onDelete={onDelete} person={person} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default PersonsList;
