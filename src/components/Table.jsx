import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Table = () => {
  const { rates } = useContext(AppContext);

  const rateList = rates.map((rate) => {
    return (
      <tr key={rate.timestamp.toString()}>
        <td>{rate.rate}</td>
        <td>{rate.timestamp.toDateString() + " " + rate.timestamp.toTimeString().substring(0, 8)}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Rate</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>{rates.length ? rateList : <td colSpan={2}>No data</td>}</tbody>
    </table>
  );
};

export default Table;
