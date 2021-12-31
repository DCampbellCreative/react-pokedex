import React, { useState, useEffect } from 'react';
import { Search } from '../Search/Search'
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

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	}

	return (
		<div>
			<Search onSearch={handleSearch} />
			<div className="pokemonList">
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
				{selectedPokemon &&
					<Modal onClose={() => setSelectedPokemon()} show={!!selectedPokemon} selectedPokemon={selectedPokemon} />
				}
			</div >
		</div>
	);
}