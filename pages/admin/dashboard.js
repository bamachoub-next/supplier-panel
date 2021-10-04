import React, { Component } from 'react';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import Countdown from 'react-countdown';
import { LocationSearchingTwoTone,ArrowForward } from '@material-ui/icons';
import { MultiSelect } from 'primereact/multiselect';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Dialog} from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
const MySwal = withReactContent(Swal)


import Server from './../../components/Server'
import Header from './../../components/Header';


class Signup extends React.Component {
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
                    <p>Dashboard</p>
                </div>




            </div>
            </>
        )
    }
}


export default Signup;