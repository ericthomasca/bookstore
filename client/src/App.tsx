import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Book from "./components/Book";
import Search from "./components/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Navigation />

        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="add" element={<Search />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
