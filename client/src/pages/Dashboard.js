import NavigationMenu from "../components/Navigation";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DashBoard = () => {

    


    return (
        <>
            <NavigationMenu />
            <br></br>
            <br></br>
            <Container>
                <Row>
                    <Col>1 of 3</Col>
                    <Col xs={6}>2 of 3 (wider)</Col>
                    <Col>3 of 3</Col>
                </Row>

            </Container>


        </>

    )

}
export default DashBoard;