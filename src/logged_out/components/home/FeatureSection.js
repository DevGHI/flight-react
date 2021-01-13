
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";
import SERVER_URL from "../../../shared/helper";

const iconSize = 30;


function FeatureSection(props) {
  const { width } = props;
  const [ flights, setFlights ] = useState([]);
  useEffect(() => {
      fetch(SERVER_URL+"api/tickets")
      .then(res => res.json())
      .then(json => {
          setFlights(json.data);
      });
  }, []);



  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
        Flight List
        </Typography>
        
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {/* <Grid
              item
              xs={12}
              md={12}>
               <div style={{ width: '100%' }}>
                  <Box display="flex" p={1} bgcolor="background.paper">
                    {"I'm a flexbox container!"}
                  </Box>
                </div>
            </Grid> */}
           
            {flights.map(element => (
              <Grid
                id={element.id}
                item
                xs={12}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                id={element.id}
                  photo="https://picsum.photos/200"
                  start_city={element.start_city}
                  end_city={element.end_city}
                  airline={element.airline.name}
                  destination_time={element.destination_time}
                  arrival_time={element.arrival_time}
                  price={element.price}
                  ticket_left={element.ticket_left}
                />
              </Grid>
            ))}

              

          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
