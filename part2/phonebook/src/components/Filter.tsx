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
		<>
			<label>
				Filter shown with:{" "}
				<input onChange={handleFilterChange} value={newFilter} />
			</label>
		</>
	);
};

export default Filter;
