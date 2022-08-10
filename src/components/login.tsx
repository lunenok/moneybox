import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const SignIn: React.FC<PropTypes> = observer(({authStore}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    if (authStore.isAuth) return <Navigate to='/payments'></Navigate>

    return (
        <Grid container spacing={2} mt={4} direction={'column'} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant={'h6'}>Sign in</Typography>
                </Grid>
                <Grid item>
                    <TextField name='email' label='Email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField name='password' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <Button name='register' variant="outlined" 
                    onClick={() => {authStore.login(email, password);}}
                    >Sign in</Button>
                </Grid>
                <Grid item>
                    <Link to='/register' style={{ textDecoration: 'none' }}>
                        <Button name='register' variant="contained" color="success">Don't have an account</Button>
                    </Link>
                </Grid>
        </Grid>
    )
});

type PropTypes = {
    authStore: any
};

export default SignIn;