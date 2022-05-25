import React, {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from './../firebase';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function SignUp() {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });
    }

    return (
        <Grid container spacing={2} mt={4} direction={'column'} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant={'h6'}>Sign up</Typography>
                </Grid>
                <Grid item>
                    <TextField name='nickname' label='Nickname' placeholder='nickname' mb={2} value={nickname} onChange={(e) => setNickname(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField name='email' label='Email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField name='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <Button name='register' variant="outlined" onClick={register}>Register</Button>
                </Grid>
        </Grid>
    )
}