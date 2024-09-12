import styled from "styled-components";

// Define a styled component for a button
const StyledButton = styled.button`
  border: none;
  font-weight: bold;
  padding: 10px 13px;
  border-radius: 5px;
  background-color: #cc0000;
  transition: 0.5s;
  &:hover {
    background-color: #810000;
    transition: 0.5s;
  }
`;

export default StyledButton;
