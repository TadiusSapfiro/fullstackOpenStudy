export interface Person {
	name: string;
	number: string;
	id: string;
}

export interface NotificationType {
	message: string | null;
	type: "error" | "success" | null;
}

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
