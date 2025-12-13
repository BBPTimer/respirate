import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const BackUpButton = () => {
  const { pets } = useContext(AppContext);

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
          variant="outlined"
          onClick={() => localStorage.setItem("lastBackup", new Date())}
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
