import { useEffect, useState } from "react";
import { apiGetAddress } from "../../api/address"
import { Table } from "react-bootstrap";

const Address = () => {
    const [dataAddress, setAddress] = useState({});

     useEffect(() => {  
        apiGetAddress()
        .then(res => {
            console.log(res.data.data)
            setAddress(res.data.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);

    return (
        <>
            <h4 className="text-start">Daftar Alamat</h4>

            <Table striped bordered >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </Table>
        </>
    )
}

export default Address;