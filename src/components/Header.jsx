import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Header = () => {
  const { pets, selectedPet, storeselectedPet } = useContext(AppContext);

  const options = pets.map((pet, index) => {
    return (
      <option key={index} value={index}>
        {pet.name}
      </option>
    );
  });

  const handleSelectChange = (event) => {
    storeselectedPet(event.target.value);
  };

  return (
    <select value={selectedPet} onChange={handleSelectChange}>
      {options}
    </select>
  );
};

export default Header;
