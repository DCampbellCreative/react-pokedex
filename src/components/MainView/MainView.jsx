import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';
import { PokemonList } from '../PokemonList/PokemonList';
import { getData } from '../api';
import './MainView.css';
import { orderBy, update } from 'lodash';

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
			<div className='original-background'></div>
			<div className='background-grid'><div className='grid'></div></div>

			<div className='header'>
				<div className='grid-2 background-title'>
					<h1 className='title'>Pokédex</h1>
				</div>
			</div>

			<Search updateFilter={updateFilter} />
			<Sort sorted={sorted} sortArray={sortArray} />
			<PokemonList filteredPokemonList={filteredPokemonList} selectedPokemon={selectedPokemon} setShow={setShow} setSelectedPokemon={setSelectedPokemon} capitalizeFirstLetter={capitalizeFirstLetter} />

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