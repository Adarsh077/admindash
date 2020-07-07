import Axios from 'axios';

Axios.defaults.baseURL =
	'https://admindash-server.herokuapp.com/';

const setToken = token => {
	Axios.defaults.headers['x-access-token'] = token;
};

const token = localStorage.getItem('token');
if (token) setToken(token);

export default Axios;
export { setToken };
