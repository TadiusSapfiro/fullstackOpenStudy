interface NotificationProps {
	message: string | null;
	type: "error" | "success";
}

const Notification = ({ message, type }: NotificationProps) => {
	if (!message) return null;
	const baseStyles = "p-4 mb-4 text-lg border-2 rounded-md bg-gray-100";

	const typeStyles =
		type === "error"
			? "text-red-700 border-red-700 bg-red-50"
			: "text-green-700 border-green-700 bg-green-50";
	return <div className={`${baseStyles}${typeStyles}`}>{message}</div>;
};
export default Notification;
