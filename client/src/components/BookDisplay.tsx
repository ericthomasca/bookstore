import "./Book.css"
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Book from "../interfaces/Book";

function BookDisplay(props: { id: string }) {
  
  const baseURL = "https://www.googleapis.com/books/v1/volumes/"  
  let id = props.id;
  let bookURL = baseURL + id;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchBookData(url: string) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.volumeInfo.title);
      setAuthor(json.volumeInfo.authors[0]);
      setCover(json.volumeInfo.imageLinks.thumbnail);
      sleep(1000);
    } catch (error) {
      console.log(error);
    }
  }
  fetchBookData(bookURL);

  return (
    <Container fluid>
      <br></br>
      <Image className="book-cover" src={cover} width="72" height="110" alt="Cover" />
      <h3>{title}</h3>
      <h5>{author}</h5>
      <br></br>
      <br></br>
      <hr></hr>
    </Container>
  );
}

export default BookDisplay;
