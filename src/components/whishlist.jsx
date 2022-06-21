import React, { useState } from 'react';
import { Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from './../utils';
import { observer } from 'mobx-react-lite';
import SaveAlert from './save-alert';
import FormObserver from './form-observer';

const schema = Yup.object().shape({
    save: Yup.number('Must be number').required('Required'),
    percent: Yup.string().required('Required'),
    stuff: Yup.array()
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

const Whishlist = observer(({whishlistStore}) => {

    const [count, setCount] = useState(whishlistStore.whishlist.stuff.length);
    const [isSave, setSaveStatus] = React.useState(true);

    const stateForObserver = {
        percent: whishlistStore.whishlist.percent,
        save: whishlistStore.whishlist.save,
        stuff: whishlistStore.whishlist.stuff,  
    };
    
    const onAdd = (pushCallback) => {
        const newItem = {id: count + 1, description:'', amount: '', currency: 'rub', month: 12}
        pushCallback(newItem)
        setCount(count + 1)
    };

    return (
        <React.Fragment>            
            <Formik enableReinitialize initialValues={whishlistStore.whishlist} onSubmit={(values) => {
                whishlistStore.save(values)
                setSaveStatus(true);
                }} validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur}) => (
                    <Form>
                        <FormObserver initialValues={stateForObserver} setStatus={setSaveStatus}/>
                        <Grid item display>
                            <Grid container alignItems={'center'} direction={'row'}>
                                <Typography variant={'h6'} mr={1}>Save</Typography>
                                <SaveAlert isSave={isSave}/>
                            </Grid>
                        </Grid>
                        <Grid item mb={2}>
                            <Typography variant={'body'} mb={2}>Enter how much you want save every month (rubles)</Typography>
                        </Grid>

                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid>
                                <Grid container spacing={1} item mb={2}>
                                    <Grid item>
                                        <TextField
                                        name={`save`}
                                        value={values.save}
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        label='save'
                                        helperText={showErrorMessageFormik(touched, errors, `save`)}
                                        error={isErrorFormik(touched, errors, `save`)}
                                        />
                                    </Grid>
                                     <Grid item>
                                         <TextField
                                            select
                                            name={`percent`}
                                            value={values.percent}
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            label='percent'
                                            helperText={showErrorMessageFormik(touched, errors, `percent`)}
                                            error={isErrorFormik(touched, errors, `percent`)}>
                                            <MenuItem value={'yes'}>yes</MenuItem>
                                            <MenuItem value={'no'}>no</MenuItem>
                                        </TextField>
                                     </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item mb={2}>
                            <Typography variant={'h6'} mt={3}>Whislist</Typography>
                            <Typography variant={'body'} mb={2}>Enter your whishes</Typography>
                        </Grid>
                        <FieldArray name='stuff'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.stuff.map((whish, index) => {
                                        return (
                                            <div className='row' key={index}>
                                                <Grid container spacing={1} mb={2} justifyContent={'start'}>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={0.5}>
                                                        <TextField 
                                                            name={`stuff.${index}.id`}
                                                            value={whish.id} 
                                                            onChange={handleChange} 
                                                            onBlur={handleBlur} 
                                                            label="#"
                                                            disabled/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            name={`stuff.${index}.description`} 
                                                            value={whish.description} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            helperText={showErrorMessageFormik(touched, errors, `stuff.${index}.description`)}
                                                            error={isErrorFormik(touched, errors, `stuff.${index}.description`)}
                                                            label="name"/>
                                                    </Grid>
                                                    <Grid item xs={1.5}>
                                                        <TextField 
                                                            name={`stuff.${index}.amount`} 
                                                            value={whish.amount} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            label="amount"
                                                            helperText={showErrorMessageFormik(touched, errors, `stuff.${index}.amount`)}
                                                            error={isErrorFormik(touched, errors, `stuff.${index}.amount`)}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField 
                                                            select
                                                            fullWidth
                                                            name={`stuff.${index}.month`} 
                                                            value={whish.month} 
                                                            onChange={handleChange}
                                                            label="month">
                                                                <MenuItem value={2}>febrary</MenuItem>
                                                                <MenuItem value={1}>january</MenuItem>
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
                                                            name={`stuff.${index}.stuff.currency`} 
                                                            value={whish.currency} 
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
                                            onClick={() => {onAdd(push)}}
                                            variant="outlined">
                                            + Add whish
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

export default Whishlist;
