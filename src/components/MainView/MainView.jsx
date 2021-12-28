import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { getData } from '../api';
import './MainView.css';

export const MainView = (props) => {
	const [pokemon, setPokemon] = useState([]);
	const [show, setShow] = useState(false);
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
				return <li key={index}>
					<button onClick={() => setShow(true)}>
						<p className='buttonContent'>
							{index + 1}: {capitalizeFirstLetter(pokemon.name)}
							<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
								alt='pokemon'
							>
							</img>
						</p>
					</button>

				</li>
			})}
			<Modal onClose={() => setShow(false)} show={show} pokemon={pokemon} />
		</div >
	);
}