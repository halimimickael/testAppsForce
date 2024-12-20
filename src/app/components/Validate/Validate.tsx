import { useState } from 'react';

interface IValidateProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  existingUsers: { email: string }[];
  userData: { email: string };
}

const Validate = ({ formData, existingUsers, userData }: IValidateProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = 'This field is required';
      }
    }

    if (formData.firstName && formData.firstName.length < 3) {
      newErrors.firstName = 'The first name must have at least 3 characters';
    }
    if (formData.lastName && formData.lastName.length < 3) {
      newErrors.lastName = 'The last name must have at least 3 characters';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (formData.email && existingUsers.some(user => user.email === formData.email && user.email !== userData.email)) {
      newErrors.email = 'This email is already in use';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default Validate;
