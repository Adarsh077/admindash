import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, CustomerDetails, AddCustomer } from './pages';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<div className='container-fluid mt-5'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/customer/:id' component={CustomerDetails} />
						<Route path='/addcustomer' component={AddCustomer} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
