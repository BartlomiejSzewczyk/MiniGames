import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../Styles/devices";
import { useStore } from "react-redux";
import Field from "./Field";
import ManageMinesweeper from "./ManageMinesweeper";
import { useSelector } from "react-redux";

const Minesweeper = () => {
  var minesweeperSquares = useSelector(
    (state) => state.minesweeperReducer.minesweeperSquares
  );

  return (
    <>
      <ManageMinesweeper />
      {minesweeperSquares.length ? <Field /> : null}
    </>
  );
};

export default Minesweeper;
