import styled from "styled-components";
import { devices } from "../Styles/devices";

export const styledInput = styled.input`
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  padding: 3px;
  text-align: center;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }
  @media ${devices.tablet} {
    width: 25px;
    font-size: 12px;
  }
  @media ${devices.laptop} {
    width: 35px;
    font-size: 14px;
  }
  @media ${devices.laptopL} {
    width: 40px;
    font-size: 16px;
  }
  @media ${devices.desktop} {
    width: 45px;
    font-size: 18px;
  }
  @media ${devices.desktopL} {
    width: 50px;
    font-size: 20px;
  }
`;

export const styledLabel = styled.label`
  position: absolute;
  transform: translateX(-50%);
  top: ${(props) => {
    return props.top;
  }};
  left: ${(props) => {
    return props.left;
  }};
  @media ${devices.tablet} {
    font-size: 12px;
  }
  @media ${devices.laptop} {
    font-size: 14px;
  }
  @media ${devices.laptopL} {
    font-size: 16px;
  }
  @media ${devices.desktop} {
    font-size: 18px;
  }
  @media ${devices.desktopL} {
    font-size: 20px;
  }
`;

export const styledButton = styled.button`
  position: absolute;
  outline: none;
  border: 4px outset #0f2971;
  background-color: #4771e8;
  cursor: pointer;
  padding: 3px;
  top: ${(props) => {
    return `${props.top}`;
  }};
  left: ${(props) => {
    return `${props.left}`;
  }};
  @media ${devices.tablet} {
    font-size: 22px;
  }
  @media ${devices.laptop} {
    font-size: 24px;
  }
  @media ${devices.laptopL} {
    font-size: 26px;
  }
  @media ${devices.desktop} {
    font-size: 28px;
  }
  @media ${devices.desktopL} {
    font-size: 30px;
  }
`;

export const styledDiv = styled.div`
  @media ${devices.tablet} {
    font-size: 22px;
  }
  @media ${devices.laptop} {
    font-size: 24px;
  }
  @media ${devices.laptopL} {
    font-size: 26px;
  }
  @media ${devices.desktop} {
    font-size: 28px;
  }
  @media ${devices.desktopL} {
    font-size: 30px;
  }
`;
