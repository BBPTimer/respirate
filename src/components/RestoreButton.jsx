import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AutohideSnackbar from "./AutohideSnackBar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RestoreButton = () => {
  const { parseDataString, storePets, setIsSnackbarOpen, setSnackbarMessage } =
    useContext(AppContext);

  const rateSchema = {
    type: "object",
    properties: {
      rate: { type: "integer" },
      timestamp: { type: "string", format: "date-time" },
    },
    required: ["rate", "timestamp"],
    additionalProperties: false,
  };

  const petSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      targetRate: { type: "integer" },
      rateHistory: { type: "array", items: rateSchema },
    },
    required: ["name", "targetRate", "rateHistory"],
    additionalProperties: false,
  };

  const arraySchema = {
    type: "array",
    items: petSchema,
    minItems: 1,
  };

  // Set up JSON validator
  const ajv = new Ajv({ strict: false });
  addFormats(ajv);
  const validate = ajv.compile(arraySchema);

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Read file
    const reader = new FileReader();
    reader.onload = (event) => {
      // Validate JSON schema
      if (!validate(JSON.parse(event.target.result))) {
        setSnackbarMessage("ERROR: " + validate.errors[0].message);
        setIsSnackbarOpen(true);
        return;
      }

      // Store pets
      storePets(parseDataString(event.target.result));
    };

    reader.readAsText(file);
  };

  return (
    <>
      <AutohideSnackbar />
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        Restore Data
        <VisuallyHiddenInput
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
      </Button>
    </>
  );
};

export default RestoreButton;
