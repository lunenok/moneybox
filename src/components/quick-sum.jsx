import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getSaveAmount } from './../utils';
import { getPayments } from './../api';
import Loader from './loader';

const QuickSum = observer(({outcomesStore, incomesStore, subsStore, whishlistStore, authStore}) => {
    const outcomes = outcomesStore.getTotal() + subsStore.getTotal();
    const incomesTotal = incomesStore.getTotal();
    const incomesArray = incomesStore.getByMonth();
    const save = getSaveAmount(incomesArray, whishlistStore.whishlist.save, whishlistStore.whishlist.percent);
    const balance = incomesTotal - outcomes - save;

    const isPositive = (balance) => {
        if (balance < 0) {
            return <ErrorOutlineIcon style={{color: '#f44336'}}></ErrorOutlineIcon>
        }
        return <CheckIcon style={{color: '#6fbf73'}}></CheckIcon>
    };

    if (!authStore.isAuth) {
        return (<div></div>)
    };

    if (outcomesStore.isLoading) {
        return (
            <Container>
                <Grid item>
                    <div>Loadging...</div>
                </Grid>
            </Container>
        )
    };

    return (
        <Container>
            <Grid item>
                Year incomes: {incomesTotal}, 
                Save: {save}
            </Grid>
            <Grid item display={'flex'} alignItems={'center'}>
               Year outcomes: {outcomes}, 
               Balance: {balance}
               <pre> </pre>
               {isPositive(balance)}
            </Grid>
        </Container>

    );
});

export default QuickSum;