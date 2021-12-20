import React, { Component } from 'react';
import { PersonOutlineOutlined, MailOutlineOutlined, AccountBalanceWalletOutlined } from '@material-ui/icons';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import Router from 'next/router'
import NProgress from "nprogress"

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

const items = [
  {
    label: 'فروشگاه',
    items: [
      {
        label: "ایجاد کالای جدید",
        command: (event) => {

          Router.push('/admin/add-product')

        }
      },
      {
        label: "تاریخچه درخواست کالا",
        command: (event) => {

          Router.push('/admin/create-product-history')

        }
      },
      {
        label: "مدیریت کالاهای قیمت ثابت",
        command: (event) => {

          Router.push('/admin/manage-variant-price')

        }
      },
      {
        label: "مدیریت کالاهای استعلامی",
        command: (event) => {

          Router.push('/admin/manage-estelams-product')

        }
      },
      {
        label: "استعلام های خریداران",
        command: (event) => {

          Router.push('/admin/estelams')

        }
      },
    ]
  },

  {
    label: 'سفارشات',
    items: [
      {}
    ]
  },
  {
    label: 'تم ها',
    items: [
      {
        label: "تم شماره 1",
        command: (event) => {
          localStorage.setItem("bamachoob_theme","theme1");
          window.location.reload();

        }
      },
      {
        label: "تم شماره 2",
        command: (event) => {
          localStorage.setItem("bamachoob_theme","theme2");
          window.location.reload();

        }
      }
    ]
  }
];


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  render() {
    return (
      <div className="bg b-menuBar" style={{ direction: 'rtl' }}  >

        <div className="row" style={{ paddingTop: 25 }} >
          <div className="col-lg-4 col-12 large-title" style={{ textAlign: 'right' }} >
            <a href="#" onClick={() => { Router.push('/admin/dashboard') }} style={{ textDecoration: 'none' }} >
              <span style={{ paddingRight: 20 }}>پنل فروشندگان</span>

            </a>
          </div>
          <div className="col-lg-5 col-12 large-title" style={{ textAlign: 'center' }} >
            <span>Logo</span>
          </div>
          <div className="col-lg-3 col-12 title" style={{ textAlign: 'center' }} >
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div>
                <PersonOutlineOutlined />
                <span>پارس چوب</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Badge value="18" style={{ position: 'absolute', top: -12, left: 14 }} severity="info"></Badge>
                <MailOutlineOutlined />

              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: 50 }} >
          <div className="col-lg-10 col-12" style={{ textAlign: 'center' }} >
            <Menubar
              model={items}
            />
          </div>
          <div className="col-lg-2 col-12" style={{ textAlign: 'center' }}  >
            <AccountBalanceWalletOutlined />
            <span>کیف پول</span>

          </div>
        </div>

      </div>
    )
  }
}


export default Header;