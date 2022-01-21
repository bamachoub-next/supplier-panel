import React, { Component } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import Router from 'next/router'
import { Card } from 'primereact/card';
import { Store } from '@material-ui/icons';

const MySwal = withReactContent(Swal)


import Server from './../../components/Server'
import Header from './../../components/Header';




class Wallet extends React.Component {
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

                <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
                
                    <div className="row justify-content-center">
                        
                        <div className="col-10" >
                        <div className="row">
                            <div className="col-lg-9 col-12" >
                            <div className="large-title">
                            کیف پول
                            </div>
                            <div className="small-title">
                            پیگیری درآمدها، واریزها و برداشت ها
                            </div>
                            </div>

                        </div>
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'right',height:'12.5rem' }}>
                                        <p className="title" style={{fontWeight:'bold'}}>موجودی</p>
                                    </Card>
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'right',height:'12.5rem' }}>
                                        <p className="title" style={{fontWeight:'bold'}}>مجموع واریز</p>
                                    </Card>
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'right',height:'12.5rem' }}>
                                        <p className="title" style={{fontWeight:'bold'}}>مجموع برداشت</p>
                                    </Card>
                                </div>
                                <div className="col-lg-2 col-12">
                                    <div style={{display:'flex',flexDirection:'column',height:'12.5rem',justifyContent:'space-between',alignItems:'end'}} className="mt-4">
                                    <button onClick={() => {
                                        this.addEstelam();
                                        }} className="btn btn-primary" style={{ width: '12rem',height:'3.625rem' }} >افزایش موجودی</button>
                                    <button onClick={() => {
                                        this.addEstelam();
                                        }} className="btn btn-primary" style={{ width: '12rem',height:'3.625rem' }} >برداشت از کیف پول</button>
                                    <button onClick={() => {
                                        this.addEstelam();
                                        }} className="btn btn-primary" style={{ width: '12rem',height:'3.625rem' }} >انتقال به 
                                        کیف پول دیگر</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-12">
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'right' }}>
                                        <p className="title" style={{fontWeight:'bold'}}>سوابق تراکنش</p>
                                    </Card>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'right' }}>
                                        <p className="title" style={{fontWeight:'bold'}}>مبلغ در انتظار واریز</p>
                                        <span className="small-title">سفارشات نهایی نشده و پرداخت های چکی </span>
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
export default connect(mapStateToProps)(Wallet)