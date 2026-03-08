import type { Person as PersonType } from "../types";

interface PersonProps {
	person: PersonType;
	onDelete: () => Promise<void>;
}
const Person = ({ person, onDelete }: PersonProps) => {
	return (
		<div className="flex justify-between items-center bg-white p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
			<span className="text-gray-800">
				<span className="font-semibold">{person.name}</span>
				<span className="text-gray-500 ml-2">{person.number}</span>
			</span>
			<button
				onClick={onDelete}
				className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition-colors"
			>
				Delete
			</button>
		</div>
	);
};

export default Person;
