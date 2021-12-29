import React, { Component } from 'react';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import Countdown from 'react-countdown';
import { LocationSearchingTwoTone, ArrowForward } from '@material-ui/icons';

import { MultiSelect } from 'primereact/multiselect';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Dialog } from 'primereact/dialog';
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
        this.toast = React.createRef();
        console.log(props);
        let categories = [];
        props.data.map((v, i) => {
            categories.push({ name: v.name, code: v.url })
        })
        this.state = {
            activeIndex: 0,
            Step: 1,
            categoriesToSales: categories
        }
    }
    checkValidationCode() {
        if (!this.state.ValidationCode) {
            this.setState({
                ValidationCode_inValid: true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/check-validation-code", { code: this.state.ValidationCode.toString(), phoneNumber: this.state.phoneNumber.toString() },
            (response) => {

                if (!response.data.code)
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
    getValidationCode() {
        if (!this.state.phoneNumber) {
            this.setState({
                phoneNumber_inValid: true
            })
            return;
        }
        this.Server.post("supplier-employee-auth/get-validation-code", { phoneNumber: this.state.phoneNumber.toString() },
            (response) => {
                if (!response.data.code)
                    this.setState({
                        Step: 2,
                        RecieverCode: "3077",
                        ValidationCode: '',
                        Count: Date.now() + 59000
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
    setInfo() {
        if (!this.state.idCardImage) {
            this.setState({
                idCardImage_inValid: true
            })
            return;
        }
        if (!this.state.idBookPageOneImage) {
            this.setState({
                idBookPageOneImage_inValid: true
            })
            return;
        }
        if (!this.state.idBookPageTwoImage) {
            this.setState({
                idBookPageTwoImage_inValid: true
            })
            return;
        }

        if (!this.state.salesPermitImage) {
            this.setState({
                salesPermitImage_inValid: true
            })
            return;
        }
        let param =
        {
            "address": this.state.address,
            "birthDate": this.state.SelectedDay?.code + "/" + this.state.SelectedMounth?.code + "/" + this.state.SelectedYear?.code,
            "categoriesToSale": this.state.categoriesToSale.map((item) => { return item.code }),
            "city": this.state.SelectedSubCity,
            "state": this.state.SelectedCity,
            "firstName": this.state.firstName,
            "idBookPageOneImage": this.state.idBookPageOneImage,
            "idBookPageTwoImage": this.state.idBookPageTwoImage,
            "idCardImage": this.state.idCardImage,
            "lastName": this.state.lastName,
            "latitude": this.state.lat,
            "longitude": this.state.lng,
            "nationalCode": this.state.nationalCode.toString(),
            "shenasNameCode": this.state.shenasname.toString(),
            "phoneNumber": this.state.phoneNumber.toString(),
            "postalCode": this.state.postalCode.toString(),
            "salesPermitImage": this.state.salesPermitImage,
            "shabaNumber": this.state.shabaNumber,
            "shopName": this.state.shopName
        }
        this.Server.post("supplier-employee-auth/create-supplier-preview", param,
            (response) => {
                if (!response.data.code || response.data.code == 200)
                    MySwal.fire({
                        icon: 'success',
                        title: 'عملیات موفق',
                        text: 'ثبت نام با موفقیت انجام شد'
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
                    text: "عملیات انجام نشد"
                })
            }
        )
    }
    getCityResponse(value) {
        this.setState({
            SelectedCity: value.SelectedCity,
            SelectedSubCity: value.SelectedSubCity,
            city_inValid: false,
            subCity_inValid: false

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
                                                ثبت نام فروشنده
                                            </h2>
                                        </div>
                                    </div>
                                    <BInput value={this.state.phoneNumber} inValid={this.state.phoneNumber_inValid} InputNumber={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره موبایل خود را وارد کنید" absoluteLabel="شماره موبایل" Val={(v) =>
                                        this.setState({
                                            phoneNumber: v,
                                            phoneNumber_inValid: false
                                        })} />


                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" >
                                            <Button label="دریافت کد تایید" onClick={() => this.getValidationCode()} style={{ width: '100%' }} />
                                        </div>

                                    </div>

                                    <div className="row justify-content-center" style={{ justifyContent: 'center', marginTop: 32 }} >

                                        <div className="col-lg-8 col-12" style={{ textAlign: 'center' }} >
                                            <label>آیا قبلا ثبت نام کرده اید ؟</label>
                                            <Link href="./"   >
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
                                <Card className="b-card" style={{ position: 'relative' }} >
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

                                    <BInput value={this.state.ValidationCode} InputNumber={true} absoluteLabel="کد تایید" inValid={this.state.ValidationCode_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد تایید را وارد کنید" Val={(v) =>
                                        this.setState({
                                            ValidationCode: v,
                                            ValidationCode_inValid: false
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
                                            <BInput value={this.state.firstName} inValid={this.state.firstName_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام" absoluteLabel="نام" Val={(v) =>
                                                this.setState({
                                                    firstName: v,
                                                    firstName_inValid: false
                                                })} />
                                            <BInput value={this.state.lastName} inValid={this.state.lastName_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام خانوادگی" absoluteLabel="نام خانوادگی" Val={(v) =>
                                                this.setState({
                                                    lastName: v,
                                                    lastName_inValid: false
                                                })} />
                                            <BInput value={this.state.nationalCode} inValid={this.state.nationalCode_inValid}   ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد ملی" absoluteLabel="کد ملی" Val={(v) =>
                                                this.setState({
                                                    nationalCode: v,
                                                    nationalCode_inValid: false
                                                })} />
                                            <BInput value={this.state.shenasname} inValid={this.state.shenasname_inValid}  ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره شناسنامه" absoluteLabel="شماره شناسنامه" Val={(v) =>
                                                this.setState({
                                                    shenasname: v,
                                                    shenasname_inValid: false
                                                })} />

                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12" >
                                                    <BirthDate callback={this.getBirthDateResponse.bind(this)} SelectedYear={this.state.SelectedYear} SelectedMounth={this.state.SelectedMounth} SelectedDay={this.state.SelectedDay} />

                                                </div>

                                            </div>

                                            <BInput value={this.state.shabaNumber} direction="ltr" inValid={this.state.shabaNumber_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="شماره شبا" absoluteLabel="شماره شبا" Val={(v) =>
                                                this.setState({
                                                    shabaNumber: v,
                                                    shabaNumber_inValid: false
                                                })} />

                                            <div className="row" style={{ justifyContent: 'center', marginTop: 32 }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Button label="تایید اطلاعات و ادامه" style={{ width: '100%' }} onClick={() => {
                                                        /*MySwal.fire({
                                                            title: <div>اطلاعات زیر را تایید میکنید</div>,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'تایید اطلاعات',
                                                            cancelButtonText: `ویرایش کد شبا`,
                                                          }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                this.setState({
                                                                    Step: 4,
                                                                    activeIndex: 1
                                                                })
                                                            } else if (result.isDenied) {
                                                              
                                                            }
                                                          })*/
                                                        if (!this.state.firstName) {
                                                            this.setState({
                                                                firstName_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.lastName) {
                                                            this.setState({
                                                                lastName_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.nationalCode) {
                                                            this.setState({
                                                                nationalCode_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.shenasname) {
                                                            this.setState({
                                                                shenasname_inValid: true
                                                            })
                                                            return;
                                                        }

                                                        if (!this.state.shabaNumber) {
                                                            this.setState({
                                                                shabaNumber_inValid: true
                                                            })
                                                            return;
                                                        }



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

                                            <BInput value={this.state.shopName} inValid={this.state.shopName_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="نام فروشگاه" absoluteLabel="نام فروشگاه" Val={(v) =>
                                                this.setState({
                                                    shopName: v,
                                                    shopName_inValid: false
                                                })} />
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >
                                                <div className="col-lg-8 col-12" >
                                                    <Button className="p-button-info p-button-outlined" style={{ width: '100%', textAlign: 'center' }} onClick={() => {
                                                        this.setState({
                                                            showMap: true
                                                        })
                                                    }} > <div style={{ width: '100%' }} ><LocationSearchingTwoTone /> <span>لوکیشن فروشگاه </span> </div></Button>
                                                    <small className={this.state.location_inValid ? "p-error p-d-block" : "p-error p-d-none"}  >موقعیت جغرافیایی خود را مشخص کنید</small>

                                                </div>
                                            </div>
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12 " >
                                                    <Cities callback={this.getCityResponse.bind(this)} subCity_inValid={this.state.subCity_inValid} city_inValid={this.state.city_inValid} SelectedCity={this.state.SelectedCity} SelectedSubCity={this.state.SelectedSubCity} />
                                                </div>

                                            </div>

                                            <BInput value={this.state.address} inValid={this.state.address_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="آدرس" absoluteLabel="آدرس" Val={(v) =>
                                                this.setState({
                                                    address: v,
                                                    address_inValid: false
                                                })} />
                                            <BInput value={this.state.postalCode} InputNumber={true} inValid={this.state.postalCode_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-8 col-12" label="کد پستی" absoluteLabel="کد پستی" Val={(v) =>
                                                this.setState({
                                                    postalCode: v,
                                                    postalCode_inValid: false
                                                })} />
                                            <div className="row mt-3" style={{ justifyContent: 'center' }} >

                                                <div className="col-lg-8 col-12" >
                                                    <label htmlFor="name">محصولاتی که می فروشید</label>
                                                    <div>
                                                        <MultiSelect display="chip" optionLabel="name" style={{ width: '100%' }} value={this.state.categoriesToSale} options={this.state.categoriesToSales} onChange={(e) => this.setState({ categoriesToSale: e.value, categoriesToSale_inValid: false })} />
                                                        <small className={this.state.categoriesToSale_inValid ? "p-error p-d-block" : "p-error p-d-none"}  > حداقل یک محصول را انتخاب کنید</small>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="row" style={{ justifyContent: 'center', marginTop: 32 }} >

                                                <div className="col-lg-8 col-12" >
                                                    <Button label="تایید اطلاعات و ادامه" style={{ width: '100%' }} onClick={() => {

                                                        if (!this.state.shopName) {
                                                            this.setState({
                                                                shopName_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.address) {
                                                            this.setState({
                                                                address_inValid: true
                                                            })
                                                            return;
                                                        }

                                                        if (!this.state.postalCode) {
                                                            this.setState({
                                                                postalCode_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.SelectedCity) {
                                                            this.setState({
                                                                city_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.SelectedSubCity) {
                                                            this.setState({
                                                                subCity_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.categoriesToSale) {
                                                            this.setState({
                                                                categoriesToSale_inValid: true
                                                            })
                                                            return;
                                                        }
                                                        if (!this.state.lat || !this.state.lng) {
                                                            this.setState({
                                                                location_inValid: true
                                                            })
                                                            return;
                                                        }






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

                                            <UpFile label="کارت ملی" inValid={this.state.idCardImage_inValid} uploadImage={this.state.idCardImage} buttonLabel="انتخاب تصویر" callback={(v) => {
                                                this.setState({
                                                    idCardImage: v.uploadImage,
                                                    idCardImage_inValid: false
                                                })
                                            }
                                            } />
                                            <UpFile uploadImage={this.state.idBookPageOneImage} inValid={this.state.idBookPageOneImage_inValid} label="شناسنامه صفحه اول" buttonLabel="انتخاب تصویر" callback={(v) => {
                                                this.setState({
                                                    idBookPageOneImage: v.uploadImage,
                                                    idBookPageOneImage_inValid: false
                                                })
                                            }
                                            } />

                                            <UpFile uploadImage={this.state.idBookPageTwoImage} inValid={this.state.idBookPageTwoImage_inValid} label="صفحه دوم شناسنامه" buttonLabel="انتخاب تصویر" callback={(v) => {
                                                this.setState({
                                                    idBookPageTwoImage: v.uploadImage,
                                                    idBookPageTwoImage_inValid: false
                                                })
                                            }
                                            } />

                                            <UpFile uploadImage={this.state.salesPermitImage} inValid={this.state.salesPermitImage_inValid} label="جواز کسب" buttonLabel="انتخاب تصویر" callback={(v) => {
                                                this.setState({
                                                    salesPermitImage: v.uploadImage,
                                                    salesPermitImage_inValid: false

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

                                <Dialog visible={this.state.showMap} onHide={() => { this.setState({ showMap: false }) }} style={{ width: '50vw' }} maximizable={true}>
                                    <DynamicMap callback={(data) => {
                                        this.setState({
                                            address: data.address,
                                            lng: data.lng,
                                            lat: data.lat,
                                            showMap: false,
                                            location_inValid: false
                                        })
                                    }} />
                                </Dialog>
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

export async function getStaticProps({ query }) {
    let res = await fetch('https://bmch.liara.run/api/v1/categories');
    //let res = await fetch('http://127.0.0.1:3000/api/v1/categories');

    
    const data = await res.json();


    return {
        props: {
            data
        }
    }

}
export default Signup;