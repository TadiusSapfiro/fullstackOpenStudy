import Part from "./Part";
import type { PartType } from "../types";
interface ContentProps {
	parts: PartType[];
}
const Content = ({ parts }: ContentProps) => {
	return (
		<ul>
			{parts.map((part) => (
				<li key={part.id}>
					<Part part={part} />
				</li>
			))}
		</ul>
	);
};

export default Content;
