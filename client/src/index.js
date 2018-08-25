/**
 * @author Sander Hellesø
**/

import React from 'react'
import ReactDOM from 'react-dom';

import App from './components/App';

/* 
render the main App component containing the
different components in the application
*/

ReactDOM.render(
    <App />,
    document.querySelector("#root")  
);