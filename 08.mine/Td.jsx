import React, { useContext } from 'react';
import { TableContext, CODE } from './Mine';

const Td = ({ rowIndex, cellIndex }) => {
  const getTdStyle = (code) => {
    switch(code) {
      case CODE.NORMAL: 
      case CODE.MINE: 
        return { 
          background: '#444' 
        }
      default:
        return {
          background: '#fff'
        }
    }
  }

  const getTdText = (code) => {
    switch (code) {
      case CODE.NORMAL:
        return ''
      case CODE.MINE: 
        return '★'
      default: 
        return ''
    }
  }

  const { tableData } = useContext(TableContext)
  return (
    <td style={getTdStyle(tableData[rowIndex][cellIndex])}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>  
  )
};

export default Td;