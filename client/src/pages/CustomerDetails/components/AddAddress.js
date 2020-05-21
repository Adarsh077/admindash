import React, { useState } from 'react';
import Input from '../../../components/Input';
import LoadingBtn from '../../../components/LoadingBtn';

export default props => {
	const [address, setAddress] = useState('');
	const [err, setErr] = useState('');
	const { isLoading, error } = props;

	const handleSubmit = () => {
		if (!address) return setErr('Address is required.');
		setErr('');
		props.handleSubmit(address);
	};

	return (
		<div className='row my-3 my-lg-0'>
			<div className='col-12 col-md-9'>
				<div className='md-form mt-0'>
					<Input
						onChange={e => setAddress(e.target.value)}
						value={address}
						type='text'
						err={err ? err : error}
						placeholder='Address'
					/>
				</div>
			</div>
			<div className='col-12 col-md-3'>
				{isLoading ? (
					<LoadingBtn />
				) : (
					<button
						type='submit'
						onClick={handleSubmit}
						className='btn btn-block rounded btn-info'
					>
						Add
					</button>
				)}
			</div>
		</div>
	);
};
