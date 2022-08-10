import React from 'react'
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from './../utils';
import { observer } from 'mobx-react-lite';
import SaveAlert from './save-alert';
import FormObserver from './form-observer';
import Loader from './loader';
import { PaymentType } from './../types/types';

const schema = Yup.object().shape({
    balance: Yup.number().required('Required'),
    salary: Yup.number().required('Required'),
    anotherIncomes: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required('Required'),
                description: Yup.string().required('Required'),
                amount: Yup.number().required('Required'),
                currency: Yup.string().required('Required'),
                month: Yup.number().required('Required')
            })
        ).required('Required')  
})

const Incomes: React.FC<PropTypes> = observer(({incomesStore}) => {
    
    // Это сделано, чтобы в форму не прокидывать isLoading, потому что так некорректно работает сверка initialState и currState (через useContext).
    const initialValues = {balance: incomesStore.balance, salary: incomesStore.salary, anotherIncomes: incomesStore.anotherIncomes};
    const [count, setCount] = React.useState(incomesStore.anotherIncomes.length);
    const [isSave, setSaveStatus] = React.useState(true);

    const stateForObserver = {
        balance: initialValues.balance,
        salary: initialValues.salary,
        anotherIncomes: incomesStore.anotherIncomes
    };

    interface pushCallback {
        (newIncome: PaymentType): void;
    };
    
    const onAdd = (pushCallback: pushCallback) => {
        const newIncome = {id: count + 1, description:'', amount: 0, currency: 'rub', month: 12}
        pushCallback(newIncome)
        setCount(count + 1)
    };

    if (incomesStore.isLoading) {
        return <Loader/>
    };
    
    return (
        <React.Fragment>            
            <Formik initialValues={initialValues} onSubmit={(values) => {
                incomesStore.save(values);
                setSaveStatus(true);
                }} validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur}) => (
                    <Form>
                        <FormObserver initialValues={stateForObserver} setStatus={setSaveStatus}/>
                        <Grid item>
                            <Grid container alignItems={'center'} direction={'row'}>
                                <Typography variant={'h6'} mr={1}>Balance and Salary</Typography>
                                <SaveAlert isSave={isSave}/>
                            </Grid>
                        </Grid>
                        <Grid item mb={2}>
                            <Typography variant={'body1'} mb={2}>Enter your starting balance and month salary (rubles)</Typography>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid mb={2}>
                                <Grid item mb={2}>
                                    <TextField
                                    name={`balance`}
                                    type='number'
                                    value={values.balance}
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    label='balance'
                                    helperText={showErrorMessageFormik(touched as boolean, errors, `balance`)}
                                    error={isErrorFormik(touched as boolean, errors, `balance`)}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                    name={`salary`}
                                    value={values.salary}
                                    type='number'
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    label='salary'
                                    helperText={showErrorMessageFormik(touched as boolean, errors, `salary`)}
                                    error={isErrorFormik(touched as boolean, errors, `salary`)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h6'}>Another income</Typography>
                            <Typography variant={'body1'}>Here you can enter another expected incomes</Typography>
                        </Grid>
                        <FieldArray name='anotherIncomes'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.anotherIncomes.map((income: PaymentType, index: number) => {
                                        return (
                                            <div className='row' key={index}>
                                                <Grid container spacing={1} mb={2} mt={2} justifyContent={'start'}>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={0.5}>
                                                        <TextField 
                                                            name={`anotherIncomes.${index}.id`}
                                                            value={income.id} 
                                                            onChange={handleChange} 
                                                            onBlur={handleBlur} 
                                                            label="#"
                                                            disabled/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            name={`anotherIncomes.${index}.description`} 
                                                            value={income.description} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            helperText={showErrorMessageFormik(touched as boolean, errors, `anotherIncomes[${index}].description`)}
                                                            error={isErrorFormik(touched as boolean, errors, `anotherIncomes[${index}].description`)}
                                                            label="name"/>
                                                    </Grid>
                                                    <Grid item xs={1.5}>
                                                        <TextField 
                                                            name={`anotherIncomes.${index}.amount`} 
                                                            value={income.amount} 
                                                            type='number'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            label="amount"
                                                            helperText={showErrorMessageFormik(touched as boolean, errors, `anotherIncomes[${index}].amount`)}
                                                            error={isErrorFormik(touched as boolean, errors, `anotherIncomes[${index}].amount`)}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField 
                                                            select
                                                            fullWidth
                                                            name={`anotherIncomes.${index}.month`} 
                                                            value={income.month} 
                                                            onChange={handleChange}
                                                            label="month">
                                                                <MenuItem value={1}>january</MenuItem>
                                                                <MenuItem value={2}>febrary</MenuItem>
                                                                <MenuItem value={3}>march</MenuItem>
                                                                <MenuItem value={4}>april</MenuItem>
                                                                <MenuItem value={5}>may</MenuItem>
                                                                <MenuItem value={6}>june</MenuItem>
                                                                <MenuItem value={7}>jule</MenuItem>
                                                                <MenuItem value={8}>august</MenuItem>
                                                                <MenuItem value={9}>september</MenuItem>
                                                                <MenuItem value={10}>october</MenuItem>
                                                                <MenuItem value={11}>november</MenuItem>
                                                                <MenuItem value={12}>december</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            select
                                                            name={`anotherIncomes.${index}.currency`} 
                                                            value={income.currency} 
                                                            onChange={handleChange}
                                                            label="currency">
                                                                <MenuItem value={'rub'}>rub</MenuItem>
                                                                <MenuItem value={'usd'}>usd</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button 
                                                            type="button" 
                                                            color="error"
                                                            variant='outlined'
                                                            onClick={() => remove(index)}>
                                                          X
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={1}></Grid>
                                                </Grid>
                                            </div>
                                        )})}
                                    <Grid container mt={2} justifyContent={'start'}>
                                        <Grid item xs={1} ></Grid>
                                        <Button
                                            type="button"
                                            color="primary"
                                            onClick={() => {onAdd(push)}}
                                            variant="outlined">
                                            + Add income
                                        </Button>
                                    </Grid>
                                </div>
                            )}
                        </FieldArray>
                        <Grid container mt={2}>
                            <Grid item xs={1}></Grid>
                            <Button type='submit' variant="outlined">Save</Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
});

type PropTypes = {
    incomesStore: any;
}

export default Incomes;
