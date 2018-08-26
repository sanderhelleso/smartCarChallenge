import React, { Component } from 'react';
import axios  from 'axios';

// import the mock data
import DATA from './data';

// static text for easier modifying of text in component
const STATICTXT = {
    button: 'send request',
    response: 'response',
    token: 'Auth Token',
    token_tooltip: 'hover to unblur, click to copy',
    intro: 'Go ahead and send a request, the result will appear here'
};

// possible statuses of the requests
const STATUSES = [
    {
    pending: {
        text: 'pending'
    },
    success: {
        text: 'success'
    },
    error: {
        text: 'error'
    }
}];

export default class ApiExplorer extends Component {
    constructor(props) {
        super(props);

        // set the inital state of the component to POST
        DATA.forEach(request => {
            switch (request.method) {
                default:
                    this.state = {
                        title: request.title,
                        description: request.description,
                        base_url: request.url,
                        method: request.method,
                        body: request.body,
                        response: ''
                    };
                break;
            }
        });

        // bind event specific functions
        this.setMethod = this.setMethod.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.copyToken = this.copyToken.bind(this);
    }

    // returns the keys of the component state to be used in other functions
    keys() {
        return Object.keys(this.state);
    }

    // set the options available
    renderAvailabeRequests() {
        return DATA.map(request => {
            return <option key={request.method} value={request.method}>{request.title}</option>
        });
    }

    // select and update component when selecting a method
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
                const INPUTS =
                 <div key={inputData.name}>
                    <label htmlFor={inputData.name}>{`${formatLabels(inputData.name)} `}{isFieldRequired(inputData.required)}</label>
                    <input id={inputData.name}
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

    // build the request body
    buildRequestBody(obj) {
        switch (this.state.method) {
            case 'POST':
                const form = Array.from(document.querySelector('#explorer-body').querySelectorAll('input'));
                form.forEach(input => {
                    obj[input.id] = input.value;
                });
                return obj;
            
            default:
                return null;
        }
    }

    // update state when user submits form and  make request to specific endpoint
    async sendRequest(e) {

        // prevent form from submiting
        e.preventDefault();

        // remove intro as it`s no longer needed
        STATICTXT.intro = '';
        
        /* 
        display the current status of the request to the user
        (try network throtling at 3g to see how this can be usefull for the user)
        */
        function setStatus(status) {
            const statusElements = document.querySelectorAll('.status');
            const currentStatusEle = document.querySelector(`#${status}`);
            statusElements.forEach(element => {
                element.className = 'status';
            });
            
            // show current status after clearing the previous
            currentStatusEle.classList.add(status);
        }

        // creates a random mock token
        function getUserToken() {
            let token = '';
            const POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 8; i++) {
                token += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));
            }

            return `${token}-${new Date().getTime()}`;
        }

        try {
            let token = getUserToken();
            setStatus('pending');
            const response = await axios({
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: this.state.method,
                url: this.state.base_url,
                body: this.buildRequestBody({}), // flow and validation of request
                json: true
            })
            setStatus('success');
            this.setState({
                response: response,
                token: token
            });

            // display token and response to user
            document.querySelector('#explorer-response-data').style.display = 'block';
            document.querySelector('#explorer-token').style.display = 'block';
        } 
        catch (error) {
            setStatus('error');
            this.setState({
                errors: `${error.name}: ${error.message}`
            })
        };
    }

    // renders the the possible statuses of a request
    renderStatuses() {
        return STATUSES.map(status => {
            return Object.keys(status).map(key => {
                const statusEle = 
                <div key={key} className='col l4 m4 s12'>
                    <div id={key} className='status'>
                        {key}
                    </div>
                </div>

                return statusEle;
            });
        });
    }

    // copy auth token to clipboard
    async copyToken(e) {
        const toast = document.createElement('div');
        toast.className = 'toast animated slideInDown';
        try {
            await navigator.clipboard.writeText(e.target.innerHTML);
            toast.innerHTML = '🤘 Copying was successful!';
        }
        catch (error) {
            toast.innerHTML = '👎 Copying failed!';
        }

        document.body.appendChild(toast);

        // remove toast
        setTimeout(() => {
            toast.className = 'toast animated slideOutUp';
            setTimeout(() => {
                toast.remove();
            }, 1000);
        }, 3000);
    }

    render() {
        return (
            <div className='container row'>
                <div className='col l7 m12 s12'>
                    <div id='explorer-request'>
                        {this.renderURL()}
                        <form onSubmit={this.sendRequest}>
                            {this.renderBody()}
                            <button id='send-request-btn' className='btn' type='submit'>{STATICTXT.button}</button>
                        </form>
                    </div>
                </div>
                <div className='col l5 m12 s12'>
                    <div id='explorer-response' className='center-align'>
                        <h2 id='explorer-response-heading'>{STATICTXT.response}</h2>
                        <div id='explorer-response-statuses'>
                            {this.renderStatuses()}
                        </div>
                        <div id='explorer-response-intro' className='grey-text lighten-1'>
                            <p>{STATICTXT.intro}</p>
                        </div>
                        <div id='explorer-token' className='animated fadeIn'>
                            <h4 id='token-heading'>{STATICTXT.token}</h4>
                            <h5 id='blur-token' className='noSelect' onClick={this.copyToken}>{this.state.token}</h5>
                            <p id='blur-tooltip'>{STATICTXT.token_tooltip}</p>
                        </div>
                        <h5 id='errors'>{this.state.errors}</h5>
                        <div id='explorer-response-data' className='animated fadeIn'>
                            {   
                                JSON.stringify(this.state.response, null, '\t').split('\n').map((JSONLine) => {

                                // formats JSON nice
                                if (JSONLine.split('')[0] === '{' || JSONLine.split('')[0] === '}') {
                                    return (
                                        <div key={Math.random()} className='explorer-response-JSON'>
                                            {JSONLine}
                                        </div>
                                    )
                                }

                                return (
                                    <div key={Math.random()}className='explorer-response-JSON-string'>
                                        {JSONLine}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
