import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <AppBar sx={{position: 'sticky'}}>
            <Container>
                <Toolbar>
                    <Typography variant='h6' component='span' sx={{mr: 'auto'}}>
                        MoneyBox
                    </Typography>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Enter data</Button>
                    </Link>
                    <Link to='/calculation' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block', ml: 4 }}>Calculation</Button>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header