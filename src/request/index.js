import axios from 'axios';


export const trendingMeal =async (id) => {
    var url = `https://developers.zomato.com/api/v2.1/collections?city_id=${id}`;

   return  await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "user-key": "0110bd60e6845c9aa66418529017dab6",
        },
      })
  
      
      
      
  };


  export const getRestaurants =async (id) => {
    var url = `https://developers.zomato.com/api/v2.1/search?entity_id=35&entity_type=city`;

   return  await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "user-key": "0110bd60e6845c9aa66418529017dab6",
        },
      })
  
      
      
      
  };