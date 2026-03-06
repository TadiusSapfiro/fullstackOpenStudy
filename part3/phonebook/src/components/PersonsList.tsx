import type { Person as PersonType } from "../types";
import Person from "./Person";

interface PersonsListProps {
	persons: PersonType[];
	onDelete: (id: string) => Promise<void>;
}
const PersonsList = ({ persons, onDelete }: PersonsListProps) => {
	return (
		<>
			<h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Persons</h2>
			<ul>
				{persons.map((person) => {
					return (
						<li id={person.id} key={person.id}>
							<Person onDelete={() => onDelete(person.id)} person={person} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default PersonsList;
