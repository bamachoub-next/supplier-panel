import React, { Component } from 'react';
import { connect } from 'react-redux';

import Server from './../../components/Server'

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();

        this.state = {
            
        }
    }
   



    render() {
        return (
            <>
              
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        employKey: state.token.employKey,
        accessToken: state.token.accessToken
    }
}
export default connect(mapStateToProps)(Wallet)