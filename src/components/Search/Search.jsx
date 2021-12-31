import React, { useState, useEffect } from 'react';
import './Search.css';


export const Search = ({ onSearch }) => {


	// const handleChange = (event) => {
	// 	setSearchTerm(event.target.value)
	// 	onSearch(event);
	// 	console.log(searchTerm);
	// };

	return (
		<div>
			<label htmlFor='search'>Search: </label>
			<input id='search' type='text' onChange={onSearch} />
		</div>
	)
}