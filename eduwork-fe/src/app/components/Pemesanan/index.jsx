import { useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import { apiGetOrder } from "../../api/order";
import { useState } from "react";
import { rupiahFormat } from "../../capitalize";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pemesanan = () => {   
    const [dataOrder, SetDataOrder] = useState([]);
    //batas awal tampil data
    useEffect(() => {  
        apiGetOrder()
        .then(res => {
            SetDataOrder(res.data.data)
            console.log(res)
        })
        .catch(err => {
            console.log(err.message);
        });
    },[]);
    const dateTime = new Date()
    console.log(dateTime)

    //batas awal tampil data

    return (
        <Container>
            <Row>
                <h4 className="text-start">Daftar Pemesanan</h4>
                <Row className="mt-4  fw-bold">
                    <Col md={1} className="text-center">ID</Col>
                    <Col md={2} className="text-center">Waktu</Col>
                    <Col md={3} className="text-center">Total</Col>
                    <Col md={4} className="text-center">Status</Col>
                    <Col md={2} className="text-center" >Invoice</Col>
                </Row>
                {dataOrder.map((order, i) => (
               <Accordion>
                    <Accordion.Item eventKey={i}>
                    <Accordion.Header>
                    <Row key={i} style={{ width: '100%' }}>
                        <Col md={1} className="text-center">{order.order_number}</Col>
                        <Col md={2} className="text-center">{order.createdAt.substr(0,10)}</Col>
                        <Col md={3} className="text-center">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0)+order.delivery_fee)}</Col>
                        <Col md={4} className="text-center">{order.status}</Col>
                        <Col md={2} className="text-start"><Button className="btn btn-sm btn-success"><FontAwesomeIcon icon={faFileInvoice} className='text-white'/> Invoice</Button></Col>
                    </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                            <thead>
                                <tr>
                                    <th>Nama Product</th>
                                    <th>QTY</th>
                                    <th className="text-end">Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_items.map((item, i) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-end">{rupiahFormat(item.qty*item.price)}</td>
                                </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Sub Total : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0))}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Delivery Fee : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.delivery_fee)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Total All : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0)+order.delivery_fee)}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                 ))}
                {/* <span className="text-start">Total Semua Pemesanan : {dataOrder.count} </span> */}
            </Row>
        </Container>
    )
}

export default Pemesanan;