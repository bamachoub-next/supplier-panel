import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            }
        ]
    };
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
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
      <>
        <Chart type="line" data={this.basicData} options={basicOptions} />
      </>
    )
  }
}


export default Charts;