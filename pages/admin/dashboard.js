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

import Slider from './../../components/Slider';
import Charts from './../../components/Charts';



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
                <div className="justify-content-center" style={{ direction: 'rtl' }}  >
                    <div className="row justify-content-center">
                        <div className="col-10" >
                            <div className="row">
                                <div className="col-lg-3 col-12">
                                    <Card className="b-card2  mt-5" style={{ textAlign: 'center' }}  >
                                        <button className="nobutton" onClick={() => {  Router.push('/admin/profile') }} >
                                            <Store style={{ width: 80, height: 80 }} />
                                            <p className="large-title">پارس چوب</p>
                                        </button >

                                    </Card>
                                    <Card className="b-card2  mt-4" style={{ textAlign: 'center' }}>
                                        <p className="title">کیف پول</p>
                                    </Card>
                                    <Card className="b-card2  mt-3" style={{ textAlign: 'center' }}>
                                        <p className="title">آخرین پیام ها</p>
                                    </Card>


                                </div>
                                <div className="col-lg-9 col-12">
                                    <Card className="b-card2  mt-5" style={{ textAlign: 'right' }}>
                                        <div style={{display:'flex',justifyContent:'space-between'}} className="mb-4">
                                            <div>
                                            <p className="title" style={{fontWeight:'bold'}}>سفارشات</p>

                                            </div>
                                            <div>
                                            <Button label="مشاهده همه سفارشات" className="btn btn-outline-primary" onClick={() => {  }}  />    

                                            </div>
                                        </div>
                                       
                                    </Card>
                                    <Card className="b-card2  mt-3" style={{ textAlign: 'right' }}>
                                    <div style={{display:'flex',justifyContent:'space-between'}} className="mb-4">
                                            <div>
                                            <p className="title" style={{fontWeight:'bold'}}>استعلام های جدید</p>

                                            </div>
                                            <div>
                                            <Button label="مشاهده همه استعلام ها" className="btn btn-outline-primary" onClick={() => {  }}  />    

                                            </div>
                                        </div>
                                    </Card>
                                    <div className="row">
                                        <div className="col-lg-3 col-12">
                                            <Card className="b-card2  mt-3" style={{ textAlign: 'right' }}>
                                                <p className="title">کالاهای قیمت ثابت</p>
                                            </Card>
                                            <Card className="b-card2  mt-3" style={{ textAlign: 'right' }}>
                                                <p className="title">کالاهای استعلامی</p>
                                            </Card>

                                        </div>
                                        <div className="col-lg-9 col-12">
                                            <Card className="b-card2  mt-3" style={{ textAlign: 'right', height: '100%' }}>
                                                <p className="title">کالاهای پر فروش شما</p>
                                            </Card>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Card className="b-card2  mt-5" style={{ textAlign: 'right' }}>
                                <p className="title">سوابق فروش</p>
                                <Charts />
                            </Card>
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
export default connect(mapStateToProps)(Dashboard)