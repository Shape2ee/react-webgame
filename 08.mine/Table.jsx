import React, { memo, useContext } from 'react';
import { TableContext } from './Mine';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(TableContext)
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr key={`tr${i}`} rowIndex={i} />)}
    </table>
  )
});

export default Table;