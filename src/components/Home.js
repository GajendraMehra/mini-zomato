import Grid from '@material-ui/core/Grid';
import React,{useState,useEffect} from 'react'
import App from '../App'
import { makeStyles } from '@material-ui/core/styles';
import {trendingMeal} from '../request/'

import TrendingCard from './home/TrendingCard'




export default function Home() {
  useEffect(() => {
 
    return () => {
      trendingMeal(35).then((data)=>{
        console.log(data);
        
      })
    }
  }, [])

  return (
    <App data={(locDetail)=>{
      console.log(locDetail);
     
    }}>
    <Grid item xs={12}  container
    direction="row"
    wrap
    justify="center"
    alignItems="center">
    <TrendingCard/>
    <TrendingCard/>
    <TrendingCard/>
    <TrendingCard/>
    <TrendingCard/>
    <TrendingCard/>
    </Grid>

  
    </App>
  );
}

