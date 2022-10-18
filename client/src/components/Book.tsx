import "./Book.css"
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Book(props: { id: string }) {
  
  const baseURL = "https://openlibrary.org";
  
  let id = props.id;
  let bookSuffix = "/works/" + id;

  // Book Stuff
  let bookURL = baseURL + bookSuffix + ".json";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverID, setCoverID] = useState(0);

  async function fetchBookData(url: string) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.title);
      setAuthor(json.authors[0].author.key);
      setCoverID(json.covers[0]);
    } catch (error) {
      console.log("Error", error);
    }
  }
  fetchBookData(bookURL);

  // Author Stuff
  let authorURL = baseURL + author + ".json";

  const [authorName, setAuthorName] = useState("");

  async function fetchAuthorData(url: string) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setAuthorName(json.name);
    } catch (error) {
      console.log("Error", error);
    }
  }
  fetchAuthorData(authorURL);

  let imageSize = "M"; // S, M, L
  let coverURL =
    "https://covers.openlibrary.org/b/id/" + coverID + "-" + imageSize + ".jpg";

  return (
    <Container fluid>
      <br></br>
      {/* <Row> */}
        {/* <Col> */}
          <Image className="book-cover" src={coverURL} width="72" height="110" alt="Cover" />
        {/* </Col> */}
        {/* <Col> */}
          <h3>{title}</h3>
          <h5>{authorName}</h5>
          <br></br>
          <br></br>
          <hr></hr>
        {/* </Col> */}
        {/* <Col></Col> */}
      {/* </Row> */}
      {/* <hr></hr> */}
    </Container>
  );
}

export default Book;
