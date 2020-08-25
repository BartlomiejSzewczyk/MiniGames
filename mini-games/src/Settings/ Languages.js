import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../Styles/devices";
import { useStore } from "react-redux";
import { useTranslation } from "react-i18next";
import FlagPoland from "../Icons/Flags/poland";
import FlagUnitedKingdom from "../Icons/Flags/unitedKingdom";

const Flag = styled.div`
  position: absolute;
  width: 40%;
  height: 90%;
  top: 5%;
  cursor: pointer;
  left: ${(props) => {
    return props.left;
  }};
`;

const FlagsField = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  
  @media ${devices.tablet} {
    width: 110px;
    height: 28px;
  }
  @media ${devices.laptop} {
    width: 125px;
    height: 32px;
  }
  @media ${devices.laptopL} {
    width: 140px;
    height: 36px;
  }
  @media ${devices.desktop} {
    width: 150px;
    height: 38px;
  }
  @media ${devices.desktopL} {
    width: 160px;
    height: 40px;
  }
`;

const ManageMinesweeper = () => {
  const [transaltion, i18n] = useTranslation();

  return (
    <>
      <FlagsField>
        <Flag
          left="5%"
          onClick={() => {
            i18n.changeLanguage("pl");
          }}
        >
          <FlagPoland />
        </Flag>
        <Flag
          left="55%"
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          <FlagUnitedKingdom />
        </Flag>
      </FlagsField>
    </>
  );
};

export default ManageMinesweeper;
