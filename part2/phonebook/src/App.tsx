import { useState, useEffect } from "react";
import type { Person, NotificationType } from "./types";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";
import axios from "axios";

const App = () => {
	const [newFilter, setNewFilter] = useState("");
	const [persons, setPersons] = useState<Person[]>([]);
	const [notification, setNotification] = useState<NotificationType>({
		message: "",
		type: null,
	});

	useEffect(() => {
		personsService.getAll().then((response) => {
			setPersons(response);
		});
	}, []);

	const showNotification = async (
		message: string,
		type: "error" | "success" = "error",
	) => {
		await setTimeout(() => {
			setNotification({
				message: "",
				type: null,
			});
		}, 5000);
		setNotification({ message, type });
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

	const updatePerson = async (newPerson: Omit<Person, "id">, id: string) => {
		const returnedPerson = await personsService.update(
			{ ...newPerson, id: id },
			id,
		);

		setPersons(
			persons.map((person: Person) => {
				return returnedPerson.id === person.id
					? { ...person, number: returnedPerson.number }
					: person;
			}),
		);

		showNotification(`${returnedPerson.name} is updated`, "success");
		return true;
	};

	const addPerson = async (newPerson: Omit<Person, "id">) => {
		const person = persons.find(
			(p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
		);
		try {
			if (person) {
				const isUpdateNeeded = window.confirm(
					`${newPerson.name} is already added to phonebook, update phone number?`,
				);
				if (!isUpdateNeeded) return false;
				return await updatePerson(newPerson, person.id);
			}
			return await createPerson(newPerson);
		} catch (error) {
			showNotification("Error adding person to server");
			console.error(error);
			return false;
		}
	};

	const createPerson = async (newPerson: Omit<Person, "id">) => {
		const returnedPerson = await personsService.create(newPerson);

		setPersons(persons.concat(returnedPerson));
		showNotification(`Contact ${returnedPerson.name} is created`, "success");
		return true;
	};

	const deletePerson = async (id: string) => {
		const person = persons.find((person) => person.id === id);
		if (!person) return;
		const isConfirmed = window.confirm(`Delete ${person.name}?`);
		if (!isConfirmed) return;
		try {
			await personsService.remove(id);
			setPersons(persons.filter((person: Person) => person.id !== id));
		} catch (error: unknown) {
			console.log(error);
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status === 404
			) {
				showNotification(
					`Could not delete ${person.name}. It might be already removed.`,
				);
				setPersons(persons.filter((person: Person) => person.id !== id));
			} else {
				showNotification(
					`Failed to delete ${person.name}. Check your connection.`,
				);
			}
		}
	};

	return (
		<>
			<h1>Phonebook</h1>
			<Notification notification={notification} />
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<PersonForm onAddPerson={addPerson} />
			<PersonsList onDelete={deletePerson} persons={filteredPersons} />
		</>
	);
};

export default App;
