import React, { Component } from 'react';
import Customers from './components/Customers';
import './Home.css';
import Axios from '../../services/Axios';
import Input from '../../components/Input';

const doesInclueds = (obj, string) => {
	obj = { ...obj };
	delete obj._id;
	string = string.toLowerCase();
	const values = Object.values(obj);
	for (const value of values) {
		if (typeof value === 'object' && doesInclueds(value, string)) return true;
		if (value && value.toString().toLowerCase().includes(string)) return true;
	}
	return false;
};

export default class extends Component {
	constructor() {
		super();
		this.state = {
			customers: [],
			search: '',
			searchedCustomers: [],
		};
	}

	handleChange = e => {
		const { value } = e.target;
		const { customers } = this.state;
		const searchedCustomers = customers.filter(customer =>
			doesInclueds(customer, value)
		);
		console.log(searchedCustomers);
		this.setState({ search: value, searchedCustomers });
	};

	componentDidMount() {
		Axios.get('/customer')
			.then(({ data }) => this.setState({ customers: data.customers }))
			.catch(err => console.log(err) || alert('Something went wrong'));
	}

	render = () => {
		const { customers, search, searchedCustomers } = this.state;
		return (
			<div className='row customers'>
				<div className='col-12 col-md-8 col-lg-6 m-auto'>
					<div className='row'>
						<div className='col-12 col-md-6 col-lg-5 ml-auto'>
							<Input
								value={search}
								onChange={this.handleChange}
								placeholder='Search'
								autoFocus
							/>
						</div>
					</div>
					<Customers
						customers={
							search || searchedCustomers.length > 0
								? searchedCustomers
								: customers
						}
					/>
				</div>
			</div>
		);
	};
}
