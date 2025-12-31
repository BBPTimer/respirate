import { FormControl, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const PetSelector = () => {
  const { pets, selectedPet, storeselectedPet } = useContext(AppContext);

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

  return (
    <FormControl variant="standard" size="small">
      <Select value={selectedPet} onChange={handleSelectChange}>
        {options}
      </Select>
    </FormControl>
  );
};

export default PetSelector;
