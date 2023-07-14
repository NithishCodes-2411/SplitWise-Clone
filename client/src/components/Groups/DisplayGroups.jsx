import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from "axios";
import { Button, Typography } from '@mui/material';
import { Container, Link } from '@mui/material';
import NavigationMenu from "../Navigation";
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Box, AvatarGroup, Avatar, Stack, Grid } from '@mui/material';
import img from '../../pictures/bhavik_sticker.png';
const emailID = localStorage.getItem('userEmail');


const noGroupJsx = (
    <>
        <NavigationMenu />
        <h3>You Do not seem to be a part of any Group</h3>
        <br />
        <Button variant="contained">Create a group</Button>
    </>
);

const errorJsx = (
    <>
        <NavigationMenu />
        <h3>An error occurred while fetching your group details</h3>
    </>
);

const DisplayGroups = () => {

    const [hasGroups, setHasGroups] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [groupArr, setGroupArr] = useState([]);

    useEffect(() => {
        if (emailID) {
            axios.post('http://localhost:5000/api/group/findUserGroup', {
                emailId: emailID
            })
                .then((res) => {
                    if (res.status === 200) {
                        setHasGroups(res.data.numOfGroup !== 0);
                        res.data.numOfGroup !== 0 && setGroupArr(res.data.groups);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [emailID]);

    if (loading) {
        return <><NavigationMenu />Loading...</>;
    }

    if (error) {
        return errorJsx;
    }

    if (!hasGroups) {
        return noGroupJsx;
    }

    const handleOnClick = (index) => {
        const groupId = groupArr[index]._id;
        //console.log("group ikd : " + groupId)
       
    }

    return (
        <>
            <NavigationMenu />
            <br></br>
            <h2> Your Groups</h2>
            <Container>


                <Grid sx={{
                    pt: 3,
                    px: 1,

                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',


                }} >


                    {groupArr.map((group, index) => (
                        <>

                            <CardContent sx={{

                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                borderRadius: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                "&:hover": {
                                    backgroundColor: 'lightgray',
                                    cursor: 'pointer',
                                    transform: 'scale(1.05)',
                                    transition: '0.4s'
                                },
                            }}
                                key={index}
                                onClick = {handleOnClick(index)}
                            >



                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3,
                                            }}>
                                                <b>Name:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupName}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>





                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3
                                            }}>
                                                <b>Currency:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupCurrency}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>



                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3
                                            }}>
                                                <b>Catergory:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupCategory}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>

                            </CardContent>
                            <br></br>
                        </>


                    ))}

                </Grid>
            </Container>

        </>
    );

}
export default DisplayGroups;
