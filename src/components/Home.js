import React,{useState,useEffect} from 'react'
import App from '../App'
import { makeStyles } from '@material-ui/core/styles';


import axios from 'axios';



export default function Home() {


  return (
    <App data={(locDetail)=>{
      console.log(locDetail);
     
    }}>

    <h2>dfds</h2>
    </App>
  );
}

