import React, {useState} from 'react';
import {authStore} from './../store/auth';
import { Button, Grid, TextField, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Grid container spacing={2} mt={4} direction={'column'} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant={'h6'}>Sign in</Typography>
                </Grid>
                <Grid item>
                    <TextField name='email' label='Email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField name='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <Button name='register' variant="outlined" onClick={() => {authStore.login(email, password)}}>Sign in</Button>
                </Grid>
                <Grid item>
                    <Link to='/register' style={{ textDecoration: 'none' }}>
                        <Button name='register' variant="contained" color="success">Dont have an account</Button>
                    </Link>
                </Grid>
        </Grid>
    )
}