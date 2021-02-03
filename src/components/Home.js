import React,{useState,useEffect} from 'react'
import App from '../App'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Grid from '@material-ui/core/Grid';
import Geolocation from 'react-geolocation';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));



export default function Home() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null)
  
  const classes = useStyles();

  const setLocation=(lat,lng)=>{
    setLat(lat)
    setLng(lng)
    console.log(lat);
    console.log(lng);
    var url= "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=30.310743&longitude=77.988213&localityLanguage=en"
    
    axios.get(url)
      .then(res => {
        getLocationInfo(res.data.locality )
      })
  
  }

const getLocationInfo=(data)=>{
  var url= `https://developers.zomato.com/api/v2.1/cities?q=${data}&count=1`
    
  axios.get(url, {
    headers: {
        'Content-Type': 'application/json',
        'user-key': '0110bd60e6845c9aa66418529017dab6'
    },
 
})
    .then(res => {
    console.table(res.data)
    }).catch((err)=>{
      console.table(err)
    })
}

  return (
    <App>

    <Grid justify="center" container >
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Location"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Geolocation
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
      <div>
      <IconButton color="primary"  onClick={()=>{
        getCurrentPosition()
    }} className={classes.iconButton} aria-label="directions">
        <LocationSearchingIcon />
      </IconButton>
      <div>
     
      {error &&
        <div>
          {error.message}
        </div>}
      
     {!error&&setLocation(latitude,longitude)}
    </div>
    </div>
       }
    />
     
    </Paper>
    </Grid>
    </App>
  );
}

