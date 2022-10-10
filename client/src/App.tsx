import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Book from "./components/Book";
import BookForm from "./components/BookForm";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import NoPage from "./components/NoPage";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Book />
      {/* <BookForm />
      <NoPage /> */}
    </>
  );
}

export default App;
