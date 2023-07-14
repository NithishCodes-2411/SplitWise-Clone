import NavigationMenu from "../components/Navigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { WelcomeMessage } from "../components/DashBoard/WelcomeMessage";

import DisplayGroups from '../components/Groups/DisplayGroups';
const DashBoard = () => {




    return (
        <>
            <NavigationMenu />
            <br></br>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={11}>
                        <WelcomeMessage />

                    </Col>
                    <Col></Col>
                </Row>
            </Container>


        </>

    )

}
export default DashBoard;