import './Header.css';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
        <Container className="Header">
            <h1>Bookstore</h1>
            <p>A digital home for your paper books.</p>
        </Container>
    )
}

export default Header;