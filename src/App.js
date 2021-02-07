import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Geolocation from "react-geolocation";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import axios from "axios";
import Grid from '@material-ui/core/Grid';

import { Link } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    // position: 'relative',
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "row-reverse",
    textAlign: "right",
    flexGrow: 3,
    marginLeft: 120,
    width: "70%",
    // right:'0',
    // border:"1px solid red",
  },
}));

// Location search

// end location search

export default function App({ data, children }) {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locDetail, setLocDetail] = useState(null);

  useEffect(() => {
    var item =localStorage.getItem("locationDetails");
    if (item) {
        setLocDetail(JSON.parse(item));
    }
    console.log(item)
    

    if (lat && lng) {
      
      setLocation(lat, lng);
    }
  }, [lat, lng]);
  
  useEffect(() => {
    data&&data(locDetail)
    
  }, [locDetail]);
  const setLocation = (lat, lng) => {
    // alert()

    console.log(lat);
    console.log(lng);
    var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;

    axios
      .get(url)
      .then((res) => {
        getLocationInfo(res.data.locality);
      })
      .catch((err) => {
        console.table(err);
      });
    //     getLocationInfo(res.data.locality )
  };

  const getLocationInfo = (data) => {
    var url = `https://developers.zomato.com/api/v2.1/cities?q=${data}&count=1`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "user-key": "0110bd60e6845c9aa66418529017dab6",
        },
      })
      .then((res) => {
        console.log(res.data.location_suggestions[0]);
        localStorage.setItem("locationDetails", JSON.stringify(res.data.location_suggestions[0]));
        setLocDetail(res.data.location_suggestions[0]);
      })
      .catch((err) => {
        console.table(err);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const mainMenu = [
    {
      name: "Home",
      id: 1,
      routeLink: "/",
    },
    {
      name: "Restruants",
      id: 1,
      routeLink: "/restaurants",
    },
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini Zomato
          </Typography>
          <div className={classes.search}>
            <Avatar
              pt={3}
              alt="Remy Sharp"
              src={locDetail && locDetail.country_flag_url}
              className={classes.large}
            />
            <h2 style={{ marginRight: "20px" }}>
              {" "}
              {locDetail && locDetail.name}
            </h2>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {mainMenu.map((menu, index) => (
            <Link to={menu.routeLink}>
              <ListItem button key={menu.id}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {locDetail ? (
        [children]
        ) : (
          <Grid justify="center" container >
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Location"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />

            <Geolocation
              lazy
              render={({
                fetchingPosition = false,
                position: { coords: { latitude, longitude } = {} } = {},
                error,
                getCurrentPosition,
              }) => (
                <div>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      getCurrentPosition();
                    }}
                    className={classes.iconButton}
                    aria-label="directions"
                  >
                    <LocationSearchingIcon />
                  </IconButton>
                  <div>
                    {error && <div>{error.message}</div>}
                    {setLat(latitude)}
                    {setLng(longitude)}
                 
                  </div>
                </div>
              )}
            />
          </Paper>
          </Grid>
        )}
      </main>
    </div>
  );
}
