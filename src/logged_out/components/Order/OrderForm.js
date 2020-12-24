import React,{ useRef,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
  useParams,
} from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function OrderForm(props) {
  const { openLoginDialog} = props;

  const classes = useStyles();
  const { id,price } = useParams();

  const ticketid_Ref=useRef(null);
  const unitprice_Ref=useRef(null);
  const totalprice_Ref=useRef(null);
  const qty_Ref=useRef(null);
  
  let [ qty, setQty ] = React.useState(1);

  var unit_price=price;


  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin==null){
      openLoginDialog();
      // openLoginDialog;
      // openLoginDialog();
    }
    console.log('isLogin',isLogin);
  }, []);





  // console.log('ticketid',ticket_id);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order 
        </Typography>
        <form className={classes.form} noValidate>
         
          <TextField
            inputRef={ticketid_Ref}
            disabled
            value={id}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ticket_id"
            label="Ticket ID"
            name="ticket_id"
            autoComplete="ticket_Id"
          />
        {/* <input type="text" ref={ticketid_Ref} /><br /> */}
         

         <TextField 
            inputRef={unitprice_Ref}
            disabled
            value={price}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="unit_price"
            label="Unit Price"
            name="unit_price"
            autoComplete="unit_price"
          />

        <TextField
            inputRef={totalprice_Ref}
            disabled
            value={qty*unit_price}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="total_price"
            label="Total Price"
            name="total_price"
            autoComplete="total_price"
          />

        <TextField
            inputRef={qty_Ref}
            type="number"
            min="1"
            value={qty}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="qty"
            label="Qty"
            name="qty"
            autoComplete="qty"
            onChange={setTotalPrice}
          />
         
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
           Order
          </Button>
          
        </form>
      </div>
     
    </Container>
  );

  function setTotalPrice(){
    let inputQty=qty_Ref.current.value;
    setQty(inputQty);
    console.log('qty:',qty);
  }


  function submit(){

    let ticket_id=ticketid_Ref.current.value;
    let unit_price=unitprice_Ref.current.value;
    let total_price=totalprice_Ref.current.value;
    let qty=qty_Ref.current.value;
    if(qty<1){
      alert('Please Fill Qty');
    }
    else{
      const usertoken = localStorage.getItem('usertoken');
      //console.log(`data---->>>>${ticket_id}+${unit_price}+${total_price}+${qty}`)
      fetch('http://127.0.0.1:8000/api/order', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'authorization':usertoken
          },
          body: JSON.stringify({ 
            ticket_id: ticket_id,
            unit_price:unit_price,
            total_price:total_price,
            qty:qty
          })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.status='success'){
          alert("Order Success");
        }
      })
      .catch(err=>console.error(err));


    }
    
  }
}