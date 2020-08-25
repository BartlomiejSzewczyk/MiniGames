import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../Styles/devices";
import { useStore } from "react-redux";
import Field from "./Field";
import { styledInput as StyledInput } from "../Styles/styled-elements";
import { styledLabel as Styledlabel } from "../Styles/styled-elements";
import { styledButton as StyledButton } from "../Styles/styled-elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as appActions from "../Actions/appActions";
import * as minesweeperActions from "../Actions/minesweeperActions";
import { styledDiv as StyledDiv } from "../Styles/styled-elements";

const PlayButton = styled(StyledButton)`
  @media ${devices.tablet} {
    width: 70px;
    height: 38px;
  }
  @media ${devices.laptop} {
    width: 76px;
    height: 42px;
  }
  @media ${devices.laptopL} {
    width: 85px;
    height: 45px;
  }
  @media ${devices.desktop} {
    width: 100px;
    height: 50px;
  }
  @media ${devices.desktopL} {
    width: 110px;
    height: 55px;
  }
`;

const BombsleftInfo = styled(StyledDiv)`
  position: absolute;
  top: 70px;
  left: 40%;
  font
`;

const ManageMinesweeper = () => {
  const store = useStore();
  const [translation, i18n] = useTranslation();
  const dispatch = useDispatch();
  const startSize = useSelector((state) => state.minesweeperReducer.fieldSize);
  const startBombs = useSelector(
    (state) => state.minesweeperReducer.bombsNumber
  );
  const bombsLeft = useSelector((state) => state.minesweeperReducer.bombsLeft);
  const [inputFieldSize, setFieldSize] = useState(startSize);
  const [inputFieldBombs, setBombsNumber] = useState(startBombs);

  const handleInputSize = (event) => {
    var newValue = parseInt(event.target.value, 10);
    if (Number.isInteger(newValue) && newValue > 6 && newValue < 31) {
      setFieldSize(newValue);
    } else {
      setFieldSize(10);
    }
  };

  const handleInputBombs = (event) => {
    var newValue = parseInt(event.target.value, 10);
    if (Number.isInteger(newValue) && newValue > 9 && newValue < 101) {
      setBombsNumber(newValue);
    } else {
      setBombsNumber(10);
    }
  };

  return (
    <>
      <Styledlabel top="30px" left="40%">
        {translation(`minesweeper-fieldSize`)}
        <StyledInput
          type="number"
          value={inputFieldSize}
          onChange={(event) => {
            setFieldSize(event.target.value);
          }}
          onBlur={(event) => {
            handleInputSize(event);
          }}
        />
      </Styledlabel>
      <Styledlabel top="30px" left="55%">
        {translation(`minesweeper-bombsNumber`)}
        <StyledInput
          type="number"
          value={inputFieldBombs}
          onChange={(event) => {
            setBombsNumber(event.target.value);
          }}
          onBlur={(event) => {
            handleInputBombs(event);
          }}
        />
      </Styledlabel>
      <BombsleftInfo>{`${translation(
        `minesweeper-bombsLeft`
      )}${bombsLeft}`}</BombsleftInfo>
      <PlayButton
        top="20px"
        left="65%"
        onClick={() => {
          dispatch(appActions.changeState("CHANGE_FIELD_SIZE", inputFieldSize));
          dispatch(
            appActions.changeState("CHANGE_BOMBS_NUMBER", inputFieldBombs)
          );
          dispatch(minesweeperActions.createSquares());
          dispatch(appActions.changeState("CHANGE_FIRST_CLICK_STATE", false));
        }}
      >
        {translation("play")}
      </PlayButton>
    </>
  );
};

export default ManageMinesweeper;
