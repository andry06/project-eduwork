import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "../../components/CardProduct";
import { apiGetProduct } from "../../api/product";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
    let product = useSelector(state => state.product);
    const [dataProduct, setDataProduct] = useState([]);
    const [refresh, setRefresh] = useState(false);
    console.log(dataProduct)
    //batas awal tampil data
    useEffect(() => {  
        apiGetProduct()
        .then(res => {
            setDataProduct(res.data.data);
            
        })
        .catch(err => {
        console.log(err.message);
        });
    },[refresh]);
    return(
        <div>
            <Container style={{marginBottom: '100px', marginTop: '90px' }}>
                <Row>
                    {dataProduct.map((data, i)=> (
                        <Col sm={3} key={i} >
                            <CardProduct data={data}/> 
                        </Col>
                    ))}   
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;