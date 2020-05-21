import React, { Component } from 'react';
import Input from '../components/Input';
import LoadingBtn from '../components/LoadingBtn';
import Axios from '../services/Axios';

const validate = data => {
	const errors = {};
	if (!data.name) errors.name = 'Name is required.';
	if (!data.age) errors.age = 'Age is required.';
	if (!data.gender) errors.gender = 'Gender is required.';
	return errors;
};

export default class extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			age: '',
			gender: '',
			isLoading: false,
			errors: {},
		};
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = validate(this.state);
		if (Object.keys(errors).length > 0) return this.setState({ errors });

		this.setState({ isLoading: true, errors: {} });
		Axios.post('/customer', this.state)
			.then(() => this.props.history.push('/home'))
			.catch(
				err => console.log(err) || alert('Something went wrong check console.')
			);
	};

	render() {
		const { age, name, isLoading, errors } = this.state;
		return (
			<div className='row'>
				<div className='col-12 col-md-6 col-lg-4 m-auto'>
					<form
						className='text-center border border-light p-5'
						onSubmit={this.handleSubmit}
					>
						<p className='h4 mb-4'>Add Customer</p>

						{/* Name */}
						<Input
							type='text'
							name='name'
							value={name}
							onChange={this.handleChange}
							err={errors.name}
							placeholder='Name'
						/>

						{/* Age */}
						<Input
							type='number'
							name='age'
							value={age}
							onChange={this.handleChange}
							err={errors.age}
							placeholder='Age'
						/>

						{/* Gender */}
						<div className='d-flex justify-content-between'>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									id='male'
									name='gender'
									onClick={() => this.setState({ gender: 'male' })}
								/>
								<label className='custom-control-label' htmlFor='male'>
									Male
								</label>
							</div>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									id='female'
									onClick={() => this.setState({ gender: 'female' })}
									name='gender'
								/>
								<label className='custom-control-label' htmlFor='female'>
									Female
								</label>
							</div>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									onClick={() => this.setState({ gender: 'other' })}
									id='other'
									name='gender'
								/>
								<label className='custom-control-label' htmlFor='other'>
									Other
								</label>
							</div>
						</div>
						{errors.gender && (
							<div className='text-left'>
								<small className='invalid-gender my-1'>
									Gender is required
								</small>
							</div>
						)}

						{/* Add button */}
						{isLoading ? (
							<LoadingBtn className='my-4' />
						) : (
							<button className='btn btn-info btn-block my-4' type='submit'>
								Add Customer
							</button>
						)}
					</form>
				</div>
			</div>
		);
	}
}
