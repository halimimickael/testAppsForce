"use client";
import React, { useState, useEffect } from "react";
import ListOfCard from "./components/WorkerList/ListOfCards";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Home() {
  const { users, loading, error } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (searchTerm) {
      const results = users.filter((user) =>
        user.id?.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name.first && user.name.last &&
          (user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.name.last.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        user.location?.country.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ListOfCard users={filteredUsers} loading={loading} error={error} />
    </div>
  );
}
