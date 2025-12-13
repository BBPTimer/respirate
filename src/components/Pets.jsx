import { useContext, useState } from "react";
import Pet from "../classes/Pet";
import { AppContext } from "../contexts/AppContext";
import AutohideSnackbar from "./AutohideSnackBar";

const Pets = () => {
  const {
    pets,
    storePets,
    storeselectedPet,
    setIsSnackbarOpen,
    setSnackbarMessage,
  } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const handleSave = (event, index) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets[index].name = event.target.name.value;
    updatedPets[index].targetRate = event.target.targetRate.value;
    storePets(updatedPets);

    setSnackbarMessage("Pet saved.");
    setIsSnackbarOpen(true);
  };

  const handleDelete = (index) => {
    if (
      !confirm(
        "This will delete all history for " + pets[index].name + ". Proceed?"
      )
    ) {
      return;
    }

    let updatedPets = [...pets];
    updatedPets.splice(index, 1);

    if (updatedPets.length === 0) {
      updatedPets.push(new Pet("My First Pet", 30));
    }

    storePets(updatedPets);
    storeselectedPet(0);
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
          <label htmlFor="name">Name: </label>
          <input
            key={pet.name}
            id="name"
            name="name"
            defaultValue={pet.name}
            required
          />
          <br />
          <br />
          <label htmlFor="targetRate">Target rate: </label>
          <input
            key={pet.name + "Rate"}
            id="targetRate"
            name="targetRate"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="1"
            max="999"
            defaultValue={pet.targetRate}
            required
          />{" "}
          breaths/minute
          <br />
          <br />
          <button>Save</button>
        </form>
        <button onClick={() => handleDelete(index)}>Delete</button>
      </div>
    );
  });

  return (
    <>
      <h3>Pets</h3>
      <AutohideSnackbar />
      {rows}
      <button onClick={() => setDisplayForm(!displayForm)}>Add Pet</button>
      <br />
      {displayForm && (
        <form className="white-bg" onSubmit={handleAdd}>
          <label htmlFor="name">Name: </label>
          <input id="name" name="name" required />
          <br />
          <br />
          <label htmlFor="targetRate">Target rate: </label>
          <input
            id="targetRate"
            name="targetRate"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="1"
            max="999"
            required
          />{" "}
          breaths/minute
          <br />
          <br />
          <button>Add</button>
        </form>
      )}
    </>
  );
};

export default Pets;
