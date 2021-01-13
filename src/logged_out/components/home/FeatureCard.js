import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "react-router-dom";

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

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <span className={classes.avatar} style={{padding:5}}>
            {props.price}
          </span>
        }
        title={props.start_city +" to "+ props.end_city}
      />
      <CardMedia
        className={classes.media}
        image={props.photo}
      />
      <CardContent>
          <div className={classes.demo}>
            <List dense={dense}>
                <ListItem><ListItemText primary={"Price: "+props.price +" MMK"}/></ListItem>
                <ListItem><ListItemText primary={"From: "+props.start_city}/></ListItem>
                <ListItem><ListItemText primary={"To: "+props.end_city}/></ListItem>
                <ListItem><ListItemText primary={"Airline: "+props.airline}/></ListItem>
                <ListItem><ListItemText primary={"Destination Time: "+props.destination_time}/></ListItem>
                <ListItem><ListItemText primary={"Arrival Time: "+props.arrival_time}/></ListItem>
                <ListItem><ListItemText primary={props.ticket_left+" Ticket Left "}/></ListItem>
            </List>
          </div>
      </CardContent>
      <CardActions disableSpacing>
        <Link
              to={'order/'+props.id+'/'+props.price+'/'+props.ticket_left}
              style={{textDecoration: "none !important"}}
            >
           <Button variant="outlined" color="primary">
            Order
          </Button>
        </Link>
       
      </CardActions>
      
    </Card>
  );
}