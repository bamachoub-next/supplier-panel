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
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
    () => {
      return import('./../../components/Mapp');
    },
    {
      ssr: false
    }
  );

import { Toast } from 'primereact/toast';

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
                <Toast ref={this.toast} position="bottom-left" style={{ fontFamily: 'iranyekanwebblack', textAlign: 'right' }} />
                {this.state.Step == 1 &&
                    <div>
                        <div className="row" >
                            <div className="col-lg-3 col-1">

                            </div>
                            <div className="col-lg-6 col-10">
                                <Card className="b-card" >
                                    <div className="row mt-3 justify-content-center" style={{ justifyContent: 'center' }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <h2 className="large-title">
                                                LOGO
                                            </h2>
                                            <h2 className="large-title" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                                                ورود فروشنده
                                            </h2>
                                        </div>
                                    </div>
                                    <BInput value={this.state.phoneNumber} inValid={this.state.phoneNumber_inValid} InputNumber={true}  ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره موبایل" absoluteLabel="شماره موبایل" Val={(v)=>
                                                    this.setState({
                                                        phoneNumber:v,
                                                        phoneNumber_inValid:false
                                                })} />
                                   <BInput value={this.state.password} password={true} inValid={this.state.password_inValid}  ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="رمز عبور" absoluteLabel="رمز عبور" Val={(v)=>
                                                    this.setState({
                                                        password:v,
                                                        password_inValid:false
                                                })} />

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="ورود" onClick={() => this.login()} style={{ width: '100%' }} />
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <label>رمز عبور خود را فراموش کرده اید ؟</label>
                                            <Link href="./admin/changepass"   >
                                                <a style={{ marginRight: 10 }} >
                                                    بازیابی رمز عبور
                                            </a>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <label>قبلا ثبت نام نکرده اید ؟</label>
                                            <Link href="./admin/signup"   >
                                                <a style={{ marginRight: 10 }} >
                                                  ثبت نام
                                            </a>
                                            </Link>
                                        </div>

                                    </div>





                                </Card>
                            </div>
                            <div className="col-lg-3 col-1">

                            </div>
                        </div>
                    </div>
                }
                {this.state.Step == 2 &&
                    <div>
                        <div className="row" >
                            <div className="col-lg-3 col-1">

                            </div>
                            <div className="col-lg-6 col-10">
                                <Card className="b-card" style={{  position: 'relative' }} >
                                    <ArrowForward style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }} onClick={() => {
                                        this.setState({
                                            Step: 1

                                        })
                                    }
                                    } />

                                    <div className="row mt-3 justify-content-center" style={{ justifyContent: 'center' }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <h2>
                                                    LOGO
                                            </h2>
                                            <h2 style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                                                    ثبت نام فروشنده
                                            </h2>
                                            <label>کد تایید به شماره {this.state.phoneNumber} ارسال شد</label>
                                            <div>
                                                <a href="#" onClick={() => {
                                                    this.setState({
                                                        Step: 1
                                                    })
                                                }} >ویرایش شماره</a>
                                            </div>

                                        </div>
                                    </div>
                                    
                                    <BInput value={this.state.ValidationCode} InputNumber={true}  absoluteLabel="کد تایید" inValid={this.state.ValidationCode_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد تایید را وارد کنید" Val={(v)=>
                                                    this.setState({
                                                        ValidationCode:v,
                                                        ValidationCode_inValid:false
                                                })} />

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="ادامه" onClick={() => this.checkValidationCode()} style={{ width: '100%' }} />
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >
                                        <div className="col-lg-8 col-12 Countdown" style={{ textAlign: 'left' }}>
                                            <Countdown date={this.state.Count} renderer={({ hours, minutes, seconds, completed }) => {
                                                if (completed) {
                                                    // Render a completed state
                                                    return <Completionist />;
                                                } else {
                                                    // Render a countdown
                                                    return <span>{minutes}:{seconds}</span>;
                                                }
                                            }} >
                                                <Completionist />
                                            </Countdown>
                                        </div>
                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <label>آیا قبلا ثبت نام کرده اید ؟</label>
                                            <Link href="/signin"   >
                                                <a style={{ marginRight: 10 }} >
                                                    ورود
                                            </a>
                                            </Link>
                                        </div>

                                    </div>





                                </Card>
                            </div>
                            <div className="col-lg-3 col-1">

                            </div>
                        </div>
                    </div>
                }
                








            </div>
        )
    }
}


export default Signup;