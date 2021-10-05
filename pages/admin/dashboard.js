import React, { Component } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import Router from 'next/router'

const MySwal = withReactContent(Swal)


import Server from './../../components/Server'
import Header from './../../components/Header';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();
        
        this.state = {
            activeIndex: 0,
            Step: 1
        }
    }
    
    
    
    render() {
        return (
            <>
            <Header />
            <div className="justify-content-center container" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
                
                <div>
                <Button label="ایجاد کالای جدید" onClick={() =>   Router.push('/admin/addproduct')} style={{ width: '100%' }} />

                </div>




            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        employKey:state.employKey,
        accessToken:state.accessToken
    }
  }
export default connect(mapStateToProps)(Dashboard)