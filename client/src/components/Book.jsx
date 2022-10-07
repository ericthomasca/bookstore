import { useState, useEffect } from "react";
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
  const [coverImage, setCoverImage] = useState(0);


  async function fetchBookData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.title);
      setAuthor(json.authors[0].author.key);
      setPublishYear(1983);
      setCoverImage(json.covers[0]);
    } catch (error) {
      console.log("Error", error);
    }
  }
  fetchBookData(bookURL);



  // async function fetchAuthorData(url) {
  //   try {
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setTitle(json.title);
  //     setAuthor(json.authors[0].author.key);
  //     setPublishYear(1983);
  //     setCoverImage(json.covers[0]);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }
  // fetchAuthorData(url);

  return (
    <Container fluid>
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{publishYear}</p>
      <p>{coverImage}</p>
    </Container>
  );
}

export default Book;
