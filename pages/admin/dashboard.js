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
            <Header />
            <div className="justify-content-center" style={{ direction: 'rtl' }}  >
            <div className="row justify-content-center">
                <div className="col-11" >    
                <div className="row">
                <div className="col-lg-3 col-12">
                <Card className="b-card2  mt-5" style={{textAlign:'center'}}>
                    <Store style={{width:80,height:80}}/>
                    <p className="large-title">پارس چوب</p>
                </Card>
                <Card className="b-card2  mt-4" style={{textAlign:'center'}}>
                    <p className="title">کیف پول</p>
                </Card>
                <Card className="b-card2  mt-3" style={{textAlign:'center'}}>
                    <p className="title">آخرین پیام ها</p>
                </Card>


                </div>
                <div className="col-lg-9 col-12">
                <Card className="b-card2  mt-5" style={{textAlign:'right'}}>
                    <p className="title">سفارشات</p>
                </Card>
                <Card className="b-card2  mt-3" style={{textAlign:'right'}}>
                    <p className="title">استعلام های جدید</p>
                </Card>
                <div className="row">
                    <div className="col-lg-3 col-12">
                    <Card className="b-card2  mt-3" style={{textAlign:'right'}}>
                    <p className="title">کالاهای قیمت ثابت</p>
                    </Card>
                    <Card className="b-card2  mt-3" style={{textAlign:'right'}}>
                    <p className="title">کالاهای استعلامی</p>
                    </Card>

                    </div>
                    <div className="col-lg-9 col-12">
                    <Card className="b-card2  mt-3" style={{textAlign:'right',height:'100%'}}>
                    <p className="title">کالاهای پر فروش شما</p>
                </Card>

                    </div>
                </div>
                </div>
                
                </div>     
                <Card className="b-card2  mt-5" style={{textAlign:'right'}}>
                    <p className="title">سوابق فروش</p>
                </Card>
                </div>
                </div>       
                




            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        employKey:state.employKey,
        accessToken:state.accessToken
    }
  }
export default connect(mapStateToProps)(Dashboard)