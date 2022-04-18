import React, { useState, useEffect } from 'react';
import './Modal.css';
import { getDetails } from '../api';

export const Modal = ({ onClose, selectedPokemon, show }) => {
	const [pokemon, setPokemon] = useState();
	const [color, setColor] = useState([]);

	// gets details for each pokemon when selected
	useEffect(() => {
		if (selectedPokemon) {
			getDetails(selectedPokemon.url).then((data) => {
				setPokemon(data);
				// console.log(data);
				// document.body.classList.add(type.type.name)
				let stateColor = data?.types.map((color) => color.type.name)
				setColor(stateColor)
				console.log(color[0])
			})
			document.body.classList.add(color[0])
		}
	}, [selectedPokemon]);

	// document.body.classList.add(color[0])

	return (
		<div className='modal' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h2 className='modal-title'>
						{pokemon?.name}
					</h2>
				</div>
				<div className='modal-body'>
					<div className='pokemon-img'>
						<img className='pokemon-sprite' src={pokemon?.sprites.front_default} alt={pokemon?.name} style={{ width: '200px', height: '200px' }} />
						<img className='pokemon-sprite' src={pokemon?.sprites.back_default} alt={pokemon?.name} style={{ width: '200px', height: '200px' }} />
					</div>
					<div className='pokemon-info'>
						<p>Height: {pokemon?.height}</p>
						<div className='center'>Type: {pokemon?.types.map((type) => { return <p className={`type-text ${type.type.name}`}>{type.type.name}</p> })}</div>
					</div>
				</div>
				<div className='modal-footer'>
					<button className='close-button' onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}