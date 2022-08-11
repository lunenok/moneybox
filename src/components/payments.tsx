import React from 'react'
import { Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from './../utils';
import { observer } from 'mobx-react-lite';
import SaveAlert from './save-alert';
import FormObserver from './form-observer';
import { OutcomesTypesValues } from '../store/outcomes';
import { Outcome, PushCallback } from '../types/types';

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

const Payments: React.FC<PropTypes> = observer(({outcomesStore, type}) => {

    const [count, setCount] = React.useState(outcomesStore.outcomes[type] ? outcomesStore.outcomes[type].payments.length : 0);
    const [isSave, setSaveStatus] = React.useState(true);
    const initialValues: Outcome = outcomesStore.outcomes[type];

    const onAdd = (pushCallback: PushCallback) => {
        const newSub = {id: count + 1, description: 'new', amount: 0, currency: 'rub', month: 12}
        pushCallback(newSub)
        setCount(count + 1)
    };
    
    if (outcomesStore.isLoading) {
        return <div></div>
    };
    
    const initialValuesForObserver: Outcome = {
        title: outcomesStore.outcomes[type].title,
        payments: initialValues.payments
    }

    return (
        <React.Fragment>
            <Formik 
            initialValues={initialValues} 
            onSubmit={(values) => {
                outcomesStore.save(values.payments, outcomesStore.outcomes[type].title);
                setSaveStatus(true);
            }}
            validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur}) => (
                    <Form>
                        <FormObserver initialValues={initialValuesForObserver} setStatus={setSaveStatus}/>
                        <Grid item>
                            <Grid container alignItems={'center'} direction={'row'}>
                                <Typography variant={'h6'} mr={1}>{outcomesStore.outcomes.length ? outcomesStore.outcomes[type].title : 'Create category'}</Typography>
                                <SaveAlert isSave={isSave}/>
                            </Grid>
                        </Grid>
                        <Grid item mb={2}>
                            <Typography variant={'body1'} mb={3}>Enter your non-regular outcomes</Typography>
                        </Grid>
                        <FieldArray name='payments'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.payments.length ? 
                                        values.payments.map((payment, index) => {
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
                                                                helperText={showErrorMessageFormik(touched as boolean, errors, `payments.${index}.description`)}
                                                                error={isErrorFormik(touched as boolean, errors, `payments.${index}.description`)}
                                                                label="name"/>
                                                        </Grid>
                                                        <Grid item xs={1.5}>
                                                            <TextField 
                                                                name={`payments.${index}.amount`} 
                                                                value={payment.amount} 
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                label="amount"
                                                                type="number"
                                                                helperText={showErrorMessageFormik(touched as boolean, errors, `payments.${index}.amount`)}
                                                                error={isErrorFormik(touched as boolean, errors, `payments.${index}.amount`)}
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
                                            )}) : 
                                            <Typography mb={2} ml={12}>Add your fist payments</Typography>
                                        }
                                    <Grid container justifyContent={'start'}>
                                        <Grid item xs={1}></Grid>
                                        <Button
                                            type="button"
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

type PropTypes = {
    outcomesStore: any,
    type: OutcomesTypesValues
};

export default Payments;
