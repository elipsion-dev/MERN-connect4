import React from 'react';
import Slot from './Slot'



const Board = (props) => {

  const renderSlot = (i, row, column) => {
    return <Slot
      location={{i, row, column}}
      clickHandler={ () => { props.clickHandler(column) } }
      board = {props.board}
      columns = {props.columns}
    />;
  }

  return (
    <tbody>
      <tr>{renderSlot(0, 0, 0)}{renderSlot(1, 0, 1)}{renderSlot(2, 0, 2)}{renderSlot(3, 0, 3)}{renderSlot(4, 0, 4)}{renderSlot(5, 0, 5)}{renderSlot(6, 0, 6)}</tr>
      <tr>{renderSlot(7, 1, 0)}{renderSlot(8, 1, 1)}{renderSlot(9, 1, 2)}{renderSlot(10, 1, 3)}{renderSlot(11, 1, 4)}{renderSlot(12, 1, 5)}{renderSlot(13, 1, 6)}</tr>
      <tr>{renderSlot(14, 2, 0)}{renderSlot(15, 2, 1)}{renderSlot(16, 2, 2)}{renderSlot(17, 2, 3)}{renderSlot(18, 2, 4)}{renderSlot(19, 2, 5)}{renderSlot(20, 2, 6)}</tr>
      <tr>{renderSlot(21, 3, 0)}{renderSlot(22, 3, 1)}{renderSlot(23, 3, 2)}{renderSlot(24, 3, 3)}{renderSlot(25, 3, 4)}{renderSlot(26, 3, 5)}{renderSlot(27, 3, 6)}</tr>
      <tr>{renderSlot(28, 4, 0)}{renderSlot(29, 4, 1)}{renderSlot(30, 4, 2)}{renderSlot(31, 4, 3)}{renderSlot(32, 4, 4)}{renderSlot(33, 4, 5)}{renderSlot(34, 4, 6)}</tr>
      <tr>{renderSlot(35, 5, 0)}{renderSlot(36, 5, 1)}{renderSlot(37, 5, 2)}{renderSlot(38, 5, 3)}{renderSlot(39, 5, 4)}{renderSlot(40, 5, 5)}{renderSlot(41, 5, 6)}</tr>
    </tbody>
  );
}

export default Board;
