import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chip } from 'primereact/chip';
import Router from 'next/router'
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Close, Search, DeleteOutline, Delete } from '@material-ui/icons';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import Server from './../../components/Server'
import Header from './../../components/Header';
import { AutoComplete } from 'primereact/autocomplete';
import { ProgressSpinner } from 'primereact/progressspinner';
import BInput from './../../components/BInput';


class ManageEstelam extends React.Component {
  constructor(props) {
    super(props);
    this.Server = new Server();
    this.itemTemplate = this.itemTemplate.bind(this);
    this.state = {
      activeIndex: 0,
      catOptions: [],
      oneMoundPrice_1: "",
      catOption: [],
      payTypeOptions: [],
      payTypeOption: [],
      groupedSelect:{},
      showArr: {},
      showLoading: false,
      Step: 1,
      GridData: [],
      currentCategoryUrl: '',
      showCreateProduct: false
    }
  }
  componentDidMount() {

    this.setCategories(this.props.cats)


  }
  setCategories(categories) {
    let cats = [];
    for (let item of categories) {

      cats.push({
        label: item.name,
        value: item.url,
        _key: item._key
      })
    }

    this.setState({
      cats: cats
    })
    this.handleChangeCats(cats[0]?.value);

  }

  itemTemplateSearch(product) {

    return (
      <div className="p-clearfix" style={{ direction: 'rtl' }} >
        <div style={{ margin: '10px 10px 0 0' }} className="row" _id={product._id} >

          <div className="col-lg-6" _id={product._id} style={{ textAlign: 'right' }}>
            <span className="iranyekanwebregular" style={{ textAlign: 'right' }} _id={product._id} >
              <span style={{ whiteSpace: 'pre-wrap' }} _id={product._id}>{product.title}</span>
            </span>
          </div>

        </div>
      </div>
    );


  }

  suggestproductInSearch(event) {
    if (!this.state.cat)
      return;

    this.Server.post(`products/basic-search/${this.state.cat}`, { searchString: this.state.productInSearch },
      (response) => {

        if (response.data) {
          let productInSearchSuggestions = []
          response.data.map(function (v, i) {
            v.commissionPercent = <div>{v.commissionPercent} %</div>
            v.img = <img src={v.imageArr[0]} />
            v.add = <Button label="افزودن به انبار" onClick={() => { this.addToMyProducts() }} style={{ width: '100%' }} />
            v.titleAndSubTitle = <div style={{ display: 'flex' }}>
              <div>
                <img src={v.imageArr[0]} className="product-img" />
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{ fontWeight: 'bold' }}>{v.title}</div>
                <div>{v.brand}</div>
              </div>
            </div>
            productInSearchSuggestions.push({ _id: v._id, title: v.title, desc: v.description, brand: v.brand, commissionPercent: v.commissionPercent, img: v.img, add: v.add, titleAndSubTitle: v.titleAndSubTitle, lowestPrice: v.lowestPrice, categoryName: v.categoryName })
          })

          this.setState({ productInSearchSuggestions: productInSearchSuggestions });

        }

      }, (error) => {


      }
    )

  }
  searchByFilter(brandOption, offset, limit) {
    if (!this.state.cat)
      return;
    this.setState({
      showLoading: true
    })
    this.Server.post(`products/basic-filter/${this.state.cat}?offset=${offset}&limit=${limit}`, { brand: brandOption },
      (response) => {
        this.setState({
          showLoading: false
        })
        if (response.data) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].commissionPercent = <div>{response.data[i].commissionPercent} %</div>
            response.data[i].img = <img src={response.data[i].imageArr[0]} />
            response.data[i].add = <Button label="افزودن به انبار" onClick={() => { this.addToMyProducts() }} style={{ width: '100%' }} />
            response.data[i].titleAndSubTitle = <div style={{ display: 'flex' }}>
              <div>
                <img src={response.data[i].imageArr[0]} className="product-img" />
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{ fontWeight: 'bold' }}>{response.data[i].title}</div>
                <div>{response.data[i].brand}</div>
              </div>
            </div>

          }
        }

        this.setState({
          GridData: response.data || []
        })

      }, (error) => {

        this.setState({
          showLoading: false
        })
      }
    )

  }

  itemTemplate(p) {
    let VariantArr = [];
    let map = {
      oneMoundPrice: "چکی - یک ماهه",
      twoMoundPrice: "چکی - دو ماهه",
      threeMoundPrice: "چکی - سه ماهه",
      price: "نقدی",
    }
    
    return (
      <div className="title" style={{ display: 'flex', alignItems: 'center', direction: 'rtl', marginBottom: 5, width: '100%' }}>
        <div style={{ textAlign: 'right', width: '5%' }}>
            <Checkbox onChange={e => {

              let groupedSelect = this.state.groupedSelect;
              if(!e.checked){
                delete groupedSelect[p.estelam._key]
              }else{
                groupedSelect[p.estelam._key] = {
                  estelam:p.estelam,
                  product:p.product
                }
              }
              this.setState({groupedSelect:groupedSelect})
            
            }} checked={this.state.groupedSelect[p.estelam._key]}></Checkbox>

        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '15%' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <img src={p.product.imageArr[0]} className="product-img" />
            </div>
            <div  style={{textAlign:'right'}}>
              <div style={{ fontWeight: 'bold' }}>{p.product.title}</div>
              <div>{p.product.brand}</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '7%' }}>
          <span>{p.estelam.codeForSupplier}</span>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '5%' }}>
          <span>{p.estelam.variant}</span>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '9%' }}>
          <span>{p.product.categoryName}</span>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '7%' }}>
          <span>{p.product.lowestPrice}</span>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '20%' }}>
          <div>
            <div style={{ flexWrap: 'wrap', display: 'flex' }}>
                  {p.estelam.price &&
                  <Chip className="b-p-chip2" label="نقدی" _id="price" style={{ marginRight: 5, borderRadius: 0, marginBottom: 5 }} removable onRemove={(event) => {
                    p.estelam.price = false;

                  }} />
                  }
                  {p.estelam.oneMoundPrice &&
                  <Chip className="b-p-chip2" label="چکی - یک ماهه" _id="oneMoundPrice" style={{ marginRight: 5, borderRadius: 0, marginBottom: 5 }} removable onRemove={(event) => {
                    p.estelam.oneMoundPrice = false;

                  }} />
                  }
                  {p.estelam.twoMoundPrice &&
                  <Chip className="b-p-chip2" label="چکی - دو ماهه" _id="twoMoundPrice" style={{ marginRight: 5, borderRadius: 0, marginBottom: 5 }} removable onRemove={(event) => {
                    p.estelam.twoMoundPrice = false;

                  }} />
                  }
                  {p.estelam.threeMoundPrice &&
                  <Chip className="b-p-chip2" label="چکی - سه ماهه" _id="twoMoundPrice" style={{ marginRight: 5, borderRadius: 0, marginBottom: 5 }} removable onRemove={(event) => {
                    p.estelam.threeMoundPrice = false;
                  
                  }} />
                  }
                  
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '15%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 100 }} >
              <Button label="تایید" onClick={() => {
                this.updateProduct(p)
              }}  ></Button>
            </div>
            <div style={{ width: 40 }}>
              <Button onClick={() => {
                this.deleteProduct(p)
              }}  > <Delete /> </Button>
            </div>

          </div>
        </div>
        <div style={{ textAlign: 'right', width: '1%' }}></div>

        <div style={{ textAlign: 'right', width: '9%' }}>
          <div style={{ textAlign: 'right' }}>
            <InputSwitch checked={this.state.showArr["show_" + p.estelam._key] != undefined ? this.state.showArr["show_" + p.estelam._key] : p.estelam.show || false} onChange={(e) => {
              let showArr = this.state.showArr;
              showArr["show_" + p.estelam._key] = e.value;
              this.setState({
                showArr: showArr
              })
            }} />
            <div style={{ display: 'flex', justifyContent: "right" }}>
              <p className="b-card" style={{ borderRadius: 0, width: 60, padding: 5 }}>
                <div>10 رزرو</div>
              </p>
            </div>


          </div>
        </div>
      </div>
    );


  }
  updateProduct(p, Verify) {
    if (!Verify) {
      MySwal.fire({
        icon: 'info',
        showConfirmButton: false,
        title: 'آیا از تغییرات اعمال شده شده اطمینان دارید؟',
        html: <div><span>با اعمال تفییرات شما همچنان موظف به تامین کالاهای رزرو شده هستید</span>
          <Button label="اعمال تغییرات" className="mt-5" onClick={() => { MySwal.close(); this.updateProduct(p, true) }} style={{ width: '90%' }} />
          <Button label="انصراف" className="mt-2 btn btn-outline-primary" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
      })
      return;
    }
    let priceColName = p.estelam._id;

    let variantArr = {
      "oneMoundPrice": p.estelam.oneMoundPrice||false,
      "price": p.estelam.price||false,
      "show": p.estelam.show||false,
      "threeMoundPrice": p.estelam.threeMoundPrice||false,
      "twoMoundPrice": p.estelam.twoMoundPrice||false

    }

    for (let pp in this.state.showArr) {
      if (pp.indexOf(p.estelam._key) > -1) {
        variantArr["show"] = this.state.showArr[pp]||false
      }
    }
    let param = {
      "_from": p.estelam._from,
      "_id": p.estelam._id,
      "_key": p.estelam._key,
      "_rev": p.estelam._rev,
      "_to": p.estelam._to,
      "createdAt":p.estelam.createdAt,
      "variant":p.estelam.variant,
      "codeForSupplier": p.estelam.codeForSupplier,
      ...variantArr
    }
    this.Server.put(`add-buy-method/estelam/${priceColName}/`, param,
      (response) => {
        this.setState({
          showLoading: false
        })

        if (response.data.codeForSupplier) {

          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'عملیات با موفقیت انجام شد',
            html: <div><span>عملیات با موفقیت انجام شد</span>
              <Button label="بستن" className="mt-5" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'خطا',
            text: response.data.message
          })

        }

      }, (error) => {
        this.setState({
          showLoading: false
        })
        MySwal.fire({
          icon: 'error',
          title: 'خطا',
          text: "عملیات انجام نشد"
        })

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )


  }

  deleteProduct(p, Verify) {
    if (!Verify) {
      MySwal.fire({
        icon: 'info',
        showConfirmButton: false,
        title: 'آیا از حذف موارد انتخاب شده اطمینان دارید؟',
        html: <div><span>با حذف موارد انتخاب شده، همچنان موظف به تامین کالاهای رزرو شده خواهید بود</span>
          <Button label="اعمال تغییرات" className="mt-5" onClick={() => { MySwal.close(); this.deleteProduct(p, true) }} style={{ width: '90%' }} />
          <Button label="انصراف" className="mt-2 btn btn-outline-primary" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
      })
      return;
    }
    let param = {
    }
    this.setState({
      showLoading: true
    })
    this.Server.delete(`add-buy-method/estelam/${this.state.cat}/${p.estelam._key}`, param,
      (response) => {
        this.setState({
          showLoading: false
        })

        if (response.data.codeForSupplier) {

          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'عملیات با موفقیت انجام شد',
            html: <div><span>عملیات با موفقیت انجام شد</span>
              <Button label="بستن" className="mt-5" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'خطا',
            text: response.data.message
          })

        }


      }, (error) => {
        this.setState({
          showLoading: false
        })
        MySwal.fire({
          icon: 'error',
          title: 'خطا',
          text: "عملیات انجام نشد"
        })

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )


  }
  
  setGroupChange(event) {
    debugger;
   
    let param = {
      "oneMonthPrice" : this.state.group_cheque1||false,
      "threeMonthPrice": this.state.group_cheque3||false,
      "twoMonthPrice": this.state.group_cheque2||false,
      "price": this.state.group_price||false,
      "changeBuyMode":this.state.changePrice||false,
      "changeStatus":this.state.changeStatus||false,
      "show":this.state.group_status || false



    }
    let priceKeys = [];
    let estelamColName = "";

    for(let item in this.state.groupedSelect){
      priceKeys.push(this.state.groupedSelect[item].estelam._key.toString())
      estelamColName = this.state.groupedSelect[item].estelam._id.split("/")[0];
    }
    param["priceKeys"] = priceKeys;

    debugger;

    this.Server.put(`add-buy-method/estelam/group_update/${estelamColName}`, param,
      (response) => {
        debugger;

        if (response.data) {

          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'عملیات با موفقیت انجام شد',
            html: <div>
              <Button label="بستن" className="mt-5" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div>
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'خطا',
            text: response.data.message
          })

        }

      }, (error) => {


      },{ Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )

  }
  getProducts(offset, limit, categoryUrl) {
    this.setState({
      GridData: [],
      showLoading: true
    })
    this.Server.get(`add-buy-method/estelam/${categoryUrl}?offset=${offset}&limit=${limit}`, '',
      (response) => {
        this.setState({
          showLoading: false
        })


        this.setState({
          GridData: response.data || []
        })
      }, (error) => {
        this.setState({
          showLoading: false
        })

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )
  }
  handleChangeCats(value){
    debugger;
    this.setState({
      cat: value
    })
    this.getProducts(0, 10, value);
  }

  render() {
    return (
      <>
        <Header />
        {Object.entries(this.state.groupedSelect).length > 0 &&
        <div style={{width:'100%',height:'4.5rem',color:'#fff',position:'fixed',bottom:0,zIndex:2,background:'#2699fb'}} >
          <div style={{direction:'rtl',height:'100%',display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}>
           
            
            <div  style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',minWidth:320}}>
                  <span style={{color:'#fff'}}>{Object.entries(this.state.groupedSelect).length} مورد انتخاب شده </span>
                  <Button  onClick={() => {
                    let groupedSelect = []
                    for(let i=0;i<this.state.GridData.length;i++){
                      groupedSelect[this.state.GridData[i].estelam._key] = {
                        price:this.state.GridData[i].estelam,
                        product:this.state.GridData[i].product
                      }
                    }
                    this.setState({
                      groupedSelect:groupedSelect
                    })
                  }} label="انتخاب همه" className="p-button-outlined title" style={{border:0,background:'transparent',color:'#fff'}} >  </Button>


            </div>
         
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',minWidth:320}}>
                        <Button  onClick={() => {this.setState({showGroupChangeDialog:true})}} label="تغییر گروهی" className="p-button-outlined title" style={{color:'#2699fb',background:'#fff',borderColor:'#fff'}} >  </Button>
                        <Button  onClick={() => {}} label="حذف" className="p-button-outlined title" style={{color:'#2699fb',background:'#fff',borderColor:'#fff'}} >  </Button>
                        <Button  onClick={() => {this.setState({groupedSelect:{}})}} label="لغو انتخاب" className="p-button-outlined title" style={{color:'#fff',background:'transparent',borderColor:'#fff'}} >  </Button>

            </div>
          </div>
        </div>
        
        }

        <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
          <div className="row justify-content-center">
            <div className="col-11" >
              <div className="row">
                <div className="col-lg-9 col-12" >
                  <div className="large-title">
                    مدیریت کالاهای استعلامی
                  </div>
                  <div className="small-title mb-5">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                  </div>
                </div>

              </div>
              <div className="row" >
                <div className="col-12" >

                  <Card className="b-card2  ">
                    <div className="row" >
                      <div className="col-lg-9 col-12" style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', top: 8 }} />

                        <AutoComplete placeholder="جستجوی نام یا کد کالا " inputClassName="transparent-btn" inputStyle={{ fontFamily: 'iranyekanwebregular', textAlign: 'right', fontSize: 12, borderColor: '#dedddd', fontSize: 15, width: '100%', paddingRight: 25 }} style={{ width: '100%' }} onChange={(e) => this.setState({ productInSearch: e.value })} itemTemplate={this.itemTemplateSearch.bind(this)} value={this.state.productInSearch} onSelect={(e) => {
                          let GridDate = [];
                          GridDate.push(e.value);
                          this.setState({
                            productInSearch: e.value.title,
                            GridDataSearch: GridDate
                          })

                        }
                        } suggestions={this.state.productInSearchSuggestions} completeMethod={this.suggestproductInSearch.bind(this)} />

                      </div>
                      <div className="col-lg-3 col-12 mt-3 mt-lg-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button label="جستجو" onClick={() => {
                          debugger;
                          /*this.setState({
                            GridData: this.state.GridDataSearch
                          })*/
                        }} style={{ width: '75%' }}></Button>
                        <Button onClick={() => {
                          this.setState({
                            GridData: [],
                            productInSearch: ''
                          })
                        }} style={{ width: '20%', display: 'flex', justifyContent: 'center' }}  > <Close /> </Button>


                      </div>
                    </div>
                  </Card>
                  <Card className="b-card2  mt-3">
                    <div>فیلترها</div>

                    <div className="row mt-3" >
                      <div className="col-md-3 col-12">
                        <Dropdown value={this.state.cat} className="b-border" options={this.state.cats} style={{ width: 250 }} onChange={(e) => {
                          this.handleChangeCats(e.value);
                        }

                        }
                          placeholder="دسته بندی را انتخاب کنید" />



                      </div>
                      <div className="col-md-3 col-12">
                        <MultiSelect value={this.state.payTypeOption} className="b-border" options={this.state.payTypeOptions} style={{ width: '100%' }} onChange={(e) => {
                          this.setState({
                            payTypeOptions: e.value
                          })
                          //this.searchByFilter(e.value[0],0,10)
                        }
                        } placeholder="وضعیت کالا" />



                      </div>
                    </div>
                    <div className="row mt-3" >
                      <div className="col-md-9 col-12" style={{ display: 'flex', justifyContent: 'start', alignItems: 'baseline' }}>
                        <div>فیلترهای اعمال شده</div>
                        <div style={{ marginTop: 10, textAlign: 'right', marginBottom: 10 }}>
                          {this.state.catOptions.map((v, i) => {
                            if (!v.remove) {
                              return (<Chip key={i} label={v} _id={v} style={{ marginRight: 5 }} removable onRemove={(event) => {
                                let brand = event.target.parentElement.getElementsByClassName("p-chip-text")[0].textContent;
                                let remove = -1;
                                let catOption = this.state.catOption;
                                for (let i = 0; i < catOption.length; i++) {
                                  if (catOption[i] == brand) {
                                    remove = i;
                                  }
                                }
                                catOption.splice(remove, 1)
                                this.setState({
                                  catOption: catOption
                                })
                                //this.searchByFilter(brandOption[0],0,10)

                              }} />)
                            }

                          })
                          }
                        </div>
                        <div style={{ marginTop: 10, textAlign: 'right', marginBottom: 10 }}>
                          {this.state.payTypeOptions.map((v, i) => {
                            if (!v.remove) {
                              return (<Chip key={i} className="b-p-chip" label={v} _id={v} style={{ marginRight: 5 }} removable onRemove={(event) => {
                                let brand = event.target.parentElement.getElementsByClassName("p-chip-text")[0].textContent;
                                let remove = -1;
                                let payTypeOption = this.state.payTypeOption;
                                for (let i = 0; i < payTypeOption.length; i++) {
                                  if (payTypeOption[i] == brand) {
                                    remove = i;
                                  }
                                }
                                payTypeOption.splice(remove, 1)
                                this.setState({
                                  payTypeOption: payTypeOption
                                })
                                //this.searchByFilter(brandOption[0],0,10)

                              }} />)
                            }

                          })
                          }
                        </div>
                      </div>
                      <a className="col-md-3 col-12" href="#" onClick={() => { this.setState({ catOptions: [], payTypeOptions: [] }); this.searchByFilter("", 0, 10) }} >
                        <div style={{ textAlign: 'left' }}><span><DeleteOutline /></span><span> حذف همه فیلترها</span></div>
                      </a>
                    </div>



                  </Card>
                </div>
              </div>
              <div className="row" >
                <div className="col-lg-12 col-12" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">

                    <div className="title">
                      <div className="row mb-5 " style={{ background: '#fff', padding: '0.5rem 0.25rem 0.5rem 2.125rem', borderRadius: 8, marginRight: 10, marginLeft: 10 }}>
                        <div className="col-lg-3 col-12">
                          <Dropdown optionLabel="name" value={this.state.sort} className="b-border" style={{ width: '100%' }} options={[{ name: "آخرین کالاهای اضافه شده", value: "" }]} onChange={(e) => this.setState({ sort: e.value })} placeholder="آخرین کالاهای اضافه شده" />
                        </div>
                        <div className="col-lg-6 col-12"  >
                        </div>
                        <div className="col-lg-3 col-12" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
                          <Dropdown optionLabel="name" value={this.state.pageNum} className="b-border" options={[{ name: "تعداد نمایش در صفحه", value: "" }]} onChange={(e) => this.setState({ pageNum: e.value })} placeholder="تعداد نمایش در صفحه" />
                          <p style={{ marginRight: 30 }}>50 مورد</p>
                        </div>

                      </div>
                      <div className="p-clearfix" style={{ direction: 'rtl', background: '#fff', marginBottom: 20 }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ textAlign: 'right', width: '5%' }}>

                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '15%' }}>
                            <div style={{ width: '90%' }}>عنوان و کد کالا</div>
                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '7%' }}>
                            <div style={{ width: '90%' }}>کد محصول فروشنده</div>
                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '5%' }}>
                            <div style={{ width: '90%' }}>تنوع</div>
                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>

                          <div style={{ textAlign: 'right', width: '9%' }}>
                            <div style={{ width: '90%' }}>دسته بندی</div>
                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '7%' }}>
                            <div style={{ width: '90%' }}>کمترین قیمت(تومان)</div>
                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '20%' }}>
                            <div style={{ width: '90%' }}>قیمت کالا (تومان)</div>

                          </div>

                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '15%' }}>
                            <div style={{ width: '90%' }}>عملیات</div>

                          </div>
                          <div style={{ textAlign: 'right', width: '1%' }}></div>
                          <div style={{ textAlign: 'right', width: '9%' }}>
                            <div style={{ width: '90%' }}>وضعیت</div>

                          </div>

                        </div>
                      </div>
                      {this.state.GridData.length > 0 ?
                        <DataView value={this.state.GridData} itemTemplate={this.itemTemplate}></DataView>
                        :
                        <div>
                          {this.state.catOptions.length == 0 ?
                            <div style={{ textAlign: 'center' }}>
                              <p>موردی برای نمایش وجود ندارد</p>
                            </div>

                            :
                            <div style={{ textAlign: 'center' }}>
                              <p>موردی پیدا نشد</p>
                              <p>محصولی با فیلترهای اعمال شده در انبار شما وجود ندارد</p>
                              <div className="row" style={{ justifyContent: 'space-evenly', marginTop: 50 }}>
                                <div className="col-lg-4 col-12" >
                                  <button className="btn btn-primary" onClick={() => { this.setState({ catOptions: [], payTypeOptions: [] }); this.searchByFilter("", 0, 10) }} style={{ width: '100%' }} >حذف فیلترها</button>

                                </div>
                                <div className="col-lg-4 col-12" >
                                  <button onClick={() => this.createProduct()} className="btn btn-outline-primary" style={{ width: '100%' }} >ایجاد کالای جدید</button>

                                </div>
                              </div>
                            </div>


                          }
                        </div>
                      }
                    </div>



                  </Card>
                </div>




              </div>

            </div>
          </div>

          <Dialog visible={this.state.showGroupChangeDialog}  onHide={() => { this.setState({ showGroupChangeDialog: false }) }} style={{ width: '50vw' }} maximizable={true}>
          <div style={{display:'flex',flexDirection:'column',direction:'rtl'}} >
              <div style={{width:'100%'}}>
                <div style={{textAlign:'right',width:'100%'}}>
                  <p>تغییراتی که میخواهید اعمال شود را انتخاب کنید</p>

                </div>
                <div style={{textAlign:'right',width:'100%'}}>
                  <div style={{display:'flex'}}>
                  <div style={{border:'1px solid #bce0fd',padding:' 0.75rem',borderRadius:8,display:'flex',alignItems:'center',marginLeft:30,width:'64rem'}}>
                    <Checkbox onChange={e => {

                      this.setState({changePrice:e.checked})

                      }} checked={this.state.changePrice}></Checkbox>
                    <span style={{marginRight:5}} className="title">تغییر نوع پرداخت</span>

                  </div>
                 
                  <div style={{border:'1px solid #bce0fd',padding:' 0.75rem',borderRadius:8,display:'flex',alignItems:'center',marginLeft:30,width:'64rem'}}>
                    <Checkbox onChange={e => {

                      this.setState({changeStatus:e.checked})

                      }} checked={this.state.changeStatus}></Checkbox>
                    <span style={{marginRight:5}} className="title">تغییر وضعیت</span>

                  </div>
                  
                  </div>
                  <div>
                    <div style={{border:'solid 1px #bce0fd',width:'100%',marginTop:16}} ></div>
                  </div>
                  <div>
                    {this.state.changePrice &&
                        <div style={{display:'flex',flexDirection:'column',direction:'rtl'}}>
                        <div>
                        <p style={{marginTop:16,fontWeight:500}}>تغییر نوع پرداخت</p>
                        </div>
                        <div>
                          <span className="small-title">کدام پرداخت ها فعال باشند ؟ </span>
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div style={{marginLeft:15}}>
                          <Checkbox onChange={e => {

                          this.setState({group_price:e.checked})

                          }} checked={this.state.group_price}></Checkbox>
                          <span className="title" style={{marginRight:5}}>پرداخت نقدی</span>
                          </div>
                          <div style={{marginLeft:15}}>
                          <Checkbox onChange={e => {

                          this.setState({group_cheque1:e.checked})

                          }} checked={this.state.group_cheque1}></Checkbox>
                          <span className="title" style={{marginRight:5}}>پرداخت چکی - یک ماهه</span>
                          </div>
                          <div style={{marginLeft:15}}>
                          <Checkbox onChange={e => {

                          this.setState({group_cheque2:e.checked})

                          }} checked={this.state.group_cheque2}></Checkbox>
                          <span className="title" style={{marginRight:5}}>پرداخت چکی - دو ماهه</span>
                          </div>
                          <div style={{marginLeft:15}}>
                          <Checkbox onChange={e => {

                          this.setState({group_cheque3:e.checked})

                          }} checked={this.state.group_cheque3}></Checkbox>
                          <span className="title" style={{marginRight:5}}>پرداخت چکی - سه ماهه</span>
                          </div>
                        </div>
                         
                        
                        
                    </div>
                    }
                    
                    {this.state.changeStatus &&
                        <div style={{display:'flex',flexDirection:'column',direction:'rtl'}}>
                        <div>
                        <p style={{marginTop:16,fontWeight:500}}>تغییر وضعیت</p>
                        </div>
                        <div>
                        <InputSwitch checked={this.state.group_status} onChange={(e) => this.setState({ group_status: e.value })} />
                        <div className="small-title">با غیرفعال کردن، همچنان موظف به تامین کالاهای رزرو شده هستید</div>
                        </div>
                        
                    </div>
                    }
                    
                  </div>
                  {(this.state.changePrice || this.state.changeNumber || this.state.changeStatus) &&
                  <div style={{marginTop:36}}>
                    <div style={{border:'solid 1px #bce0fd',width:'100%',marginTop:16}} ></div>
                  </div>
                  }
                  <div>
                    
                  </div>

                </div>
                {(this.state.changePrice || this.state.changeNumber || this.state.changeStatus) &&
                <div style={{textAlign:'right',width:'100%',display:'flex',justifyContent:'flex-end',marginTop:20}}>
                  <Button label="انصراف" className="btn btn-outline-primary" style={{minWidth:200}} onClick={() => this.setState({showGroupChangeDialog:false})} />
                  <Button label="اعمال تغییرات"  style={{minWidth:200,marginRight:20}} onClick={() => this.setGroupChange()} />

                </div>
                }
                
              </div>        
              
          </div>
          </Dialog>



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
export async function getStaticProps({ query }) {

  let res = await fetch('http://bmch.liara.run/api/v1/categories');
  //let res = await fetch('http://127.0.0.1:3000/api/v1/categories');

  
  const cats = await res.json();

  return {
    props: {
      cats
    }
  }

}


const mapStateToProps = (state) => {
  return {
      employKey: state.token.employKey,
      accessToken: state.token.accessToken
  }
}
export default connect(mapStateToProps)(ManageEstelam)