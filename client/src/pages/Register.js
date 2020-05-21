import React, { Component } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import Axios from '../services/Axios';
import LoadingBtn from '../components/LoadingBtn';

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const validate = data => {
	const errors = {};
	if (!data.email) errors.email = 'Email is required.';
	if (data.email && !validateEmail(data.email))
		errors.email = 'Enter valid email address';
	if (!data.password && !data.confirmPassword)
		errors.password = 'Password is required.';
	if (!data.password !== !data.confirmPassword)
		errors.password = 'Passwords do not match.';
	return errors;
};

export default class extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			errors: {},
			isLoading: false,
		};
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = validate(this.state);
		if (Object.keys(errors).length > 0) return this.setState({ errors });

		this.setState({ isLoading: true, errors: {} });
		Axios.post('/register', this.state)
			.then(({ data }) => {
				if (data.err) {
					return this.setState({ errors: data.err, isLoading: false });
				}

				if (data.token) this.props.setToken(data.token);
			})
			.catch(
				err => console.log(err) || alert('Something went wrong check console.')
			);
	};

	render() {
		const { confirmPassword, email, errors, password, isLoading } = this.state;
		return (
			<div className='row mt-5'>
				<div className='col-12 col-md-6 col-lg-4 m-auto'>
					<form
						noValidate
						className='text-center border border-light p-5'
						onSubmit={this.handleSubmit}
					>
						<p className='h4 mb-4'>Register</p>
						<Input
							type='email'
							name='email'
							value={email}
							onChange={this.handleChange}
							err={errors.email}
							placeholder='E-Mail'
							autoFocus
						/>
						<Input
							type='password'
							name='password'
							value={password}
							onChange={this.handleChange}
							err={errors.password}
							placeholder='Password'
						/>
						<Input
							type='password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={this.handleChange}
							err={errors.password}
							placeholder='Confirm Password'
						/>

						{isLoading ? (
							<LoadingBtn className='my-4' />
						) : (
							<button className='btn btn-info btn-block my-4' type='submit'>
								Register
							</button>
						)}

						<p>
							Already a user?
							<Link to='/login'> Login</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}
