import React, { useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";
import { useDispatch } from "react-redux";
import { actUserLogout } from "../../features/Auth/actions";
import { apiLogoutUser } from "../../api/auth";
import { Outlet, useNavigate } from "react-router-dom";

const PageAccount = () => {

    let dispatch = useDispatch();
    const navigate = useNavigate();
    let [selectProfile, setProfile] = useState('active');
    let [selectAddress, setAddress] = useState('');
    const submitLogout =  () => {

         apiLogoutUser()
        .then(() => {
            localStorage.removeItem('auth');
            dispatch(actUserLogout());
            navigate('/login');
            return
        })
        .catch(err => {
          console.log(err.message);
        });
        
    }

    const submitProfile = () =>{
        navigate('/account/profile');
        setProfile('active');
        setAddress('');
    }

    const submitAddress = () =>{
        navigate('/account/address');
        setProfile('');
        setAddress('active');
    }


   return(
        <div>
            <TopBar />
                <Container>
                        <Card >
                            <Card.Header className="text-start text-white bg-primary"><h6>Account</h6></Card.Header>
                            <Card.Body>
                                <Row>
                                <Col sm={3} >
                                    <ListGroup  className="text-start h6 " >
                                        <ListGroup.Item className="list-group-item list-group-item-action" active={selectProfile} action onClick={submitProfile} > Profile</ListGroup.Item>
                                        <ListGroup.Item className="list-group-item list-group-item-action"  >Pemesanan</ListGroup.Item>
                                        <ListGroup.Item className="list-group-item list-group-item-action" active={selectAddress} action onClick={submitAddress} >Alamat</ListGroup.Item>
                                        <ListGroup.Item className="list-group-item list-group-item-action" action onClick={submitLogout}>Logout</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col sm={9} >
                                    
                                    <Outlet />

                                </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                       
                </Container>
            <Footer />
        </div>
   )
}

export default PageAccount;