import { Button, Card } from "react-bootstrap";

const CardProduct = ({data}) => {
    return (
        
            <Card className="text-start">
                <Card.Img variant="top" src={`http://localhost:3000/public/images/products/${data.image_url}`} height={240}/>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        Descripsi Berita 
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted">
                            Jam Tayang
                        </small>
                    </Card.Text>
                    <Card.Text className="text-center">
                        <Button variant="primary">Read More</Button>
                    </Card.Text>
                </Card.Body>
            </Card>

    )
}

export default CardProduct;