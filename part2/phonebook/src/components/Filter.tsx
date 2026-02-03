import type { InputEvent } from "../types";

interface FilterProps {
	newFilter: string;
	setNewFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ newFilter, setNewFilter }: FilterProps) => {
	const handleFilterChange = (event: InputEvent) => {
		setNewFilter(event.target.value);
	};

	return (
		<div className="flex flex-col gap-2 mb-6">
			<label className="text-gray-700 font-medium">Filter shown with:</label>
			<input
				className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				onChange={handleFilterChange}
				value={newFilter}
			/>
		</div>
	);
};

export default Filter;
