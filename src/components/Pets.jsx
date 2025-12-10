import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Pets = () => {
  const { pets, setPets, selectedPet } = useContext(AppContext);

  const handleTargetRateChange = (event) => {
    let updatedPets = [...pets];
    updatedPets[selectedPet].targetRate = event.target.value;
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
            <td>{pets[selectedPet].name}</td>
            <td>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                max="999"
                value={pets[selectedPet].targetRate}
                onChange={handleTargetRateChange}
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
