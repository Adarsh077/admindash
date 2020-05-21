import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Home, CustomerDetails, AddCustomer, Login, Register } from './pages';
import { setToken as axiosToken } from './services/Axios';

function App() {
	const [token, setToken] = useState(localStorage.getItem('token'));

	const handleTokenChange = token => {
		if (token) {
			localStorage.setItem('token', token);
			axiosToken(token);
			return setToken(token);
		}
		localStorage.removeItem(token);
		setToken(null);
	};

	return (
		<div className='App '>
			<Router>
				{token ? (
					<div>
						<Navbar setToken={handleTokenChange} />
						<div className='container-fluid mt-5'>
							<Switch>
								<Route path='/customers' component={Home} />
								<Route path='/customer/:id' component={CustomerDetails} />
								<Route path='/addcustomer' component={AddCustomer} />
								<Redirect from='/' to='/customers' />
							</Switch>
						</div>
					</div>
				) : (
					<Switch>
						<Route
							path='/login'
							component={() => <Login setToken={handleTokenChange} />}
						/>
						<Route
							path='/register'
							component={() => <Register setToken={handleTokenChange} />}
						/>
						<Redirect from='/' to='/login' />
					</Switch>
				)}
			</Router>
		</div>
	);
}

export default App;
