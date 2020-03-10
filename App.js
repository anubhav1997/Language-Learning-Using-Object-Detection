// App.js file
import React from 'react';

import CameraPage from './camera.page';
 // import {
 //      View,
 //      Text,
 // } from 'react-native';

import ErrorBoundary from './errorBoundary'


export default class App extends React.Component {
   constructor(props) {
	    super(props);
	    this.state = { apiResponse: "" };
	    this.callAPI();
	    console.log(this.state.apiResponse);

	 };
	ComponentWillMount(){
		this.callAPI();
		console.log(this.state.apiResponse);

	}

	callAPI() {
	    fetch("http://localhost:3000/testAPI")
	        .then(res => res.text())
	        .then(res => this.setState({ apiResponse: res }))
	        .catch(err => err);
	};



    render() {
        return (
	        	<ErrorBoundary>
        	      <React.Fragment>
	               <CameraPage />
        	      </React.Fragment>
	        	</ErrorBoundary>

        );
    };
};


