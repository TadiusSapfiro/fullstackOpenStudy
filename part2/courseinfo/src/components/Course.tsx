import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import type { CourseType, PartType } from "../types";

interface CourseProps {
	course: CourseType;
}

const Course = ({ course }: CourseProps) => {
	const total = course.parts.reduce(
		(sum: number, part: PartType) => sum + part.exercises,
		0,
	);

	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total total={total} />
		</>
	);
};

export default Course;
