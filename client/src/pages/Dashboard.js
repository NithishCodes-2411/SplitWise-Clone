import NavigationMenu from "../components/Navigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';


const DashBoard = () => {




    return (
        <>
            <NavigationMenu />
            <br></br>
          
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={9}>


                        <nav className="navbar bg-secondary" data-bs-theme="dark">
                            <div className="container-fluid">
                            </div>
                        </nav>




                        </Col>
                    <Col></Col>
                </Row>

            </Container>


        </>

    )

}
export default DashBoard