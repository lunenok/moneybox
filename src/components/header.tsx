import { AppBar, Container, Toolbar, Button, Typography, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FunctionsSharpIcon from '@mui/icons-material/FunctionsSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {Link} from 'react-router-dom';
import QuickSum from './quick-sum';
import { outcomesStore } from '../store/outcomes';
import { subsStore } from '../store/regulars';
import { incomesStore } from '../store/income';
import { whishlistStore } from '../store/whislist';
import { authStore } from '../store/auth';
import { getPayments, getIncomes, getRegular, getWhishes } from '../api';

const Header: React.FC<PropTypes> = observer(({outcomesStore, subsStore, incomesStore, whishlistStore, authStore}) => {

    React.useEffect(() => {
        if (authStore.isAuth) {
            getPayments(outcomesStore.save, 'Payments');
            getPayments(outcomesStore.save, 'Car');
            getPayments(outcomesStore.save, 'Holidays');
            getRegular(subsStore.save);
            getIncomes(incomesStore.save);
            getWhishes(whishlistStore.save);
        };
    }, [authStore.isAuth]);

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
                    {authStore.account.email ? 
                       <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }} onClick={() => {authStore.signOut()}}>
                           <AccountCircleIcon/>Log out of {authStore.account.profile}
                       </Button> :
                       <Link to='/login' style={{ textDecoration: 'none' }}>
                           <Button sx={{ my: 2, color: 'white', display: 'flex', ml: 4 }}><AccountCircleIcon/>Sign in
                           </Button>
                       </Link> 
                    }

                    <span>{authStore.account.email}</span>
                </Toolbar>
                <Container>
                    <Grid container mb={2}>
                        <Grid item xs={7}></Grid>
                        <QuickSum 
                            subsStore={subsStore}
                            incomesStore={incomesStore}
                            whishlistStore={whishlistStore} 
                            outcomesStore={outcomesStore}
                            authStore={authStore}/>
                    </Grid>
                </Container>
            </Container>    
        </AppBar>
    )
});

const withStore = () => {
    return <Header outcomesStore={outcomesStore} subsStore={subsStore} incomesStore={incomesStore} whishlistStore={whishlistStore} authStore={authStore}/>
};

type PropTypes = {
    outcomesStore: any,
    subsStore: any,
    incomesStore: any,
    whishlistStore: any,
    authStore: any
};

export default withStore;