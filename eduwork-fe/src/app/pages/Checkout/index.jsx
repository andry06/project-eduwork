
import { Card, Container } from "react-bootstrap";

import { useState } from "react";
import { apiGetAddress } from "../../api/address";
import { useEffect } from "react";
import { apiGetCart } from "../../api/cart";
import AddressChecklist from "./AddressChecklist";
import DetailPesanan from "./DetailPesanan";
import { apiCreateOrder } from "../../api/order";
import { useDispatch } from "react-redux";
import { actClearItem } from "../../features/Cart/actions";
import LastInvoice from "./LastInvoice";


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const [dataSelect, setDataSelect] = useState({delivery_fee: '20000', delivery_address: ''});
    const [dataFilterId, setDataFilterId] = useState({})
    const [dataAddress, setAddress] = useState([]);
    const [formAdrress, setFormAddress] = useState(true);
    const [formKonfirmasi, setFormKonfirmasi] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [subTotal, setSubTotal] = useState(0);
    const [dataCart, setDataCart] = useState([]);
    const [invoice, setInvoice] = useState({});
    const [formInovice, setFormInvoice] = useState(false);
     //ambil data address utk tampil table address
     
     useEffect(() => {  
        apiGetAddress()
        .then(res => {
            setAddress(res.data.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);

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
    },[formKonfirmasi]);

    const handleKonfirmasi = (data) => {
        setFormAddress(false)
        setFormKonfirmasi(true)
        setDisabledButton(true)
        const showEdit =  dataAddress.filter(filter => filter._id === dataSelect.delivery_address)
        setDataFilterId(showEdit[0])
    }

    const handleBefore = () => {
        setFormAddress(true)
        setFormKonfirmasi(false)
    }

    const handleBayar = () => {
        apiCreateOrder(dataSelect)
        .then((res) => {
            console.log(res)
            // localStorage.setItem('invoiceLast', JSON.stringify(res.data));
            setInvoice(res.data);
            dispatch(actClearItem());
            localStorage.removeItem('cart');
            setFormKonfirmasi(false);
            setFormInvoice(true);
            // navigate('/account');
        })
        .catch(err => {
          console.log(err.message);
        });
    }

    return(
        <div>
              <Container style={{marginBottom: '100px', marginTop: '90px', minHeight: '375px' }}>
                <Card >
                    <Card.Header className="text-start text-white bg-primary"><h6>{formInovice ? 'Invoice' : 'Checkout' } </h6></Card.Header>
                    <Card.Body className="pe-4">
                        {formAdrress && 
                            <AddressChecklist dataAddress={dataAddress}  handleKonfirmasi={handleKonfirmasi} setDataSelect={setDataSelect}  dataSelect={dataSelect} disabledButton={disabledButton} setDisabledButton={setDisabledButton} />
                        }

                        {formKonfirmasi &&
                            <DetailPesanan dataFilterId={dataFilterId} dataCart={dataCart} subTotal={subTotal} dataSelect={dataSelect} handleBefore={handleBefore} handleBayar={handleBayar} />
                        }

                        {formInovice && 
                            <LastInvoice invoice={invoice} />
                        }
                   
                </Card.Body>
            </Card>
        </Container>
            
        </div>
    )
}

export default CheckoutPage;