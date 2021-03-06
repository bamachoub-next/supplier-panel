import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chip } from 'primereact/chip';
import Router from 'next/router'
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


class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.Server = new Server();
    this.state = {
      activeIndex: 0,
      brandOptions: [],
      brandOption: [],
      showLoading: false,
      Step: 1,
      GridData: [],
      currentCategoryUrl: '',
      favProduct: [],
      showCreateProduct: false
    }
  }
  

  componentDidMount() {
    /*
    let token = this.props.accessToken||localStorage.getItem("accessToken")
    this.Server.get(`supplier-employee-auth/check-validation-code/${token}`, '',
      (response) => {
        this.setState({
          showLoading:false
        })
        this.setCategories(this.props.cats, 1)
      }, (error) => {
        Router.push(`/`)
        this.setState({
          showLoading:false
        })

      }
    )*/
    
    this.setCategories(this.props.cats, 1)


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
              currentCategoryKey: event.item._key,
              currentCategoryUrl: event.item._url
            })
            this.getBrands(event.item._url, event.item._key)

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
                  currentCategoryKey: event.item._key,
                  currentCategoryUrl: event.item._url
                })

                if (event.item.items && event.item.items.length == 0) {
                  this.getCategories(2, event.item._key);
                } else {
                  if (event.item.status == "end")
                    this.getFavProductsPerCat(event.item);
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
              currentCategoryKey: event.item._key,
              currentCategoryUrl: event.item._url
            })

            this.getFavProductsPerCat(event.item);
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
                      currentCategoryKey: event.item._key,
                      currentCategoryUrl: event.item._url
                    })

                    if (event.item.status == "end")
                      this.getFavProductsPerCat(event.item);


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
    this.setState({
      showLoading: true
    })
    this.Server.get("categories", `?level=${level}`,
      (response) => {
        this.setState({
          showLoading: false
        })
        this.setCategories(response.data, level, key)
      }, (error) => {
        this.setState({
          showLoading: false
        })

      }
    )
  }
  suggestproductInSearch(event) {
    if (!this.state.currentCategoryUrl)
      return;

    this.Server.post(`products/basic-search/${this.state.currentCategoryUrl}`, { searchString: this.state.productInSearch },
      (response) => {
        if (response.data) {
          let productInSearchSuggestions = [];
          response.data.map(function (v, i) {
            v.commissionPercent = <div>{v.commissionPercent} %</div>
            v.img = <img alt=""  src={v.imageArr[0]} />
            if(v.status != "ok"){
              v.add = <Button label="???????????? ???? ??????????" onClick={() => { this.addToMyProducts(v._key,item) }} style={{ width: '100%' }} />
            }else{
              v.add = <Button label="?????????? ???? ??????????" disabled style={{ width: '100%' }} />
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
  searchByFilter(brandOption, offset, limit) {
    if (!this.state.currentCategoryUrl)
      return;
    this.setState({
      showLoading: true
    })
    this.Server.post(`products/basic-filter/${this.state.currentCategoryUrl}?offset=${offset}&limit=${limit}`, { brand: brandOption },
      (response) => {
        this.setState({
          showLoading: false
        })

        if (response.data) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].commissionPercent = <div>{response.data[i].commissionPercent} %</div>
            response.data[i].img = <img alt=""  src={response.data[i].imageArr[0]} />
            if(v.status != "ok"){
              response.data[i].add = <Button label="???????????? ???? ??????????" onClick={() => { this.addToMyProducts(response.data[i]._key,response.data[i]) }} style={{ width: '100%' }} />
            }else{
              response.data[i].add = <Button label="?????????? ???? ??????????" disabled style={{ width: '100%' }} />
            }
            response.data[i].titleAndSubTitle = <div style={{ display: 'flex',width:'100%' }}>
              <div>
                <img alt=""  src={response.data[i].imageArr[0]} className="product-img" />
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
      }
    )

  }
  getBrands(currentCategoryUrl, currentCategoryKey) {
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

      }, (error) => {
        this.setState({
          showLoading: false
        })

      }
    )

  }
  getFavProductsPerCat(item) {

    this.setState({
      GridData: [],
      showLoading: true
    })
    this.Server.get(`suppliers/fav/${item._url}`, `?categoryurl=${item._url}&offset=0&limit=1000`,
      (response) => {
        let favProduct=[];
        for (let i = 0; i < response.data.length; i++) {
          favProduct.push(response.data[i].productKey)
        }
        this.setState({
          showLoading: false,
          favProduct:favProduct
        })
        this.getProductsPerCat(item);
        
      }, (error) => {
        this.setState({
          showLoading: false
        })

      },{ Authorization: `Bearer ${this.props.accessToken || localStorage.getItem("accessToken")}` }
    )
  }
  getProductsPerCat(item) {

    this.setState({
      GridData: [],
      showLoading: true
    })
    this.Server.get(`products/cat/${item._url}/${item._key}`, `?categoryurl=${item._url}&categorykey=${item._key}&offset=0&limit=1000`,
      (response) => {
        this.setState({
          showLoading: false
        })

        if (response.data) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].commissionPercent = <div>{response.data[i].commissionPercent} %</div>
            response.data[i].img = <img alt=""  src={response.data[i].imageArr[0]} />
            if(this.state.favProduct.indexOf(response.data[i]._key) == -1){
              response.data[i].add = <Button label="???????????? ???? ??????????" onClick={() => { this.addToMyProducts(response.data[i]._key,item) }} style={{ width: '100%' }} />
            }else{
              response.data[i].add = <Button label="?????????? ???? ??????????" disabled style={{ width: '100%' }} />
            }
            response.data[i].titleAndSubTitle = <div style={{ display: 'flex',width:'100%' }}>
              <div>
                <img alt=""  src={response.data[i].imageArr[0]} className="product-img" />
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
        console.log(error);
        this.setState({
          showLoading: false
        })

      }
    )
  }
  addToMyProducts(key,item) {
    this.setState({
      showLoading: true
    })
    this.Server.post(`suppliers/add-fav/${this.state.currentCategoryUrl}/${key}`, {},
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
              <div style={{ textAlign: 'center' }}><Button label="?????? ???????? ?? ???????? ?????????? ????????" onClick={() => { MySwal.close();  Router.push(`/admin/manage-store`)  }} style={{ width: '90%', marginBottom: 30 }} /><br /><Button label="????????????" onClick={() => { MySwal.close(); this.getFavProductsPerCat(item) }} style={{ width: '90%' }} /></div></div>
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

  render() {
    return (
      <>
        <Header />

        <div className="justify-content-center" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
          <div className="row justify-content-center">
            <div className="col-10" >
              <div className="row" >
                <div className="col-lg-9 col-12" >
                  <div className="large-title">
                    ?????????? ?? ???????????? ????????
                        </div>
                  <div className="small-title">
                    ?????? ???????????????? ?????????????? ?????????? ?????? ???????? ???? ???? ?????? ???? ?????????? ?? ???? ?????????? ?????? ?????????? ????????
                        </div>
                </div>
                <div className="col-lg-3 col-12" style={{textAlign:'left'}} >
                  <Button label="?????????? ?????????? ????????" onClick={() => this.createProduct()} style={{ width: '18.5rem' }} className="large" />

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
                        }} disabled style={{ width: '8rem' }} className="large"></Button>
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
                    <div>??????????????</div>

                    <div className="mt-3" style={{display:'flex',flexWrap:'wrap'}} >
                    <div >
                        <MultiSelect value={this.state.brandOption} options={this.state.brandOptions} className="b-border" style={{ width: '16.5rem' }} onChange={(e) => {
                          this.setState({
                            brandOption: e.value
                          })
                          this.searchByFilter(e.value[0], 0, 10)
                        }
                        } placeholder="????????" />



                      </div>
                    </div>
                    <div className="row mt-3" >
                      <div className="col-md-9 col-12" style={{ display: 'flex', justifyContent: 'start', alignItems: 'baseline' }}>
                        <div>???????????????? ?????????? ??????</div>
                        <div style={{ marginTop: 10, textAlign: 'right', marginBottom: 10 }}>
                          {this.state.brandOption.map((v, i) => {
                            if (!v.remove) {
                              return (<Chip label={v} key={i} className="b-p-chip" _id={v} style={{ marginRight: 5,direction:'ltr' }} removable onRemove={(event) => {
                                let brand = event.target.parentElement.getElementsByClassName("p-chip-text")[0].textContent;
                                let remove = -1;
                                let brandOption = this.state.brandOption;
                                for (let i = 0; i < brandOption.length; i++) {
                                  if (brandOption[i] == brand) {
                                    remove = i;
                                  }
                                }
                                brandOption.splice(remove, 1)
                                this.setState({
                                  brandOption: brandOption
                                })
                                //this.searchByFilter(brandOption[0],0,10)

                              }} />)
                            }

                          })
                          }
                        </div>
                      </div>
                      <a className="col-md-3 col-12" href="#" onClick={() => { this.setState({ brandOption: [] }); this.searchByFilter("", 0, 10) }} >
                        <div style={{ textAlign: 'left' }}><span><DeleteOutline /></span><span> ?????? ?????? ??????????????</span></div>
                      </a>
                    </div>



                  </Card>
                </div>
              </div>
              <div className="row" >
                <div className="col-lg-3 col-12" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    <PanelMenu model={this.state.cats} transitionOptions="nodeRef" className="b-menu" />

                  </Card>
                </div>

                <div className="col-lg-9 col-12" style={{ position: 'relative' }}>

                  <Card className="b-card2  mt-5">
                    {this.state.GridData.length > 0 ?
                      <DataTable responsive value={this.state.GridData} selectionMode="single" selection={this.state.gridId} >
                        <Column field="titleAndSubTitle" header="?????????? ?? ???? ????????"  style={{ textAlign: 'right',width:300 }} className="title" />
                        <Column field="categoryName" header="???????? ????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="brand" header="????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="commissionPercent" header="?????????????? ???????? ????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="lowestPrice" header="???????????? ???????? ?????? ????????" style={{ textAlign: 'right' }} className="title" />
                        <Column field="add" header="" style={{ textAlign: 'right' }} className="title" />

                      </DataTable>
                      :
                      <div>
                        {this.state.brandOption.length == 0 ?
                          <div style={{ textAlign: 'center' }}>
                            <p style={{fontWeight:'bold'}} className="title">?????????? ???????? ?????????? ???????? ??????????</p>
                          </div>

                          :
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ textAlign: 'center',display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column',height:150 }}>
                              <p style={{fontWeight:'bold'}} className="title">?????????? ???????? ??????</p>
                              <p style={{width:300,textAlign:'center'}}>
                                <span  className="title">???????????? ???? ???????????????? ?????????? ?????? ???? ?????????? ?????? ???????? ??????????</span>
                              </p>
                            </div>
                            <div className="row" style={{ justifyContent: 'space-evenly', marginTop: 50 }}>
                              <div className="col-lg-4 col-12" >
                                <button className="btn btn-primary large" onClick={() => { this.setState({ brandOption: [] }); this.searchByFilter("", 0, 10) }} style={{ width: '100%' }} >?????? ??????????????</button>

                              </div>
                              <div className="col-lg-4 col-12" >
                                <button onClick={() => this.createProduct()} className="btn btn-outline-primary large" style={{ width: '100%' }} >?????????? ?????????? ????????</button>

                              </div>
                            </div>
                          </div>


                        }
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
                  <Button label="?????????????? ?????????? ????????" onClick={() => this.sendProductSuggest()} className="large" style={{ width: '100%' }} />
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

  let res = await fetch('https://data.bamachoub.com/api/v1/categories?level=1');
  //let res = await fetch('http://127.0.0.1:3000/api/v1/categories?level=1');

  
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
export default connect(mapStateToProps)(AddProduct)