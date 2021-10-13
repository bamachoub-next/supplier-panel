import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chip } from 'primereact/chip';
import Router from 'next/router'
import {InputSwitch} from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Checkbox } from 'primereact/checkbox';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Add,Close } from '@material-ui/icons';
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

const switchBtn = [
  {label: 'فعال', value: true},
  {label: 'غیرفعال', value: false}
];
class AddPrice extends React.Component {
  constructor(props) {
    super(props);

    this.Server = new Server();

    this.state = {
      showCreateProduct: false,
      Variations:[],
      EstelamRecords:[]
    }
  }
  componentDidMount() {

   this.getProduct()

  }
  getProduct(){
    this.Server.get(`products/one/${Router.router.query.id}`, '',
    (response) => {
      console.log(response.data.product);
      this.setState({
        product:response.data.product
      })


    }, (error) => {
      

    }
  )
  }
  addPrice(){

  }
  addEstelam(){
    debugger
    return;
    this.Server.post(`add-buy-method/estelem`, {  },
      (response) => {
        debugger

        if (response.data) {
          
        }

      }, (error) => {
        

      }
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
                  <div style={{display:'flex'}}>
                    <img src={this.state.product.imageArr[0]} className="product-img" />
                    <div>
                      <div>{this.state.product.title}</div>
                      <div>{this.state.product.description}</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12" style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
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
                <div className="col-lg-2 col-12" style={{alignSelf:'flex-end'}}>
                <div>
                      <span>مشاهده صفحه محصول در باماچوب</span>
                    </div>
                </div>
              </card>
 
              
              }
              <card className="row b-card2 p-4 mt-5">
              <div className="col-12" style={{display:'flex'}}>
                <span>
                <InputSwitch checked={this.state.estelam} onChange={(e) => this.setState({
                  estelam:e.value
                })} />

                </span>
                <span>
                  <span className="p-3">استعلام</span><span className="small-title">(اگر میخواهید استعلام های این کالا برای شما فعال شود، آن را فعال کنید)</span>
                </span>
              </div>
              {this.state.estelam &&
                <div className="row" >
                  <div className="col-12" style={{display:'flex'}}>
                  <BInput value={this.state.estelam_code} inValid={this.state.estelam_code_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="کد محصول فروشنده" absoluteLabel="کد محصول فروشنده" Val={(v) => {
                        this.setState({
                          estelam_code: v
                  })}} />
                  </div>
                  <div className="mt-5 mb-1">
                    <span>
                      کدام استعلام ها برای شما ارسال شود؟
                    </span>
                  </div>
                  <div className="col-12  mt-3" style={{display:'flex'}}>
                  {this.state.product && this.state.product.variationsObj && this.state.product.variationsObj.variations.map((v,i)=>{
                    return(
                      <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}>
                      <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[i]?.status} checked={this.state.EstelamRecords[i]?.status} onChange={(e) =>{
                        debugger;  
                      let EstelamRecords = this.state.EstelamRecords;
                      let insert = true;
                      for(let i=0;i<EstelamRecords.length;i++){
                        
                        if(EstelamRecords[i].name == v.name){
                          EstelamRecords[i].status=e.checked;
                          insert=false;
                        }
                      }
                      if(insert){
                        EstelamRecords.push({
                          name:v.name,
                          description:v.description,
                          code:'',
                          cache:{},
                          cheque1:{},
                          cheque2:{},
                          cheque3:{},  
                          status:e.checked
                      })
                      }
                      
                      this.setState({
                        EstelamRecords:EstelamRecords
                      })
                    
                    
                      }}
                      style={{ marginBottom: 10 }}></Checkbox>
                      <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>{v.name}</label>
                      </div>
                    )
                    
                  })}
                  </div>
                  
                  <div className="col-12  mt-3">

                  {this.state.EstelamRecords.map((u,j)=>{
                    if(u.status){
                      return (
                        
                        <div className="row mb-3 p-3" style={{border:'1px solid',borderRadius:8}} >
                          <div className="col-12">
                            <div className="mt-3 mb-1">
                              <span >واحد : {u.name}</span>
                            </div>
                            <div className="mt-3 mb-1">
                              <span >نوع پرداخت</span>
                            </div>


                            </div>
                          <div className="col-lg-3 col-12" >
                          <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}>
                        <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cache.status} checked={this.state.EstelamRecords[j].cache.status} onChange={(e) =>{
                          let EstelamRecords_temp = this.state.EstelamRecords;
                          EstelamRecords_temp[j].cache.status = e.checked
                          this.setState({
                            EstelamRecords: EstelamRecords_temp
                          })}}
                        style={{ marginBottom: 10 }}></Checkbox>
                        <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>نقدی</label>
                        </div>
                          </div>
                          <div className="col-lg-3 col-12" >
                          <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}>
                          <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque1.status} checked={this.state.EstelamRecords[j].cheque1.status} onChange={(e) =>{
                          let EstelamRecords_temp = this.state.EstelamRecords;
                          EstelamRecords_temp[j].cheque1.status = e.checked
                          this.setState({
                            EstelamRecords: EstelamRecords_temp
                          })}}
                        style={{ marginBottom: 10 }}></Checkbox>
                        <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - یک ماهه</label>
                        </div>
                          </div>
                          <div className="col-lg-3 col-12" >
                          <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}>
                          <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque2.status} checked={this.state.EstelamRecords[j].cheque2.status} onChange={(e) =>{
                          let EstelamRecords_temp = this.state.EstelamRecords;
                          EstelamRecords_temp[j].cheque2.status = e.checked
                          this.setState({
                            EstelamRecords: EstelamRecords_temp
                          })}}
                        style={{ marginBottom: 10 }}></Checkbox>
                        <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - دو ماهه</label>
                        </div>
                          </div>
                        <div className="col-lg-3 col-12" >
                        <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}>
                        <Checkbox inputId="IsTitle" value={this.state.EstelamRecords[j].cheque3.status} checked={this.state.EstelamRecords[j].cheque3.status} onChange={(e) =>{
                          let EstelamRecords_temp = this.state.EstelamRecords;
                          EstelamRecords_temp[j].cheque3.status = e.checked
                          this.setState({
                            EstelamRecords: EstelamRecords_temp
                          })}}
                        style={{ marginBottom: 10 }}></Checkbox>
                        <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - سه ماهه</label>
                        </div>
                        </div>
                        </div>
                      
                        )
                    }
                    
                  })}
                </div>

                  
                <div className="row mt-4" style={{justifyContent:'end'}} >
              <div className="col-lg-3 col-12" >
                  <button onClick={() =>{
                    this.addEstelam();
                  }} className="btn btn-primary" style={{ width: '100%' }} >اعمال تغییرات</button>
              </div>
              </div>
                </div>
                

              }
              </card>

              <div className="p-3 mt-3 ">قیمت گذاری</div>

              <card className="row b-card2 p-4 ">
              <div>انتخاب واحد</div>

              <div className="col-12" style={{display:'flex'}}>
              {this.state.product && this.state.product.variationsObj && this.state.product.variationsObj.variations.map((v,i)=>{
                return(
                  <div style={{background:'#fff',border:1,borderRadius:8,minWidth:150,padding:10,marginLeft:20,display:'flex',justifyContent:'space-between'}}
                      onClick={(event)=>{
                        let VariationPrices = this.state.VariationPrices||[];
                        VariationPrices.push({
                          name:v.name,
                          description:v.description,
                          number:'',
                          maxNumber:'',
                          code:'',
                          cache:{},
                          cheque1:{},
                          cheque2:{},
                          cheque3:{},
                          status:true
                        })
                        this.setState({
                          VariationPrices:VariationPrices
                        })
                        console.log(VariationPrices);

                      }}>
                    <span>
                    {v.name}
                      </span>
                      <Add style={{border:'2px solid'}} />

                  </div>
                )
              })
              }
              </div>
              </card>
              {this.state.VariationPrices && this.state.VariationPrices.map((v,i)=>{
                const numLabel = `تعداد (${v.name})`;
                return(
                  <card className="row b-card2 p-4 mt-3 ">
                  <Close />  
                  <span>واحد : {v.name}</span>

                  <div className="row" style={{alignItems:'end'}} >
                    <div className="col-lg-3 col-12">
                    <BInput value={this.state.VariationPrices[i].number} inValid={this.state.VariationPrices[i].number_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label={numLabel} absoluteLabel="تعداد" Val={(v) => {
                      let VariationPrices_temp = this.state.VariationPrices;
                      debugger;
                      VariationPrices_temp[i].number = v
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}} />
                    </div>
                    <div className="col-lg-3 col-12">
                    <BInput value={this.state.VariationPrices[i].maxNumber} inValid={this.state.VariationPrices[i].maxNumber_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="حداکثر تعداد در سبد خرید" absoluteLabel="حداکثر تعداد در سبد خرید" Val={(v) => {
                      let VariationPrices_temp = this.state.VariationPrices;
                      debugger;
                      VariationPrices_temp[i].maxNumber = v
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}} />
                    </div>
                    <div className="col-lg-3 col-12">
                    <BInput value={this.state.VariationPrices[i].code} inValid={this.state.VariationPrices[i].code_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="کد محصول فروشنده" absoluteLabel="کد محصول فروشنده" Val={(v) => {
                      let VariationPrices_temp = this.state.VariationPrices;
                      debugger;
                      VariationPrices_temp[i].code = v
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}} />
                    </div>
                    <div className="col-lg-3 col-12">
                    <SelectButton value={this.state.VariationPrices[i].status} options={switchBtn} onChange={(e) =>{
                      let VariationPrices_temp = this.state.VariationPrices;
                      VariationPrices_temp[i].status = e.value == true ?true : false
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}
                    }></SelectButton>

                    </div>
                  </div>
                  <span className="mt-3 mb-3">نوع پرداخت</span>
                  <div className="row">
                  <div className="col-lg-3 col-12">
                  <div style={{display:'flex',alignItems:'flex-start'}}>
                  <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cache.status} checked={this.state.VariationPrices[i].cache.status} onChange={(e) =>{
                      let VariationPrices_temp = this.state.VariationPrices;
                      VariationPrices_temp[i].cache.status = e.checked
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}}
                   style={{ marginBottom: 10 }}></Checkbox>
                  <label htmlFor="IsTitle" className="p-checkbox-label title" style={{marginRight:10}} >نقدی</label>
                  </div>
                  {this.state.VariationPrices[i].cache.status &&
                    <div style={{position:'relative'}}>
                    <BInput value={this.state.VariationPrices[i].cache.value} inValid={this.state.VariationPrices[i].cache.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش" absoluteLabel="قیمت فروش" Val={(v) => {
                        let VariationPrices_temp = this.state.VariationPrices;
                        VariationPrices_temp[i].cache.value = v
                        this.setState({
                          VariationPrices: VariationPrices_temp
                        })}} />
                    <label style={{position:'absolute',top:'50%',left:10}}>تومان</label>    
                    </div>
                    }
                  
                    </div>
                    <div className="col-lg-3 col-12">
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                  <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque1.status} checked={this.state.VariationPrices[i].cheque1.status} onChange={(e) =>{
                      let VariationPrices_temp = this.state.VariationPrices;
                      VariationPrices_temp[i].cheque1.status = e.checked
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}}
                   style={{ marginBottom: 10 }}></Checkbox>
                  <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - یک ماهه</label>
                  </div>
                  {this.state.VariationPrices[i].cheque1.status &&
                    <div style={{position:'relative'}}>
                    <BInput value={this.state.VariationPrices[i].cheque1.value} inValid={this.state.VariationPrices[i].cheque1.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش" absoluteLabel="قیمت فروش" Val={(v) => {
                        let VariationPrices_temp = this.state.VariationPrices;
                        VariationPrices_temp[i].cheque1.value = v
                        this.setState({
                          VariationPrices: VariationPrices_temp
                        })}} />
                    <label style={{position:'absolute',top:'50%',left:10}}>تومان</label>    

                    </div>
                    }
                    </div>
                    <div className="col-lg-3 col-12">
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                  <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque2.status} checked={this.state.VariationPrices[i].cheque2.status} onChange={(e) =>{
                      let VariationPrices_temp = this.state.VariationPrices;
                      VariationPrices_temp[i].cheque2.status = e.checked
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}}
                   style={{ marginBottom: 10 }}></Checkbox>
                  <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - دو ماهه</label>
                  </div>
                  {this.state.VariationPrices[i].cheque2.status &&
                    <div style={{position:'relative'}}>
                    <BInput value={this.state.VariationPrices[i].cheque2.value} inValid={this.state.VariationPrices[i].cheque2.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش" absoluteLabel="قیمت فروش" Val={(v) => {
                        let VariationPrices_temp = this.state.VariationPrices;
                        VariationPrices_temp[i].cheque2.value = v
                        this.setState({
                          VariationPrices: VariationPrices_temp
                        })}} />
                    <label style={{position:'absolute',top:'50%',left:10}}>تومان</label>    

                    </div>
                    }
                    </div>
                    <div className="col-lg-3 col-12">
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                  <Checkbox inputId="IsTitle" value={this.state.VariationPrices[i].cheque3.status} checked={this.state.VariationPrices[i].cheque3.status} onChange={(e) =>{
                      let VariationPrices_temp = this.state.VariationPrices;
                      VariationPrices_temp[i].cheque3.status = e.checked
                      this.setState({
                        VariationPrices: VariationPrices_temp
                      })}}
                   style={{ marginBottom: 10 }}></Checkbox>
                  <label htmlFor="IsTitle" className="p-checkbox-label title"  style={{marginRight:10}}>چکی - سه ماهه</label>
                  </div>
                  {this.state.VariationPrices[i].cheque3.status &&
                    <div style={{position:'relative'}}>
                    <BInput value={this.state.VariationPrices[i].cheque3.value} inValid={this.state.VariationPrices[i].cheque3.value_inValid} ContainerClass="row mt-3 justify-content-center" className="col-lg-12 col-12" label="قیمت فروش" absoluteLabel="قیمت فروش" Val={(v) => {
                        let VariationPrices_temp = this.state.VariationPrices;
                        VariationPrices_temp[i].cheque3.value = v
                        this.setState({
                          VariationPrices: VariationPrices_temp
                        })}} />
                    <label style={{position:'absolute',top:'50%',left:10}}>تومان</label>    

                    </div>
                    }
                    </div>
                  </div>
                  </card>

                )
              })}
              <div className="row mt-4" style={{justifyContent:'end'}} >
              <div className="col-lg-3 col-12" >
                  <button onClick={() =>{
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
            <ProgressSpinner strokeWidth={5} style={{width: '50px', height: '50px'}}/>
          </div>
        </div>
        
        }
        
      </>
    )
  }
}



const mapStateToProps = (state) => {
  return{
      employKey:state.employKey,
      accessToken:state.accessToken
  }
}
export default connect(mapStateToProps)(AddPrice)