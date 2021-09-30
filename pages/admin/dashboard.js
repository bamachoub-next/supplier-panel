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


import Server from './../../components/Server'
import Cities from './../../components/Cities';
import BirthDate from './../../components/BirthDate';
import BInput from './../../components/BInput';
import UpFile from './../../components/UpFile';




const MySwal = withReactContent(Swal)

const items = [
    { label: 'اطلاعات فروشنده' },
    { label: 'اطلاعات فروشگاه' },
    { label: 'بارگزاری مدارک' }
];

const Completionist = () => <a href="#" onClick={() => {
    this.getValidationCode()
}} >ارسال مجدد کد تایید</a>;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();
        
        this.state = {
            activeIndex: 0,
            Step: 1
        }
    }
    checkValidationCode() {
        if(!this.state.ValidationCode)
        {
            this.setState({
                ValidationCode_inValid:true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/check-validation-code", { code: this.state.ValidationCode.toString(), phoneNumber: this.state.phoneNumber.toString() },
            (response) => {

                if(!response.data.code)
                    this.setState({
                        Step: 3
                    })
                else
                    MySwal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: response.data.message
                    })

            }, (error) => {
                
                MySwal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'عملیات انجام نشد'
                })
                //this.toast.current.show({ severity: 'error', summary: <div> عملیات انجام نشد </div>, life: 8000 });


            }
        )
    }
    login() {
        if(!this.state.phoneNumber)
        {
            this.setState({
                phoneNumber_inValid:true
            })
            return;
        }
        debugger;
        this.Server.post("supplier-employee-auth/login", { phoneNumber: this.state.phoneNumber.toString(),password:this.state.password },
            (response) => {
                debugger;
                

            }, (error) => {
                MySwal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'عملیات انجام نشد'
                })
                //this.toast.current.show({ severity: 'error', summary: <div> عملیات انجام نشد </div>, life: 8000 });


            }
        )
    }
    
    
    render() {
        return (
            <div className="justify-content-center container" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
                <div>
                    <p>Dashboard</p>
                </div>




            </div>
        )
    }
}


export default Signup;