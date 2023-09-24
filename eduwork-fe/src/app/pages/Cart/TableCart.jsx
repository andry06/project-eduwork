import { Row } from "react-bootstrap"

const TableCart = () => {
    return (
        <Row>
            <h5 className="text-start">Sub Total : </h5> 
                    <Table bordered hover size="sm" className="mt-3">
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
                    
                    </tbody>
        
       
    </Table> 
    </Row>
    )
}