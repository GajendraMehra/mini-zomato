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

