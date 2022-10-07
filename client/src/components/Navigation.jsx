import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Book</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
