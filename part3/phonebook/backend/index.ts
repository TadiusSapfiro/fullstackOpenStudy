import express from "express";
import crypto from "crypto";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const password = process.argv[2];

const url = `mongodb+srv://vzelentinov_db_user:${password}@cluster0.zefufii.mongodb.net/personsApp?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });
interface IPerson {
	name: string;
	number: string;
}

const personSchema = new mongoose.Schema<IPerson>({
	name: { type: String, required: true },
	number: String,
});

const PersonModel = mongoose.model<IPerson>("Person", personSchema);

const app = express();
app.use(express.json());

morgan.token("body", (req: Request) => {
	if (req.method === "POST") {
		return JSON.stringify(req.body);
	}
	return "";
});

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.use(express.static("dist"));

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456",
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345",
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
	},
];

app.get("/api/persons", async (req: Request, res: Response) => {
	const persons = await PersonModel.find({});
	res.json(persons);
});

app.get("/api/persons/:id", (req: Request, res: Response) => {
	const id = req.params.id;
	const person = persons.find((item) => item.id === id);
	if (!person) {
		return res.status(404).end();
	}
	return res.json(person);
});

app.get("/api/info", (req: Request, res: Response) => {
	res.send(`
			<p>Phonebook has info for ${persons.length} people</p>
			<p>${new Date()}</p>
		`);
});

interface PersonBody {
	name: string;
	number: string;
}

app.post("/api/persons", (req: Request<{}, {}, PersonBody>, res: Response) => {
	const { name, number } = req.body;
	const cleanName = name ? name.toString().trim() : "";
	const cleanNumber = number ? number.toString().trim() : "";

	if (!cleanName || !cleanNumber) {
		return res.status(400).json({ error: "Name and number are required" });
	}

	const existingPerson = persons.find((person) => person.name === cleanName);
	if (existingPerson) {
		return res.status(400).json({ error: "Name must be unique" });
	}

	const newPerson = {
		id: crypto.randomUUID(),
		name: cleanName,
		number: cleanNumber,
	};
	persons.push(newPerson);
	res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req: Request, res: Response) => {
	const id = req.params.id;
	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

const unknownEndpoint = (req: Request, res: Response) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error("Error caught:", error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "Unknown format ID" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
