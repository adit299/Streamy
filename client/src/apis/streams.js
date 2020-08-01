import axios from 'axios';

// We are setting up our axios path, so that all our
// asynchronous requests can be made from a particular URL


export default axios.create({
    baseURL: 'http://localhost:3001'
});









