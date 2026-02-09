import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import countryService from "./services/countries";
import type { CountryInfo } from "./types";

const App = () => {
	const [newFilter, setNewFilter] = useState("");
	const [countries, setCountries] = useState<CountryInfo[]>([]);

	useEffect(() => {
		countryService.getAll().then((response) => {
			setCountries(response);
		});
	}, []);

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(newFilter.toLowerCase()),
	);

	const handleShowCountry = (country: string) => {
		setNewFilter(country);
	};

	return (
		<div>
			<h1>Countries</h1>
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<CountriesList
				handleShowCountry={handleShowCountry}
				countries={filteredCountries}
			/>
		</div>
	);
};

export default App;
