import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import Router from 'next/router'
import { Chip } from 'primereact/chip';
import Image from 'next/image'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Close, Search, DeleteOutline } from '@material-ui/icons';
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


class ManageStore extends React.Component {
  constructor(props) {
    super(props);
   // this.getProducts(0,10,props.cats[0].url)
    this.Server = new Server();
    this.catsRef = React.createRef();

    this.state = {
      activeIndex: 0,
      brandOptions: [],
      cats: [],
      brandOption: [],  
      showLoading: false,
      Step: 1,
      GridData: [],
      filters:[],
      currentCategoryUrl: '',
      showCreateProduct: false
    }

  }

  componentDidMount() {
    this.setCategories(this.props.cats)


  }
  getBrands(currentCategoryUrl, currentCategoryKey) {
    debugger;
    this.setState({
      showLoading: true
    })
    this.Server.get(`brands/used/${currentCategoryUrl}/${currentCategoryKey}`, '',
      (response) => {
        this.setState({
          showLoading: false
        })
        let brandOptions = [];
        for (let data of response.data) {
          brandOptions.push({
            label: data,
            value: data
          })
        }

        this.setState({
          brandOptions: brandOptions
        })
        //this.getProducts(0, 10, currentCategoryUrl);


      }, (error) => {
        this.setState({
          showLoading: false
        })

      }
    )

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
            v.img = <img alt=""  src={v.imageArr[0]} className="product-img" />
            if (v.status == "ok") {
              v.statusText = <Chip label="تایید شده" />;
              v.add = <Button disabled label="موجود در انبار" onClick={() => { this.addToMyProducts(v._key) }} style={{ width: '100%' }} />
            } else if (v.status == "nok") {
              v.statusText = <Chip label="تایید نشده" />;
              v.add = <div>
                <span></span>
                <span></span>
              </div>
            } else {
              v.statusText =<Chip label="در حال بررسی" />;
              v.add = <div></div>
            }
            v.titleAndSubTitle = <div style={{ display: 'flex',width:'100%' }}>
              <div>
                <img alt=""  src={v.imageArr[0]} className="product-img" />
              </div>
              <div>
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
  getProducts(offset, limit, categoryUrl) {
    this.setState({
      GridData: [],
      showLoading: true
    })
    this.Server.get(`suppliers/fav-product/${categoryUrl}?offset=${offset}&limit=${limit}&categoryUrl=${categoryUrl}`, '',
      (response) => {
        this.setState({
          showLoading: false
        })
        if (response.data) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].img = <img alt=""  src={response.data[i].imageArr[0]} className="product-img" />
            if (response.data[i].status == "ok") {
              response.data[i].statusText = <Chip label="تایید شده" />;
              response.data[i].add = <Button disabled label="موجود در انبار" onClick={() => { this.addToMyProducts(response.data[i]._key) }} style={{ width: '100%' }} />
            } else if (response.data[i].status == "nok") {
              response.data[i].statusText = <Chip label="تایید نشده" />;
              response.data[i].add = <div>
                <span></span>
                <span></span>
              </div>
            } else {
              response.data[i].statusText = <Chip label="در حال بررسی" />;
              response.data[i].add = <div></div>
            }

            response.data[i].titleAndSubTitle = <div style={{ display: 'flex',width:'100%' }}>
              <div>
                <img src={response.data[i].imageArr[0]} className="product-img" />
              </div>
              <div>
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

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )
  }
  addToMyProducts(key) {
    this.setState({
      showLoading: true
    })
    this.Server.post(`suppliers/add-fav/${this.state.cat}/${key}`, {},
      (response) => {
        this.setState({
          showLoading: false
        })
        if (response.data && !response.data.error) {
          MySwal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'کالای مورد نظر به انبار شما اضافه شد',
            html: <div className='title' style={{ marginTop: 80 }}>
              <div style={{ textAlign: 'center' }}><Button label="درج تنوع و قیمت گذاری کالا" onClick={() => { MySwal.close(); }} style={{ width: '90%', marginBottom: 30 }} /><br /><Button label="بازگشت" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div></div>
          })
        } else {
          this.setState({
            showLoading: false
          })
          MySwal.fire({
            icon: 'error',
            title: 'خطا',
            text: response.data.errorMessage
          })
        }

      }, (error) => {
        this.setState({
          showLoading: false
        })
      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )

  }
  createProduct(step) {
    if (step) {

    } else {
      this.setState({
        showCreateProduct: true
      })
    }

  }
  sendProductSuggest() {
    this.setState({
      showLoading: true
    })
    this.Server.post(`product-suggestion`, { description: this.state.product_Suggest_description, title: this.state.product_Suggest_title, imageUrl: this.state.product_Suggest_imageUrl, supplierKey: this.props.employKey },
      (response) => {
        this.setState({
          showLoading: false
        })
        MySwal.fire({
          icon: 'success',
          showConfirmButton: false,
          title: 'درخواست ایجاد کالای شما ارسال شد',
          html: <div className='title'><div>درخواست شما جهت بررسی کارشناسان با ما چوب ارسال شد</div><br /><br />
            <div style={{ textAlign: 'center' }}><Button label="ادامه" onClick={() => { MySwal.close(); }} style={{ width: 120 }} /></div></div>
        })


      }, (error) => {
        this.setState({
          showLoading: false
        })
        MySwal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'عملیات انجام نشد'
        })

      }, { Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )
  }
  selectGridField(value) {
    console.log(value);
    Router.push(`/admin/add-variant-price?id=${value._id}`)

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
      cats: cats,
      cat:cats[0]
    })
    //this.handleChangeCats(cats[0]);

    
  }
  handleChangeCats(cat_val){
   
    this.getBrands(cat_val.value,cat_val._key);
  }

  render() {
    return (
      <>
        <Header />

        <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
          <div className="row justify-content-center">
            <div className="col-10" >
              <div className="row">
                <div className="col-lg-9 col-12" >
                  <div className="large-title">
                    مدیریت انبار
                  </div>
                  <div className="small-title">
                    کالاهای انبار خود را مدیریت و ویرایش کنید 
                  </div>
                </div>
                <div className="col-lg-3 col-12" style={{textAlign:'left'}} >
                  <Button label="جستجو و افزودن کالا به انبار" className="large" onClick={() => Router.push('/admin/add-product')} style={{ width: '18.5rem' }} />

                </div>
              </div>
              <div className="row" >
                <div className="col-12" >
                  <Card className="b-card2  mt-5">
                    <div className="row" >
                      <div className="col-lg-10 col-12" style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', top: 8 }} />

                        <AutoComplete placeholder="جستجوی نام یا کد کالا " inputClassName="transparent-btn" inputStyle={{ fontFamily: 'iranyekanwebregular', textAlign: 'right', fontSize: 12, borderColor: '#dedddd', fontSize: 15, width: '100%', paddingRight: 25,height:'3rem' }} style={{ width: '100%' }} onChange={(e) => this.setState({ productInSearch: e.value })} itemTemplate={this.itemTemplateSearch.bind(this)} value={this.state.productInSearch} onSelect={(e) => {
                          let GridDate = [];
                          GridDate.push(e.value);
                          this.setState({
                            productInSearch: e.value.title,
                            GridDataSearch: GridDate
                          })

                        }
                        } suggestions={this.state.productInSearchSuggestions} completeMethod={this.suggestproductInSearch.bind(this)} />

                      </div>
                      <div className="col-lg-2 col-12 mt-3 mt-lg-0" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button label="جستجو" onClick={() => {
                          this.setState({
                            GridData: this.state.GridDataSearch
                          })
                        }} style={{ width: '8rem' }} disabled className="large"></Button>
                        <Button onClick={() => {
                          this.setState({
                            GridData: [],
                            productInSearch: ''

                          })
                        }} style={{ width: '20%', display: 'flex', justifyContent: 'center' }} className="large"  > <Close /> </Button>


                      </div>
                    </div>
                  </Card>
                  <Card className="b-card2  mt-3">
                    <div>فیلترها</div>

                    <div className=" mt-3" style={{display:'flex',flexWrap:'wrap'}} >
                      <div  >
                        <Dropdown value={this.state.cat} ref={this.catsRef} className="b-border" options={this.state.cats} style={{ width: 250 }} onChange={(e) => {
                          
                          let cat_val = {}
                          for(let i=0;i<this.state.cats.length;i++){
                            if(this.state.cats[i].value == e.value )
                              cat_val = this.state.cats[i];
                          }
                          let filters = this.state.filters;
                          let filter_exist = false;
                          for(let i=0;i<filters.length;i++){
                            if(filters[i] == cat_val.label){
                              filter_exist = true;
                            }
                          }
                          if(!filter_exist)
                            filters.push(cat_val.label)
                          this.setState({
                            filters:filters
                          })
                          this.handleChangeCats(cat_val);
                        }

                        }
                          placeholder="دسته بندی" />

                      </div>
                      <div style={{marginRight:10}} >
                        <Dropdown value={this.state.brandOption}  className="b-border" options={this.state.brandOptions} style={{ width: 250 }} onChange={(e) => {
                          let filters = this.state.filters;
                          let filter_exist = false;
                          for(let i=0;i<filters.length;i++){
                            if(filters[i] == e.value){
                              filter_exist = true;
                            }
                          }
                          if(!filter_exist)
                            filters.push(e.value)
                          this.setState({
                            filters:filters
                          })
                        }

                        }
                          placeholder="برند" />

                      </div>
                      <div style={{marginRight:10}} >
                        <Dropdown value={this.state.estelam} className="b-border" options={this.state.estelams} style={{ width: 250 }} onChange={(e) => {
                        }

                        }
                          placeholder="استعلام" />

                      </div>
                    </div>
                    <div className="row mt-3" >
                      <div className="col-md-9 col-12" style={{ display: 'flex', justifyContent: 'start', alignItems: 'baseline' }}>
                        <div>فیلترهای اعمال شده</div>
                        <div style={{ marginTop: 10, textAlign: 'right', marginBottom: 10 }}>
                          {this.state.filters.map((v, i) => {
                            if (!v.remove) {
                              return (<Chip label={v} key={i} className="b-p-chip" _id={v} style={{ marginRight: 5,direction:'ltr' }} removable onRemove={(event) => {
                                let filter = event.target.parentElement.getElementsByClassName("p-chip-text")[0].textContent;
                                let remove = -1;
                                let filters = this.state.filters;
                                for (let i = 0; i < filters.length; i++) {
                                  if (filters[i] == filter) {
                                    remove = i;
                                  }
                                }
                                filters.splice(remove, 1)
                                this.setState({
                                  filters: filters
                                })
                                //this.searchByFilter(brandOption[0],0,10)

                              }} />)
                            }

                          })
                          }
                        </div>
                      </div>
                      <a className="col-md-3 col-12" href="#" onClick={() => { this.setState({ brandOption: [] }); this.searchByFilter("", 0, 10) }} >
                        <div style={{ textAlign: 'left' }}><span><DeleteOutline /></span><span> حذف همه فیلترها</span></div>
                      </a>
                    </div>




                  </Card>
                </div>
              </div>
              <div className="row" >


                <div className="col-lg-12 col-12" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    {this.state.GridData.length > 0 ?
                      <DataTable responsive value={this.state.GridData} selectionMode="single" selection={this.state.gridId} onSelectionChange={(e) => { this.selectGridField(e.value) }} >
                        <Column field="titleAndSubTitle" header="عنوان و کد کالا" style={{ textAlign: 'right',width:300 }} className="title" />
                        <Column field="categoryName" header="دسته بندی" style={{ textAlign: 'right' }} className="title" />
                        <Column field="brand" header="برند" style={{ textAlign: 'right' }} className="title" />
                        <Column field="statusText" header="وضعیت" style={{ textAlign: 'right' }} className="title" />


                        <Column field="add" header="" style={{ textAlign: 'right' }} className="title" />

                      </DataTable>
                      :
                      <div style={{ textAlign: 'center' }}>
                      <div style={{ textAlign: 'center',display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column',height:150 }}>
                        <p style={{fontWeight:'bold'}} className="title">موردی پیدا نشد</p>
                        <p style={{width:300,textAlign:'center'}}>
                          <span  className="title">محصولی با فیلترهای اعمال شده در انبار شما وجود ندارد</span>
                        </p>
                      </div>
                      <div className="row" style={{ justifyContent: 'space-evenly', marginTop: 50 }}>
                        <div className="col-lg-4 col-12" >
                          <button className="btn btn-primary large" onClick={() => { this.setState({ brandOption: [] }); this.searchByFilter("", 0, 10) }} style={{ width: '100%' }} >حذف فیلترها</button>

                        </div>
                        <div className="col-lg-4 col-12" >
                          <button onClick={() => Router.push('/admin/add-product')} className="btn btn-outline-primary large" style={{ width: '100%' }} >جستجو و افزودن کالا به انبار</button>

                        </div>
                      </div>
                    </div>
                    }

                  </Card>
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
export async function getStaticProps({ query }) {

  let res = await fetch('https://data.bamachoub.com/api/v1/categories');
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
export default connect(mapStateToProps)(ManageStore)