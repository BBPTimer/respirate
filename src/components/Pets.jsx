import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Pets = () => {
  const { pets, setPets, selectedPet } = useContext(AppContext);

  const handleChange = (event, key) => {
    let updatedPets = [...pets];
    updatedPets[selectedPet][key] = event.target.value;
    setPets(updatedPets);
  };

  return (
    <>
      <h3>Pets</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Target Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <input
              value={pets[selectedPet].name}
              onChange={(event) => handleChange(event, "name")}
            />
            <td>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                max="999"
                value={pets[selectedPet].targetRate}
                onChange={(event) => handleChange(event, "targetRate")}
              />{" "}
              breaths/minute
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Pets;
