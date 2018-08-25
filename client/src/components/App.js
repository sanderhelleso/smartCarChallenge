import React, { Component } from 'react'

// import materialize-css framework
import "materialize-css/dist/css/materialize.min.css";

import APIExplorer from './APIExplorer/ApiExplorer';

export default class App extends Component {
    render() {
        return (
            <main>
                <APIExplorer />
            </main>
        )
    }
}
