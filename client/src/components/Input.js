import React from 'react';

export default props => {
	const err = props.err;
	return (
		<div className='md-form mt-0'>
			<input
				{...props}
				className={`form-control ${err && ' is-invalid'} ${props.className}`}
			/>
			{err && <div className='invalid-feedback'>{err}</div>}
		</div>
	);
};
