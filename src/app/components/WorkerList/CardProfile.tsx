import React, { useState, useCallback } from "react";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserEditModal from "./ModalEdit";
import { IUser } from "@/hooks/useFetchUsers";
import { ButtonPos, CardBox, UserDetails, UserName } from "./WorkerList.styles";

interface IUserProps {
  user: any;
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const UserCard: React.FC<IUserProps> = ({ user, users, setUsers }) => {
  const [userData, setUserData] = useState({
    firstName: user.name?.first|| '',
    lastName: user.name?.lastName || '',
    email: user.email || '',
    street: user.location?.street.name || '',
    city: user.location?.city || '',
    picture: user.photo || '',
    state: user.location?.state || '',
    country: user.location?.country || '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSaveChanges = useCallback((updatedUserData: typeof userData) => {
    setUserData(updatedUserData);
    const updatedUsers = users.map((u) =>
      u.id?.value === user.id?.value ? { ...u, ...updatedUserData } : u
    );
    setUsers(updatedUsers);
  }, [users, user.id?.value, setUsers]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name?.first} ${user.name?.last}?`)) {
      const updatedUsers = users.filter((u) => u.id?.value !== user.id?.value);
      setUsers(updatedUsers);
    }
  };

  return (
    <CardBox key={user.id?.value}>
      <ButtonPos>
        <Button onClick={handleOpenModal}>
          <EditIcon />
        </Button>
        <Button onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </ButtonPos>
      {user.picture && (
        <Image
          src={user.picture.medium}
          alt={`${user.name?.first} ${user.name?.last}`}
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
          priority
        />
      )}
      <UserName variant="h6">
        {`${userData.firstName} ${userData.lastName}`}
      </UserName>

      <Typography variant="body1">
        <strong>Email:</strong> 
        <a href={`mailto:${userData.email}`}>{userData.email}</a>
      </Typography>

      {userData.street && (
        <>
          <UserDetails variant="subtitle1"><strong>Address:</strong></UserDetails>
          <UserDetails variant="body2"><strong>Street:</strong> {userData.street}</UserDetails>
          <UserDetails variant="body2"><strong>City:</strong> {userData.city}</UserDetails>
          <UserDetails variant="body2"><strong>State:</strong> {userData.state}</UserDetails>
          <UserDetails variant="body2"><strong>Country:</strong> {userData.country}</UserDetails>
        </>
      )}

      {user.id?.value && (
        <Typography variant="body2">
          <strong>Id:</strong> {user.id.value}
        </Typography>
      )}

      <UserEditModal
        open={openModal}
        onClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveChanges}
        existingUsers={users}
      />
    </CardBox>
  );
};

export default UserCard;
