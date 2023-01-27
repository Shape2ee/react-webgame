import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE } from './Mine';

const getTdStyle = (code) => {
  switch(code) {
    case CODE.OPENED: 
      return {
        background: '#fff',
      }
    case CODE.NORMAL: 
    case CODE.MINE: 
      return { 
        background: '#444',
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      }      
    default:
      return {
        background: 'white',
      }
  }
}

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE: 
      return '💣'
    case CODE.CLICKED_MINE: 
      return '💥'
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '🚩'
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '❔'
    default: 
      return ''
  }
}

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);
  const onClickedTd = useCallback(() => {
    if(halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE: 
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
    }
    console.log(tableData[rowIndex][cellIndex])
  }, []);
  
  
  return (
    <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickedTd}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>  
  )
};

export default Td;