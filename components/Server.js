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
    get(url,params,SuccessCallBack,ErrorCallBack,Authorization){
      
      axios.get(serverUrl+url+params,{headers: {
         'Content-Type': 'application/json',
         ...Authorization
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
   post(url,params,SuccessCallBack,ErrorCallBack,Authorization){
       
      axios.post(serverUrl+url+'', params, {headers: {
         'Content-Type': 'application/json',
         ...Authorization
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
   delete(url,params,SuccessCallBack,ErrorCallBack,Authorization){
       
      axios.post(serverUrl+url+'', params, {headers: {
         'Content-Type': 'application/json',
         ...Authorization
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
   put(url,params,SuccessCallBack,ErrorCallBack,Authorization){
      axios.put(serverUrl+url+'', params, {headers: {
         'Content-Type': 'application/json',
         ...Authorization
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