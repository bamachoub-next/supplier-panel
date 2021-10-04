import React, { Component } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import {Close,Search} from '@material-ui/icons';
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


import Server from './../../components/Server'
import Header from './../../components/Header';
import { AutoComplete } from 'primereact/autocomplete';

const citySelectItems = [
    {label: 'New York', value: 'NY'},
    {label: 'Rome', value: 'RM'},
    {label: 'London', value: 'LDN'},
    {label: 'Istanbul', value: 'IST'},
    {label: 'Paris', value: 'PRS'}
];
class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.Server = new Server();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.itemTemplateSearch = this.itemTemplateSearch.bind(this);

        this.state = {
            activeIndex: 0,
            Step: 1,
            GridData:[]
        }
    }
    componentDidMount() {
      this.setCategories(this.props.cats,1)

    }
    itemTemplate(car, layout) {
      if (!car)
        return (
          <div className="p-col-12 p-md-3">
            <div></div>
          </div>
        );
      if (layout === 'list') {
        return (
          <div className="row">
            <div className="col-lg-12 " >
              <p>ssss</p>
              <hr />
            </div>
  
          </div>
        );
      }
      if (layout === 'grid') {
        return (
          <div className="p-col-12 p-md-3">
            <div>{car.brand}</div>
          </div>
        );
      }
    }

    itemTemplateSearch(brand) {
        if (!brand.catId) {
          if (typeof brand.subTitle != "undefined") {
            return (
              <div className="p-clearfix" style={{ direction: 'rtl' }} >
                <div style={{ margin: '10px 10px 0 0' }} className="row" _id={brand._id} >
    
                  <div className="col-lg-6" _id={brand._id} style={{ textAlign: 'right' }}>{brand.desc &&
                    <span className="iranyekanwebregular" style={{ textAlign: 'right' }} _id={brand._id} >
                      <span _id={brand._id} style={{ whiteSpace: 'pre-wrap' }}>{brand.title}</span><br />
                      <span _id={brand._id} style={{ whiteSpace: 'pre-wrap' }}>{brand.subTitle}</span>
                    </span>
                  }
                  </div>
                  <div _id={brand._id} className="col-lg-6" style={{ textAlign: 'center' }}>{brand.img &&
                    <img src={this.state.absoluteUrl + brand.img.split("public")[1]} style={{ width: 100, height: 100, minWidth: 100 }} _id={brand._id} />
                  } </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="p-clearfix" style={{ direction: 'rtl' }} >
                <div style={{ margin: '10px 10px 0 0' }} className="row" _catId={brand.catId} >
    
                  <div className="col-lg-6" _id={brand._id} style={{ textAlign: 'right' }}>
                    <span className="iranyekanwebregular" style={{ textAlign: 'right' }} _tagId={brand._id} >
                      <span _tagId={brand._id} style={{ color: '#ccc' }}>مشاهده محصولات با برچسب : </span><span style={{ whiteSpace: 'pre-wrap' }} _tagId={brand._id}>{brand.title}</span><br />
                    </span>
                  </div>
    
                </div>
              </div>
            );
          }
    
    
        } else {
          return (
            <div className="p-clearfix" style={{ direction: 'rtl' }} >
              <div style={{ margin: '10px 10px 0 0' }} className="row" _catId={brand.catId} >
    
                <div className="col-lg-6" _id={brand.catId} style={{ textAlign: 'right' }}>
                  <span className="iranyekanwebregular" style={{ textAlign: 'right' }} _catId={brand.catId} >
                    <span _catId={brand.catId} style={{ color: '#ccc' }}>مشاهده محصولات دسته بندی : </span><span style={{ whiteSpace: 'pre-wrap' }} _catId={brand.catId}>{brand.name}</span><br />
                  </span>
                </div>
    
              </div>
            </div>
          );
        }
    
    
      }
      onSelectTag(event) {
        let Tags = this.state.tags.filter(e => e.remove != "1");
        Tags.push({
          title: event.value.title,
          _id: event.value._id
        })
        var flags = [], output = [], l = Tags.length, i;
        for (i = 0; i < l; i++) {
          if (flags[Tags[i].title]) continue;
          flags[Tags[i].title] = true;
          output.push(Tags[i]);
        }
        this.setState({
          tag: event.value.title,
          tags: output
    
        })
      }
    setCategories(categories,level,key){
      let cats = this.state.cats||[];
      if(level == 1){
        for (let item of categories){
          let temp = {
            label:item.category.name,
            _url:item.category._url,
            _id:item.category._id,
            _key:item.category._key
            
          }
          if(item.category.status !="end"){
            temp["items"]=[]
            for (let item2 of item.subCategories){
              let level2 = {
                label:item2.name,
                _url:item2._url,
                _id:item2._id,
                _key:item2._key,
                command: (event)=>{

                  if(event.item.items && event.item.items.length == 0){
                    this.getCategories(2,event.item._key);
                  }else{
                    this.getProductsPerCat(event.item);
                  }
                }
              }
              if(item2.status !="end"){
                level2["items"]=[]
  
              }
              temp["items"].push(level2)
            }
          }else{
            temp.command = (event)=>{
              this.getProductsPerCat(event.item);
            }
          }
          cats.push(temp)
        }
      }else{
        let levels2=[]
        for(let cat of categories){
          for(let levels of cat.subCategories){
            if(levels.level1._key == key){

              levels2 = levels.level2;
            }
          }
        }
        for(let C of cats){
          if(C.expanded){
            for(let I of C.items){
              if(I._key == key){
                for(let lastitem of levels2){
                  I.items.push({
                    label:lastitem.name,
                    _url:lastitem._url,
                    _id:lastitem._id,
                    _key:lastitem._key,
                    command : (event)=>{
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
        cats:cats
      })
  }
  getCategories(level,key) {

    this.Server.get("categories", `?level=${level}`,
        (response) => {
          this.setCategories(response.data,level,key)
        }, (error) => {

        }
    )
  }
  suggestBrands(event) {
    let that = this;
    let param = {
      title: event.query,
      SellerId: this.state.SellerId,
      Main: this.state.SellerId == this.state.MainShopId

    };

    let SCallBack = function (response) {


      let brandSuggestions = []
      response.data.result.reverse().map(function (v, i) {

        brandSuggestions.push({ _id: v._id, name: v.name, catId: v.name ? v._id : null, title: v.title, subTitle: v.subTitle, desc: v.desc, img: v.fileUploaded })
      })

      that.setState({ brandSuggestions: brandSuggestions });




    };
    let ECallBack = function (error) {
      console.log(error)


    }
    this.Server.get("products/basic-search/", param, SCallBack, ECallBack)


  }
  getProductsPerCat(item){
    this.Server.get(`products/cat/${item._id}${item._key}`, `?categoryurl=${item._id}&categorykey=${item._key}&offset=0&limit=1000`,
        (response) => {
          this.setState({
              GridData:response.data||[]
          })
        }, (error) => {

        }
    )
  }
    
    render() {
        return (
            <>
            <Header />
            <div className="justify-content-center container" style={{ marginTop: 50, marginBottom: 50, direction: 'rtl' }}  >
                
                <div className="row">
                    <div className="col-lg-9 col-12" >
                        <div className="large-title">
                            جستجو و افزودن کالا
                        </div>
                        <div  className="small-title">
                            شما میتوانید کالاهای تایید شده توسط با ما چوب را جستجو و به انبار خود اضافه کنید
                        </div>
                    </div>
                    <div className="col-lg-3 col-12" >
                        <Button label="ایجاد کالای جدید" onClick={() => this.createProduct()} style={{width:'100%'}} />

                    </div>
                </div>
                <div className="row" >
                    <div className="col-12" >
                    <Card className="b-card2  mt-5">
                        <div className="row" >
                            <div className="col-9" style={{position:'relative'}}>
                            <Search style={{position:'absolute',top:8}} />   
  
                            <AutoComplete placeholder="    جستجوی نام یا کد کالا " inputClassName="transparent-btn" inputStyle={{ fontFamily: 'iranyekanwebregular', textAlign: 'right', fontSize: 12, borderColor: '#dedddd', fontSize: 15,width: '100%',paddingRight:25 }} style={{ width: '100%' }} onChange={(e) => this.setState({ brand: e.value })} itemTemplate={this.itemTemplateSearch.bind(this)} value={this.state.brand} onSelect={(e) => this.onSelect(e)} suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />
                            
                            </div>
                            <div className="col-3" style={{display:'flex',justifyContent:'space-between'}}>
                            <Button label="جستجو" onClick={() => this.createProduct()} style={{width:'75%'}}></Button>
                            <Button onClick={() => this.createProduct()} style={{width:'20%'}}  > <Close /> </Button>

                            
                            </div>
                        </div>
                    </Card>
                    <Card className="b-card2  mt-3">
                        <div>فیلترها</div>
                        <Dropdown value={this.state.city} options={citySelectItems} onChange={(e) => this.setState({
                            city:e.value
                        })} placeholder="برند"/>

                    </Card>
                    </div>
                </div>
                <div className="row" >
                  <div className="col-3" style={{position:'relative'}}>

                    <Card className="b-card2  mt-5">
                    <PanelMenu model={this.state.cats}  className="b-menu"/>

                    </Card>
                    </div>

                    <div className="col-9" style={{position:'relative'}}>

                    <Card className="b-card2  mt-5">
                      {this.state.GridData.length > 0 ?
                        <DataView value={this.state.GridData} layout={this.state.layout} paginator={true}  rows={10} itemTemplate={this.itemTemplate}></DataView>
                        :
                        <div>
                          <p>موردی برای نمایش وجود ندارد</p>
                        </div>
                      }

                    </Card>
                    </div>

                    
                </div>




            </div>
            </>
        )
    }
}
export async function getServerSideProps({query}){

  let res = await fetch('http://127.0.0.1:3000/api/v1/categories?level=1');
  const cats = await res.json();
  
  return {
    props :{
      cats
    }
  }

}

export default Signup;