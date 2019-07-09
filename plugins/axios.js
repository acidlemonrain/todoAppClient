import axios from 'axios';
const instance = axios.create({
	baseURL: 'http://example.org' // if you have one
});

// Put all interceptors on this instance
instance.interceptors.response.use((r) => r);

export default instance;
