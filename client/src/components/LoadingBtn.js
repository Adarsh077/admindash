import React from 'react';

export default props => {
	return (
		<button
			className={`btn btn-info btn-block ${props.className}`}
			type='button'
			disabled
		>
			<span
				className='spinner-border spinner-border-sm'
				role='status'
				aria-hidden='true'
			/>
			<span className='sr-only'>Loading...</span>
		</button>
	);
};
