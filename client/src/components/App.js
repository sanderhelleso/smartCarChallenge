import React, { Component } from 'react'

// import materialize-css framework & animations
import 'materialize-css/dist/css/materialize.min.css';
import 'animate.css';

import Header from './Header';
import APIExplorer from './APIExplorer/ApiExplorer';

export default class App extends Component {
    render() {
        return (
            <main className='animated fadeIn'>
                <Header />
                <APIExplorer />
            </main>
        )
    }
}
