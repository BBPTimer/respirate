import { useContext } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Table = () => {
  const { targetRate, rates } = useContext(AppContext);

  const rateList = rates.map((rate) => {
    return (
      <tr
        key={rate.timestamp.toString()}
        style={{ color: rate.rate > targetRate ? "Coral" : "Green" }}
      >
        <td>{rate.rate}</td>
        <td>{formatDate(rate.timestamp)}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Breathing Rate</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {rates.length ? (
          rateList
        ) : (
          <tr>
            <td colSpan={2}>No data to display</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
