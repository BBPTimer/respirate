import { AddCircle, Delete, Save } from "@mui/icons-material";
import {
    Button,
    ButtonGroup,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import Pet from "../classes/Pet";
import { AppContext } from "../contexts/AppContext";
import AlertDialog from "./AlertDialog";
import AutohideSnackbar from "./AutohideSnackBar";

const Pets = () => {
  const {
    pets,
    storePets,
    storeselectedPet,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setIsConfirmOpen,
    setConfirmMessage,
    setConfirmCallback,
    cleanUpConfirm,
  } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const nameTextField = (key, defaultValue) => {
    return (
      <TextField
        key={key}
        name="name"
        defaultValue={defaultValue}
        label="Name"
        size="small"
        required
      />
    );
  };

  const targetRateInput = (key, defaultValue) => {
    return (
      <>
        <InputLabel htmlFor="targetRate" sx={{ fontSize: 12 }}>
          Target rate *
        </InputLabel>
        <OutlinedInput
          key={key}
          name="targetRate"
          id="targetRate"
          defaultValue={defaultValue}
          endAdornment={
            <InputAdornment position="end">breaths/minute</InputAdornment>
          }
          type="number"
          required
          size="small"
          slotProps={{
            input: {
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: "1",
              max: "999",
            },
          }}
          sx={{ width: "180px" }}
        />
      </>
    );
  };

  const saveButton = () => {
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

  const handleSave = (event, index) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets[index].name = event.target.name.value;
    updatedPets[index].targetRate = event.target.targetRate.value;
    storePets(updatedPets);

    setSnackbarMessage("Pet saved.");
    setIsSnackbarOpen(true);
  };

  const handleDeleteClick = (index) => {
    setIsConfirmOpen(true);
    setConfirmMessage(
      "This will delete all history for " + pets[index].name + ". Proceed?"
    );
    setConfirmCallback(() => () => handleDelete(index));
  };

  const handleDelete = (index) => {
    let updatedPets = [...pets];
    updatedPets.splice(index, 1);

    if (updatedPets.length === 0) {
      updatedPets.push(new Pet("My First Pet", 30));
    }

    storePets(updatedPets);
    storeselectedPet(0);

    cleanUpConfirm();
  };

  const handleAdd = (event) => {
    event.preventDefault();

    // Check if pet already exists
    for (let pet of pets) {
      if (event.target.name.value === pet.name) {
        alert(event.target.name.value + " already exists.");
        return;
      }
    }

    let updatedPets = [...pets];
    updatedPets.push(
      new Pet(event.target.name.value, event.target.targetRate.value)
    );
    storePets(updatedPets);
    storeselectedPet(updatedPets.length - 1);

    // Close form
    setDisplayForm(false);
  };

  const rows = pets.map((pet, index) => {
    return (
      <div key={index} className="white-bg">
        <form onSubmit={(event) => handleSave(event, index)}>
          {nameTextField(pet.name, pet.name)}
          <br />
          <br />
          {targetRateInput(pet.name + "Rate", pet.targetRate)}
          <br />
          <br />
          <ButtonGroup>
            {saveButton()}
            <Button
              onClick={() => handleDeleteClick(index)}
              variant="outlined"
              size="small"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </ButtonGroup>
          <AlertDialog />
        </form>
      </div>
    );
  });

  return (
    <>
      <h1>Pets</h1>
      <AutohideSnackbar />
      {rows}
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={() => setDisplayForm(!displayForm)}
        startIcon={<AddCircle />}
      >
        Add Pet
      </Button>
      <br />
      {displayForm && (
        <form className="white-bg" onSubmit={handleAdd}>
          {nameTextField(null, null)}
          <br />
          <br />
          {targetRateInput(null, 30)}
          <br />
          <br />
          {saveButton()}
        </form>
      )}
    </>
  );
};

export default Pets;
