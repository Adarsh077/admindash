import React from 'react';
import { v4 as uuid } from 'uuid';
import { withRouter } from 'react-router-dom';

const Customers = props => {
	const { customers } = props;
	return (
		<table className='table table-hover'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Age</th>
					<th>Sex</th>
				</tr>
			</thead>
			<tbody>
				{customers.length === 0 && (
					<tr>
						<td colSpan='3' className='text-center'>
							No Customers Added
						</td>
					</tr>
				)}
				{customers.map(customer => {
					return (
						<tr
							onClick={() => props.history.push(`/customer/${customer._id}`)}
							key={uuid()}
						>
							<td>{customer.name}</td>
							<td>{customer.age}</td>
							<td>{customer.gender}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default withRouter(Customers);
