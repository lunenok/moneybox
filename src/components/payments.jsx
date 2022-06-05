import React, { useState } from 'react'
import { Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from './../utils';
import { observer } from 'mobx-react-lite';

const schema = Yup.object().shape({
    payments: Yup.array()
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

const Payments = observer(({outcomesStore}) => {

    const [count, setCount] = useState(outcomesStore.outcomes[0].payments.length);
    const initialValues = outcomesStore.outcomes[0]
    
    const onAdd = (pushCallback) => {
        const newSub = {id: count + 1, description: 'new', amount: 0, currency: 'rub', month: 12}
        pushCallback(newSub)
        setCount(count + 1)
    };

    return (
        <React.Fragment>       
            <Formik 
            initialValues={initialValues} 
            onSubmit={(values)=>{outcomesStore.save(values.payments, outcomesStore.outcomes[0].title)}}
            validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur}) => (
                    <Form>
                        <Grid item mb={2}>
                            <Typography variant={'h6'} mt={3}>{outcomesStore.outcomes[0].title}</Typography>
                            <Typography variant={'body'} mb={2}>Enter your non-regular outcomes</Typography>
                        </Grid>
                        <FieldArray name='payments'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.payments.map((payment, index) => {
                                        return (
                                            <div className='row' key={index}>
                                                <Grid container spacing={1} mb={2} justifyContent={'start'}>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={0.6}>
                                                        <TextField 
                                                            name={`payments.${index}.id`}
                                                            value={payment.id} 
                                                            onChange={handleChange} 
                                                            onBlur={handleBlur} 
                                                            label="#"
                                                            disabled/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            name={`payments.${index}.description`} 
                                                            value={payment.description} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            helperText={showErrorMessageFormik(touched, errors, `payments.${index}.description`)}
                                                            error={isErrorFormik(touched, errors, `payments.${index}.description`)}
                                                            label="name"/>
                                                    </Grid>
                                                    <Grid item xs={1.5}>
                                                        <TextField 
                                                            name={`payments.${index}.amount`} 
                                                            value={payment.amount} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            label="amount"
                                                            helperText={showErrorMessageFormik(touched, errors, `payments.${index}.amount`)}
                                                            error={isErrorFormik(touched, errors, `payments.${index}.amount`)}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField 
                                                            select
                                                            fullWidth
                                                            name={`payments.${index}.month`} 
                                                            value={payment.month} 
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
                                                            name={`payments.${index}.currency`} 
                                                            value={payment.currency} 
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
                                    <Grid container justifyContent={'start'}>
                                        <Grid item xs={1}></Grid>
                                        <Button
                                            type="button"
                                            margin="normal"
                                            color="primary"
                                            onClick={() => {
                                                onAdd(push)
                                            }}
                                            variant="outlined">
                                            + Add outcome
                                        </Button>
                                    </Grid>
                                </div>
                            )}
                        </FieldArray>
                        <Grid container mt={2} mb={2}>
                            <Grid item xs={1}></Grid>
                            <Button type='submit' variant="outlined">Save</Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
});

export default Payments;
