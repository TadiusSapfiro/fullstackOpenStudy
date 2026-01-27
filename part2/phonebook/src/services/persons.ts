import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
import type { Person } from "../types";

const getAll = () => {
	return axios.get<Person[]>(baseUrl).then((response) => response.data);
};

const update = (newObject: Person, id: string) => {
	return axios
		.put<Person>(`${baseUrl}/${id}`, newObject)
		.then((response) => response.data);
};

const create = (newObject: Omit<Person, "id">) => {
	return axios
		.post<Person>(baseUrl, newObject)
		.then((response) => response.data);
};

const remove = (id: string) => {
	return axios
		.delete<Person>(`${baseUrl}/${id}`)
		.then((response) => response.data);
};

export default { getAll, update, create, remove };
