import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:8080';

const setToken = token => {
	Axios.defaults.headers['x-access-token'] = token;
};

const token = localStorage.getItem('token');
if (token) setToken(token);

export default Axios;
export { setToken };
