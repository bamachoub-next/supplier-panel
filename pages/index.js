import React, { Component } from 'react';
import Link from 'next/link';
import fetch from 'node-fetch' ; 
import { Button } from 'primereact/button';
import Router from 'next/router'

class Home extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		}






	}
  componentDidMount() {
    Router.push('/admin/')
  }
  render() {
    return (
      <div >
        

        <main >
          <div className="p-grid" >
         
            
           
          </div>
        </main>

        
      </div>
    )
  }
}


export async function getStaticProps({query}){
  console.log(query);
  let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  let posts = await res.json();
  return {
    props :{
      posts
    }
  }

}
export default Home;