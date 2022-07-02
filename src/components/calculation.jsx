import React from 'react'
import { observer } from 'mobx-react-lite';
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {subsStore} from './../store/regulars';
import {whishlistStore} from './../store/whislist';
import {incomesStore} from './../store/income';
import {outcomesStore} from './../store/outcomes';
import {addSumToEveryMonth, createArrayCashFlow, calculateBalance, calculateSum, getOutcomesWithPercentOfSave} from './../utils';
import withAuthComponent from './hocs/withAuthComponent';
import Loader from './loader';

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalculationComponent = observer(({subsStore, whishlistStore, incomesStore, outcomesStore}) => {
    const incomes = createArrayCashFlow(incomesStore.getByMonth());
    const whishes = createArrayCashFlow(whishlistStore.getByMonth());
    const outcomes = createArrayCashFlow(addSumToEveryMonth(outcomesStore.getAllOutcomes(), subsStore.getByMonth()));
    const outcomesWithSave = getOutcomesWithPercentOfSave(outcomes, incomes, whishlistStore.whishlist.save, whishlistStore.whishlist.percent);
    const balance = calculateBalance(incomes, whishes, outcomesWithSave);
    const summary = calculateSum(balance, incomesStore.balance);

    if (outcomesStore.isLoading) {
        return (
            <Loader></Loader>
        )
    };

    return (
    <React.Fragment>
        <Grid item mb={2}>
            <Typography variant={'h6'} mt={3}>Calculation</Typography>
            <Typography variant={'body'} mb={2}>Here you can see your financial balance every month</Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Incomes</TableCell>
                <TableCell align="right">Outcomes</TableCell>
                <TableCell align="right">Whishes</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Summary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {month.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {month[index]}
                  </TableCell>
                  <TableCell align="right">{incomes[index]}</TableCell>
                  <TableCell align="right">{outcomesWithSave[index]}</TableCell>
                  <TableCell align="right">{whishes[index]}</TableCell>
                  <TableCell align="right">{balance[index]}</TableCell>
                  <TableCell align="right">{summary[index]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </React.Fragment>
    );
});

const withStore = () => {
    return <CalculationComponent subsStore={subsStore} incomesStore={incomesStore} outcomesStore={outcomesStore} whishlistStore={whishlistStore}/>
};

export default withAuthComponent(withStore);