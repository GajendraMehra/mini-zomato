import axios from 'axios';


export const trendingMeal = (id) => {
    var url = `https://developers.zomato.com/api/v2.1/collections?city_id=${id}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "user-key": "0110bd60e6845c9aa66418529017dab6",
        },
      })
      .then((res) => {
       
        return res;
        
      })
      .catch((err) => {
        console.table(err);
      });
  };