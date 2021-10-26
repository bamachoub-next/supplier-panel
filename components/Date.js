import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      inValid: props.inValid,
      label: props.label,
      ContainerClass: props.ContainerClass,
      className: props.className,
      absoluteLabel: props.absoluteLabel
    }
  }
  render() {
    return (
      <div className={this.state.ContainerClass} style={{ justifyContent: 'center' }} >

        <div style={{display:'flex'}} >
          <Dropdown value={this.state.Day} options={Days} onChange={(e) => this.setState({
            Day : e.value
          })} placeholder=""/>
          <Dropdown value={this.state.Mounth} options={Mounths} onChange={(e) => this.setState({
            Mounth : e.value
          })} placeholder=""/>
          <Dropdown value={this.state.Year} options={Years} onChange={(e) => this.setState({
            Year : e.value
          })} placeholder=""/>

        </div>

      </div>
    )
  }
}


export default Date;