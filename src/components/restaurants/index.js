import React ,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';

import App from '../../App'
import RestaurantCard from './RestaurantCard'
import {getRestaurants} from '../../request/'
import Message from '../common/Message'
function Restaurants() {
    const  fetchRestaurant=async ()=>{


        await getRestaurants(location.id).then((data)=>{
         
          console.table(data.data.restaurants);
          setRestaurants(data.data.restaurants);
          
        })
         
      }
    const [location, setLocation] = useState(null)
  const [restaurants, setRestaurants] = useState(null)
    useEffect(() => {
        // alert()
        return () => {
         
            (location)&&fetchRestaurant()
         
        }
      }, [location])
    return (
        <div>
           <App data={(locDetail)=>{
            setLocation(locDetail)
           
            
           }}>
           
    <Grid item xs={12}  container
    direction="row"
    wrap
    justify="center"
   >
   {(restaurants)&&(<Message open={true} data={`${restaurants.length} Restaurants Found`}></Message>)}
         {(restaurants)?(
          restaurants.map((restaurant )=>(
            <RestaurantCard restaurant={restaurant.restaurant }/>
          ))
         ):(
          <h3>Loading setRestaurants</h3>
         )}
         </Grid>
           </App>
        </div>
    )
}

export default Restaurants
