import React from 'react';

export const Sort = (props) => {
	return (
		<div className='sort-container' >
			<select value={props.sorted} className='sort-bar' onChange={(e) => props.sortArray(e.target.value)}>
				<option value='id'>Sort By ID</option>
				<option value='name'>Sort A to Z</option>
				<option value='descname'>Sort Z to A</option>
			</select>
		</div>
	)
}