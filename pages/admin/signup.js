import React, { Component } from 'react';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import Countdown from 'react-countdown';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { MultiSelect } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';


import Server from './../../components/Server'
import Cities from './../../components/Cities';
import BirthDate from './../../components/BirthDate';
import BInput from './../../components/BInput';
import UpFile from './../../components/UpFile';
import { Toast } from 'primereact/toast';

const items = [
    { label: 'اطلاعات فروشنده' },
    { label: 'اطلاعات فروشگاه' },
    { label: 'بارگزاری مدارک' }
];
const categoriesToSales = [
    { name: 'ام دی اف', code: 'ام دی اف' },
    { name: 'نئوپان', code: 'نئوپان' },
]
const Completionist = () => <a href="#" onClick={() => {
    this.getValidationCode()
}} >ارسال مجدد کد تایید</a>;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();
        this.toast = React.createRef();

        this.state = {
            activeIndex: 0,
            Step: 1
        }
    }
    checkValidationCode() {
        this.Server.post("supplier-employee-auth/check-validation-code", { code: this.state.ValidationCode, phoneNumber: this.state.phoneNumber },
            (response) => {
                this.setState({
                    Step: 3
                })
            }, (error) => {
                this.toast.current.show({ severity: 'error', summary: <div> عملیات انجام نشد </div>, life: 8000 });


            }
        )
    }
    getValidationCode() {
        this.Server.post("supplier-employee-auth/get-validation-code", { phoneNumber: this.state.phoneNumber },
            (response) => {
                this.setState({
                    Step: 2,
                    RecieverCode: "3077",
                    ValidationCode: '',
                    Count: Date.now() + 59000
                })

            }, (error) => {

                this.toast.current.show({ severity: 'error', summary: <div> عملیات انجام نشد </div>, life: 8000 });


            }
        )
    }
    setInfo(){
        let param =
        {
            "address": this.state.address,
            "birthDate": this.state.SelectedDay + "/" + this.state.SelectedMounth + "/" + this.state.SelectedYear ,
            "categoriesToSale": this.state.categoriesToSale,
            "city": this.state.SelectedCity + " " + this.state.SelectedSubCity,
            "firstName": this.state.firstName,
            "idBookPageOneImage": this.state.idBookPageOneImage,
            "idBookPageTwoImage": this.state.idBookPageTwoImage,
            "idCardImage": this.state.idCardImage,
            "lastName": this.state.lastName,
            "latitude": 0,
            "longitude": 0,
            "nationalCode": this.state.nationalCode,
            "phoneNumber": this.state.phoneNumber,
            "postalCode": this.state.postalCode,
            "salesPermitImage": this.state.salesPermitImage,
            "shabaNumber": this.state.shabaNumber,
            "shopName": this.state.shopName,
            "state": ""
          }
          this.Server.post("supplier-employee-auth/create-supplier-preview", param,
            (response) => {
                if(response.data.code == "200")
                    this.toast.current.show({ severity: 'success', summary: <div> {response.data.message}</div>, life: 8000 });
                else
                    this.toast.current.show({ severity: 'error', summary: <div> {response.data.message}</div>, life: 8000 });

            }, (error) => {
                this.toast.current.show({ severity: 'error', summary: <div> </div>, life: 8000 });

            }
        )
    }
    getCityResponse(value) {
        this.setState({
            SelectedCity: value.SelectedCity,
            SelectedSubCity: value.SelectedSubCity
        })
    }
    getBirthDateResponse(value) {
        this.setState({
            SelectedDay: value.SelectedDay,
            SelectedMounth: value.SelectedMounth,
            SelectedYear: value.SelectedYear
        })
    }
    
    
    render() {
        return (
            <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }} className="container" >
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
                                                ثبت نام فروشنده
                                            </h2>
                                        </div>
                                    </div>
                                    <BInput value={this.state.phoneNumber} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره موبایل خود را وارد کنید" Val={(v)=>
                                                    this.setState({
                                                        phoneNumber:v
                                                })} />
                                   

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="دریافت کد تایید" onClick={() => this.getValidationCode()} style={{ width: '100%' }} />
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

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
                                    
                                    <BInput value={this.state.ValidationCode} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد تایید را وارد کنید" Val={(v)=>
                                                    this.setState({
                                                        ValidationCode:v
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
                {this.state.Step > 2 &&
                    <div>
                        <div className="row" >
                            <div className="col-lg-3 col-1">

                            </div>
                            <div className="col-lg-6 col-12">
                                <Card className="b-card" style={{ position: 'relative' }}>
                                    {this.state.Step != 3 &&
                                        <ArrowForward style={{ position: 'absolute', top: 10, right: 25, cursor: 'pointer' }} onClick={() => {
                                            this.setState({
                                                Step: this.state.Step - 1,
                                                activeIndex: this.state.activeIndex - 1

                                            })
                                        }
                                        } />
                                    }
                                    
                                    <Steps model={items} activeIndex={this.state.activeIndex} />
                                    {this.state.Step == 3 &&
                                        <div>
                                            <BInput value={this.state.firstName} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام" Val={(v)=>
                                                    this.setState({
                                                        firstName:v
                                                })} />
                                            <BInput value={this.state.lastName} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام خانوادگی" Val={(v)=>
                                                    this.setState({
                                                        lastName:v
                                                })} />
                                            <BInput value={this.state.nationalCode} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد ملی" Val={(v)=>
                                                    this.setState({
                                                        nationalCode:v
                                                })} />
                                            <BInput value={this.state.shenasname} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره شناسنامه" Val={(v)=>
                                                    this.setState({
                                                        shenasname:v
                                                })} />
                                            
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12" >
                                                <BirthDate callback={this.getBirthDateResponse.bind(this)}  SelectedYear={this.state.SelectedYear} SelectedMounth={this.state.SelectedMounth} SelectedDay={this.state.SelectedDay}  />

                                                </div>

                                            </div>

                                            <BInput value={this.state.shabaNumber} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره شبا" Val={(v)=>
                                                    this.setState({
                                                        shabaNumber:v
                                                })} />

                                            <div className="row" style={{ justifyContent: 'center', marginTop: 32 }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Button label="تایید اطلاعات و ادامه" style={{ width: '100%' }} onClick={() => {
                                                        this.setState({
                                                            Step: 4,
                                                            activeIndex: 1
                                                        })
                                                    }} />
                                                </div>

                                            </div>
                                        </div>


                                    }
                                    {this.state.Step == 4 &&
                                        <div>

                                            <BInput value={this.state.shopName} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام فروشگاه" Val={(v)=>
                                                    this.setState({
                                                        shopName:v
                                                })} />
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Cities callback={this.getCityResponse.bind(this)} SelectedCity={this.state.SelectedCity} SelectedSubCity={this.state.SelectedSubCity} />
                                                </div>

                                            </div>
                                            <BInput value={this.state.address} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="آدرس" Val={(v)=>
                                                    this.setState({
                                                        address:v
                                                })} />
                                            <BInput value={this.state.postalCode} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد پستی" Val={(v)=>
                                                    this.setState({
                                                        postalCode:v
                                                })} />
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12" >
                                                    <label htmlFor="name">محصولاتی که می فروشید</label>
                                                    <div>
                                                        <MultiSelect display="chip" optionLabel="name" style={{ width: '100%' }} value={this.state.categoriesToSale} options={categoriesToSales} onChange={(e) => this.setState({ categoriesToSale: e.value })} />

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="row" style={{ justifyContent: 'center', marginTop: 32 }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Button label="تایید اطلاعات و ادامه" style={{ width: '100%' }} onClick={() => {
                                                        this.setState({
                                                            Step: 5,
                                                            activeIndex: 2
                                                        })
                                                    }} />
                                                </div>

                                            </div>
                                        </div>

                                    }
                                    {this.state.Step == 5 &&

                                        <div>

                                            <UpFile label="کارت ملی" uploadImage={this.state.idCardImage} buttonLabel="انتخاب تصویر" callback={(v)=>{
                                                this.setState({
                                                    idCardImage:v.uploadImage
                                                })
                                            }
                                                   } />
                                             <UpFile uploadImage={this.state.idBookPageOneImage} label="شناسنامه صفحه اول" buttonLabel="انتخاب تصویر" callback={(v)=>{
                                                this.setState({
                                                    idBookPageOneImage:v.uploadImage
                                                })
                                            }
                                                   } />    
                                            <UpFile uploadImage={this.state.idBookPageTwoImage}  label="صفحه دوم شناسنامه" buttonLabel="انتخاب تصویر" callback={(v)=>{
                                                this.setState({
                                                    idBookPageTwoImage:v.uploadImage
                                                })
                                            }
                                                   } />  
                                            <UpFile uploadImage={this.state.salesPermitImage} label="جواز کسب" buttonLabel="انتخاب تصویر" callback={(v)=>{
                                                this.setState({
                                                    salesPermitImage:v.uploadImage
                                                })
                                            }
                                                   } />           
                                            

                                            <div className="row" style={{ justifyContent: 'center', marginTop: 32 }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Button label="تایید اطلاعات و ادامه" style={{ width: '100%' }} onClick={() => {
                                                       this.setInfo();
                                                    }} />
                                                </div>

                                            </div>
                                        </div>

                                    }

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