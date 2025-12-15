import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";

const SaveButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      disableElevation
      size="small"
      startIcon={<Save />}
    >
      Save
    </Button>
  );
};

export default SaveButton;
