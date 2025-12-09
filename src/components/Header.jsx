import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      </Menu>
    </>
  );
};

export default Header;
