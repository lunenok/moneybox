import { AppBar, Container, Toolbar, Button, Typography, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FunctionsSharpIcon from '@mui/icons-material/FunctionsSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {Link} from 'react-router-dom';
import QuickSum from './quick-sum';
import { outcomesStore } from './../store/outcomes';
import { subsStore } from './../store/regulars';
import { incomesStore } from '../store/income';
import { whishlistStore } from './../store/whislist';

const Header = observer(({store}) => {
    return (
        <AppBar sx={{position: 'sticky'}}>
            <Container>
                <Toolbar>
                    <DiamondSharpIcon fontSize={'large'}/>
                    <Typography variant='h6' component='span'sx={{mr: 'auto'}}>
                        PLAN BEST YEAR
                    </Typography>
                    <Link to='/incomes' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'flex' }}><AttachMoneySharpIcon/>Enter data</Button>
                    </Link>
                    <Link to='/calculation' style={{ textDecoration: 'none' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }}><FunctionsSharpIcon/>Calculation</Button>
                    </Link>
                    {store.account.email ? 
                       <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }} onClick={() => {store.signOut()}}>
                           <AccountCircleIcon/>Log out of {store.account.profile}
                       </Button> :
                       <Link to='/login' style={{ textDecoration: 'none' }}>
                           <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }}><AccountCircleIcon/>Sign in
                           </Button>
                       </Link> 
                    }

                    <span>{store.account.email}</span>
                </Toolbar>
                <Container>
                    <Grid container mb={2}>
                        <Grid item xs={7}></Grid>
                        <QuickSum subsStore={subsStore} incomesStore={incomesStore} whishlistStore={whishlistStore} outcomesStore={outcomesStore}/>
                    </Grid>
                </Container>
            </Container>    
        </AppBar>
    )
})

export default Header;