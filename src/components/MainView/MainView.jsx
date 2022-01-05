import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { getData } from '../api';
import './MainView.css';

export const MainView = (props) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState();
	const [show, setShow] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//gets list of pokemon from api
	useEffect(() => {
		getData().then((pokemonList) => {
			setPokemonList(pokemonList.results)
			console.log(pokemonList)
		})
	}, []);

	//search for pokemon by name
	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	}

	return (
		<div className='container'>
			<div className='header'>
				<h1 className='title'>Pokédex</h1>
			</div>
			<div className='search-container'>
				<div className='search-bar'>
					<label htmlFor='search'>Search: </label>
					<input id='search' type='text' onChange={handleSearch} />
				</div>
			</div>
			<div className="pokemon-list">
				{pokemonList?.length > 0 && pokemonList?.filter((pokemon) => {
					if (searchTerm === "") {
						return pokemon
					} else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
						return pokemon
					}
				}).map((pokemon, index) => {
					return <li key={index}>
						<button onClick={() => {
							setShow(true)
							setSelectedPokemon(pokemon)
						}}>
							<p className='button-content'>
								{index + 1}: {capitalizeFirstLetter(pokemon.name)}
								<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
									alt='pokemon'
									className='button-img'
								>
								</img>
							</p>
						</button>

					</li>
				})}
				{selectedPokemon &&
					<Modal onClose={() => setSelectedPokemon()} show={!!selectedPokemon} selectedPokemon={selectedPokemon} />
				}
			</div >
		</div>
	);
}