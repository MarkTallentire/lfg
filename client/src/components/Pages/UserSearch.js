import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiClient from "../../ApiClient";

const UserSearch = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiClient.get("/users").then((response) => setUsers(response.data));
  }, []);

  const toggleFriend = (id) => {
    apiClient.post("/user/friends", { friendId: id });
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h2" gutterBottom>
          Looking for More
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid
            key={user.id}
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {user.username}
            <Button onClick={() => toggleFriend(user.id)}>Add Friend</Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserSearch;
