import React ,{useState,useEffect} from 'react'
import App from '../../App'
import RestaurantCard from './RestaurantCard'
import {getRestaurants} from '../../request/'

function Restaurants() {
    const  fetchRestaurant=async ()=>{
console.log(location);

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
            
             console.log(locDetail);
            
           }}>
         {(restaurants)?(
          restaurants.map((restaurant )=>(
            <RestaurantCard restaurant={restaurant.restaurant }/>
          ))
         ):(
          <h3>Loading setRestaurants</h3>
         )}
           </App>
        </div>
    )
}

export default Restaurants
