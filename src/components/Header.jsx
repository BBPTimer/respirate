import { FormControl, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../contexts/AppContext";

const Header = () => {
  const { pets, selectedPet, storeselectedPet } = useContext(AppContext);

  let path = useLocation().pathname;

  const options = pets.map((pet, index) => {
    return (
      <MenuItem key={index} value={index}>
        {pet.name}
      </MenuItem>
    );
  });

  const handleSelectChange = (event) => {
    storeselectedPet(event.target.value);
  };

  if (path === "/about" || path === "/pets") {
    return;
  } else {
    return (
      <FormControl variant="standard" size="small">
        <Select value={selectedPet} onChange={handleSelectChange}>
          {options}
        </Select>
      </FormControl>
    );
  }
};

export default Header;
