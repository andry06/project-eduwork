import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Image, Table } from "react-bootstrap";
import { apiGetCart, apiSaveCart } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { actAddItem, actDecItem } from "../../features/Cart/actions";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { rupiahFormat } from "../../capitalize";
import { useNavigate } from "react-router-dom";

 const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //batas awal tampil data
    const [dataCart, setDataCart] = useState([]);
    const cart = useSelector(state => state.cart);
    const [mount, setMount] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {  
        apiGetCart()
        .then(res => {
            
            setDataCart(res.data);
            setSubTotal(res.data.reduce((qtyBefore, qtyCurrent) => {
                return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
            }, 0))               
        })
        .catch(err => {
            console.log(err.message);
        });
    },[refresh]);

    const AddToCart = (data) => {
        dispatch(actAddItem({_id: data}))
        setMount(true)
    }

    useEffect(() => {
        if(mount){
            localStorage.setItem('cart', JSON.stringify(cart));
            apiSaveCart(cart)
            .then(() => {
              setRefresh(!refresh)
            })
            .catch(err => {
            console.log(err.message);
        });
        }  
    }, [mount, cart])

    const DecItemCart = (data) => {
        dispatch(actDecItem({_id: data}))
        setMount(true)
    }

    const handleCheckout = () => {
        navigate('/checkout');
    }


    return (
        <Container style={{marginBottom: '100px', marginTop: '90px', minHeight: '375px' }}>
            <Card >
                <Card.Header className="text-start text-white bg-primary"><h6>Keranjang Belanja</h6></Card.Header>
                <Card.Body className="pe-4">
                  
                {/* <Card.Title className="text-start">Sub Total :</Card.Title> */}
                   
                        <Col xs={12}>
                         <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                            <thead>
                                <tr>
                                <th>Gambar</th>
                                <th>Nama Product</th>
                                <th>Harga</th>
                                <th >QTY</th>
                                <th className="text-center ps-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataCart.map((data, i) => (
                               <tr key={i}>
                                    <td><Image src={`http://localhost:3000/public/images/products/${data.image_url}`} width={80} height={70} rounded /></td>
                                    <td className="align-middle">{data.name}</td>
                                    <td className="align-middle ">{rupiahFormat(data.price)}</td>
                                    <td className="align-middle">
                                        <Button className="btn-primary btn-sm" onClick={(e) => DecItemCart(data.product._id)}> - </Button>
                                            {' '} {data.qty} {' '}
                                        <Button className="btn-primary btn-sm" onClick={(e) => AddToCart(data.product._id)}> + </Button>
                                     </td>
                                     <td className="align-middle text-end pe-4">{rupiahFormat(data.price*data.qty)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className="fw-bold text-end ">Sub Total : </td>
                                    <td className="fw-bold text-end pe-4">
                                        {rupiahFormat(subTotal)}
                                    </td> 
                                </tr>
                            </tfoot>
                        </Table>
                        </Col>
                </Card.Body>
                <Card.Footer className="text-white text-end"  > <Button className="btn-sm" disabled={dataCart.length===0 ? true : false} onClick={handleCheckout} > <FontAwesomeIcon  icon={faBookmark} /> Checkout</Button></Card.Footer> 
            </Card>
        </Container>
    )
 }

 export default CartPage;