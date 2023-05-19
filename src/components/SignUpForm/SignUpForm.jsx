import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';
import { signUp } from 'redux/Authorisation/operations';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { TextField } from 'formik-mui';
import { Box, Button } from '@mui/material';


export function SignUpForm() {
    const dispatch = useDispatch();
    const getSbmitInformation = (inputValues) => {
        if (inputValues.name === '' || inputValues.email === '' || inputValues.password === '') {
            return Notiflix.Report.failure('Заполните все поля');
        };
        const signUpUser = {
            name: inputValues.name,
            email: inputValues.email,
            password: inputValues.password
        };
        dispatch(signUp(signUpUser));
    };

    const values = {
        name: '',
        email: '',
        password: '',
    };
        
    const validationSchema = Yup.object({
        name: Yup.string(),
        email: Yup.string().email(),
        password: Yup.string(),
    });
    
    return (
        <Formik
            initialValues={values}
            onSubmit={(values, { resetForm }) => { getSbmitInformation(values); resetForm() }}
            validationSchema={validationSchema}
        >
            <Form>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    width: '30vw',
                    ml: 'auto',
                    mr: 'auto',
                    p: '30px',
                }}>
                    <Field component={TextField} variant='standard' name="name" label='Name' type="name" disabled={false} margin="normal" />
                    <Field component={TextField} variant='standard' name="email" label='Email' type="email" disabled={false} margin="normal" />
                    <Field component={TextField} variant='standard' name="password" label='Password' type="password" disabled={false} margin="normal" />
                    <Box sx={{ ml: 'auto' }}>
                        <Button variant="outlined" color="primary" type="submit" >Log In</Button>
                    </Box>
                </Box>
            </Form>
        </Formik>
    );
};
