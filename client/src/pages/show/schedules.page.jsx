import React, { useEffect } from "react";
import { setOption } from "../../features/navitem/navitemSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  delSchedule,
  getSchedules,
  loadUser,
} from "../../features/user/userSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Grid from "@mui/material/Grid";

const Schedules = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((store) => store.user.schedules);
  const isSLoading = useSelector((store) => store.user.isSLoading);
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    dispatch(getSchedules());
    if (!user) dispatch(loadUser());
    dispatch(setOption("My Schedules"));
  }, []);
  return (
    <>
      <h1>Schedules</h1>
      {!isSLoading &&
        schedules &&
        schedules.map((item) => (
          <Card
            key={item._id}
            variant='outlined'
            sx={{ minWidth: 275, margin: "10px 0px" }}
          >
            <Grid container>
              <Grid item xs={12} md={10}>
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}

                  <Typography variant='h6' component='div'>
                    {item.desc}
                  </Typography>
                  <Typography variant='body2'>
                    <b>Start : </b>
                    {moment(item.start).format("LLL")}
                    <br />
                    <b>End : </b>
                    {moment(item.end).format("LLL")}
                    <br />
                    <b>Duration : </b>
                    {item.duration / 60000} Mins
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={6} md={2}>
                {user && item.creator === user._id && (
                  <Button
                    sx={{ margin: "15px", backgroundColor: "red" }}
                    size='small'
                    variant='contained'
                    onClick={() => dispatch(delSchedule({ _id: item._id }))}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  );
};

export default Schedules;
