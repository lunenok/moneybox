import React, { useState } from 'react'
import {subsStore} from './../store/subs'
import {observer} from 'mobx-react-lite'
import { Formik, Form, FieldArray} from 'formik';
import ErrorMessage from './error-message';
import * as Yup from 'yup'
import { TextField, Button, Grid } from '@mui/material';

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

function Subs() {
    const subs = subsStore.subs.map((sub) => ({
        id: sub.id,
        description: sub.description,
        amount: sub.amount,
        currency: sub.currency}))
    const initialValues = {subs}
    const [count, setCount] = useState(subs.length);
    
    const onAdd = (pushCallback) => {
        const newSub = {id: count + 1, description:'', amount: '', currency: 'rub'}
        pushCallback(newSub)
        setCount(count + 1)
    };
    
    return (
        <React.Fragment>            
            <Formik initialValues={initialValues} onSubmit={(values)=>{subsStore.save(values.subs)}} validationSchema={schema}> 
                {({values, errors, handleChange, handleBlur}) => (
                    <Form>
                        <FieldArray name='subs'>
                            {({insert, remove, push}) => (
                                <div>
                                    {values.subs.map((sub, index) => (
                                        <div className='row' key={index}>
                                            <Grid container spacing={1} mb={2} justifyContent={'center'}>
                                                <Grid item xs={'0.5'}>
                                                    <TextField 
                                                        name={`subs.${index}.id`}
                                                        value={sub.id} 
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur} 
                                                        label="#"
                                                        // helperText={

                                                        // }
                                                        // error={Boolean{toucher}}
                                                        disabled/>
                                                    <ErrorMessage name={`subs.${index}.id`} />
                                                </Grid>
                                                <Grid item>
                                                    <TextField 
                                                        name={`subs.${index}.description`} 
                                                        value={sub.description} 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} 
                                                        label="name"/>
                                                    <ErrorMessage name={`subs.${index}.description`} />
                                                </Grid>
                                                <Grid item>
                                                    <TextField 
                                                        name={`subs.${index}.amount`} 
                                                        value={sub.amount} 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} 
                                                        label="amount"/>
                                                    <ErrorMessage name={`subs.${index}.amount`} />
                                                </Grid>
                                                <Grid item>
                                                    <TextField 
                                                        name={`subs.${index}.currency`} 
                                                        value={sub.currency} 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} 
                                                        label="currency"/>
                                                    <ErrorMessage name={`subs.${index}.currency`} />
                                                </Grid>
                                                <Grid item display={'flex'}>
                                                    <Button 
                                                        type="button" 
                                                        color="error"
                                                        variant='outlined'
                                                        onClick={() => remove(index)}>
                                                      X
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        margin="normal"
                                        color="primary"
                                        onClick={() => {onAdd(push)}}
                                        variant="outlined">
                                        Add one more sub
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                        <Button type='submit' variant="outlined">Save</Button>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default observer(Subs)
