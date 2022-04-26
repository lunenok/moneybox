import { AppBar, Container, Toolbar, Button, Typography, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FunctionsSharpIcon from '@mui/icons-material/FunctionsSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import React from 'react';
import {Link} from 'react-router-dom';
import QuickSum from './quick-sum';

function Header() {
    return (
        <AppBar sx={{position: 'sticky'}}>
            <Container>
                <Toolbar>
                    <DiamondSharpIcon fontSize={'large'}/>
                    <Typography variant='h6' component='span'sx={{mr: 'auto'}}>
                        MoneyBox
                    </Typography>
                    <Link to='/incomes' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'flex' }}><AttachMoneySharpIcon/>Enter data</Button>
                    </Link>
                    <Link to='/calculation' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }}><FunctionsSharpIcon/>Calculation</Button>
                    </Link>
                    <Link to='/account' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }}><AccountCircleIcon/>account settings
                        </Button>
                    </Link>
                </Toolbar>
                <Container>
                    <Grid container mb={2}>
                        <Grid item xs={7}></Grid>
                        <QuickSum/>
                    </Grid>
                </Container>
            </Container>    
        </AppBar>
    )
}

export default Header