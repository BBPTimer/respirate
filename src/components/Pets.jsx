import { useContext } from "react";
import Pet from "../classes/Pet";
import { AppContext } from "../contexts/AppContext";

const Pets = () => {
  const { pets, setPets } = useContext(AppContext);

  const handleSave = (event, index) => {
    event.preventDefault();

    let updatedPets = [...pets];
    updatedPets[index].name = event.target.name.value;
    updatedPets[index].targetRate = event.target.targetRate.value;
    setPets(updatedPets);
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
  };

  const rows = pets.map((pet, index) => {
    return (
      <form key={index} onSubmit={(event) => handleSave(event, index)}>
        <input name="name" defaultValue={pet.name} required />{" "}
        <input
          name="targetRate"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="1"
          max="999"
          defaultValue={pet.targetRate}
          required
        />{" "}
        breaths/minute <button>Save</button>
        <br />
        <br />
      </form>
    );
  });

  return (
    <>
      <h3>Pets</h3>
      {rows}
      <h5>Add Pet</h5>
      <form onSubmit={handleAdd}>
        <input name="name" required />{" "}
        <input
          name="targetRate"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="1"
          max="999"
          required
        />{" "}
        breaths/minute <button>Add</button>
      </form>
    </>
  );
};

export default Pets;
