import { AddCircle, Delete } from "@mui/icons-material";
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
import AutohideSnackbar from "./ui/AutohideSnackBar";
import ConfirmDialog from "./ui/ConfirmDialog";
import SaveButton from "./ui/SaveButton";

const Pets = () => {
  const {
    pets,
    storePets,
    selectedPet,
    storeselectedPet,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setIsConfirmOpen,
    setConfirmMessage,
    setConfirmCallback,
    cleanUpConfirm,
    inputLabelStyle,
  } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const nameTextField = (key, defaultValue) => {
    return (
      <>
        <InputLabel htmlFor="name" sx={inputLabelStyle} required>
          Name
        </InputLabel>
        <TextField
          key={key}
          id="name"
          name="name"
          defaultValue={defaultValue}
          size="small"
          required
        />
      </>
    );
  };

  const targetRateInput = (key, defaultValue) => {
    return (
      <>
        <InputLabel htmlFor="targetRate" sx={inputLabelStyle} required>
          Target Rate
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
              max: "99",
            },
          }}
          sx={{ width: "180px" }}
        />
      </>
    );
  };

  const sortByName = (array) => {
    array.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  const findIndexByName = (array, name) => {
    for (let [index, element] of array.entries()) {
      if (element.name === name) {
        return index;
      }
    }
    return 0;
  };

  const handleSave = (event, index) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets[index].name = event.target.name.value;
    updatedPets[index].targetRate = parseInt(event.target.targetRate.value);
    sortByName(updatedPets);
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
    // Store currently selected pet name
    const selectedPetName = pets[selectedPet].name;

    let updatedPets = [...pets];
    updatedPets.splice(index, 1);

    if (updatedPets.length === 0) {
      updatedPets.push(new Pet("My First Pet", 30));
    }

    storePets(updatedPets);
    storeselectedPet(findIndexByName(updatedPets, selectedPetName));

    cleanUpConfirm();
  };

  const handleAdd = (event) => {
    event.preventDefault();

    // Check if pet already exists
    for (let pet of pets) {
      if (event.target.name.value === pet.name) {
        setSnackbarMessage(event.target.name.value + " already exists.");
        setIsSnackbarOpen(true);
        return;
      }
    }

    let updatedPets = [...pets];
    updatedPets.push(
      new Pet(event.target.name.value, parseInt(event.target.targetRate.value))
    );
    sortByName(updatedPets);
    storePets(updatedPets);
    storeselectedPet(findIndexByName(updatedPets, event.target.name.value));

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
          <ButtonGroup size="small">
            <SaveButton />
            <Button
              onClick={() => handleDeleteClick(index)}
              variant="outlined"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </ButtonGroup>
          <ConfirmDialog />
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
          <SaveButton />
        </form>
      )}
    </>
  );
};

export default Pets;
