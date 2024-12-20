import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserEditModal from "./ModalEdit";
import { IUser } from "@/hooks/useFetchUsers";

interface IWorkerForm {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  country: string;
  photo?: File | null;
}

interface IAddWorkerProps {
  onAddWorker: (newWorker: IUser) => void;
}

const AddWorker = ({ onAddWorker }: IAddWorkerProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (newWorkerData: IWorkerForm) => {
    const newWorker:IUser  = {
      id: {
        name: Math.floor(Math.random() * 1000000).toString(), 
        value: Math.floor(Math.random() * 1000000).toString(), 
      },
      name: {
        title: '',
        first: newWorkerData.firstName,
        last: newWorkerData.lastName,
      },
      email: newWorkerData.email,
      location: {
        street: {
          number: 0,
          name: newWorkerData.street,
        },
        city: newWorkerData.city,
        state: newWorkerData.state,
        country: newWorkerData.country,
      },
      picture: {medium: 'https://randomuser.me/api/port'},
    }
    onAddWorker(newWorker);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography>Add New Worker</Typography>
        <AddIcon />
      </Button>
      <UserEditModal
        open={open}
        onClose={handleClose}
        userData={{
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          country: "",
        }}
        onSave={handleSave}
        existingUsers={[]}
        isNewWorker={true}
      />
    </>
  );
};

export default AddWorker;
