import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import CustomerCard from './components/CustomerCard';
import AddAddress from './components/AddAddress';
import Axios from '../../services/Axios';

function copyTextToClipboard(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}

	document.body.removeChild(textArea);
}

export default class extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			age: '',
			gender: '',
			addresses: [],
			error: '',
			isLoading: false,
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(`/customer/${id}`)
			.then(({ data }) => {
				const customer = data.customers[0];
				this.setState({ ...this.state, ...customer });
			})
			.catch(err => console.log(err));
	}

	handleSubmit = newAddress => {
		const { addresses } = this.state;
		const idx = addresses.findIndex(a => a === newAddress);
		if (idx > -1) return this.setState({ error: 'Address already exists' });

		this.setState({ isLoading: true, error: '' });
		const { id } = this.props.match.params;
		Axios.post(`/address/${id}`, { address: newAddress })
			.then(res => {
				const addresses = this.state.addresses.slice();
				addresses.push(newAddress);
				this.setState({ addresses, isLoading: false });
			})
			.catch(err => console.log(err));
	};

	deleteAddress = address => {
		const { id } = this.props.match.params;
		Axios.put(`/address/${id}`, { address })
			.then(res => {
				const addresses = this.state.addresses.slice();
				const idx = addresses.findIndex(a => a === address);
				addresses.splice(idx, 1);
				this.setState({ addresses });
			})
			.catch(err => console.log(err));
	};

	goTo = address => {
		window.open(
			`https://www.google.com/maps/search/${address.split('/').join('+')}`
		);
	};

	render() {
		const { addresses, error, isLoading, name, age, gender } = this.state;
		return (
			<div className='container m-auto'>
				<div className='row'>
					<div className='col-12 col-md-8 col-lg-4 mx-auto'>
						<CustomerCard
							name={name}
							img='https://www.clipartmax.com/png/middle/364-3643767_about-brent-kovacs-user-profile-placeholder.png'
							age={age}
							gender={gender}
						/>
					</div>
					<div className='col-12 col-md-8 col-lg-6 mx-auto mt-3 mt-md-0'>
						<AddAddress
							error={error}
							handleSubmit={this.handleSubmit}
							isLoading={isLoading}
						/>
						<table className='table'>
							<thead>
								<tr>
									<th>Addresses</th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{addresses.length < 1 && (
									<tr>
										<td colSpan='3' className='text-center'>
											No Address added.
										</td>
									</tr>
								)}
								{addresses.map((address, idx) => {
									return (
										<tr className='address-row' key={uuid()}>
											<td colSpan='4' className='address-col'>
												{address}
											</td>
											<td
												colSpan='1'
												className='action d-none d-lg-table-cell text-right'
											>
												<button
													type='button'
													onClick={() => copyTextToClipboard(address)}
													className='btn btn-sm rounded	btn-primary m-0 px-3'
												>
													<i className='far fa-copy' aria-hidden='true'></i>
												</button>
												<button
													type='button'
													onClick={() => this.goTo(address)}
													className='btn btn-sm rounded	btn-success m-0 ml-1 px-3'
												>
													<i
														className='fas fa-map-marker-alt'
														aria-hidden='true'
													></i>
												</button>
												<button
													type='button'
													onClick={() => this.deleteAddress(address)}
													className='btn btn-sm rounded	btn-danger m-0 ml-1 px-3'
												>
													<i
														className='fas fa-trash-alt'
														aria-hidden='true'
													></i>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
