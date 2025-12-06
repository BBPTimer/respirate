const Table = ({ rates }) => {
  const rateList = rates.map((rate) => {
    return (
      <tr key={rate.timestamp.toString()}>
        <td>{rate.rate}</td>
        <td>{rate.timestamp.toString()}</td>
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
      <tbody>{rateList}</tbody>
    </table>
  );
};

export default Table;
