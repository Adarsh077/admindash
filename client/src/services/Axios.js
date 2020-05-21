import Axios from 'axios';

Axios.defaults.baseURL =
	'http://ec2-52-66-125-220.ap-south-1.compute.amazonaws.com:8080/';

const setToken = token => {
	Axios.defaults.headers['x-access-token'] = token;
};

const token = localStorage.getItem('token');
if (token) setToken(token);

export default Axios;
export { setToken };
