import React from "react";

export const minesweeperState = {
  fieldSize: 10,
  bombsNumber: 15,
  minesweeperSquares: [],
  afterFirstClick: false,
  gameStatus: "",
  bombsLeft: 15,
  squaresLeft: 100,
};

const minesweeperReducer = (state = minesweeperState, action) => {
  switch (action.type) {
    case "CHANGE_FIELD_SIZE":
      return {
        ...state,
        fieldSize: action.value,
      };
    case "CHANGE_BOMBS_NUMBER":
      return {
        ...state,
        bombsNumber: action.value,
      };
    case "CHANGE_MINESWEEPER_SQUARES":
      return {
        ...state,
        minesweeperSquares: action.value,
      };
    case "CHANGE_FIRST_CLICK_STATE":
      return {
        ...state,
        afterFirstClick: action.value,
      };
    case "CHANGE_GAME_STATUS":
      return {
        ...state,
        gameStatus: action.value,
      };
    case "CHANGE_BOMBS_LEFT":
      return {
        ...state,
        bombsLeft: action.value,
      };
    case "CHANGE_SQUARES_LEFT":
      return {
        ...state,
        squaresLeft: action.value,
      };
    default:
      return state;
  }
};

export default minesweeperReducer;
