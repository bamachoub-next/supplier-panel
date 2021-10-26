import React, { Component } from 'react';

import store from './../store.js';
import { Provider } from 'react-redux'


import "../node_modules/primereact/resources/primereact.min.css";
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primereact/resources/themes/saga-blue/theme.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.scss'



class MyApp extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //Anything returned here can be access by the client
    return {pageProps: pageProps};
  }
  render() {
    const {Component, pageProps} = this.props;
    return ( 
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    
    )
  }
}

export default MyApp
