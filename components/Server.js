import React, { Component } from 'react';
import axios from 'axios'  

const serverUrl = 'http://127.0.0.1:3000/api/v1/'; 
class Server extends React.Component {   
   constructor(props){
     super(props);
     this.state={
        isLoading:false
     };   
   }
    get(url,params,SuccessCallBack,ErrorCallBack){
      
      axios.get(serverUrl+url+params)
      .then(response => {
        this.setState({
           isLoading:false
         })
         SuccessCallBack(response,this.setState.isLoading);
         
      })
      .catch(error => {
         this.setState({
           isLoading:false
         })
         ErrorCallBack(error,this.setState.isLoading);
         
      })
      


    
   }
   post(url,params,SuccessCallBack,ErrorCallBack){
       
      axios.post(serverUrl+url+'', params, {headers: {
         'Content-Type': 'application/json',
     }})
      .then(response => {
        this.setState({
           isLoading:false
         })
         SuccessCallBack(response,this.setState.isLoading);
         
      })
      .catch(error => {
         this.setState({
           isLoading:false
         })
         ErrorCallBack(error,this.setState.isLoading);
         
      })
      


    
   }
  
 
}
export default Server;