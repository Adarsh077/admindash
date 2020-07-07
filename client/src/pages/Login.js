import React, { Component } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import LoadingBtn from '../components/LoadingBtn';
import Axios from '../services/Axios';
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const validate = data => {
	const errors = {};
	if (!data.email) errors.email = 'Email is required.';
	if (data.email && !validateEmail(data.email))
		errors.email = 'Enter valid email address';
	if (!data.password) errors.password = 'Password is required.';
	return errors;
};

export default class extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
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
		Axios.get('/login', { params: this.state })
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
		const { email, errors, isLoading, password } = this.state;
		return (
			<div className='row mt-5 mx-auto'>
				<div className='col-12 col-md-6 col-lg-4 mx-auto'>
					<form
						noValidate
						className='text-center border border-light p-5'
						onSubmit={this.handleSubmit}
					>
						<p className='h4 mb-4'>Login</p>
						<Input
							type='email'
							name='email'
							value={email}
							onChange={this.handleChange}
							err={errors.email}
							placeholder='E-mail'
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
						{isLoading ? (
							<LoadingBtn className='my-4' />
						) : (
							<button className='btn btn-info btn-block my-4' type='submit'>
								Login
							</button>
						)}
						<p>
							Not a user?
							<Link to='/register'> Register</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}
