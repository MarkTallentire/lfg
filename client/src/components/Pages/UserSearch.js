import React, { useEffect } from "react";
import apiClient from "../../ApiClient";

const UserSearch = () => {
  useEffect(() => {
    apiClient.post("/user/friends", {
      friendId: "e512999a-07b9-46a1-80d6-df45819bb24b",
    });
  });

  return <div></div>;
};

export default UserSearch;
