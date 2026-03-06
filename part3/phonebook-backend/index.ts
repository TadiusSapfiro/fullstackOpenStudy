import express from "express";
import crypto from "crypto";
import type { Request, Response } from "express";
const app = express();
app.use(express.json());

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

app.get("/api/persons", (req: Request, res: Response) => {
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
	const cleanName = name ? name.trim() : "";
	const cleanNumber = number ? number.trim() : "";

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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
