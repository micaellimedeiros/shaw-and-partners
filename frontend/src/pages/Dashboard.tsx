import FileUpload from "../components/FileUpload";
import SearchBar from "../components/SearchBar";
import CardDisplay from "../components/CardDisplay";

const Dashboard = () => {
  return (
    <div>
      <header>
        <h1>CSV Dashboard</h1>
      </header>
      <main>
        <FileUpload />
        <SearchBar />
        <CardDisplay />
      </main>
    </div>
  );
};

export default Dashboard;
