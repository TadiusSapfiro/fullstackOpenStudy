import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGODB_URI as string;

if (!url) {
	console.error("CRITICAL ERROR: MONGODB_URI not found!");
	process.exit(1);
}

mongoose.set("strictQuery", false);
interface IPerson {
	name: string;
	number: string;
}

mongoose
	.connect(url, { family: 4 })
	.then(() => {
		console.log("Successful connection to MongoDB");
	})
	.catch((error) => {
		console.error("Error connection to MongoDB:", error.message);
	});

const personSchema = new mongoose.Schema<IPerson>({
	name: {
		type: String,
		required: [true, "Name is required"],
		minLength: [3, "Name is too short"],
	},
	number: {
		type: String,
		required: [true, "Number is required"],
		minLength: [8, "Number must be at least 8 characters long"],
		validate: {
			validator: (v: string) => {
				return /^\d{2,3}-\d+$/.test(v);
			},
			message: (props) =>
				`${props.value} is not a valid phone number! Format: 09-1234567`,
		},
	},
});

personSchema.set("toJSON", {
	transform: (_document, returnedObject: Record<string, any>) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const PersonModel = mongoose.model<IPerson>("Person", personSchema);
