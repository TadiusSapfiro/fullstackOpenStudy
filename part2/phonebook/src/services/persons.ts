import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
import type { Person } from "../types";

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data);
};

const update = (newObject: Person, id: string) => {
	return axios
		.put(`${baseUrl}/${id}`, newObject)
		.then((response) => response.data);
};

const create = (newObject: Person) => {
	return axios.post(baseUrl, newObject).then((response) => response.data);
};

export default { getAll, update, create };
