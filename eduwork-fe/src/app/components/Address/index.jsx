import { useEffect, useState } from "react";
import { apiDeleteAddress, apiGetAddress, apiPostAddress, apiPutAddress } from "../../api/address"
import { Button, Form, Modal, Table } from "react-bootstrap";
import {faEdit, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SweetAlert2 from "react-sweetalert2";

const Address = () => {
    
//batas awal utk handle index view alamat
    const [dataAddress, setAddress] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    const [swalConfirm, setSwalConfirm] = useState({});

    useEffect(() => {  
        apiGetAddress()
        .then(res => {
            setAddress(res.data.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[refresh]);
 //batas akhir utk handle index view alamat

//batas awal handle add address
    const [formAdd, setFormAdd] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => {
        setFormAdd({});
        setShowAdd(false);
    } 

    const addAddress = (e) => {
        e.preventDefault();
       
        apiPostAddress(formAdd)
        .then(res => {
            if(res.data.error){
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                  });
                  
            }else{
                setSwalSuccess({
                  show: true,
                  icon: 'success',
                  title: 'SUCCESS',
                  text: 'Alamat Berhasil ditambahkan'
                }); 
            }
        })
        .catch(err => {
          console.log(err.message);
        });
    }


//batas akhir handle add address

//batas awal handle edit address
    const [formEdit, setFormEdit] = useState({});
    const [dataEdit, setDataEdit] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => {
        setFormEdit({});
        setShowEdit(false);
    } 

    const handleShowEdit = (id) => {
        setShowEdit(true);
        const showEdit =  dataAddress.filter(filter => filter._id === id)
        setDataEdit(showEdit[0]);
    }
 
    const editAddress = (id) => {
        // e.preventDefault();
        const nama = document.getElementById("namaEdit").value;
        const detail = document.getElementById("detailEdit").value;
        const kelurahan = document.getElementById("kelurahanEdit").value;
        const kecamatan = document.getElementById("kecamatanEdit").value;
        const kabupaten = document.getElementById("kabupatenEdit").value;
        const provinsi = document.getElementById("provinsiEdit").value;

        setFormEdit({...formEdit, nama, detail, kelurahan, kecamatan, kabupaten, provinsi}) 
        
        apiPutAddress(id, formEdit)
        .then(res => {
            if(res.data.error){
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                });
                
            }else{
                setSwalSuccess({
                show: true,
                icon: 'success',
                title: 'SUCCESS',
                text: 'Alamat baru erhasil diedit'
                }); 
            }
            
        })
        .catch(err => {
        console.log(err.message);
        });

    }

//bataas akhir handle edit address

//batas awal handle delete address
    const handleDelete = (id) => {
    setSwalConfirm({
        show: true,
        title: 'Apa anda yakin?',
        text: "data yang di delete tidak akan bisa di kembalikan lagi !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',                    
        preConfirm: (iya) => {
            if(iya){
                apiDeleteAddress(id)
                .then(res => {
                    if(res.data.error){
                        setSwalProps({
                            show: true,
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                    }else{
                        setSwalSuccess({
                            show: true,
                            icon: 'success',
                            title: 'SUCCESS',
                            text: 'Data ini berhasil di Delete'
                        }); 
                    }
                }).catch(err => {
                    console.log(err.message);
                });
            }
        }
    })
}
//batas akhir handle delete address

    return (
        
        <div className="text-start mt-2">
            
{/* batas awal index address */}

            <h4 className="text-start">Daftar Alamat</h4> 
            <Button className="btn btn-sm btn-success my-3" onClick={handleShowAdd}> <FontAwesomeIcon icon={faAdd} /> Tambah</Button>
            <Table striped bordered style={{ fontSize: '90%' }} >
                <thead>
                    <tr>
                        <th>No</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">Detail</th>
                        <th width="15%" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAddress.map((data, i) => (
                        <tr key={i}>
                            <td className="text-center align-middle">{i+1}</td>
                            <td className="align-middle">{data.nama}</td>
                            <td className="align-middle">{data.detail}, {data.kelurahan}, {data.kecamatan}, {data.kabupaten}, {data.provinsi} </td>
                            <td className="text-center align-middle">
                                <Button className="btn btn-sm btn-success ms-2 mb-1"
                                    onClick={() => handleShowEdit(data._id) }> <FontAwesomeIcon icon={faEdit} /> </Button>
                                <Button className="btn btn-sm btn-danger ms-2 mb-1" 
                                    onClick={() => handleDelete(data._id) }> <FontAwesomeIcon icon={faTrash} /> </Button>
                            </td>
                        </tr>

                     ))}
                </tbody>
                </Table>
                
                <SweetAlert2 {...swalProps}
                    didClose={() => {
                        setSwalProps({
                            show: false,
                        });
                    
                    }}
                />

                <SweetAlert2 {...swalSuccess}
                    didClose={() => {
                        setSwalSuccess({
                            show: false,
                        });
                        setFormAdd({});
                        handleCloseAdd();
                        setFormEdit({});
                        handleCloseEdit();
                        setRefresh(!refresh);
                    }}
                />

                <SweetAlert2 {...swalConfirm}
                    didClose={() => {
                        setSwalConfirm({
                            show: false,
                        });
                    }}
                    onConfirm={() => {
                        setSwalConfirm({
                            show: false,
                        });
                        setRefresh(!refresh);
                    }}
                />

{/* batas awal index address */}

{/* batas awal Modal add  */}

    <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Tambah Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>
                <Form.Group className="mb-3 text-start fw-bold" controlId="nama">
                    <Form.Label className="ms-1">Nama Alamat Baru</Form.Label>
                    <Form.Control size="sm" type="name" name="nama" placeholder="Masukan Nama Alamat Baru" 
                        onChange={(e) => { setFormAdd({...formAdd, nama: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="detail">
                    <Form.Label className="ms-1">Detail Alamat</Form.Label>
                    <Form.Control as="textarea" rows={2} name="detail" placeholder="Masukan Detail Alamat" 
                        onChange={(e) => { setFormAdd({...formAdd, detail: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="kelurahan">
                    <Form.Label className="ms-1">Kelurahan</Form.Label>
                    <Form.Control size="sm" type="name" name="kelurahan" placeholder="Masukan Nama Kelurahan" 
                       onChange={(e) => { setFormAdd({...formAdd, kelurahan: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="kecamatan">
                    <Form.Label className="ms-1">Kecamatan</Form.Label>
                    <Form.Control size="sm" type="name" name="kecamatan" placeholder="Masukan Nama Kecamatan" 
                        onChange={(e) => { setFormAdd({...formAdd, kecamatan: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="Kabupaten">
                    <Form.Label className="ms-1">Kabupaten</Form.Label>
                    <Form.Control size="sm" type="name" name="kabupaten" placeholder="Masukan Nama Kabupaten" 
                        onChange={(e) => { setFormAdd({...formAdd, kabupaten: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="provinsi">
                    <Form.Label className="ms-1">Provinsi</Form.Label>
                    <Form.Control size="sm" type="name" name="provinsi" placeholder="Masukan Nama Provinsi"
                        onChange={(e) => { setFormAdd({...formAdd, provinsi: e.target.value}) }}  />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
                Close
            </Button>
            <Button variant="primary" onClick={addAddress}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
{/* batas akhir Modal add  */}

{/* batas awal Modal Edit  */}

<Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Edit Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>  
                <Form.Group className="mb-3 text-start fw-bold" controlId="namaEdit">
                    <Form.Label className="ms-1">Nama Alamat Baru</Form.Label>
                    <Form.Control size="sm" type="name" name="namaEdit" defaultValue={dataEdit.nama}  placeholder="Masukan Nama Alamat Baru" 
                        onChange={(e) => { setFormEdit({...formEdit, nama: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="detailEdit">
                    <Form.Label className="ms-1">Detail Alamat</Form.Label>
                    <Form.Control as="textarea" rows={2} name="detailEdit" defaultValue={dataEdit.detail} placeholder="Masukan Detail Alama"
                        onChange={(e) => { setFormEdit({...formEdit, detail: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="kelurahanEdit">
                    <Form.Label className="ms-1">Kelurahan</Form.Label>
                    <Form.Control size="sm" type="name" name="kelurahanEdit" defaultValue={dataEdit.kelurahan} placeholder="Masukan Nama Kelurahan"
                        onChange={(e) => { setFormEdit({...formEdit, kelurahan: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="kecamatanEdit">
                    <Form.Label className="ms-1">Kecamatan</Form.Label>
                    <Form.Control size="sm" type="name" name="kecamatanEdit" defaultValue={dataEdit.kecamatan} placeholder="Masukan Nama Kecamatan"
                        onChange={(e) => { setFormEdit({...formEdit, kecamatan: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="kabupatenEdit">
                    <Form.Label className="ms-1">Kabupaten</Form.Label>
                    <Form.Control size="sm" type="name" name="KabupatenEdit" defaultValue={dataEdit.kabupaten} placeholder="Masukan Nama Kabupaten" 
                        onChange={(e) => { setFormEdit({...formEdit, kabupaten: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3 text-start fw-bold" controlId="provinsiEdit">
                    <Form.Label className="ms-1">Provinsi</Form.Label>
                    <Form.Control size="sm" type="name" name="provinsiEdit" defaultValue={dataEdit.provinsi} placeholder="Masukan Nama Provinsi"
                        onChange={(e) => { setFormEdit({...formEdit, provinsi: e.target.value}) }} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" onClick={() => editAddress(dataEdit._id) }>
                Save Changes
            </Button>
        </Modal.Footer>

    </Modal>
{/* batas akhir Modal Edit  */}
        </div>
    )
}

export default Address;