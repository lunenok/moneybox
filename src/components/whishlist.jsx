import React, { useState } from 'react';
import {whishlistStore} from './../store/whislist';
import {observer} from 'mobx-react-lite';
import { Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup'
import { TextField, Button, Grid, MenuItem, Typography } from '@mui/material';
import {showErrorMessageFormik, isErrorFormik} from './../utils';

const schema = Yup.object().shape({
    whishlist: Yup.array()
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

function Whishlist() {
    const whishlist = whishlistStore.whishlist.map((oc) => ({
        id: oc.id,
        description: oc.description,
        amount: oc.amount,
        currency: oc.currency,
        month: oc.month}))
    const initialValues = {whishlist}
    const [count, setCount] = useState(whishlist.length);
    
    const onAdd = (pushCallback) => {
        const newItem = {id: count + 1, description:'', amount: '', currency: 'rub', month: 12}
        pushCallback(newItem)
        setCount(count + 1)
    };
    
    return (
        <React.Fragment>            
            <Formik initialValues={initialValues} onSubmit={(values)=>{whishlistStore.save(values.whishlist)}} validationSchema={schema}> 
                {({values, touched, errors, handleChange, handleBlur}) => (
                    <Form>
                        <Grid item mb={2}>
                            <Typography variant={'h6'} mt={3}>Whislist</Typography>
                            <Typography variant={'body'} mb={2}>Enter your whishes</Typography>
                        </Grid>
                        <FieldArray name='whishlist'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.whishlist.map((whish, index) => {

                                        return (
                                            <div className='row' key={index}>
                                                <Grid container spacing={1} mb={2} justifyContent={'start'}>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={0.5}>
                                                        <TextField 
                                                            name={`whishlist.${index}.id`}
                                                            value={whish.id} 
                                                            onChange={handleChange} 
                                                            onBlur={handleBlur} 
                                                            label="#"
                                                            disabled/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField 
                                                            name={`whishlist.${index}.description`} 
                                                            value={whish.description} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            helperText={showErrorMessageFormik(touched, errors, `whishlist.${index}.description`)}
                                                            error={isErrorFormik(touched, errors, `whishlist.${index}.description`)}
                                                            label="name"/>
                                                    </Grid>
                                                    <Grid item xs={1.5}>
                                                        <TextField 
                                                            name={`whishlist.${index}.amount`} 
                                                            value={whish.amount} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            label="amount"
                                                            helperText={showErrorMessageFormik(touched, errors, `whishlist.${index}.amount`)}
                                                            error={isErrorFormik(touched, errors, `whishlist.${index}.amount`)}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField 
                                                            select
                                                            fullWidth
                                                            name={`whishlist.${index}.month`} 
                                                            value={whish.month} 
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
                                                            name={`whishlist.${index}.currency`} 
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
                                                          X Delete
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
}

export default observer(Whishlist)
