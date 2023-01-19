import React, { useContext } from 'react';
import { TableContext } from './Mine';
import Td from './Td';

const Tr = () => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td key={`td${i}`} />)}
    </tr>
  )
};

export default Tr;