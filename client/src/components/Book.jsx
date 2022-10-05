import Container from 'react-bootstrap/Container';

function Book() {

    let book = "Fake Book";
    let author = "Mrs. Fake";
    let publish_year = "1987";
    let cover_image = "TEST IMAGE";

    return (
        <Container fluid>
            <h3>{book}</h3>
            <p>{author}</p>
            <p>{publish_year}</p>
            <p>{cover_image}</p>
        </Container>
    );
}

export default Book;