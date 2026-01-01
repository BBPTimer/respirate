import { AreaChart, Info, Pets, TableChart, Timer } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Map paths to indices for the BottomNavigation value
  const pathToIndex = {
    "/": 0,
    "/data": 1,
    "/graphs": 2,
    "/pets": 3,
    "/about": 4,
  };

  // Get current value based on pathname
  const value = pathToIndex[location.pathname] || 0;

  // Handler for navigation changes
  const handleChange = (event, newValue) => {
    // Map indices back to paths
    const paths = ["/", "/data", "/graphs", "/pets", "/about"];
    navigate(paths[newValue]);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Timer" icon={<Timer />} />
        <BottomNavigationAction label="Data" icon={<TableChart />} />
        <BottomNavigationAction label="Graphs" icon={<AreaChart />} />
        <BottomNavigationAction label="Pets" icon={<Pets />} />
        <BottomNavigationAction label="About" icon={<Info />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Nav;
