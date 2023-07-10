import NavigationMenu from "../components/Navigation";
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import userImage from '../pictures/bhavik_sticker.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import DisplayProfile from "../components/Profile/DisplayProfile";
import ResetPassword from "../components/Profile/resetPassword";
import EditProfile from "../components/Profile/EditProfile";
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';

function Account() {
  const [displayUserData, setDisplayUserData] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  //const [deleteUser, setDeleteUser] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const handleChangePassword = () => {
    setChangePassword(true);//main guy : changepassword
    setDisplayUserData(false);
    setEditProfile(false);
  }

  const handleDisPlayUserData = () => {
    setDisplayUserData(true);//main guy : displayuserdata
    setChangePassword(false);
    setEditProfile(false);

  }

  const handleEditProfile = () => {
    setEditProfile(true);//main guy: edit profile
    setDisplayUserData(false);
    setChangePassword(false);

  }

  return (
    <>
      <NavigationMenu />
      <br />
      <br></br>
      <span><h1 className="display-4  secondary ">My Profile</h1></span>
      <br />
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col className="text-center">
            <Image src={userImage} fluid width="65%" height="50%"  />
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
                <RemoveRedEyeSharpIcon/>
                View Profile
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
                className={`button-margin ${editProfile ? 'active' : ''}`}
                onClick={handleEditProfile}
                style={{ marginRight: '40px' }}
              >
                <EditIcon />Edit Profile
              </Button>



            </div>
            <br />
            {changePassword && <ResetPassword />}
            {displayUserData && <DisplayProfile />}
            {editProfile && <EditProfile />}

          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default Account;
