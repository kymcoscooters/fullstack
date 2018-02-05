import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'

console.log(axios.get('http://localhost:3001/persons'))

ReactDOM.render(<App />, document.getElementById('root'));
