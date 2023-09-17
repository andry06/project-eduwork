import { Button, Col, Container, Form, InputGroup, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import "./index.css";
import { faSearch, faCartShopping,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = () => { 
    let auth = useSelector(state => state.auth);

    return(
        <Navbar bg="primary" className='mb-4' >
            <Container>
                <Navbar.Brand href="#home" className="text-white">POS</Navbar.Brand>
                <Nav className="me-auto" >
                    <NavDropdown title="Kategori" >
                        <NavDropdown.Item href="#action3">Utama</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Minuman</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">Snack</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">Kue</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="me-auto  mx-4" style={{ width: "800px" }}  >
                <InputGroup >
                    <Form.Control type="text"  placeholder="Cari Barang" />
                    <Button style={{ border: '2px solid white' }} >
                    <FontAwesomeIcon icon={faSearch} className='text-white'/>
                </Button>
                </InputGroup>
                </Nav>
                <Nav className="me-auto "  >
                    <FontAwesomeIcon icon={faCartShopping} className='text-white mx-4' />
                    { auth.token ?
                    <Link to="/account">  
                    <FontAwesomeIcon icon={faUser} className='text-white mx-4 d-flex'/>
                    </Link> :
                    <Link to="/login">  
                    <FontAwesomeIcon icon={faUser} className='text-white mx-4 d-flex'/>
                    </Link>
}
                </Nav>
            </Container>
      </Navbar>

    )
}

export default TopBar;