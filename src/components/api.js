// get pokemon data from api
export const getData = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=251');
	return await response.json();
}

// get pokemon data from api
export const getData2 = async () => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=251');
	return await response.json();
}

// get detailed pokemon data from api
export const getDetails = async (pokeUrl) => {
	// const URL = 'https://pokeapi.co/api/v2/pokemon';
	return fetch(`${pokeUrl}`).then((response) => response.json());
}