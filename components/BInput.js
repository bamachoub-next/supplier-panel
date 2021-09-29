import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import {Password} from 'primereact/password';

class BInput extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            value :props.value||"",
            inValid:props.inValid,
            label:props.label,
            ContainerClass:props.ContainerClass,
            className:props.className,
            absoluteLabel:props.absoluteLabel
		}
  }
  render() {
    return (
      <div className={this.state.ContainerClass} style={{ justifyContent: 'center' }} >

      <div className={this.state.className} >
          <label htmlFor="name" className="p-d-block">{this.state.label}</label>
          {this.props.InputNumber &&
            <InputNumber style={{width:'100%'}} inputStyle={{direction:this.props.direction||"rtl"}} mode="decimal" format={false} autocomplete="off" validateOnly={true}  value={this.props.value} required  inputClassName={this.props.inValid ? "p-invalid p-d-block form-control" : "p-d-block form-control"} onChange={(e) => {
              this.setState({
                value: e.value
              })
              this.props.Val(e.value)
  
              }
          
              } />
          }
          {!this.props.InputNumber && !this.props.password &&
          <InputText autocomplete="off" validateOnly={true}  value={this.props.value}  style={{direction:this.props.direction||"rtl"}} className={this.props.inValid ? "p-invalid p-d-block form-control" : "p-d-block form-control"} onChange={(e) => {
            this.setState({
              value: e.target.value
            })
            this.props.Val(e.target.value)

            }
        
            } />
          
          
          }
          {this.props.password &&
          <Password  autocomplete="off" feedback={false}   value={this.props.value}  inputStyle={{direction:this.props.direction||"rtl"}} style={{width:'100%'}} inputClassName={this.props.inValid ? "p-invalid p-d-block form-control" : "p-d-block form-control"} onChange={(e) => {
            this.setState({
              value: e.target.value
            })
            this.props.Val(e.target.value)

            }
        
            } />
          
          
          }
         

            <small  className={this.props.inValid ? "p-error p-d-block" : "p-error p-d-none"}  >{this.state.absoluteLabel} نمیتواند خالی باشد</small>

      </div>

      </div>
    )
  }
}


export default BInput;