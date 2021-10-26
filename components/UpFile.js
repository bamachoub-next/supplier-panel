import React, { Component } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios'
import { ProgressBar } from 'primereact/progressbar';
const ServerUrl = "http://127.0.0.1:3000/api/v1/"

class BInput extends React.Component {
  constructor(props) {
    super(props);
    this.FileUpload = this.FileUpload.bind(this);
    this.uploadRef = React.createRef();

    this.state = {
      uploadImage: props.uploadImage || "",
      label: props.label,
      buttonLabel: props.buttonLabel,
      ContainerClass: props.ContainerClass,
      className: props.className
    }
  }
  FileUpload(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    switch (e.target.id) {
      case "uploadRef": {
        this.setState({
          uploadSize: parseInt(e.target.files[0].size / 1000) + "kb",
          uploadName: e.target.files[0].name

        })

      }
    }
    this.setState({

    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = parseInt((loaded * 100) / total)
        this.setState({
          showLoadedCount: true,
          percentageValue: percent
        })
        if (percent == "100") {
          this.setState({
            showLoadedCount: false
          })
        }

      }
    };
    axios.post(ServerUrl + 'images', formData, config)
      .then((response) => {
        this.setState({
          uploadImage: response.data.data.imageUrl

        })
        this.props.callback({ uploadImage: response.data.data.imageUrl });


      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="row mt-3" style={{ justifyContent: 'center' }} >
        {this.props.large ?
          <div className={this.props.className || "col-lg-8 col-12 mt-3"} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200, background: '#fff', alignItems: 'center', padding: 8 }} >
            <div>
              <div className="title">{this.state.label}</div>
              <small className={this.props.inValid ? "p-error p-d-block" : "p-error p-d-none"}  >{this.state.absoluteLabel} نمیتواند خالی باشد</small>
            </div>
            <div>
              <input className="d-none" id="uploadRef" ref={this.uploadRef} autoComplete="off" onChange={this.FileUpload} type="file" name="file" />
              <Button label={this.state.buttonLabel} style={{ width: '100%' }} onClick={() => {
                this.uploadRef.current.click();
              }} />
            </div>
          </div>

          :

          <div className={this.props.className || "col-lg-8 col-12 mt-3"} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', alignItems: 'center', padding: 8 }} >
            <div>
              <div className="title">{this.state.label}</div>
              <small className={this.props.inValid ? "p-error p-d-block" : "p-error p-d-none"}  >{this.state.absoluteLabel} نمیتواند خالی باشد</small>
            </div>
            <div>
              <input className="d-none" id="uploadRef" ref={this.uploadRef} autoComplete="off" onChange={this.FileUpload} type="file" name="file" />
              <Button label={this.state.buttonLabel} style={{ width: '100%' }} onClick={() => {
                this.uploadRef.current.click();
              }} />
            </div>
          </div>

        }

        {(this.state.uploadName || this.state.uploadImage) &&
          <div className={this.props.className || "col-lg-8 col-12 mt-3"} style={{ background: '#fff' }}>
            <div className="row" style={{ padding: 10 }}>
              <div className="col-5">
                <img src={this.state.uploadImage} style={{ height: 75 }} />
              </div>
              <div className="col-7">
                <div className="small-title">
                  {this.state.uploadName}
                </div>
                <div className="small-title">
                  {this.state.uploadSize}
                </div>
              </div>
            </div>
            {this.state.uploadName &&
              <div className="mt-2 mb-2">
                <ProgressBar value={this.state.percentageValue} />
              </div>
            }

          </div>
        }


      </div>
    )
  }
}


export default BInput;