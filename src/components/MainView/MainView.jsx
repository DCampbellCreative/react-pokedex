import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { getData } from '../api';
import './MainView.css';

export const MainView = (props) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState();
	const [show, setShow] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// //gets list of pokemon from api
	// useEffect(() => {
	// 	getData().then((pokemonList) => {
	// 		setPokemonList(pokemonList.results)
	// 		console.log(pokemonList)
	// 	})
	// }, []);

	useEffect(() => {
		// to prevent loading the list at each re-render
		// if (!pokemonList) {

		getData().then((pokemonList) => {
			setPokemonList(pokemonList.results)
			setFilteredPokemonList(filteredPokemonList.results)
			console.log(filteredPokemonList)
		})
		// }
	}, [])

	//search for pokemon by name
	// const handleSearch = (event) => {
	// 	setSearchTerm(event.target.value);
	// 	setFilteredPokemonList()
	// 	console.log(searchTerm);
	// }

	const updateFilter = (value) => {
		const res = pokemonList.filter(pokemon => pokemon.name.includes(value))
		setSearchTerm(value)
		setFilteredPokemonList(res)
		console.log(value)
	}

	return (
		<div className='container'>
			<div className='header'>
				<h1 className='title'>Pokédex</h1>
			</div>
			<div className='search-container'>
				<div className='search-bar'>
					<label htmlFor='search'>Search: </label>
					<input id='search' type='text' onChange={(e) => updateFilter(e.target.value)} />
				</div>
			</div>
			<div className="pokemon-list">
				{pokemonList?.length > 0 && pokemonList?.filter((pokemon) => {
					if (searchTerm === "") {
						return pokemonList
					} else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
						return filteredPokemonList
					}
				}).map((pokemon, index) => {
					return <li key={pokemon.name}>
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