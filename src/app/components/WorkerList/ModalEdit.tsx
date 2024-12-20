import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid } from '@mui/material';
import Validate from '../Validate/Validate';
import { ModalBox } from './WorkerList.styles';

interface IUserEditModalProps {
  open: boolean;
  onClose: () => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    country: string;
    photo?: File | null;
  };
  onSave: (data: any) => void;
  existingUsers: { email: string }[];
  isNewWorker?: boolean;
}

const UserEditModal = ({ open, onClose, userData, onSave, existingUsers, isNewWorker }: IUserEditModalProps) => {
  const [formData, setFormData] = useState(userData);
  const [photo, setPhoto] = useState<File | null>(userData.photo || null);
  const { errors, validate } = Validate({ formData, existingUsers, userData });

  useEffect(() => {
    if (isNewWorker) {
      const randomId = Math.floor(Math.random() * 1000000); 
      setFormData(prevState => ({
        ...prevState,
        id: randomId.toString(), 
      }));
    }
  }, [isNewWorker]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, photo });
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setPhoto(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Typography variant="h6" gutterBottom>
          {isNewWorker ? "New Worker Information" : "Edit User Information"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.street}
            helperText={errors.street}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
          </Grid>
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.country}
            helperText={errors.country}
          />

          {isNewWorker && (
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                Upload Photo
              </Typography>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleCancel} color="secondary" variant="outlined" sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default UserEditModal;
