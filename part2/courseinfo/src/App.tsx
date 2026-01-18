import Course from "./components/Course";
import type { CourseType } from "./types";

interface AppProps {
	course: CourseType;
}

const App = ({ course }: AppProps) => {
	return (
		<>
			<Course course={course} />
		</>
	);
};

export default App;
