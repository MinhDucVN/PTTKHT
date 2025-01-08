import logo from "../assets/Vector.svg"; // Import SVG vào như một React component
import styled from "styled-components";

const LogoContainer = styled.div`
  align-items: center;
  display: inline-flex;
  gap: 5px;
`;

const LogoText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--colorbasetertiary);
`;

export const Logo = () => {
  return (
    <LogoContainer>
      <img src={logo} alt="Logo" width="50" height="40" />
      <LogoText>GS'S STORE</LogoText>
    </LogoContainer>
  );
};
