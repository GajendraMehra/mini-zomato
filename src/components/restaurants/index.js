import React ,{useState,useEffect} from 'react'
import App from '../../App'
import {getRestaurants} from '../../request/'

function Restaurants() {
    const  fetchRestaurant=async ()=>{
console.log(location);

        await getRestaurants(location.id).then((data)=>{
         
          console.log(data.data.collections);
          
        })
         
      }
    const [location, setLocation] = useState(null)
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
            
           }}></App>
        </div>
    )
}

export default Restaurants
