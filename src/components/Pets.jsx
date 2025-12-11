import { useContext, useState } from "react";
import Pet from "../classes/Pet";
import { AppContext } from "../contexts/AppContext";

const Pets = () => {
  const { pets, setPets } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const handleSave = (event, index) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets[index].name = event.target.name.value;
    updatedPets[index].targetRate = event.target.targetRate.value;
    setPets(updatedPets);
  };

  const handleDelete = (event, index) => {
    // TODO: Finish logic
    confirm(
      "This will delete all history for " + pets[index].name + ". Proceed?"
    );
  };

  const handleAdd = (event) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets.push(
      new Pet(event.target.name.value, event.target.targetRate.value)
    );
    setPets(updatedPets);

    // Clear form
    event.target.reset();

    alert("Pet saved.");
  };

  const rows = pets.map((pet, index) => {
    return (
      <div key={index} className="white-bg">
        <form onSubmit={(event) => handleSave(event, index)}>
          <label htmlFor="name">Name: </label>
          <input id="name" name="name" defaultValue={pet.name} required />
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
            defaultValue={pet.targetRate}
            required
          />{" "}
          breaths/minute
          <br />
          <br />
          <button>Save</button>
        </form>
        <button onClick={(event) => handleDelete(event, index)}>Delete</button>
      </div>
    );
  });

  return (
    <>
      <h3>Pets</h3>
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
