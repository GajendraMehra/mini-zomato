import React ,{useState,useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Message({
    open,
    data
}) {
const [openstatus, setOpenstatus] = useState(true)
useEffect(() => {

  return () => {

    setOpenstatus(open)
  }
},[open])
const handleClose = ((event, reason) => {
 
  if (reason === 'clickaway') {
    return;
  }
  if(!reason||reason=="timeout"){

    setOpenstatus(false);
  }
  });
    return (
        <Snackbar open={openstatus}  anchorOrigin={{ vertical :'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
      {data}
        </Alert>
      </Snackbar>
    )
}

export default Message
