// get pokemon data from api
export const getData = () => {
	return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
		.then((response) => response.json())
}