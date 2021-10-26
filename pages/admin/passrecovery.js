import React, { Component } from 'react';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Server from './../../components/Server'
import BInput from './../../components/BInput';
import Router from 'next/router'



import { Toast } from 'primereact/toast';
import { ThreeSixtySharp } from '@material-ui/icons';

const MySwal = withReactContent(Swal)



const Completionist = () => <a href="#" onClick={() => {
    this.getValidationCode()
}} >ارسال مجدد کد تایید</a>;

class ChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();

        this.state = {
            activeIndex: 0,
            Step: 1,
            BtnText: "دریافت پیامک"
        }

    }
    getNewPass() {
        if (this.state.Step == 2)
            this.verifyNewPass()
        if (!this.state.phoneNumber) {
            this.setState({
                phoneNumber_inValid: true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/get-changePassword-code", { phoneNumber: this.state.phoneNumber.toString() },
            (response) => {
                if (!response.data.code || response.data.code == 200) {
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        title: 'رمز عبور جدید برای شما ارسال شد',
                        html: <div className='title'><div>رمز عبور به شماره شما ارسال شد، لطفا پس از ورود رمز عبور خود را تغییر دهید</div><br /><br />
                            <div style={{ textAlign: 'center' }}><Button label="صفحه ورود" onClick={() => { MySwal.close(); }} style={{ width: 120 }} /></div></div>
                    })
                    this.setState({
                        Step: 2,
                        BtnText: "ورود"
                    })

                }


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
    verifyNewPass() {
        if (!this.state.phoneNumber) {
            this.setState({
                phoneNumber_inValid: true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/changePassword-without-login", { phoneNumber: this.state.phoneNumber.toString(), code: this.state.code.toString(), password: this.state.password.toString() },
            (response) => {
                if (!response.data.code || response.data.code == 200) {
                    Router.push('/admin/dashboard');
                }


            }, (error) => {
                console.log(error.response)
                MySwal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: (error.response.data && error.response.data.userMsg) ? error.response.data.userMsg : 'عملیات انجام نشد'
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
                            <Card className="b-card" >
                                <div className="row mt-3 justify-content-center" style={{ justifyContent: 'center' }} >

                                    <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                        <h2 className="large-title">
                                            LOGO
                                            </h2>
                                        <h2 className="large-title" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                                            فراموشی رمز عبور
                                            </h2>
                                    </div>
                                </div>
                                <BInput value={this.state.phoneNumber} inValid={this.state.phoneNumber_inValid} InputNumber={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره موبایل" absoluteLabel="شماره موبایل" Val={(v) =>
                                    this.setState({
                                        phoneNumber: v,
                                        phoneNumber_inValid: false
                                    })} />
                                {
                                    this.state.Step == 2 &&

                                    <BInput value={this.state.code} inValid={this.state.code_inValid} InputNumber={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد تایید پیامک شده" absoluteLabel="کد تایید پیامک شده" Val={(v) =>
                                        this.setState({
                                            code: v,
                                            code_inValid: false
                                        })} />
                                }
                                {
                                    this.state.Step == 2 &&

                                    <BInput value={this.state.password} inValid={this.state.password_inValid} InputNumber={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="رمز عبور پیامک شده" absoluteLabel="رمز عبور پیامک شده" Val={(v) =>
                                        this.setState({
                                            password: v,
                                            password_inValid: false
                                        })} />
                                }

                                <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                    <div className="col-lg-8 col-12" >
                                        <Button label={this.state.BtnText} onClick={() => this.getNewPass()} style={{ width: '100%' }} />
                                    </div>

                                </div>
                                <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                    <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                        <label>قبلا ثبت نام نکرده اید ؟</label>
                                        <Link href="./signup"   >
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










            </div>
        )
    }
}


export default ChangePass;