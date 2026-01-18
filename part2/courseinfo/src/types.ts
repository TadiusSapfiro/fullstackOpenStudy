export interface PartType {
	name: string;
	exercises: number;
	id: number;
}

export interface CourseType {
	name: string;
	parts: PartType[];
	id: number;
}
