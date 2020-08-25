import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../Styles/devices";
import { useSelector } from "react-redux";
import Square from "./Square";
import { useTranslation } from "react-i18next";

const MinesweeperField = styled.div`
  position: absolute;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
`;

const EndGameBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: #00000088;
  text-align: center;
  font-size: 50px;
  color: white;
`;

const Field = () => {
  var fieldSize = useSelector((state) => state.minesweeperReducer.fieldSize);
  var gameStatus = useSelector((state) => state.minesweeperReducer.gameStatus);
  const [translation, i18n] = useTranslation();

  const renderElements = () => {
    var squares = [];
    for (var x = 0; x < fieldSize; x++) {
      for (var y = 0; y < fieldSize; y++) {
        squares.push(<Square x={x} y={y} />);
      }
    }
    return squares;
  };
  return (
    <MinesweeperField
      style={{ width: `${fieldSize * 40}px`, height: `${fieldSize * 40}px` }}
    >
      {gameStatus !== "" ? (
        <EndGameBackground style={{ lineHeight: `${fieldSize * 40}px` }}>
          {translation(`minesweeper-${gameStatus}`)}
        </EndGameBackground>
      ) : null}
      {renderElements()}
    </MinesweeperField>
  );
};

export default Field;
