import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import apiClient from "../../ApiClient";
import banner from "../../assets/lfggames.png";

const useStyle = makeStyles((theme) => ({
  noGroupContainer: {
    minHeight: "100vh",
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.main,
  },
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 140,
  },
  cardContent: {
    minHeight: "150px",
    maxHeight: "150px",
    overflow: "hidden",
  },
  subtitle1: {
    fontSize: "1em",
  },
  footerMargin: {
    margin: "2em 0em",
  },
}));

const MyGroups = () => {
  const classes = useStyle();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    apiClient.get("/user/groups").then((response) => setGroups(response.data));
  }, []);

  return (
    <>
      {groups && groups.length === 0 ? (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.noGroupContainer}
        >
          <Typography variant="body1">
            looks like you don't have any groups yet :( <br />
            <Link to="/creategroup" className={classes.link}>
              create a private one now
            </Link>{" "}
            or{" "}
            <Link to="/findgroups" className={classes.link}>
              use lfg
            </Link>
          </Typography>
        </Grid>
      ) : (
        <Container maxWidth={"lg"}>
          <Grid container justify="center" alignItems="center">
            <Typography variant="h2" gutterBottom>
              my groups
            </Typography>
            <Grid container justify="center" alignItems="center" spacing={2}>
              {groups.map((group) => (
                <Grid item key={group.groupName}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        image={banner}
                        title={group.groupName}
                        className={classes.media}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h3">
                          {group.groupName}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          color="primary"
                          className={classes.subtitle1}
                        >
                          {group.memberIds.length}{" "}
                          {group.memberIds.length === 1 ? "member" : "members"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {group.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        invite more players
                      </Button>
                      <Button size="small" color="primary">
                        view group
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="body1"
              align="center"
              className={classes.footerMargin}
            >
              looking for a new adventure? <br />
              <Link to="/creategroup" className={classes.link}>
                create a new private group
              </Link>{" "}
              or{" "}
              <Link to="/lfg" className={classes.link}>
                use lfg
              </Link>
            </Typography>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MyGroups;
