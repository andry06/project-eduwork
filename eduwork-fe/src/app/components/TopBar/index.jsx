import { Button, Col, Container, FloatingLabel, Form, InputGroup, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import "./index.css";
import { faSearch, faCartShopping,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiGetCategory } from '../../api/category';
import { useState } from 'react';
import { capitalizeFirst } from '../../capitalize';
import { actSetCategory } from '../../features/Product/actions';

const TopBar = () => { 
    let auth = useSelector(state => state.auth);
    let product = useSelector(state => state.product);
    const dispatch = useDispatch();
    
    //batas awal tampil data category utk select category
    const [dataCategory, setCategory] = useState([]);

    //tampil data list category 
    useEffect(() => {  
        apiGetCategory()
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);


    const handleCategory = (category) => {
        dispatch(actSetCategory(category));
    }
//batas akhir tampil data category utk select category
    return(
        <Navbar bg="primary" className='mb-4 fixed-top' >
            <Container>
                <Navbar.Brand className="text-white"><Link to="/" className='text-white text-decoration-none'>SEJAM CAFE</Link></Navbar.Brand>
                <Nav className="me-3" style={{ width: '60px' }} >
                    <NavDropdown title={product.category ? capitalizeFirst(product.category) : 'Kategori'} >
                            <NavDropdown.Item onClick={(e) => handleCategory('')}>Semua Kategory</NavDropdown.Item>
                        {dataCategory.map((data, i) => (
                            <NavDropdown.Item key={i} onClick={(e) => handleCategory(data.name)}>{capitalizeFirst(data.name)}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
                <Nav className="me-auto  mx-4" style={{ width: "800px" }}  >
                <InputGroup >
                    <Form.Control type="text"  placeholder="Cari Makanan" name="search" />
                    <Button style={{ border: '2px solid white' }} >
                    <FontAwesomeIcon icon={faSearch} className='text-white'/>
                </Button>
                </InputGroup>
                </Nav>
                <Nav className="me-auto "  >
                    <FontAwesomeIcon icon={faCartShopping} className='text-white ms-3' />
                    { auth.token ?
                    <Link to="/account">  
                    <FontAwesomeIcon icon={faUser} className='text-white ms-4 d-flex'/>
                    </Link> :
                    <Link to="/login">  
                    <FontAwesomeIcon icon={faUser} className='text-white ms-4 d-flex'/>
                    </Link>
}
                </Nav>
            </Container>
      </Navbar>

    )
}

export default TopBar;