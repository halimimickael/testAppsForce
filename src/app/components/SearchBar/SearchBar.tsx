import React from "react";
import { Box, TextField } from "@mui/material";

interface ISearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch } : ISearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Box display={"flex"} width={"100%"} justifyContent={"center"} mb={2} mt={5}>
      <TextField
        placeholder="Search users..."
        variant="outlined"
        onChange={handleInputChange}
        sx={{ width: "50%" }}
      />
    </Box>
  );
};

export default SearchBar;
