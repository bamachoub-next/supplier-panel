import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import Router from 'next/router'
import { Chip } from 'primereact/chip';

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
import Server from './../../components/Server'
import Header from './../../components/Header';
import { AutoComplete } from 'primereact/autocomplete';
import BInput from './../../components/BInput';
import UpFile from './../../components/UpFile';
import { ProgressSpinner } from 'primereact/progressspinner';


class ProductHistory extends React.Component {
  constructor(props) {
    super(props);
    debugger;
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
      currentCategoryUrl: '',
      showCreateProduct: false
    }

  }

  componentDidMount() {
    this.setCategories(this.props.cats)


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
            v.img = <img src={v.imageArr[0]} className="product-img" />
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
                <img src={v.imageArr[0]} className="product-img" />
              </div>
              <div className="ellipsisContainer">
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
            response.data[i].img = <img src={response.data[i].imageArr[0]} className="product-img" />
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
              <div className="ellipsisContainer">
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
    Router.push(`/admin/addprice?id=${value._id}`)

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
    this.handleChangeCats(cats[0]?.value);

    
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

        <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
          <div className="row justify-content-center">
            <div className="col-11" >
              <div className="row">
                <div className="col-lg-9 col-12" >
                  <div className="large-title">
                    تاریخچه درخواست ایجاد کالا
                  </div>
                  <div className="small-title">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                  </div>
                </div>
                <div className="col-lg-3 col-12" >
                  <Button label="ایجاد کالای جدید" onClick={() => this.createProduct()} style={{ width: '100%' }} />

                </div>
              </div>
              <div className="row" >
                <div className="col-12" >
                  <Card className="b-card2  mt-5">
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
                          this.setState({
                            GridData: this.state.GridDataSearch
                          })
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
                    <div>دسته بندی ها</div>

                    <div className="row mt-3" >
                      <div className="col-md-3 col-12">
                        <Dropdown value={this.state.cat} ref={this.catsRef} className="b-border" options={this.state.cats} style={{ width: 250 }} onChange={(e) => {
                          this.handleChangeCats(e.value);
                        }

                        }
                          placeholder="دسته بندی را انتخاب کنید" />

                      </div>
                    </div>




                  </Card>
                </div>
              </div>
              <div className="row" >


                <div className="col-lg-12 col-12" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    {this.state.GridData.length > 0 ?
                      <DataTable responsive value={this.state.GridData} selectionMode="single" selection={this.state.gridId} onSelectionChange={(e) => { this.selectGridField(e.value) }} >
                        <Column field="titleAndSubTitle" header="عنوان و کد کالا" style={{ textAlign: 'right' }} className="title" />
                        <Column field="categoryName" header="دسته بندی" style={{ textAlign: 'right' }} className="title" />
                        <Column field="brand" header="برند" style={{ textAlign: 'right' }} className="title" />
                        <Column field="statusText" header="وضعیت" style={{ textAlign: 'right' }} className="title" />


                        <Column field="add" header="" style={{ textAlign: 'right' }} className="title" />

                      </DataTable>
                      :
                      <div>

                        <div style={{ textAlign: 'center' }}>
                          <p>موردی پیدا نشد</p>
                          <p>محصولی با دسته بندی انتخاب شده در انبار شما وجود ندارد</p>
                          <div className="row" style={{ justifyContent: 'space-evenly', marginTop: 50 }}>

                            <div className="col-lg-4 col-12" >
                              <button onClick={() => this.createProduct()} className="btn btn-outline-primary" style={{ width: '100%' }} >ایجاد کالای جدید</button>

                            </div>
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
        <Dialog visible={this.state.showCreateProduct} onHide={() => { this.setState({ showCreateProduct: false }) }} style={{ width: '50vw' }} maximizable={true}>
          <div style={{ direction: 'rtl' }}>
            <p className="title">درخواست ایجاد کالا در باماچوب</p>
            <p className="small-title">کالاهایی که در باما چوب وجود ندارد را درخواست دهید تا برای شما ایجاد شود</p>
            <Card className="b-card2  mt-5">
              <BInput value={this.state.product_Suggest_title} inValid={this.state.product_Suggest_title_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="عنوان کالا" absoluteLabel="عنوان کالا" Val={(v) =>
                this.setState({
                  product_Suggest_title: v,
                  product_Suggest_title_inValid: false
                })} />
              <p className="title mt-3">در عنوان کالا، برند، مدل (کد رنگ) و تمام ویژگی هایی که از کالا را میدانید را ذکر کنید
              </p>
              <p className="title">
                مثال: ام دی اف ملامینه بست وود 2091 گری استون برجسته 366*183
              </p>
              <BInput value={this.state.product_Suggest_description} inValid={this.state.product_Suggest_description_inValid} textArea={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="توضیحات کالا" absoluteLabel="توضیحات کالا" Val={(v) =>
                this.setState({
                  product_Suggest_description: v,
                  product_Suggest_description_inValid: false
                })} />
              <UpFile label={
                <div style={{ textAlign: 'center' }}><div>تصاویر خود را جهت بارگزاری داخل کادر بیاندازید
                  </div>
                  <div>
                    یا از دکمه زیر استفاده کنید
                  </div>

                </div>
              } className="col-lg-12 col-12 mt-3" large={true} inValid={this.state.product_Suggest_imageUrl_inValid} uploadImage={this.state.product_Suggest_imageUrl} buttonLabel="انتخاب تصویر" callback={(v) => {
                this.setState({
                  product_Suggest_imageUrl: v.uploadImage,
                  product_Suggest_imageUrl_inValid: false
                })
              }
              } />
              <div className="row" style={{ justifyContent: 'end', marginTop: 32 }} >

                <div className="col-lg-4 col-12" >
                  <Button label="درخواست ایجاد کالا" onClick={() => this.sendProductSuggest()} style={{ width: '100%' }} />
                </div>

              </div>
            </Card>
          </div>

        </Dialog>
      </>
    )
  }
}
export async function getStaticProps({ query }) {

  let res = await fetch('https://bmch.liara.run/api/v1/categories');
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
export default connect(mapStateToProps)(ProductHistory)