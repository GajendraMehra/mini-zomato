import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import Modal from "@material-ui/core/Modal";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RestaurantCard({
  restaurant
}) {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [currentrestaurant, setCurrentrestaurant] = useState(null)

  const handleClickOpen = (res) => {
    setCurrentrestaurant(res)
    console.log(currentrestaurant);
    
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  return (
    <>
    <Card className={classes.root} style={{
      'margin':"10px",
      "width":"33%"
    }}>
      <CardHeader
       
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={restaurant.name}
        subheader={`Rating : `+restaurant.user_rating.aggregate_rating}
      />
      <CardMedia
        className={classes.media}
        image={restaurant.thumb}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {restaurant.description}
        </Typography>
      </CardContent>
      <CardActions >
      <Grid container justify="flex-start">
      <Button onClick={()=>{
     
        handleClickOpen(restaurant)
      }} variant="outlined"  size="small" color="primary">
      View Detail
     </Button>
      </Grid>
     
        
        <Grid container justify="flex-end">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Grid>
       
        
      </CardActions>
      
      
    </Card>
 

    <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}
    aria-labelledby="max-width-dialog-title"
  >
    <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
    <DialogContent>
      <DialogContentText>
      {currentrestaurant&&currentrestaurant.name}
      </DialogContentText>
     
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
    </>
  );
}
