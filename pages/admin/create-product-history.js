import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import Router from 'next/router'
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';

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


class ProductHistory extends React.Component {
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
            v.img = <img alt=""  src={v.imageArr[0]} className="product-img" />
            if (v.status == "ok") {
              v.statusText = <Chip label="?????????? ??????" />;
              v.add = <Button disabled label="?????????? ???? ??????????" onClick={() => { this.addToMyProducts(v._key) }} style={{ width: '100%' }} />
            } else if (v.status == "nok") {
              v.statusText = <Chip label="?????????? ????????" />;
              v.add = <div>
                <span></span>
                <span></span>
              </div>
            } else {
              v.statusText =<Chip label="???? ?????? ??????????" />;
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
              response.data[i].statusText = <Chip label="?????????? ??????" />;
              response.data[i].add = <Button disabled label="?????????? ???? ??????????" onClick={() => { this.addToMyProducts(response.data[i]._key) }} style={{ width: '100%' }} />
            } else if (response.data[i].status == "nok") {
              response.data[i].statusText = <Chip label="?????????? ????????" />;
              response.data[i].add = <div>
                <span></span>
                <span></span>
              </div>
            } else {
              response.data[i].statusText = <Chip label="???? ?????? ??????????" />;
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
            title: '?????????? ???????? ?????? ???? ?????????? ?????? ?????????? ????',
            html: <div className='title' style={{ marginTop: 80 }}>
              <div style={{ textAlign: 'center' }}><Button label="?????? ???????? ?? ???????? ?????????? ????????" onClick={() => { MySwal.close(); }} style={{ width: '90%', marginBottom: 30 }} /><br /><Button label="????????????" onClick={() => { MySwal.close(); }} style={{ width: '90%' }} /></div></div>
          })
        } else {
          this.setState({
            showLoading: false
          })
          MySwal.fire({
            icon: 'error',
            title: '??????',
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
        showCreateProduct: true,
        product_Suggest_title:'',
        product_Suggest_description:'',
        product_Suggest_imageUrl:''
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
          title: '?????????????? ?????????? ?????????? ?????? ?????????? ????',
          html: <div className='title'><div>?????????????? ?????? ?????? ?????????? ?????????????????? ???? ???? ?????? ?????????? ????</div><br /><br />
            <div style={{ textAlign: 'center' }}><Button label="??????????" onClick={() => { MySwal.close(); }} style={{ width: 120 }} /></div></div>
        })


      }, (error) => {
        this.setState({
          showLoading: false
        })
        MySwal.fire({
          icon: 'error',
          title: '??????',
          text: '???????????? ?????????? ??????'
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
    this.handleChangeCats(cats[0]?.value);

    
  }
  handleChangeCats(value){
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
            <div className="col-10" >
              <div className="row">
                <div className="col-lg-9 col-12" >
                  <div className="large-title">
                    ?????????????? ?????????????? ?????????? ????????
                  </div>
                  <div className="small-title">
                    ???????? ???????????? ?????? ???????????? ???? ?????????? ?????????? ?????????????? ???? ???????? ?????? ?? ???? ?????????????? ???? ???????????? ???????????? ??????
                  </div>
                </div>
                <div className="col-lg-3 col-12" style={{textAlign:'left'}} >
                  <Button label="?????????????? ?????????? ?????????? ????????" className="large" onClick={() => this.createProduct()} style={{ width: '18.5rem' }} />

                </div>
              </div>
              <div className="row" >
                <div className="col-12" >
                  <Card className="b-card2  mt-5">
                  <div className="row" >
                      <div className="col-lg-10 col-12" style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', top: 8 }} />

                        <AutoComplete placeholder="???????????? ?????? ???? ???? ???????? " inputClassName="transparent-btn" inputStyle={{ fontFamily: 'iranyekanwebregular', textAlign: 'right', fontSize: 12, borderColor: '#dedddd', fontSize: 15, width: '100%', paddingRight: 25,height:'3rem' }} style={{ width: '100%' }} onChange={(e) => this.setState({ productInSearch: e.value })} itemTemplate={this.itemTemplateSearch.bind(this)} value={this.state.productInSearch} onSelect={(e) => {
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
                        <Button label="??????????" onClick={() => {
                          this.setState({
                            GridData: this.state.GridDataSearch
                          })
                        }} style={{ width: '8rem' }} className="large"></Button>
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
                    <div>???????? ???????? ????</div>

                    <div className="row mt-3" >
                      <div className="col-md-3 col-12">
                        <Dropdown value={this.state.cat} ref={this.catsRef} className="b-border" options={this.state.cats} style={{ width: '16.5rem' }} onChange={(e) => {
                          this.handleChangeCats(e.value);
                        }

                        }
                          placeholder="???????? ???????? ???? ???????????? ????????" />

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
                        <Column field="titleAndSubTitle" header="?????????? ?? ???? ????????" style={{ textAlign: 'right',width:300 }} className="title" />
                        <Column field="categoryName" header="???????? ????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="brand" header="????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="statusText" header="??????????" style={{ textAlign: 'right' }} className="title" />


                        <Column field="add" header="" style={{ textAlign: 'right' }} className="title" />

                      </DataTable>
                      :
                      <div>

                        <div style={{ textAlign: 'center' }}>
                          <p>?????????? ???????? ??????</p>
                          <p>???????????? ???? ???????? ???????? ???????????? ?????? ???? ?????????? ?????? ???????? ??????????</p>
                          <div className="row" style={{ justifyContent: 'space-evenly', marginTop: 50 }}>

                            <div className="col-lg-4 col-12" >
                              <button onClick={() => this.createProduct()} className="btn btn-outline-primary large" style={{ width: '100%' }} >?????????????? ?????????? ?????????? ????????</button>

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
            <p className="title">?????????????? ?????????? ???????? ???? ??????????????</p>
            <p className="small-title">???????????????? ???? ???? ???????? ?????? ???????? ?????????? ???? ?????????????? ???????? ???? ???????? ?????? ?????????? ??????</p>
            <Card className="b-card2  mt-5">
              <BInput value={this.state.product_Suggest_title} inValid={this.state.product_Suggest_title_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="?????????? ????????" absoluteLabel="?????????? ????????" Val={(v) =>
                this.setState({
                  product_Suggest_title: v,
                  product_Suggest_title_inValid: false
                })} />

              <Message severity="info" className="title mt-3" style={{ justifyContent: 'flex-start', width: '100%' }} text={<div className="title"><div>???? ?????????? ?????????? ?????????? ?????? (???? ??????) ?? ???????? ?????????? ???????? ???? ???? ???????? ???? ?????????????? ???? ?????? ????????</div><div>????????: ???? ???? ???? ?????????????? ?????? ?????? 2091 ?????? ?????????? ???????????? 366*183</div></div>}></Message>

              
              <BInput value={this.state.product_Suggest_description} placeholder="???????? ?????????? ???????? ?????????? ???? ?????????????? ???????????????? ???????????? ???? ??????????????" inValid={this.state.product_Suggest_description_inValid} textArea={true} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="?????????????? ????????" absoluteLabel="?????????????? ????????" Val={(v) =>
                this.setState({
                  product_Suggest_description: v,
                  product_Suggest_description_inValid: false
                })} />
              <div >
                <UpFile  label={
                  <div  style={{ textAlign: 'center' }}><div>???????????? ?????? ???? ?????? ???????????????? ???????? ???????? ??????????????????
                    </div>
                    <div>
                      ???? ???? ???????? ?????? ?????????????? ????????
                    </div>

                  </div>
                } className="col-lg-12 col-12 mt-3" large={true} inValid={this.state.product_Suggest_imageUrl_inValid} outlined={true} uploadImage={this.state.product_Suggest_imageUrl} buttonLabel="???????????? ??????????" callback={(v) => {
                  this.setState({
                    product_Suggest_imageUrl: v.uploadImage,
                    product_Suggest_imageUrl_inValid: false
                  })
                }
                } />
              </div>  
              

              <div className="row" style={{ justifyContent: 'end', marginTop: 32 }} >

                <div className="col-lg-4 col-12" >
                  <Button label="?????????????? ?????????? ?????????? ????????" onClick={() => this.sendProductSuggest()} className="large" style={{ width: '100%' }} />
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
export default connect(mapStateToProps)(ProductHistory)