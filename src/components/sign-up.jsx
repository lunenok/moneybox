import React, {useState} from 'react';
import {authStore} from './../store/auth';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPassowrdCheck] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <Grid container spacing={2} mt={4} direction={'column'} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant={'h6'}>Sign up</Typography>
                </Grid>
                <Grid item>
                    <TextField name='email' label='Email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField name='password' label='Password' type='password' value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}>
                    </TextField>
                </Grid>
                <Grid item textAlign={'center'}>
                    <TextField name='password_check' label='Repeat password' mb={2} type='password' value={passwordCheck} 
                        onChange={(e) => {
                            setPassowrdCheck(e.target.value)
                        }}>
                    </TextField>
                    {errorMessage ? <Typography color={'red'}>{errorMessage}</Typography> : <p></p>}
                </Grid>
                <Grid item>
                    <Button name='register' variant="outlined" onClick={() => {
                        if (password === passwordCheck) {
                            authStore.register(email, password);
                            setErrorMessage(null);
                        } else {
                            setErrorMessage('Password do not match')
                        }
                    }}>Register</Button>
                </Grid>
        </Grid>
    )
}