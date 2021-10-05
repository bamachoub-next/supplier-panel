import React, { Component } from 'react';
import { connect } from 'react-redux';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Close, Search } from '@material-ui/icons';
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import Server from './../../components/Server'
import Header from './../../components/Header';
import { AutoComplete } from 'primereact/autocomplete';
import BInput from './../../components/BInput';
import UpFile from './../../components/UpFile';

const citySelectItems = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' }
];
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    debugger;

    this.Server = new Server();

    this.state = {
      activeIndex: 0,
      Step: 1,
      GridData: [],
      currentCategoryUrl: '',
      showCreateProduct: false
    }
  }
  componentDidMount() {

    this.setCategories(this.props.cats, 1)

  }

  itemTemplateSearch(brand) {
    return (
      <div className="p-clearfix" style={{ direction: 'rtl' }} >
        <div style={{ margin: '10px 10px 0 0' }} className="row" _id={brand._id} >

          <div className="col-lg-6" _id={brand._id} style={{ textAlign: 'right' }}>
            <span className="iranyekanwebregular" style={{ textAlign: 'right' }} _id={brand._id} >
              <span style={{ whiteSpace: 'pre-wrap' }} _id={brand._id}>{brand.title}</span>
            </span>
          </div>

        </div>
      </div>
    );


  }
  setCategories(categories, level, key) {

    let cats = this.state.cats || [];
    if (level == 1) {
      for (let item of categories) {
        let temp = {
          label: item.category.name,
          _url: item.category.url,
          _id: item.category._id,
          _key: item.category._key,
          status: item.category.status

        }
        if (item.category.status != "end") {
          temp.command = (event) => {
            this.setState({
              currentCategoryUrl: event.item._url
            })
          }
          temp["items"] = []
          for (let item2 of item.subCategories) {
            let level2 = {
              label: item2.name,
              _url: item.category.url,
              _id: item2._id,
              _key: item2._key,
              status: item2.status,
              command: (event) => {
                this.setState({
                  currentCategoryUrl: event.item._url
                })
                if (event.item.items && event.item.items.length == 0) {
                  this.getCategories(2, event.item._key);
                } else {
                  if (event.item.status == "end")
                    this.getProductsPerCat(event.item);
                }
              }
            }
            if (item2.status != "end") {
              level2["items"] = []

            }
            temp["items"].push(level2)
          }
        } else {
          temp.command = (event) => {
            this.setState({
              currentCategoryUrl: event.item._url
            })
            this.getProductsPerCat(event.item);
          }
        }
        cats.push(temp)
      }
    } else {
      let levels2 = [];
      let _url = null;
      for (let cat of categories) {
        for (let levels of cat.subCategories) {
          if (levels.level1._key == key) {
            _url = cat.category.url;
            levels2 = levels.level2;
          }
        }
      }
      for (let C of cats) {
        if (C.expanded) {
          for (let I of C.items) {
            if (I._key == key) {
              for (let lastitem of levels2) {
                I.items.push({
                  label: lastitem.name,
                  _url: _url,
                  _id: lastitem._id,
                  _key: lastitem._key,
                  status: lastitem.status,
                  command: (event) => {
                    this.setState({
                      currentCategoryUrl: event.item._url
                    })
                    if (event.item.status == "end")
                      this.getProductsPerCat(event.item);


                  }
                });
              }
            }
          }
        }
      }
    }
    this.setState({
      cats: cats
    })
  }
  getCategories(level, key) {
    this.Server.get("categories", `?level=${level}`,
      (response) => {
        this.setCategories(response.data, level, key)
      }, (error) => {

      }
    )
  }
  suggestBrands(event) {

    if (!this.state.currentCategoryUrl)
      return;
    this.Server.post(`products/basic-search/${this.state.currentCategoryUrl}/${this.state.brand}`, { searchString: this.state.brand },
      (response) => {
        debugger;
        if (response.data) {
          let brandSuggestions = []
          response.data.map(function (v, i) {
            brandSuggestions.push({ _id: v._id, title: v.title, desc: v.description })
          })

          this.setState({ brandSuggestions: brandSuggestions });

        }

      }, (error) => {

      }
    )

  }
  getProductsPerCat(item) {

    this.setState({
      GridData: []
    })
    this.Server.get(`products/cat/${item._url}/${item._key}`, `?categoryurl=${item._url}&categorykey=${item._key}&offset=0&limit=1000`,
      (response) => {
        if (response.data) {
          debugger;
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].commissionPercent = <div>{response.data[i].commissionPercent} %</div>
            response.data[i].img = <img src={response.data[i].imageArr[0]} />
            response.data[i].add = <Button label="افزودن به انبار" onClick={() => this.addToMyProducts()} style={{ width: '100%' }} />
            response.data[i].titleAndSubTitle = <div>
              <div style={{ fontWeight: 'bold' }}>{response.data[i].title}</div>
              <div>{response.data[i].description}</div>
            </div>

          }
        }

        this.setState({
          GridData: response.data || []
        })
      }, (error) => {

      }
    )
  }
  addToMyProducts() {

  }
  createProduct(step) {
    if (step) {

    } else {
      this.setState({
        showCreateProduct: true
      })
    }

  }
  sendProductSuggest(){
    debugger;
    this.Server.post(`product-suggestion`, { description: this.state.product_Suggest_description,title: this.state.product_Suggest_title,imageUrl: this.state.product_Suggest_imageUrl,supplierKey: this.props.employKey },
      (response) => {
        MySwal.fire({
          icon: 'success',
          showConfirmButton:false,
          title: 'درخواست ایجاد کالای شما ارسال شد',
          html: <div className='title'><div>درخواست شما جهت بررسی کارشناسان با ما چوب ارسال شد</div><br/><br/>
          <div style={{textAlign:'center'}}><Button label="ادامه" onClick={() => {MySwal.close();} } style={{ width: 120 }} /></div></div>
      })
        

      }, (error) => {

        MySwal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'عملیات انجام نشد'
        })

      },{ Authorization: `Bearer ${this.props.accessToken}` }
    )
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
                    جستجو و افزودن کالا
                        </div>
                  <div className="small-title">
                    شما میتوانید کالاهای تایید شده توسط با ما چوب را جستجو و به انبار خود اضافه کنید
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
                      <div className="col-9" style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', top: 8 }} />

                        <AutoComplete placeholder="    جستجوی نام یا کد کالا " inputClassName="transparent-btn" inputStyle={{ fontFamily: 'iranyekanwebregular', textAlign: 'right', fontSize: 12, borderColor: '#dedddd', fontSize: 15, width: '100%', paddingRight: 25 }} style={{ width: '100%' }} onChange={(e) => this.setState({ brand: e.value })} itemTemplate={this.itemTemplateSearch.bind(this)} value={this.state.brand} onSelect={(e) => this.setState({
                          title: e.value.title
                        })} suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

                      </div>
                      <div className="col-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button label="جستجو" onClick={() => { debugger; }} style={{ width: '75%' }}></Button>
                        <Button onClick={() => { debugger; }} style={{ width: '20%', display: 'flex', justifyContent: 'center' }}  > <Close /> </Button>


                      </div>
                    </div>
                  </Card>
                  <Card className="b-card2  mt-3">
                    <div>فیلترها</div>

                    <div className="row mt-3" >
                      <div className="col-md-3 col-12">
                        <Dropdown value={this.state.city} options={citySelectItems} style={{ width: '100%' }} onChange={(e) => this.setState({
                          city: e.value
                        })} placeholder="برند" />


                      </div>
                    </div>
                    <div className="row mt-3" >
                      <div className="col-md-9 col-12">
                        <div>فیلترهای اعمال شده</div>
                      </div>
                      <div className="col-md-3 col-12">
                        <div style={{ textAlign: 'left' }}>حذف همه فیلترها</div>
                      </div>
                    </div>



                  </Card>
                </div>
              </div>
              <div className="row" >
                <div className="col-3" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    <PanelMenu model={this.state.cats} className="b-menu" />

                  </Card>
                </div>

                <div className="col-9" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    {this.state.GridData.length > 0 ?
                      <DataTable responsive value={this.state.GridData} selectionMode="single" selection={this.state.BlogId} onSelectionChange={e => this.selectedBlogsChange(e.value)}>
                        <Column field="img" header="" style={{ textAlign: 'right' }} className="title" />
                        <Column field="titleAndSubTitle" header="عنوان و کد کالا" style={{ textAlign: 'right' }} className="title" />
                        <Column field="categoryName" header="دسته بندی" style={{ textAlign: 'right' }} className="title" />
                        <Column field="brand" header="برند" style={{ textAlign: 'right' }} className="title" />
                        <Column field="commissionPercent" header="کمیسیون فروش کالا" style={{ textAlign: 'right' }} className="title" />
                        <Column field="price" header="کمترین قیمت روی سایت" style={{ textAlign: 'right' }} className="title" />
                        <Column field="add" header="" style={{ textAlign: 'right' }} className="title" />

                      </DataTable>
                      :
                      <div>
                        <p>موردی برای نمایش وجود ندارد</p>
                      </div>
                    }

                  </Card>
                </div>


              </div>

            </div>
          </div>





        </div>
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
export async function getServerSideProps({ query }) {

  let res = await fetch('http://127.0.0.1:3000/api/v1/categories?level=1');
  const cats = await res.json();

  return {
    props: {
      cats
    }
  }

}


const mapStateToProps = (state) => {
  return{
      employKey:state.employKey,
      accessToken:state.accessToken
  }
}
export default connect(mapStateToProps)(AddProduct)