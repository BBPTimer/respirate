import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { Link } from "react-router";
import { AppContext } from "../contexts/AppContext";

const Header = () => {
  const { pets, selectedPet, setSelectedPet } = useContext(AppContext);

  // Menu logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = pets.map((pet, index) => {
    return (
      <option key={index} value={index}>
        {pet.name}
      </option>
    );
  });

  const handleSelectChange = (event) => {
    setSelectedPet(event.target.value);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <Link to="/">
          <MenuItem onClick={handleClose}>Timer</MenuItem>
        </Link>
        <Link to="/graph">
          <MenuItem onClick={handleClose}>Graph</MenuItem>
        </Link>
        <Link to="/data">
          <MenuItem onClick={handleClose}>Data</MenuItem>
        </Link>
        <Link to="/pets">
          <MenuItem onClick={handleClose}>Pets</MenuItem>
        </Link>
      </Menu>
      <br />
      <select value={selectedPet} onChange={handleSelectChange}>
        {options}
      </select>
    </>
  );
};

export default Header;
