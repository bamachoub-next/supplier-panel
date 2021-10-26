import React, { Component } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import Router from 'next/router'
import { Card } from 'primereact/card';
import { Store } from '@material-ui/icons';
import { Menu } from 'primereact/menu';
import BInput from './../../components/BInput';
import BirthDate from './../../components/BirthDate';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import Cities from './../../components/Cities';


const MySwal = withReactContent(Swal)


import Server from './../../components/Server'
import Header from './../../components/Header';
const Mounths = [
	{ name: 'فروردین', code: '1' },
	{ name: 'اردیبهشت', code: '2' },
	{ name: 'خرداد', code: '3' },
	{ name: 'تیر', code: '4' },
	{ name: 'مرداد', code: '5' },
	{ name: 'شهریور', code: '6' },
	{ name: 'مهر', code: '7' },
	{ name: 'آبان', code: '8' },
	{ name: 'آذر', code: '9' },
	{ name: 'دی', code: '10' },
	{ name: 'بهمن', code: '11' },
	{ name: 'اسفند', code: '12' }
];
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.Server = new Server();

        this.state = {
            activeIndex: 0,
            Type: 1,
            items:[
                { label: 'اطلاعات فروشنده',command:()=>{ this.setState({Type:1}) } },
                { label: 'اطلاعات فروشگاه',command:()=>{ this.setState({Type:2})  } },
                { label: 'اطلاعات حساب بانکی',command:()=>{ this.setState({Type:3}) }},
                { label: 'مدارک',command:()=>{ this.setState({Type:4}) }}
            ]
        }
    }
    getBirthDateResponse(value) {
        this.setState({
            SelectedDay: value.SelectedDay,
            SelectedMounth: value.SelectedMounth,
            SelectedYear: value.SelectedYear
        })
    }
    getCityResponse(value) {
        this.setState({
            SelectedCity: value.SelectedCity,
            SelectedSubCity: value.SelectedSubCity,
            city_inValid: false,
            subCity_inValid: false

        })
    }
    componentDidMount(){

     this.Server.get(`supplier-employee/one`, '',
      (response) => {
        this.setState({
          showLoading: false,
          SelectedDay:{ name: response.data.birthDate.split("/")[0], code: response.data.birthDate.split("/")[0]},
          SelectedMounth: Mounths[response.data.birthDate.split("/")[1]-1],
          SelectedYear: { name: response.data.birthDate.split("/")[2], code: response.data.birthDate.split("/")[2]},
          ...response.data
        })

      }, (error) => {
        this.setState({
          showLoading: false
        })
        

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )
    }



    render() {
        return (
            <>
                <Header />
                <div className="justify-content-center" style={{ direction: 'rtl' }}  >
                    <div className="row justify-content-center">
                        <div className="col-11" >
                            <div className="row">
                                <div className="col-lg-3 col-12">
                                    <Card className="b-card2  mt-5" style={{ textAlign: 'center' }}  >
                                        <button className="nobutton" onClick={() => { Router.push('/admin/profile') }} >
                                            <Store style={{ width: 80, height: 80 }} />
                                            <p className="large-title">پارس چوب</p>
                                        </button >

                                    </Card>
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'center' }}>
                                        <Menu model={this.state.items} className="b-menu" style={{ background: 'transparent', border: 0, width: '100%' }} />
                                    </Card>



                                </div>
                                <div className="col-lg-9 col-12">
                                    <Card className={this.state.Type  == 1 ? "b-card2 mt-5" : "d-none"}  >
                                        <div className="row">
                                            <div className="col-lg-6 col-12" >
                                                <p>اطلاعات فروشنده</p>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <Button label="درخواست ویرایش اطلاعات" style={{ width: 300 }} onClick={() => {

                                                }} />
                                            </div>

                                        </div>
                                        <div className="row mt-5" >
                                            <BInput value={this.state.firstName} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="نام" absoluteLabel="نام" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />

                                            <BInput value={this.state.lastName} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="نام خانوادگی" absoluteLabel="نام خانوادگی" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <BInput value={this.state.nationalCode} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="کد ملی" absoluteLabel="کد ملی" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <BInput value={this.state.shenasNameCode} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="شماره شناسنامه" absoluteLabel="شماره شناسنامه" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <div className="col-lg-6 col-12 mt-3" >
                                            <small >تاریخ تولد</small>

                                            <BirthDate callback={this.getBirthDateResponse.bind(this)} placeholder={false} SelectedYear={this.state.SelectedYear} SelectedMounth={this.state.SelectedMounth} SelectedDay={this.state.SelectedDay} />

                                            </div>
                                        </div>

                                    </Card>
                                    <Card className={this.state.Type  == 2 ? "b-card2 mt-5" : "d-none"}  >
                                        <div className="row" >
                                            <div className="col-lg-6 col-12" >
                                                <p>اطلاعات فروشگاه</p>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <Button label="درخواست ویرایش اطلاعات" style={{ width: 300 }} onClick={() => {

                                                }} />
                                            </div>

                                        </div>
                                        <div className="row mt-5" style={{alignItems:'end'}} >
                                            <BInput value={this.state.shopName} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="نام فروشگاه" absoluteLabel="نام فروشگاه" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <div className="col-lg-6 col-12" >

                                            </div>
                                            <Cities className="col-lg-6 col-12" callback={this.getCityResponse.bind(this)} subCity_inValid={this.state.subCity_inValid} city_inValid={this.state.city_inValid} SelectedCity={this.state.SelectedCity} SelectedSubCity={this.state.SelectedSubCity} />
                                            
                                            <BInput value={this.state.address} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="آدرس" absoluteLabel="آدرس" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <BInput value={this.state.codePosti} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="ک پستی" absoluteLabel="ک پستی" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            {this.state.brandOptions &&
                                            <div className="col-lg-6 col-12">
                                            <MultiSelect value={this.state.brandOption} options={this.state.brandOptions} className="b-border" style={{ width: '100%' }} onChange={(e) => {
                                                this.setState({
                                                    brandOption: e.value
                                                })
                                                this.searchByFilter(e.value[0], 0, 10)
                                                }
                                                } placeholder="برند" />
                                            </div>
                                            }
                                            

                                        

                                        </div>

                                    </Card>
                                    <Card className={this.state.Type  == 3 ? "b-card2 mt-5" : "d-none"}  >
                                        <div className="row" >
                                            <div className="col-lg-6 col-12" >
                                                <p>اطلاعات حساب بانکی</p>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <Button label="درخواست ویرایش اطلاعات" style={{ width: 300 }} onClick={() => {

                                                }} />
                                            </div>

                                        </div>
                                        <div className="row mt-5" style={{alignItems:'end'}} >
                                            <BInput value={this.state.shabaNumber} InputNumber={true}  ContainerClass="col-lg-6 col-12 mt-3" label="شماره شبا" absoluteLabel="شماره شبا" Val={(v) => {
                                                this.setState({
                                                    name: v
                                                })
                                            }} />
                                            <div className="col-lg-6 col-12">
                                                <p>
                                                    <span>بانک صادرکننده</span><span>{this.state.shabaName}</span>
                                                </p>
                                                <p>
                                                    <span>دارنده حساب</span><span>{this.state.shabaBankName}</span>
                                                </p>
                                            </div>

                                        </div>

                                    </Card>
                                    <Card className={this.state.Type  == 4 ? "b-card2 mt-5" : "d-none"}  >
                                        <div className="row" >
                                            <div className="col-lg-6 col-12" >
                                                <p>مدارک</p>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <Button label="درخواست ویرایش اطلاعات" style={{ width: 300 }} onClick={() => {

                                                }} />
                                            </div>

                                        </div>
                                        <div className="row mt-5" style={{alignItems:'end'}} >
                                            <div className="col-lg-6 col-12" >
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>جواز کسب</div>
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>
                                                    <img src={this.state.salesPermitImage} style={{width:100,height:100}} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>کارت ملی</div>
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>
                                                    <img src={this.state.idCardImage} style={{width:100,height:100}} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>شناسنامه - صفحه اول</div>
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>
                                                    <img src={this.state.idBookPageOneImage} style={{width:100,height:100}} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12" >
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>شناسنامه - صفحه دوم</div>
                                                <div style={{background:'#fff',padding:10,borderRadius:8,marginTop:10}}>
                                                    <img src={this.state.idBookPageTwoImage} style={{width:100,height:100}} />
                                                </div>
                                            </div>
                                        

                                        </div>

                                    </Card>
                                </div>

                            </div>

                        </div>
                    </div>





                </div>
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
export default connect(mapStateToProps)(Profile)