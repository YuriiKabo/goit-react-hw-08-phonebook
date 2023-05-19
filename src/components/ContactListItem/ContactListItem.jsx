import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDeleteContactMutation, useEditContactMutation } from 'redux/Contacts/api';
import Notiflix from 'notiflix';
import { TextField } from 'formik-mui';
import { Box, Button, ListItem, Typography } from '@mui/material';

export function ContactListItem({ name, number, id, array, index }) {
    const [removeContact, { isLoading }] = useDeleteContactMutation();
    const [editContact, { isLoading: load }] = useEditContactMutation();

    const [showForm, setShowForm] = useState(false);
    const values = { name, number, };
        
        const phoneSchema = Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(5)
            .required('A phone number is required');
        
        const validationSchema = Yup.object({
            name: Yup.string().max(20).required(),
            number: phoneSchema,
        });
    
    function changeContact(inputValues){
       
            const contact = {
                name: inputValues.name,
                number: inputValues.number,
        };
      
        if (array.find(({name}, pos) => name === contact.name && pos !== index)) {
           Notiflix.Report.info('a contact with that name already exists');
            return
        }
        if (array.find(({ name, number }) => name === contact.name && number === contact.number)) {
            Notiflix.Report.info('cotact data has not changed');
            return
        }
        editContact({ id, contact });
        setShowForm(false)
    };
  
    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom:'1px solid black' }}>
            {!showForm ?
                (load || isLoading ? <Typography><b>please wait............</b></Typography> :
                    < >
                        <Box>
                            <Typography ><b>{name} : </b> {number}</Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                            <Button variant="contained" onClick={() => { setShowForm(true) }} type='button' sx={{ ml: '10px' }}>Edit</Button>
                            <Button variant="contained" onClick={() => { removeContact(id) }} type='button' sx={{ ml: '10px' }}>Delete</Button>
                        </Box>
                    </>) : (
                    <Formik initialValues={values} onSubmit={changeContact} validationSchema={validationSchema} >
                        <Form style={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                <Box>
                                    <Field component={TextField} name="name" variant="standard" disabled={false} />
                                    <Field component={TextField} name="number" variant="standard" disabled={false} />
                                </Box>
                                <Box>
                                    <Button variant="contained" color='secondary' type="submit" sx={{ ml: '10px' }}>Confirm</Button>
                                    <Button variant="contained" color='secondary' type="button" onClick={() => { setShowForm(false) }} sx={{ ml: '10px' }} >Cancel</Button>
                                </Box> </Box>
                        </Form>
                    </Formik>
                )}
        </ListItem>
    );
};

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    array: PropTypes.array.isRequired,
    index:PropTypes.number.isRequired,
};

