import { useState, useEffect } from "react";

export interface IUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  id: {
    name: string;
    value: string;
  };
}

interface FetchUsersResponse {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

export const useFetchUsers = (): FetchUsersResponse => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.results);
        setLoading(false);
      } catch (err: unknown) {
        setError((err as Error).message || "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
