import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chip } from 'primereact/chip';
import Router from 'next/router'
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Checkbox } from 'primereact/checkbox';
import Image from 'next/image'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Add, Close } from '@material-ui/icons';
import { MultiSelect } from 'primereact/multiselect';
import { PanelMenu } from 'primereact/panelmenu';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import Server from '../../components/Server'
import Header from '../../components/Header';
import { AutoComplete } from 'primereact/autocomplete';
import BInput from '../../components/BInput';
import UpFile from '../../components/UpFile';
import { ProgressSpinner } from 'primereact/progressspinner';
const switchBtn = [
  { label: 'فعال', value: true },
  { label: 'غیرفعال', value: false }
];
class AddPrice extends React.Component {
  constructor(props) {
    super(props);

    this.Server = new Server();

    this.state = {
      showCreateProduct: false,
      accessToken: this.props.accessToken ,
      Variations: []
    }
  }
  getDefault(catUrl) {
    this.Server.get(`add-buy-method/price/sheet`, '',
      (response) => {
        this.setState({
          showLoading:false
        })
        this.getProduct()
      }, (error) => {
        this.getProduct()
        this.setState({
          showLoading:false
        })

      }, { Authorization: `Bearer ${this.state.accessToken || localStorage.getItem("accessToken")}` }
    )
  }
  componentDidMount() {
    this.setState({
      productId: Router.router.query.id
    })
    this.getProduct()



  }
  getProduct() {

    this.Server.get(`products/one/${Router.router.query.id}`, '',
      (response) => {
        let product = response.data.Product;
        let priceArr=[];
        let VariationPrices = []
        let codeForSupplier = "";
        let Count;

        for(let i=0;i<response.data.priceArr.length;i++){
          Count=0;
          for(let j=0;j<response.data.priceArr.length;j++){
            if(response.data.priceArr[i].variant == response.data.priceArr[j].variant && !response.data.priceArr[j].checked ){
              response.data.priceArr[j].checked=1;
              Count++;
            } 
          }
          response.data.priceArr[i].Count = Count;
        }
        for(let i=0;i<response.data.priceArr.length;i++){
          
          codeForSupplier = response.data.priceArr[i].codeForSupplier;
          response.data.priceArr[i].name = response.data.priceArr[i].variant;
          let VariationPrices_temp = {
            name: response.data.priceArr[i].variant,
            description: response.data.priceArr[i].description,
            number: response.data.priceArr[i].number||0,
            maxNumber: response.data.priceArr[i].maxNumber||0,
            code: response.data.priceArr[i].codeForSupplier,
            cache: {
              status: response.data.priceArr[i].price ? true : false,
              value: response.data.priceArr[i].price
            },
            cheque1: {
              status: response.data.priceArr[i].oneMonthPrice ? true : false,
              value: response.data.priceArr[i].oneMonthPrice
            },
            cheque2: {
              status: response.data.priceArr[i].twoMonthPrice ? true : false,
              value: response.data.priceArr[i].twoMonthPrice
            },
            cheque3: {
              status: response.data.priceArr[i].threeMonthPrice ? true : false,
              value: response.data.priceArr[i].threeMonthPrice
            },
            status: response.data.priceArr[i].show
          }

         

          VariationPrices_temp["Count"] = response.data.priceArr[i].Count,



          VariationPrices.push(VariationPrices_temp)
          if(response.data.priceArr[i].Count){
            priceArr.push(response.data.priceArr[i]);
          }
          

        }
        let EstelamRecords=[];
        for(let m=0;m<priceArr.length;m++){
          for(let k=0;k<response.data.estelamArr.length;k++){
            if(response.data.estelamArr[k].variant == priceArr[m].variant){
              EstelamRecords.push({
                codeForSupplier : response.data.estelamArr[k].codeForSupplier,
                name : response.data.estelamArr[k].variant,
                cache : {status:response.data.estelamArr[k].cache||false},
                cheque1 : {status:response.data.estelamArr[k].cheque1||false},
                cheque2 : {status:response.data.estelamArr[k].cheque2||false},
                cheque3 : {status:response.data.estelamArr[k].cheque3||false},
                status : true
              })
            }
        }
        }
        debugger;
        if(priceArr.length >0)
          product.variationsObj = {
            variations:priceArr
          }
        this.setState({
          product: product,
          estelamArr: response.data.estelamArr,
          priceArr: response.data.priceArr,
          VariationPrices: VariationPrices,
          codeForSupplier:codeForSupplier,
          estelam:response.data.estelamArr.length > 0 ? true : false,
          EstelamRecords:EstelamRecords


        })
        
       // this.getDefault(Router.router.query.id);
      }, (error) => {


      }
    )
  }
  addPrice() {
    let param = [];
    for (let VariationPrice of this.state.VariationPrices) {
      param.push({
        productId: this.state.productId,
        codeForSupplier: VariationPrice.code.toString(),
        variant: VariationPrice.name,
        totalNumberInCart: VariationPrice.maxNumber,
        totalNumber: VariationPrice.number,
        show: VariationPrice.status,
        oneMoundPrice: (VariationPrice.cheque1.status && VariationPrice.cheque1.value) ? parseInt(VariationPrice.cheque1.value.toString().replace(/,/g, "")) : 0,
        twoMoundPrice: (VariationPrice.cheque2.status && VariationPrice.cheque2.value) ? parseInt(VariationPrice.cheque2.value.toString().replace(/,/g, "")) : 0,
        threeMoundPrice: (VariationPrice.cheque3.status && VariationPrice.cheque3.value) ? parseInt(VariationPrice.cheque3.value.toString().replace(/,/g, "")) : 0,
        price: (VariationPrice.cache.status && VariationPrice.cache.value) ? parseInt(VariationPrice.cache.value.toString().replace(/,/g, "")) : 0,
      })
    }

    this.setState({
      addPriceParam: param
    })
    setTimeout(() => {
      this.addPriceServer();
    }, 0)
    return;


  }
  addPriceServer() {

    this.setState({
      showLoading: true
    })

    if (this.state.addPriceParam[this.state.addPriceParam.length - 1]) {
      this.Server.post(`add-buy-method/price`, this.state.addPriceParam[0],
        (response) => {
          if (response.data) {
            if (!response.data.variant) {
              MySwal.fire({
                icon: 'error',
                title: 'خطا',
                text: response.data.message
              })
            } else {
              MySwal.fire({
                icon: 'success',
                showConfirmButton: false,
                title: 'اطلاعات ثبت شده برای کالای مورد نظر ارسال شد',
                html: <div><span>عملیات با موفقیت انجام شد</span>
                  <Button label="بستن" className="mt-5" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
              })
            }
            let addPriceParam = this.state.addPriceParam;
            addPriceParam.pop();
            this.setState({
              addPriceParam: addPriceParam
            })
            if (addPriceParam.length > 0)
              this.addPriceServer();
            else
              this.setState({
                showLoading: false
              })
          }
        }, (error) => {
          this.setState({
            showLoading: false
          })
        }, { Authorization: `Bearer ${this.state.accessToken || localStorage.getItem("accessToken")}` }
      )
    }


  }
  addEstelam() {
    let param = [];
    for (let EstelamRecords of this.state.EstelamRecords) {
      param.push({
        productId: this.state.productId,
        codeForSupplier: this.state.codeForSupplier.toString(),
        variant: EstelamRecords.name,
        oneMoundPrice: EstelamRecords.cheque1.status ? true : false,
        twoMoundPrice: EstelamRecords.cheque2.status ? true : false,
        threeMoundPrice: EstelamRecords.cheque3.status ? true : false,
        price: EstelamRecords.cache.status ? true : false
      })
    }

    this.setState({
      addEstelamParam: param
    })
    setTimeout(() => {
      this.addEstelamServer();
    }, 0)
    return;


  }
  addEstelamServer() {
    if (this.state.addEstelamParam[this.state.addEstelamParam.length - 1]) {
      
      this.setState({
        showLoading: true
      })

      this.Server.post(`add-buy-method/estelam`, this.state.addEstelamParam[0],
        (response) => {
          if (response.data) {
            if (response.data.code != 200) {
              MySwal.fire({
                icon: 'error',
                title: 'خطا',
                text: response.data
              })
            } else {
              MySwal.fire({
                icon: 'success',
                showConfirmButton: false,
                title: 'کالای مورد نظر به انبار شما اضافه شد',
                html: <div><span>عملیات با موفقیت انجام شد</span>
                  <Button label="بستن" className="mt-5" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
              })
            }
            this.state.addEstelamParam.pop();
            
            if (this.state.addEstelamParam.length > 0)
              this.addEstelamServer();



          }
          this.setState({
            showLoading: false
          })

        }, (error) => {
          this.setState({
            showLoading: false
          })

        }, { Authorization: `Bearer ${this.state.accessToken || localStorage.getItem("accessToken")}` }
      )
    }
  }


  render() {
    return (
      <>
        <Header />

        <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
          <div className="row justify-content-center">
            <div className="col-11" >
              <div className="row">
                <div className="col-lg-9 col-12 mb-5" >
                  <div className="large-title">
                    درج تنوع و قیمت گذاری
                  </div>
                  <div className="small-title">
                    برای نمایش این کالا در وبسایت باماچوب حالت های فروش خود را تعریف نمایید
                  </div>
                </div>

              </div>
              {this.state.product &&
                <card className="row b-card2 p-4">
                  <div className="col-lg-4 col-12">
                    <div style={{ display: 'flex' }}>
                      <img alt=""  src={this.state.product.imageArr[0]} className="product-img" />
                      <div>
                        <div>{this.state.product.title}</div>
                        <div>{this.state.product.description}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <div>
                      <span>دسته بندی : </span><span>{this.state.product.categoryName}</span>
                    </div>
                    <div>
                      <span>کمیسیون فروش : </span><span>{this.state.product.commissionPercent} %</span>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12">
                    <div>
                      <span>تنوع مجاز : </span><span></span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-12" style={{ alignSelf: 'flex-end' }}>
                    <div>
                      <span>مشاهده صفحه محصول در باماچوب</span>
                    </div>
                  </div>
                </card>


              }
              <card className="row b-card2 p-4 mt-5">
                <div className="col-12" style={{ display: 'flex' }}>
                  <span>
                    <InputSwitch checked={this.state.estelam} onChange={(e) => this.setState({
                      estelam: e.value
                    })} />

                  </span>
                  <span>
                    <span className="p-3">استعلام</span><span className="small-title">(اگر میخواهید استعلام های این کالا برای شما فعال شود، آن را فعال کنید)</span>
                  </span>
                </div>
                {this.state.estelam &&
                  <div className="row" >
                    <div className="col-12" style={{ display: 'flex' }}>
                      <BInput value={this.state.codeForSupplier} InputNumber={true} inValid={this.state.codeForSupplier_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="کد محصول فروشنده" absoluteLabel="کد محصول فروشنده" Val={(v) => {
                        this.setState({
                          codeForSupplier: v
                        })
                      }} />
                    </div>
                    <div className="mt-5 mb-1">
                      <span>
                        کدام استعلام ها برای شما ارسال شود؟
                    </span>
                    </div>
                    <div className="col-12  mt-3" style={{ display: 'flex' }}>
                      {this.state.product && this.state.product.variationsObj && this.state.product.variationsObj.variations.map((v, i) => {
                        
                        
                        return (
                          <div key={i} style={{ background: '#fff', border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}>
                            <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[i]?.status||v.oldEstelems?.status} checked={this.state.EstelamRecords[i]?.status||v.oldEstelems?.status} onChange={(e) => {
                              let insert = true;
                              let EstelamRecords = this.state.EstelamRecords;
                              for (let i = 0; i < EstelamRecords.length; i++) {

                                if (EstelamRecords[i].name == v.name) {
                                  EstelamRecords[i].status = e.checked;
                                  insert = false;
                                }
                              }
                              if (insert) {
                                EstelamRecords.push({
                                  name: v.name,
                                  description: v.description,
                                  code: '',
                                  cache: {},
                                  cheque1: {},
                                  cheque2: {},
                                  cheque3: {},
                                  status: e.checked
                                })
                              }
                              this.setState({
                                EstelamRecords:EstelamRecords
                               })



                            }}
                              style={{ marginBottom: 10 }}></Checkbox>
                            <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>{v.name}</label>
                          </div>
                        )

                      })}
                    </div>

                    <div className="col-12  mt-3">

                      {this.state.EstelamRecords && this.state.EstelamRecords.map((u, j) => {
                        if (u.status) {
                          return (

                            <div className="row mb-3 p-3" key={j} style={{ border: '1px solid', borderRadius: 8 }} >
                              <div className="col-12">
                                <div className="mt-3 mb-1">
                                  <span >واحد : {u.name}</span>
                                </div>
                                <div className="mt-3 mb-1">
                                  <span >نوع پرداخت</span>
                                </div>


                              </div>
                              <div className="col-lg-2 col-md-3 col-12" >
                                <div style={{ background: '#fff', border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}>
                                  <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cache.status} checked={this.state.EstelamRecords[j].cache.status} onChange={(e) => {
                                    let EstelamRecords = this.state.EstelamRecords;
                                    EstelamRecords[j].cache.status = e.checked;
                                    this.setState({
                                      EstelamRecords:EstelamRecords
                                     })
                                   
                                  }}
                                    style={{ marginBottom: 10 }}></Checkbox>
                                  <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>نقدی</label>
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-3 col-12" >
                                <div style={{ background: '#fff', border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}>
                                  <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque1.status} checked={this.state.EstelamRecords[j].cheque1.status} onChange={(e) => {
                                   let EstelamRecords = this.state.EstelamRecords;
                                   EstelamRecords[j].cheque1.status = e.checked;
                                   this.setState({
                                    EstelamRecords:EstelamRecords
                                   })
                                   
                                  }}
                                    style={{ marginBottom: 10 }}></Checkbox>
                                  <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - یک ماهه</label>
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-3 col-12" >
                                <div style={{ background: '#fff', border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}>
                                  <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque2.status} checked={this.state.EstelamRecords[j].cheque2.status} onChange={(e) => {
                                    let EstelamRecords = this.state.EstelamRecords;
                                    EstelamRecords[j].cheque2.status = e.checked;
                                    this.setState({
                                      EstelamRecords:EstelamRecords
                                     })
                                    
                                  }}
                                    style={{ marginBottom: 10 }}></Checkbox>
                                  <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - دو ماهه</label>
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-3 col-12" >
                                <div style={{ background: '#fff', border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}>
                                  <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque3.status} checked={this.state.EstelamRecords[j].cheque3.status} onChange={(e) => {
                                    let EstelamRecords = this.state.EstelamRecords;
                                    EstelamRecords[j].cheque3.status = e.checked;
                                    this.setState({
                                      EstelamRecords:EstelamRecords
                                     })
                                    
                                  }}
                                    style={{ marginBottom: 10 }}></Checkbox>
                                  <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - سه ماهه</label>
                                </div>
                              </div>
                            </div>

                          )
                        }

                      })}
                    </div>


                    <div className="row mt-4" style={{ justifyContent: 'end' }} >
                      <div className="col-lg-3 col-12" >
                        <button onClick={() => {
                          this.addEstelam();
                        }} className="btn btn-primary" style={{ width: '100%' }} >اعمال تغییرات</button>
                      </div>
                    </div>
                  </div>


                }
              </card>

              <div className="p-3 mt-3 ">قیمت گذاری</div>

              <card className="row b-card2 p-4 ">
                <div className="mb-3">انتخاب واحد</div>

                <div className="col-12" style={{ display: 'flex' }}>
                  {this.state.product && this.state.product.variationsObj && this.state.product.variationsObj.variations.map((v, i) => {

                    return (
                      <button key={i} className={v.Count ? "b-button active" : "b-button"} style={{ border: 1, borderRadius: 8, minWidth: 150, padding: 10, marginLeft: 20, display: 'flex', justifyContent: 'space-between' }}
                        onClick={(event) => {
                          v.Count = v.Count ? (v.Count + 1) : 1;
                          let VariationPrices = this.state.VariationPrices || [];
                          VariationPrices.push({
                            Count: v.Count,
                            name: v.name,
                            description: v.description,
                            number: 0,
                            maxNumber: 0,
                            code: '',
                            cache: {},
                            cheque1: {},
                            cheque2: {},
                            cheque3: {},
                            status: true
                          })
                          this.setState({
                            VariationPrices: VariationPrices
                          })

                        }}>
                        <span>
                          {v.name}
                          <span>
                            {v.Count ? `(${v.Count})` : ''}
                          </span>
                        </span>

                        <Add className="icon" style={{ border: '2px solid' }} />

                      </button>
                    )
                  })
                  }
                </div>
              </card>
              {this.state.VariationPrices && this.state.VariationPrices.map((v, i) => {
                const numLabel = `تعداد (${v.name})`;
                return (
                  <card className="row b-card2 p-4 mt-3 " key={i}>
                    <div className="col-12" style={{ position: 'relative' }}>

                      <Close className="icon" style={{ position: 'absolute', left: 0, border: '1px solid', borderRadius: 4, cursor: 'pointer' }} onClick={() => {
                        let VariationPrices = this.state.VariationPrices;
                        for (let variations of this.state.product.variationsObj.variations) {
                          if (variations.name == v.name) {
                            variations.Count = variations.Count - 1;
                          }
                        }
                        VariationPrices.splice(i, 1);
                        this.setState({
                          VariationPrices: VariationPrices
                        })
                      }} />
                      <span>واحد : {v.name}</span>

                      <div className="row" style={{ alignItems: 'end' }} >
                        <div className="col-lg-2 col-md-3 col-12">
                          <BInput InputNumber={true} value={this.state.VariationPrices[i].number} inValid={this.state.VariationPrices[i].number_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label={numLabel} absoluteLabel="تعداد" Val={(v) => {
                            let VariationPrices_temp = this.state.VariationPrices;
                            VariationPrices_temp[i].number = v
                            this.setState({
                              VariationPrices: VariationPrices_temp
                            })
                          }} />
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <BInput InputNumber={true} value={this.state.VariationPrices[i].maxNumber} inValid={this.state.VariationPrices[i].maxNumber_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="حداکثر تعداد در سبد خرید" absoluteLabel="حداکثر تعداد در سبد خرید" Val={(v) => {
                            let VariationPrices_temp = this.state.VariationPrices;
                            VariationPrices_temp[i].maxNumber = v
                            this.setState({
                              VariationPrices: VariationPrices_temp
                            })
                          }} />
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <BInput InputNumber={true} value={this.state.VariationPrices[i].code} inValid={this.state.VariationPrices[i].code_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="کد محصول فروشنده" absoluteLabel="کد محصول فروشنده" Val={(v) => {
                            let VariationPrices_temp = this.state.VariationPrices;
                            VariationPrices_temp[i].code = v
                            this.setState({
                              VariationPrices: VariationPrices_temp
                            })
                          }} />
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <SelectButton value={this.state.VariationPrices[i].status} options={switchBtn} onChange={(e) => {
                            let VariationPrices_temp = this.state.VariationPrices;
                            VariationPrices_temp[i].status = e.value == true ? true : false
                            this.setState({
                              VariationPrices: VariationPrices_temp
                            })
                          }
                          }></SelectButton>

                        </div>
                      </div>
                      <div className="mt-3 mb-3">نوع پرداخت</div>
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-12">
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cache.status} checked={this.state.VariationPrices[i].cache.status} onChange={(e) => {
                              let VariationPrices_temp = this.state.VariationPrices;
                              VariationPrices_temp[i].cache.status = e.checked
                              this.setState({
                                VariationPrices: VariationPrices_temp
                              })
                            }}
                              style={{ marginBottom: 10 }}></Checkbox>
                            <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }} >نقدی</label>
                          </div>
                          {this.state.VariationPrices[i].cache.status &&
                            <div style={{ position: 'relative' }}>
                              <BInput value={this.state.VariationPrices[i].cache.value} inValid={this.state.VariationPrices[i].cache.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش (قیمت هر ورق)" absoluteLabel="قیمت فروش" Val={(v) => {
                                let VariationPrices_temp = this.state.VariationPrices;
                                VariationPrices_temp[i].cache.value = v.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                VariationPrices_temp[i].cache.value_inValid = v ? false : true;
                                this.setState({
                                  VariationPrices: VariationPrices_temp
                                })
                              }} />
                              <label style={{ position: 'absolute', top: '50%', left: 10 }}>تومان</label>
                            </div>
                          }

                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque1.status} checked={this.state.VariationPrices[i].cheque1.status} onChange={(e) => {
                              let VariationPrices_temp = this.state.VariationPrices;
                              VariationPrices_temp[i].cheque1.status = e.checked
                              this.setState({
                                VariationPrices: VariationPrices_temp
                              })
                            }}
                              style={{ marginBottom: 10 }}></Checkbox>
                            <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - یک ماهه</label>
                          </div>
                          {this.state.VariationPrices[i].cheque1.status &&
                            <div style={{ position: 'relative' }}>
                              <BInput value={this.state.VariationPrices[i].cheque1.value} inValid={this.state.VariationPrices[i].cheque1.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش (قیمت هر ورق)" absoluteLabel="قیمت فروش" Val={(v) => {
                                let VariationPrices_temp = this.state.VariationPrices;
                                VariationPrices_temp[i].cheque1.value = v.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                VariationPrices_temp[i].cheque1.value_inValid = v ? false : true;

                                this.setState({
                                  VariationPrices: VariationPrices_temp
                                })
                              }} />
                              <label style={{ position: 'absolute', top: '50%', left: 10 }}>تومان</label>

                            </div>
                          }
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque2.status} checked={this.state.VariationPrices[i].cheque2.status} onChange={(e) => {
                              let VariationPrices_temp = this.state.VariationPrices;
                              VariationPrices_temp[i].cheque2.status = e.checked
                              this.setState({
                                VariationPrices: VariationPrices_temp
                              })
                            }}
                              style={{ marginBottom: 10 }}></Checkbox>
                            <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - دو ماهه</label>
                          </div>
                          {this.state.VariationPrices[i].cheque2.status &&
                            <div style={{ position: 'relative' }}>
                              <BInput value={this.state.VariationPrices[i].cheque2.value} inValid={this.state.VariationPrices[i].cheque2.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش (قیمت هر ورق)" absoluteLabel="قیمت فروش" Val={(v) => {
                                let VariationPrices_temp = this.state.VariationPrices;
                                VariationPrices_temp[i].cheque2.value = v.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                VariationPrices_temp[i].cheque2.value_inValid = v ? false : true;

                                this.setState({
                                  VariationPrices: VariationPrices_temp
                                })
                              }} />
                              <label style={{ position: 'absolute', top: '50%', left: 10 }}>تومان</label>

                            </div>
                          }
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque3.status} checked={this.state.VariationPrices[i].cheque3.status} onChange={(e) => {
                              let VariationPrices_temp = this.state.VariationPrices;
                              VariationPrices_temp[i].cheque3.status = e.checked
                              this.setState({
                                VariationPrices: VariationPrices_temp
                              })
                            }}
                              style={{ marginBottom: 10 }}></Checkbox>
                            <label htmlFor="IsTitle" className="p-checkbox-label title" style={{ marginRight: 10 }}>چکی - سه ماهه</label>
                          </div>
                          {this.state.VariationPrices[i].cheque3.status &&
                            <div style={{ position: 'relative' }}>
                              <BInput value={this.state.VariationPrices[i].cheque3.value} inValid={this.state.VariationPrices[i].cheque3.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش (قیمت هر ورق)" absoluteLabel="قیمت فروش" Val={(v) => {
                                let VariationPrices_temp = this.state.VariationPrices;
                                VariationPrices_temp[i].cheque3.value = v.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                VariationPrices_temp[i].cheque3.value_inValid = v ? false : true;

                                this.setState({
                                  VariationPrices: VariationPrices_temp
                                })
                              }} />
                              <label style={{ position: 'absolute', top: '50%', left: 10 }}>تومان</label>

                            </div>
                          }
                        </div>
                      </div>
                    </div>

                  </card>

                )
              })}
              <div className="row mt-4" style={{ justifyContent: 'end' }} >
                <div className="col-lg-3 col-12" >
                  <button onClick={() => {
                    this.addPrice();
                  }} className="btn btn-primary" style={{ width: '100%' }} >اعمال تغییرات</button>
                </div>
              </div>

            </div>
          </div>

        </div>
        {this.state.showLoading &&
          <div className="b-overlay">
            <div className="b-loading">
              <ProgressSpinner strokeWidth={5} style={{ width: '50px', height: '50px' }} />
            </div>
          </div>

        }

      </>
    )
  }
}



const mapStateToProps = (state) => {
  return {
      employKey: state.token.employKey,
      accessToken: state.token.accessToken
  }
}
export default connect(mapStateToProps)(AddPrice)