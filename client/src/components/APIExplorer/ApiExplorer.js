import React, { Component } from 'react';

// import the mock data
import DATA from './data';

export default class ApiExplorer extends Component {
    constructor(props) {
        super(props);

        // set the inital state of the component
        this.state = {
            title: DATA.title,
            base_url: DATA.url,
            method: DATA.method,
            body: DATA.body
        };
    }

    // returns the keys of the component state to be used in other functions
    keys() {
        return Object.keys(this.state);
    }

    // renders the url / header section of the component
    renderURL() {
        const URLSECTION = 
        <section>
            <h2>{this.state.title}</h2>
            <h4>{this.keys()[this.keys().indexOf('base_url')].split('_').join(' ').toUpperCase()}</h4>
            <h5>{this.state.base_url}</h5>
            <h4>{this.state.method}</h4>
        </section>

        return URLSECTION;
    }

    // renders the body section of the component
    renderBody() {
        const BODY = 
        <section>
            <h4>{this.keys()[this.keys().indexOf('body')].toUpperCase()}</h4>
            {createInputFields(this.state.body)}
            <button className='btn' type='submit'>Send Request</button>
        </section>

        /*  
            creates a specific input corresponding to the object data (email, tlf etc..)
    
            allows for easy addition of elements due to how the function is structured 
            map and howthe properties are set if they are present in the specific object
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

    render() {
        return (
            <div className='container'>
                {this.renderURL()}
                {this.renderBody()}
            </div>
        )
    }
}
