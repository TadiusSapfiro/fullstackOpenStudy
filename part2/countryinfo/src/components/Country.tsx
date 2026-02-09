interface CountryProps {
	handleShowCountry: (country: string) => void;
	country: string;
}
const Country = ({ country, handleShowCountry }: CountryProps) => {
	return (
		<div>
			<span>{country}</span>
			<button onClick={() => handleShowCountry(country)}>Show</button>
		</div>
	);
};

export default Country;
