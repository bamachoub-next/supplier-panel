import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';

class BInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      inValid: props.inValid,
      label: props.label,
      ContainerClass: props.ContainerClass,
      className: props.className,
      absoluteLabel: props.absoluteLabel,
      inputClassName: this.props.inValid ? "p-invalid p-d-block form-control" : "p-d-block form-control"
    }
  }
  render() {
    return (
      <div className={this.state.ContainerClass} style={{ justifyContent: 'center' }} >

        <div className={this.state.className} >
          <label htmlFor="name" className="p-d-block inputLabel">{this.state.label}</label>
          {this.props.InputNumber &&
            <InputText autocomplete="off" placeholder={this.props.placeholder||""} type="number" disabled={this.props.disabled} validateOnly={true} value={this.props.value} style={{ direction: this.props.direction || "rtl" }} className={this.state.inputClassName} onChange={(e) => {
              this.setState({
                value: e.target.value
              })
              this.props.Val(e.target.value)

            }

            } />
          }
          {!this.props.InputNumber && !this.props.password && !this.props.textArea &&
            <InputText autocomplete="off" placeholder={this.props.placeholder||""} disabled={this.props.disabled} validateOnly={true} value={this.props.value} style={{ direction: this.props.direction || "rtl" }} className={this.state.inputClassName} onChange={(e) => {
              this.setState({
                value: e.target.value
              })
              this.props.Val(e.target.value)

            }

            } />


          }
          {this.props.password &&
            <Password autocomplete="off" placeholder={this.props.placeholder||""} feedback={false} disabled={this.props.disabled} value={this.props.value} inputStyle={{ direction: this.props.direction || "rtl" }} style={{ width: '100%' }} inputClassName={this.state.inputClassName} onChange={(e) => {
              this.setState({
                value: e.target.value
              })
              this.props.Val(e.target.value)

            }

            } />


          }
          {this.props.textArea &&
            <InputTextarea autocomplete="off" placeholder={this.props.placeholder||""} disabled={this.props.disabled} validateOnly={true} rows={this.props.rows || 5} cols={this.props.cols || 30} value={this.props.value} style={{ height: 'auto', direction: this.props.direction || "rtl" }} className={this.state.inputClassName} onChange={(e) => {
              this.setState({
                value: e.target.value
              })
              this.props.Val(e.target.value)

            }

            } />


          }
          {!this.props.HideInvalidLabel &&
            <small className={this.props.inValid ? "p-error p-d-block" : "p-error p-d-none"}  >{this.state.absoluteLabel} ???????????????? ???????? ????????</small>
          }

        </div>

      </div>
    )
  }
}


export default BInput;