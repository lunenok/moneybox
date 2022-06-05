import React, { useState, useEffect } from 'react'
import {subsStore} from '../store/regulars'
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from '../utils';
import { getRegular } from './../api';

const schema = Yup.object().shape({
    subs: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required('Required'),
                description: Yup.string().required('Required'),
                amount: Yup.number().required('Required'),
                currency: Yup.string().required('Required')
            })
        ).required('Required')  
})

function Payments() {

    const subs = subsStore.subs.map((sub) => ({
        id: sub.id,
        description: sub.description,
        amount: sub.amount,
        currency: sub.currency}))
    const initialValues = {subs}
    const [count, setCount] = useState(subs.length);

    useEffect(() => {
        getRegular(subsStore.save);
    }, []);
    
    const onAdd = (pushCallback) => {
        const newSub = {id: count + 1, description:'', amount: '', currency: 'rub'}
        pushCallback(newSub)
        setCount(count + 1)
    };
    
    return (
        <React.Fragment>            
            <Formik initialValues={initialValues} onSubmit={(values)=> {  
                subsStore.save(values.subs)
                }} 
                validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur, isSubmitting}) => (
                    <Form>
                        <Grid item mb={2}>
                            <Typography variant={'h6'}>Regular</Typography>
                            <Typography variant={'body'} mb={2}>Enter your regular outcomes, for example rental and subscriptions</Typography>
                        </Grid>
                        <FieldArray name='subs'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.subs.length ?  
                                        values.subs.map((sub, index) => {
                                            return (
                                                <div className='row' key={index}>
                                                    <Grid container spacing={1} mb={2} justifyContent={'start'}>
                                                        <Grid item xs={1}></Grid>
                                                        <Grid item xs={0.5}>
                                                            <TextField 
                                                                name={`subs.${index}.id`}
                                                                value={sub.id} 
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                label="#"
                                                                disabled/>
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField 
                                                                name={`subs.${index}.description`} 
                                                                value={sub.description} 
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }} 
                                                                onBlur={handleBlur} 
                                                                helperText={showErrorMessageFormik(touched, errors, `subs.${index}.description`)}
                                                                error={isErrorFormik(touched, errors, `subs.${index}.description`)}
                                                                label="name"/>
                                                        </Grid>
                                                        <Grid item xs={1.5}>
                                                            <TextField 
                                                                name={`subs.${index}.amount`} 
                                                                value={sub.amount}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }} 
                                                                onBlur={handleBlur} 
                                                                label="amount"
                                                                helperText={showErrorMessageFormik(touched, errors, `subs.${index}.amount`)}
                                                                error={isErrorFormik(touched, errors, `subs.${index}.amount`)}
                                                                />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField 
                                                                select
                                                                name={`subs.${index}.currency`} 
                                                                value={sub.currency} 
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }} 
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
                                                                onClick={() => {
                                                                    remove(index);
                                                                    }}>
                                                              X
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={1}></Grid>
                                                    </Grid>
                                                </div>
                                            )}) : 
                                        <Typography mb={2} ml={12}>Add your fist regular payment</Typography>
                                    }
                                    <Grid container justifyContent={'start'}>
                                        <Grid item xs={1}></Grid>
                                        <Button
                                            type="button"
                                            margin="normal"
                                            color="primary"
                                            onClick={() => {onAdd(push)}}
                                            variant="outlined">
                                            + Add sub
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
}

export default Payments;
