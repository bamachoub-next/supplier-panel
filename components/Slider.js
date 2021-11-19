import React, { Component } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Button } from 'primereact/button';


class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{
                "title": "ورق ام دی اف ملامینه پویا آنتیک طلایی رویه براق",
                "subTitle": "5 ورق"
            }, {
                "title": "ورق ام دی اف ملامینه پویا آنتیک طلایی رویه براق",
                "subTitle": "6 ورق"
            }, {
                "title": "ورق ام دی اف ملامینه پویا آنتیک طلایی رویه براق",
                "subTitle": "7 ورق"
            }],
            transform: 'translate3d(0%, 0px, 0px)',
            transformNum1: 0,
            transformNum2: 0,
            transformNum3: 0,
        }
    }
    render() {


        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <div style={this.props.contentStyle} >
                    <div style={{ direction: 'rtl', display: 'flex', transition: 'transform 500ms ease 0s', transform: `translate3d(${this.state.transformNum1}%, ${this.state.transformNum2}px, ${this.state.transformNum3}px)`  }}>
                        {this.state.items.map((p, i) => {
                            return (
                                <div style={{ flex: '1 0 100%' }}>
                                    <div style={{ display: 'flex',padding:8 }}>
                                        <div style={{marginLeft:8}}>
                                            <img src={p.img} style={{ width: '4rem', height: '4rem',borderRadius:4 }} />
                                        </div>
                                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
                                            <p className="small-title">
                                                {p.title}
                                            </p>
                                            <p  className="small-title" style={{fontWeight:'bold'}}>
                                                {p.subTitle}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-around' }} className="mt-2">
                    <div>
                        <Button style={{display:'flex',justifyContent:'center',width:'2rem',height:'2rem'}} disabled={(this.state.items.length * 100) - 100 == this.state.transformNum1} onClick={() => {
                            this.setState({
                                transformNum1: (this.state.transformNum1 + 100)
                            })
                        }}  ><KeyboardArrowRight /></Button>
                    </div>
                    <div className="slider-pagination-container">
                        {this.state.items.map((v,i)=>{
                            return(
                                <span className={(this.state.transformNum1 == (i*100) ) ?"slider-pagination-bullet slider-pagination-bullet-active" : "slider-pagination-bullet"} onClick={()=>{
                                    debugger;
                                    this.setState({
                                        transformNum1 : (i*100)
                                    })
                                }} ></span>
                            )
                        })}
                    </div>
                    <div>
                        <Button style={{display:'flex',justifyContent:'center',width:'2rem',height:'2rem'}} disabled={this.state.transformNum1 == 0} onClick={() => {
                            this.setState({
                                transformNum1: (this.state.transformNum1 - 100)
                            })
                        }}  ><KeyboardArrowLeft /></Button>
                    </div>

                </div>
            </div>

        )
    }
}


export default Slider;