import React, { useContext, useCallback, memo } from 'react';
import {
  TableContext,
  CODE,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL
} from './Mine';

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
      return code || ''
  }
}

const Td = memo(({ rowIndex, cellIndex }) => {
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
      default: 
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);  
  
  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if(halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION_MINE: 
      case CODE.QUESTION: 
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default: 
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  return (
    <RealTd onClickedTd={onClickedTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />
  )
});

const RealTd = memo(({ onClickedTd, onRightClickTd, data }) => {
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickedTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(data)}
    </td>  
  )
});

export default Td;