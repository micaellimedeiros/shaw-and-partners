import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 1.4rem;

  background-color: #232129;
  border-radius: 8px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    color: #fff;
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
