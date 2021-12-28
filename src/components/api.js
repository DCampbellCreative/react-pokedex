// get pokemon data from api
export const getData = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
	return await response.json();
}

// get detailed pokemon data from api
export const getDetails = async (pokeId) => {
	const URL = 'https://pokeapi.co/api/v2/pokemon';
	const response = await fetch(`${URL}/${pokeId}`);
	return response();
}