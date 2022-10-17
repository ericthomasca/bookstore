import { useState } from "react";
import Container from "react-bootstrap/Container";

function Book() {

  const baseURL = "https://openlibrary.org";

  // TODO get from search later
  let bookSuffix = "/works/OL45804W";

  // Book Stuff
  // TODO move to another file
  let bookURL = baseURL + bookSuffix + ".json";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [coverID, setCoverID] = useState(0);
  const [bookDescription, setBookDescription] = useState("");


  async function fetchBookData(url: string) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.title);
      setAuthor(json.authors[0].author.key);
      setPublishYear(1983);
      setCoverID(json.covers[0]);
      setBookDescription(json.description);
    } catch (error) {
      console.log("Error", error);
    }
  }
  fetchBookData(bookURL);

  // Author Stuff
  // TODO move to another file

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

  let imageSize = "M" // S, M, L
  let coverURL = "https://covers.openlibrary.org/b/id/" + coverID + "-" + imageSize + ".jpg";

  return (
    <Container fluid>
      <h3>{title}</h3>
      <h5>By {authorName}</h5>
      <p>Published in {publishYear}</p>
      <img src={coverURL} alt="Cover" />
      <p>{bookDescription}</p>
    </Container>
  );
}

export default Book;
