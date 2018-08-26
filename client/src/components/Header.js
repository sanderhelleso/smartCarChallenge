import React, { Component } from 'react';

const HEADERTXT = {
    heading: 'API Explorer',
    intro: 'Welcome to the API Explorer, an application built as a code challenge for Smartcar'

};

export default class Header extends Component {
    render() {
        return (
            <header id='app-header' className='center-align container'>
                <img id='app-logo' src='/img/smartcar-black-symbol.png' alt='Smartcar-logo' />
                <h1 id='app-heading'><span role='img'>👋</span> {HEADERTXT.heading}</h1>
                <p id='app-introduction' className='grey-text lighten-1'>{HEADERTXT.intro}</p>
            </header>
        )
    }
}
