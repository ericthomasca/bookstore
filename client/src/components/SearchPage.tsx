import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image"

function SearchPage() {
  const searchBaseURL = "https://openlibrary.org/search.json?q=";
  const [searchQuery, setSearchQuery] = useState("");

  let resultsURL = "";

  function searchBook(event: { preventDefault: () => void; }) {
    event.preventDefault();
    resultsURL = searchBaseURL + searchQuery.split(" ").join("+");
    console.log(resultsURL);
    fetchSearchResults(resultsURL);
  }

  const [resultTitle, setResultTitle] = useState("");
  const [resultAuthor, setResultAuthor] = useState("");
  const [resultCoverID, setResultCoverID] = useState(0);

  async function fetchSearchResults(url: string) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      // TODO loop through to get rest of results changing doc[i]
      setResultTitle(json.docs[0].title);
      setResultAuthor(json.docs[0].author_name[0]);
      setResultCoverID(json.docs[0].cover_i);
    } catch (error) {
      console.log("Error", error);
    }
  }

  let imageSize = "M"; // S, M, L

  let coverURL =
    "https://covers.openlibrary.org/b/id/" + resultCoverID + "-" + imageSize + ".jpg";

  return (
    <>
      <br></br>
      <Form onSubmit={searchBook}>
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setSearchQuery(event.target.value)} // TODO this is slow
          value={searchQuery}
        />
        <br></br>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>
      <Image className="book-cover" src={coverURL} width="72" height="110" alt="Cover" />
      <h3>{resultTitle}</h3>
      <h5>{resultAuthor}</h5>
      <br></br>
      <br></br>
    </>
  );
}

export default SearchPage;
