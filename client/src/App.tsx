import Header from "./components/Header";
import Navigation from "./components/Navigation";
import SearchPage from "./components/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./components/NoPage";
import Books from "./components/BookList";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="add" element={<SearchPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
