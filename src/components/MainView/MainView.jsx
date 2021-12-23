import React from "react";

// get pokemon data from api
export const getData = () => {
	return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
		.then((response) => response.json())
		.then((pokemon) => console.log(pokemon));
}

const drawItems = () => {
	getData().map(() => (
		<button>{pokemon.name}</button>
	))
}

export const MainView = () => {
	return (
		<div>
			{getData()}
		</div>
	);
}