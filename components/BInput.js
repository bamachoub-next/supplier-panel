import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';

class BInput extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            value :props.value||"",
            label:props.label,
            ContainerClass:props.ContainerClass,
            className:props.className
		}
  }
  render() {
    return (
      <div className={this.state.ContainerClass} style={{ justifyContent: 'center' }} >

      <div className={this.state.className} >
          <label htmlFor="name">{this.state.label}</label>

          <InputText autocomplete="off" validateOnly={true}  value={this.state.value} className="form-control" onChange={(e) => {
            this.setState({
              value: e.target.value
            })
            this.props.Val(e.target.value)

            }
        
            } />
      </div>

      </div>
    )
  }
}


export default BInput;