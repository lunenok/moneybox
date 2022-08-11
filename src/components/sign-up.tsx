import React, {useState} from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const SignUp: React.FC<PropTypes> = observer(({authStore}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPassowrdCheck] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    if (authStore.isAuth) return <Navigate to='/payments'></Navigate>

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
                    <TextField name='password_check' label='Repeat password' type='password' value={passwordCheck} 
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
                            setErrorMessage('');
                        } else {
                            setErrorMessage('Password do not match')
                        }
                    }}>Register</Button>
                </Grid>
        </Grid>
    )
});

type PropTypes = {
    authStore: any
};

export default SignUp;