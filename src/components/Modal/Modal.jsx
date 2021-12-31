import React, { useState, useEffect } from 'react';
import './Modal.css';
import { getDetails } from '../api';

export const Modal = ({ onClose, selectedPokemon, show }) => {
	const [pokemon, setPokemon] = useState();

	useEffect(() => {
		if (selectedPokemon) {
			getDetails(selectedPokemon.url).then((data) => {
				setPokemon(data);
				console.log(data);
			})
		}
	}, [selectedPokemon]);

	return (
		<div className='modal' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h3 className='modal-title'>
						{pokemon?.name}
					</h3>
				</div>
				<div className='modal-body'>
					<div className='pokemon-img'>
						<img src={pokemon?.sprites.front_default} alt={pokemon?.name} style={{ width: '200px', height: '200px' }} />
						<img src={pokemon?.sprites.back_default} alt={pokemon?.name} style={{ width: '200px', height: '200px' }} />
					</div>
					<div className='pokemon-info'>
						<p>Height: {pokemon?.height}</p>
						<p>Type: {pokemon?.types.map((type) => type.type.name).join(", ")}</p>
					</div>
				</div>
				<div className='modal-footer'>
					<button className='button' onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}