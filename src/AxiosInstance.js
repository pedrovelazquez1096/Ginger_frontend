import axios from 'axios';
const url="https://ginger-backend.herokuapp.com/api/";

export default axios.create({
  baseURL: url
});
