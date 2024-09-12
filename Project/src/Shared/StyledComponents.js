import styled from "styled-components";

// Define a styled component for a button
const DeleteButton = styled.button`
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: #cc0000;
  transition: 0.5s;
  color: #fff;
  &:hover {
    background-color: #810000;
    transition: 0.5s;
  }
`;

const UpdateButton = styled.button`
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: rgb(84, 105, 212);
  transition: 0.5s;
  color: #fff;
  &:hover {
    background-color: rgb(64, 85, 162);
    transition: 0.5s;
  }
`;

const DetailsButton = styled.button`
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: rgb(224, 224, 45);
  transition: 0.5s;
  color: black;
  &:hover {
    background-color: rgb(191, 191, 16);
    transition: 0.5s;
  }
`;

const PrimarySpan = styled.span `
  color: rgb(84, 105, 212);
`

const Buttons = { DeleteButton, UpdateButton, DetailsButton, PrimarySpan };
export default Buttons;
