import type { PartType } from "../types";

interface PartProps {
	part: PartType;
}
const Part = ({ part }: PartProps) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};
export default Part;
