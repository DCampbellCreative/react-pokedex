import React, { useState, useEffect } from 'react';
import './Modal.css';
import { getDetails } from '../api';

export const Modal = (props) => {
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		getDetails(pokemon.id).then((data) => {
			setPokemon(data);
			console.log(pokemon.id);
		})
	}, []);

	if (!props.show) {
		return null
	}

	return (
		<div className='modal' onClick={props.onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h4 className='modal-title'>
						title
					</h4>
				</div>
				<div className='modal-body'>
					content
				</div>
				<div className='modal-footer'>
					<button className='button' onClick={props.onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}