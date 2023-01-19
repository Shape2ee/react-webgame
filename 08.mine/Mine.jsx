import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 open
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
})

const initialState = {
  tableData: [],
  timer: 0,
  halted: true,
  result: '',
}

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  // 지뢰 생성
  const candidate = Array(row * cell).fill().map((arr, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  console.log('shuffle', shuffle)
  // 지뢰찾기 칸 만들기
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE
  }

  console.log(data)
  return data;
}

const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME: {
      return {
        ...state,
        halted: false,
        tableData: plantMine(action.row, action.cell, action.mine),
      }
    }
    case OPEN_CELL: {
      const tableDate = [...state.tableData];
      tableDate[action.row] = [...state.tableData[action.row]];
      tableDate[action.row][action.cell] = CODE.OPENED;
      console.log(tableDate)
      return {
        ...state,
        tableDate,
      }
    }
    case CLICK_MINE: {
      const tableDate = [...state.tableData];
      tableDate[action.row] = [...state.tableData[action.row]];
      tableDate[action.row][action.cell] = CODE.CLICKED_MINE;
      console.log(tableDate)
      return {
        ...state,
        tableDate,
        halted: true,
      }
    }
    default :
      return state
  }
}

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;
  const value = useMemo(() => ({ tableData: tableData, halted, dispatch, }), [tableData, halted])
  console.log(value);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  )
};

export default Mine;