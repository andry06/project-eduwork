import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
    let auth = useSelector(state => state.auth);
    if(auth.user !== null){
        return(
            <>
                
                <Container className="text-start">
                    <h3 >My Account</h3>
                    <br />
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control type="text" value={ auth.user.full_name }  disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={auth.user.email} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={auth.user.role} disabled readOnly />
                        </Form.Group>
                    </Form>
                </Container>
            
            </>
        )
    }
}

export default Profile;