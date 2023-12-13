import FileUpload from "../../components/FileUpload";
import SearchBar from "../../components/SearchBar";
import CardDisplay from "../../components/CardDisplay";

import { Container, Header, Main } from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <Header>
        <h1>CSV Dashboard</h1>
      </Header>

      <Main>
        <FileUpload />
        <SearchBar />
      </Main>

      <CardDisplay />
    </Container>
  );
};

export default Dashboard;
