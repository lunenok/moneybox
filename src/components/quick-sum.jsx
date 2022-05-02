import React from 'react';
import { observer } from 'mobx-react-lite';
import { outcomesStore } from './../store/outcomes';
import { subsStore } from './../store/regulars';
import { incomesStore } from '../store/income';
import { whishlistStore } from './../store/whislist';
import { Container, Grid } from '@mui/material';
import { getSaveAmount } from './../utils';


const QuickSum = observer(() => {
    const outcomes = outcomesStore.getTotal() + subsStore.getTotal();
    const incomesTotal = incomesStore.getTotal();
    const incomesArray = incomesStore.getByMonth()
    const save = getSaveAmount(incomesArray, whishlistStore.whishlist.save, whishlistStore.whishlist.percent);

    return (
        <Container>
            <Grid item>
                Year incomes: {incomesTotal}, 
                Save: {save}
            </Grid>
            <Grid item>
               Year outcomes: {outcomes}
            </Grid>
        </Container>

    );
});

export default QuickSum;