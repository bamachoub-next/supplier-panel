import React, { Component } from 'react';
import { PersonOutlineOutlined, MailOutlineOutlined,AccountBalanceWalletOutlined } from '@material-ui/icons';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';


const items = [
  {
     label:'فروشگاه',
     items:[
        {
        },
        
     ]
  },
  
  {
     label:'سفارشات',
     items:[
        {}
     ]
  },
  {
     label:'گزارشات',
     items:[
     {}
     ]
  }
];


class Header extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      activeIndex:0
		}
  }
  render() {
    return (
      <div className="bg"  style={{direction:'rtl'}}  >

      <div className="row" style={{paddingTop:25}} >
        <div className="col-lg-4 col-12 large-title" style={{textAlign:'center'}} >
          <span>پنل فروشندگان</span>
        </div>
        <div className="col-lg-5 col-12 large-title" style={{textAlign:'center'}} >
          <span>Logo</span>
        </div>
        <div className="col-lg-3 col-12 title" style={{textAlign:'center'}} >
          <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <div>
              <PersonOutlineOutlined />
              <span>پارس چوب</span>
            </div>
            <div style={{position:'relative'}}>
            <Badge value="18" style={{position:'absolute',top:-12,left:14}}  severity="info"></Badge>
              <MailOutlineOutlined />
              
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{paddingTop:50}} >
        <div className="col-lg-10 col-12" style={{textAlign:'center'}} >
        <Menubar
        model={items}
      />
        </div>
        <div className="col-lg-2 col-12" style={{textAlign:'center'}}  >
          <AccountBalanceWalletOutlined />
          <span>کیف پول</span>

        </div>
      </div>

      </div>
    )
  }
}


export default Header;