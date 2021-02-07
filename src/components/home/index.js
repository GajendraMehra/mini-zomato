import Grid from '@material-ui/core/Grid';
import React,{useState,useEffect} from 'react'
import App from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import {trendingMeal} from '../../request/'
import Message from '../common/Message'
import TrendingCard from './TrendingCard'




export default function Home() {
  const [location, setLocation] = useState(null)
  const [collections, setCollections] = useState(null)
  const  fetchTrending=async ()=>{

    await trendingMeal(35).then((data)=>{
      setCollections((data.data.collections))
      console.log(data.data.collections);
      
    })
     
  }
  useEffect(() => {
    // alert()
    return () => {
     
       fetchTrending()
     
    }
  }, [location])


  return (
    
    <App data={(locDetail)=>{
     setLocation(locDetail)
     
      console.log(locDetail);
     
    }}>

    <Grid item xs={12}  container
    direction="row"
    wrap
    justify="center"
   >
  {(collections)&&(<Message open={true} data={`${collections.length} Trending Meals Found`}></Message>)}
   {(collections)?(
     
collections.map((collection)=>
  (

    <TrendingCard key={collection.collection.collection_id} collection={collection.collection}></TrendingCard>
  )
)
  ):(
   <h3>Loading Trending</h3>
   )}
  
  
   
    </Grid>

  
    </App>
  );
}

