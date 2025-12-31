import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const BackUpButton = ({ variant }) => {
  const { pets, setIsBackUpDialogOpen } = useContext(AppContext);

  const handleClick = () => {
    localStorage.setItem("lastBackup", new Date());
    setIsBackUpDialogOpen(false);
  };

  return (
    <>
      <a
        href={URL.createObjectURL(
          new Blob([JSON.stringify(pets)], {
            type: "application/json",
          })
        )}
        download={"respirateBackup"}
      >
        <Button
          onClick={handleClick}
          variant={variant}
          disableElevation
          size="small"
          startIcon={<CloudDownload />}
        >
          Back Up Data
        </Button>
      </a>
    </>
  );
};

export default BackUpButton;
