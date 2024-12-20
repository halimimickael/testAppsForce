import React, { useState, useEffect } from "react";
import UserCard from "./CardProfile";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import { IUser } from "@/hooks/useFetchUsers";
import { ListContainer, NoContainerList } from "./WorkerList.styles";
import AddWorker from "./AddWorker";

interface IListOfCardProps {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const ListOfCard = ({ users, loading, error }: IListOfCardProps) => {
  const [myUsers, setUsers] = useState<IUser[]>(users);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  if (loading) {
    return (
      <NoContainerList>
        <CircularProgress />
      </NoContainerList>
    );
  }

  if (error) {
    return (
      <NoContainerList>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </NoContainerList>
    );
  }

  if (myUsers.length === 0) {
    return (
      <NoContainerList>
        <Typography variant="h6">No users found.</Typography>
      </NoContainerList>
    );
  }
  const handleAddWorker = (newWorker: IUser) => {
    setUsers((prevUsers) => [...prevUsers, newWorker]);
  };

  return (
    <Box>
      <AddWorker onAddWorker={handleAddWorker} />
      <ListContainer>
        <Grid container spacing={2}>
          {myUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <UserCard user={user} users={myUsers} setUsers={setUsers} />
            </Grid>
          ))}
        </Grid>
      </ListContainer>
    </Box>
  );
};

export default ListOfCard;
