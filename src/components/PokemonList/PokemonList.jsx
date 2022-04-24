import React from 'react';

export const PokemonList = (props) => {
	return (
		<React.Fragment>
			{props.filteredPokemonList.length > 0 ?
				(
					<div className="pokemon-list">
						{props.filteredPokemonList.map((pokemon) => {
							const id = pokemon.url.slice(34).split('/')[0]
							return <li key={pokemon.name}>
								<button className={props.selectedPokemon === pokemon ? "list-button selected" : "list-button"} onClick={() => {
									props.setShow(true)
									props.setSelectedPokemon(pokemon)
								}}>
									<div className='button-content'>
										<p className='button-text'>{id}: {props.capitalizeFirstLetter(pokemon.name)}</p>
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
		</React.Fragment>
	)
}