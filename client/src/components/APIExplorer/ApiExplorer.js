import React, { Component } from 'react';

// import the mock data
import DATA from './data';

const staticText = {
    button: 'send request',
    response: 'response'
};

export default class ApiExplorer extends Component {
    constructor(props) {
        super(props);

        // set the inital state of the component to POST
        DATA.forEach(request => {
            switch (request.method) {
                case 'POST':
                    this.state = {
                        title: request.title,
                        description: request.description,
                        base_url: request.url,
                        method: request.method,
                        body: request.body,
                        response: false
                    };
                break;
            }
        });

        this.setMethod = this.setMethod.bind(this);
    }

    // returns the keys of the component state to be used in other functions
    keys() {
        return Object.keys(this.state);
    }

    renderAvailabeRequests() {
        return DATA.map(request => {
            return <option key={request.method} value={request.method}>{request.title}</option>
        });
    }

    setMethod(e) {
        DATA.forEach(request => {
            if (request.method === e.target.value) {
                this.setState({
                    title: request.title,
                    description: request.description,
                    base_url: request.url,
                    method: request.method,
                    body: request.body
                });
            }
        });

        console.log(this.state);
    }

    // renders the url / header section of the component
    renderURL() {
        const URLSECTION = 
        <section id='explorer-url-section'>
            <h2 id='explorer-url-heading'>{this.state.title}</h2>
            <h4 id='explorer-method'>{this.state.method}</h4>
            <p id='explorer-description' className='grey-text lighten-1'>{this.state.description}</p>
            <div className='input-field'>
                <select id='select-method' className='browser-default' onChange={this.setMethod}>
                    {this.renderAvailabeRequests()}
                </select>
            </div>
            <h4 id='explorer-base-url'>{this.keys()[this.keys().indexOf('base_url')].split('_').join(' ').toUpperCase()}</h4>
            <h5 id='explorer-url' className='grey-text lighten-1'>{this.state.base_url}</h5>
        </section>

        return URLSECTION;
    }

    // renders the body section of the component
    renderBody() {
        if (this.state.body === undefined) {
            return null;
        }
        
        const BODY = 
        <section id='explorer-body'>
            <h2 id='explorer-body-heading'>{this.keys()[this.keys().indexOf('body')].toUpperCase()}</h2>
            {createInputFields(this.state.body)}
        </section>

        /*  
            creates a specific input corresponding to the object data (email, tlf etc..)
    
            allows for easy addition of elements due to how the function is structured using
            '.map' and how the properties are set if they are present in the specific object
        */
        function createInputFields(data) {
            return data.map(inputData => {
                // id for the specific input, used to set corresponding label
                let id = `input-field-${inputData.name}`;
                const INPUTS =
                 <div key={inputData.name}>
                    <label htmlFor={id}>{`${formatLabels(inputData.name)} `}{isFieldRequired(inputData.required)}</label>
                    <input id={id}
                        type={inputData.type}
                        min={inputData.min}
                        max={inputData.max}
                        placeholder={inputData.placeholder}
                        required={inputData.required}
                        pattern={inputData.pattern}
                    />
                </div>

                /*
                    check if the specific input field is required, if true we also render
                    a '*' so it`s clear for the user that this field is required to enter
                */
                function isFieldRequired(bool) {
                    switch (bool) {
                        case true:
                            return <span id='required-star'>*</span>;

                        default:
                            return '';
                    }
                }

                // simpel function to format the labels nicely
                function formatLabels(label) {
                    switch (label.includes('-')) {
                        case true:
                            return label.split('-').join(' ');

                        default:
                            return label;
                    }
                }

                return INPUTS;
            });
        }

        return BODY;
    }

    renderResponse() {
        if (this.state.response === false) {
            return `Go ahead and send a request, the result will appear here`;
        }
    }

    render() {
        return (
            <div className='container row'>
                <div className='col l7 m12 s12'>
                    <div id='explorer-request'>
                        {this.renderURL()}
                        {this.renderBody()}
                        <button id='send-request-btn' className='btn' type='submit'>{staticText.button}</button>
                    </div>
                </div>
                <div className='col l5 m12 s12'>
                    <div id='explorer-response' className='center-align'>
                        <h2 id='explorer-response-heading'>{staticText.response}</h2>
                        <p id='explorer-response-intro' className='grey-text lighten-1'>{this.renderResponse()}</p>
                    </div>
                </div>
            </div>
        )
    }
}
