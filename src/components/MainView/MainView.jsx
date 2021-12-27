import React, { useState, useEffect } from "react";
import { getData } from "../api";
import './MainView.css';

export const MainView = (props) => {
	const [pokemon, setPokemon] = useState([]);
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		getData().then((pokemon) => {
			setPokemon(pokemon);
			console.log(Object.entries(pokemon)[3][1]);
		})
	}, []);

	return (
		<div className="pokemonList">
			{Object.entries(pokemon)[3] && Object.entries(pokemon)[3][1].map((pokemon, index) => {
				return <button key={index}>{index + 1}: {capitalizeFirstLetter(pokemon.name)}</button>
			})}
		</div>
	);
}