import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../Styles/devices";
import * as minesweeperActions from "../Actions/minesweeperActions";
import { useSelector, useDispatch } from "react-redux";
import BombIcon from "../Icons/Symbols/bomb";
import WarningIcon from "../Icons/Symbols/warning";
import BombFoundIcon from "../Icons/Symbols/bombFound";
import BombNotFoundIcon from "../Icons/Symbols/bombNotFound";

const Figure = styled.div`
  position: absolute;
  border: solid 1px black;
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
`;

const Square = (props) => {
  const dispatch = useDispatch();
  var fieldSize = useSelector((state) => state.minesweeperReducer.fieldSize);
  var minesweeperSquares = useSelector(
    (state) => state.minesweeperReducer.minesweeperSquares
  );
  var afterFirstClick = useSelector(
    (state) => state.minesweeperReducer.afterFirstClick
  );
  var gameStatus = useSelector((state) => state.minesweeperReducer.gameStatus);
  const position = { x: props.x, y: props.y };

  return (
    <Figure
      style={{
        left: `${props.x * (100 / fieldSize)}%`,
        top: `${props.y * (100 / fieldSize)}%`,
        cursor: `${
          minesweeperSquares[props.x][props.y].clicked || gameStatus !== ""
            ? "default"
            : "pointer"
        }`,
        backgroundImage: `${
          minesweeperSquares[props.x][props.y].clicked
            ? "radial-gradient(#7de676,#1a8413)"
            : minesweeperSquares[props.x][props.y].warning && gameStatus
            ? "radial-gradient(#e4e46e, #a9a917)"
            : minesweeperSquares[props.x][props.y].hasBomb && gameStatus
            ? "radial-gradient(#e67f7f,#8c0808)"
            : "radial-gradient(#6a8ae4, #2024b7)"
        }`,
      }}
      hasBomb={minesweeperSquares[props.x][props.y].hasBomb && gameStatus}
      onClick={
        gameStatus === ""
          ? afterFirstClick
            ? !minesweeperSquares[props.x][props.y].warning
              ? () => {
                  dispatch(minesweeperActions.checkSquare(position));
                }
              : null
            : !minesweeperSquares[props.x][props.y].warning
            ? () => {
                dispatch(minesweeperActions.assignBombs(position));
              }
            : null
          : null
      }
      onContextMenu={
        gameStatus === "" && afterFirstClick
          ? (event) => {
              dispatch(minesweeperActions.makeWarning(position, event));
            }
          : null
      }
    >
      {gameStatus === "lose" ? (
        minesweeperSquares[props.x][props.y].hasBomb ? (
          minesweeperSquares[props.x][props.y].warning ? (
            <BombFoundIcon />
          ) : (
            <BombIcon />
          )
        ) : minesweeperSquares[props.x][props.y].warning ? (
          <BombNotFoundIcon />
        ) : null
      ) : gameStatus === "win" &&
        minesweeperSquares[props.x][props.y].hasBomb ? (
        <BombFoundIcon />
      ) : null}
      {minesweeperSquares[props.x][props.y].clicked
        ? minesweeperSquares[props.x][props.y].number
        : null}
      {minesweeperSquares[props.x][props.y].warning && gameStatus === "" ? (
        <WarningIcon />
      ) : null}
    </Figure>
  );
};

export default Square;
