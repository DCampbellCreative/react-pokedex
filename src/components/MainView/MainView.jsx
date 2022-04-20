import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { getData } from '../api';
import './MainView.css';
import { orderBy } from 'lodash';

export const MainView = (props) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState();
	const [show, setShow] = useState(false);
	const [sorted, setSorted] = useState('id');
	const [searchTerm, setSearchTerm] = useState('');
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		// to prevent loading the list at each re-render
		if (!pokemonList < 1) {
			getData().then(({ results }) => {
				setPokemonList(results)
				// maps pokemon list by id
				const res = results.map((p, i) => { return { ...p, id: i + 1 } })
				setFilteredPokemonList(orderBy(res, sorted, 'asc'));
				console.log(filteredPokemonList)
			})
		}
	}, [])

	const updateFilter = (value) => {
		const res = pokemonList.filter(pokemon => pokemon.name.includes(value))
		setSearchTerm(value)
		setFilteredPokemonList(res)
		if (!filteredPokemonList.includes(selectedPokemon)) {
			setSelectedPokemon()
		}
	}

	const sortArray = type => {
		let direction = 'asc';
		let useName = type === 'descname' ? 'name' : type;
		direction = type === 'descname' ? 'desc' : direction;
		const res = orderBy(filteredPokemonList, [useName], [direction]);
		setFilteredPokemonList(res);
		setSorted(type);
	};

	return (
		<div className='container'>
			<div className='background'><div className='grid'></div></div>
			<div className='header'>
				<h1 className='title'>Pokédex</h1>
			</div>

			<div className='search-container'>
				<div className='search-bar'>
					<label htmlFor='search'>Search: </label>
					<input id='search' type='text' onChange={(e) => updateFilter((e.target.value.toLowerCase()))} />
				</div>
			</div>

			<div className='sort-container' >
				<select value={sorted} className='sort-bar' onChange={(e) => sortArray(e.target.value)}>
					<option value='id'>Sort By ID</option>
					<option value='name'>Sort A to Z</option>
					<option value='descname'>Sort Z to A</option>
				</select>
			</div>


			{filteredPokemonList.length > 0 ?
				(
					<div className="pokemon-list">
						{filteredPokemonList.map((pokemon) => {
							const id = pokemon.url.slice(34).split('/')[0]
							return <li key={pokemon.name}>
								<button className={selectedPokemon === pokemon ? "list-button selected" : "list-button"} onClick={() => {
									setShow(true)
									setSelectedPokemon(pokemon)
								}}>
									<div className='button-content'>
										<p className='button-text'>{id}: {capitalizeFirstLetter(pokemon.name)}</p>
										<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
											alt={`${pokemon.name}`}
											className='button-img'
										>
										</img>
									</div>
								</button>
							</li>
						})}
					</div >) : (<div className='pokemon-list error'>No Results</div>)}

			<h1 className='modal-container select-text'>Select a Pokémon</h1>
			<div className='modal-container'>
				{selectedPokemon &&
					<Modal onClose={() => setSelectedPokemon()}
						show={!!selectedPokemon}
						selectedPokemon={selectedPokemon} />
				}
			</div>
		</div>
	);
}