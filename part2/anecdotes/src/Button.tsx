interface ButtonProps {
	text: string;
	onClick: () => void;
}
const Button = ({ text, onClick }: ButtonProps) => (
	<button onClick={onClick}>{text}</button>
);

export default Button;
