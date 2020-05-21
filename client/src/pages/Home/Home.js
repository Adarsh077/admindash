import React, { Component } from 'react';
import Customers from './components/Customers';
import './Home.css';

export default class extends Component {
	constructor() {
		super();
		this.state = {
			customers: [
				{ name: 'Adarsh Senghani', age: 18, gender: 'male' },
				{ name: 'Jhon Doe', age: 20, gender: 'male' },
				{ name: 'Jane Doe', age: 21, gender: 'female' },
				{ name: 'Ashley Pow', age: 30, gender: 'male' },
			],
		};
	}

	render = () => {
		const { customers } = this.state;
		return (
			<div className='row customers'>
				<div className='col-12 col-md-8 col-lg-6 m-auto'>
					<Customers customers={customers} />
				</div>
			</div>
		);
	};
}
