import Course from "./components/Course";
import type { CourseType } from "./types";

interface AppProps {
	courses: CourseType[];
}

const App = ({ courses }: AppProps) => {
	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>
					<Course course={course} />
				</li>
			))}
		</ul>
	);
};

export default App;
