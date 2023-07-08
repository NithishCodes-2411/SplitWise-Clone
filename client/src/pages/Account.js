import NavigationMenu from "../components/Navigation";
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import userImage from '../pictures/bhavik_sticker.png';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import DisplayProfile from "../components/Profile/DisplayProfile";
import ResetPassword from "../components/Profile/resetPassword"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Account() {
  const [displayUserData, setDisplayUserData] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const handleChangePassword = () => {
    setChangePassword(true);
    setDisplayUserData(false);
  }

  const handleDisPlayUserData = () => {
    setDisplayUserData(true);
    setChangePassword(false);
  }

  return (
    <>
      <NavigationMenu />
      <br />
      <h1 className="display-4">My Account</h1>
      <br />
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col className="text-center">
            <Image src={userImage} fluid width="65%" height="50%" />
          </Col>
          <Col className="m-5 text-dark">
            <br />
            <br />
            <br />
            <div className="fixed-element">
              <Button
                variant="outline-primary"
                className={`button-margin ${displayUserData ? 'active' : ''}`}
                onClick={handleDisPlayUserData}
                style={{ marginRight: '40px' }}
              >
                <RemoveRedEyeIcon /> View Profile
              </Button>
              <Button
                variant="outline-primary"
                className={`button-margin ${changePassword ? 'active' : ''}`}
                onClick={handleChangePassword}
                style={{ marginRight: '40px' }}
              >
                <ManageAccountsIcon /> Change Password
              </Button>
              <Button
                variant="outline-primary"
                className="button-margin"
                disabled={!displayUserData && !changePassword} // Disable the button if neither view profile nor change password is active
              >
                <EditIcon /> Edit Details
              </Button>
            </div>
            <br />
            {changePassword && <ResetPassword />}
            {displayUserData && <DisplayProfile />}
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default Account;
