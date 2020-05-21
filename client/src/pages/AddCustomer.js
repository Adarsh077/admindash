import React, { Component } from 'react';

export default class extends Component {
	render() {
		return (
			<div className='row'>
				<div className='col-12 col-md-6 col-lg-4 m-auto'>
					<form className='text-center border border-light p-5' action='#!'>
						<p className='h4 mb-4'>Add Customer</p>

						{/* Name */}
						<div className='md-form mt-0'>
							<input className='form-control' type='text' placeholder='Name' />
						</div>

						{/* Age */}
						<div className='md-form mt-0'>
							<input className='form-control' type='text' placeholder='Age' />
						</div>

						{/* Gender */}
						<div className='text-left mb-1'>
							<strong>Gender:</strong>
						</div>
						<div className='d-flex justify-content-between'>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									id='defaultInline1'
									name='inlineDefaultRadiosExample'
								/>
								<label
									className='custom-control-label'
									htmlFor='defaultInline1'
								>
									Male
								</label>
							</div>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									id='defaultInline2'
									name='inlineDefaultRadiosExample'
								/>
								<label
									className='custom-control-label'
									htmlFor='defaultInline2'
								>
									Female
								</label>
							</div>
							<div className='custom-control custom-radio custom-control-inline'>
								<input
									type='radio'
									className='custom-control-input'
									id='defaultInline3'
									name='inlineDefaultRadiosExample'
								/>
								<label
									className='custom-control-label'
									htmlFor='defaultInline3'
								>
									Other
								</label>
							</div>
						</div>

						{/* Add button */}
						<button className='btn btn-info btn-block my-4' type='submit'>
							Add Customer
						</button>
					</form>
				</div>
			</div>
		);
	}
}
