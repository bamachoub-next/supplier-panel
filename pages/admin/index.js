import React, { Component } from 'react';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import withReactContent from 'sweetalert2-react-content'
import { Toast } from 'primereact/toast';
import Router from 'next/router'
import { saveToken } from './../../tokenSlice'

import Server from './../../components/Server'
import BInput from './../../components/BInput';



const MySwal = withReactContent(Swal)

const items = [
    { label: 'اطلاعات فروشنده' },
    { label: 'اطلاعات فروشگاه' },
    { label: 'بارگزاری مدارک' }
];

const Completionist = () => <a href="#" onClick={() => {
    this.getValidationCode()
}} >ارسال مجدد کد تایید</a>;



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();

        this.state = {
            activeIndex: 0,
            Step: 1
        }

    }
    login() {
        if (!this.state.phoneNumber) {
            this.setState({
                phoneNumber_inValid: true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/login", { phoneNumber: this.state.phoneNumber.toString(), password: this.state.password },
            (response) => {
                if (response.data.accessToken) {
                    //redux
                    this.props.dispatch(saveToken({
                        employKey: response.data.employee?._key,
                        accessToken: response.data.accessToken
                    }))
                    if (response.data.isFirstLogin) {
                        this.setState({
                            changePass: true
                        })

                    } else {
                        Router.push('/admin/dashboard')

                    }
                }



            }, (error) => {
                console.log(error);
                MySwal.fire({
                    icon: 'warning',
                    showConfirmButton: false,
                    title: 'شماره اشتباه',
                    html: <div className='title'><div>کاربری با این شماره در باماچوب وجود ندارد. لطفا ثبت نام کنید یا شماره را تغییر دهید</div><br /><br />
                        <div style={{ textAlign: 'center' }}><Button label="تغییر شماره" onClick={() => { MySwal.close(); }} style={{ width: 120 }} /></div>
                        <div style={{ textAlign: 'center', marginTop: 20 }}><Button label="ثبت نام" className="p-button-outlined" onClick={() => { MySwal.close(); Router.push('./admin/signup'); }} style={{ width: 120 }} /></div>
                    </div>
                })
                /*
                MySwal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'عملیات انجام نشد'
                })*/
                //this.toast.current.show({ severity: 'error', summary: <div> عملیات انجام نشد </div>, life: 8000 });


            }
        )
    }
    changePass() {
        if (!this.state.password1) {
            this.setState({
                password1_inValid: true
            })
            return;
        }

        if (!this.state.password2) {
            this.setState({
                password2_inValid: true
            })
            return;
        }
        if (this.state.password2 != this.state.password1) {
            MySwal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'رمز عبور و تکرار آن برابر نیستند'
            })
            return;
        }
        this.Server.post("supplier-employee-auth/change-password-with-login", { password: this.state.password1 },
            (response) => {
                if (!response.data.code || response.data.code == 200)
                    Router.push('/admin/dashboard')
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


    render() {
        return (
            <div className="justify-content-center container" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
                <Toast ref={this.toast} position="bottom-left" style={{ fontFamily: 'iranyekanwebblack', textAlign: 'right' }} />
                <div>
                    <div className="row" >
                        <div className="col-lg-3 col-1">

                        </div>
                        <div className="col-lg-6 col-10">
                            {!this.state.changePass ?
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
                                    <BInput value={this.state.phoneNumber} inValid={this.state.phoneNumber_inValid} InputNumber={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره موبایل" absoluteLabel="شماره موبایل" Val={(v) =>
                                        this.setState({
                                            phoneNumber: v,
                                            phoneNumber_inValid: false
                                        })} />
                                    <BInput value={this.state.password} password={true} inValid={this.state.password_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="رمز عبور" absoluteLabel="رمز عبور" Val={(v) =>
                                        this.setState({
                                            password: v,
                                            password_inValid: false
                                        })} />

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="ورود" onClick={() => this.login()} style={{ width: '100%' }} />
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <label>رمز عبور خود را فراموش کرده اید ؟</label>
                                            <Link href="./admin/passrecovery"   >
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

                                :

                                <Card className="b-card">

                                    <div className="row mt-3 justify-content-center" style={{ justifyContent: 'center' }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <h2 className="large-title">
                                                LOGO
                                        </h2>
                                            <h2 className="title" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                                                برای امنیت بیشتر لطفا رمز عبور خود را تغییر دهید
                                        </h2>
                                        </div>
                                    </div>
                                    <BInput value={this.state.password1} password={true} inValid={this.state.password1_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="رمز عبور جدید" absoluteLabel="رمز عبور جدید" Val={(v) =>
                                        this.setState({
                                            password1: v,
                                            password1_inValid: false
                                        })} />
                                    <BInput value={this.state.password2} password={true} inValid={this.state.password2_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="تکرار رمز عبور جدید" absoluteLabel="تکرار رمز عبور جدید" Val={(v) =>
                                        this.setState({
                                            password2: v,
                                            password2_inValid: false
                                        })} />

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="ورود" onClick={() => this.login()} style={{ width: '100%' }} />
                                        </div>

                                    </div>
                                </Card>
                            }
                        </div>
                        <div className="col-lg-3 col-1">

                        </div>
                    </div>
                </div>









            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        employKey: state.token.employKey,
        accessToken: state.token.accessToken
    }
}
export default connect(mapStateToProps)(Login)

