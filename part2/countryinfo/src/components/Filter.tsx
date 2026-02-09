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
		<div>
			<label>Filter shown with:</label>
			<input onChange={handleFilterChange} value={newFilter} />
		</div>
	);
};

export default Filter;
