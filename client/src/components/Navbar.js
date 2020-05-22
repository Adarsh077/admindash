import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark info-color'>
				<Link className='navbar-brand' to='/'>
					Admin Panel
				</Link>
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<Link
							className='nav-link waves-effect waves-light'
							to='/addcustomer'
						>
							Add Customer
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}
