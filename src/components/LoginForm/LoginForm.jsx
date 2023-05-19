import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';
import { LogIn } from 'redux/Authorisation/operations';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { Box, Button } from '@mui/material';
import { TextField } from 'formik-mui';


export function LoginForm() {
   const dispatch = useDispatch()
    const getLoginIformation = (inputValues) => {
        if (!inputValues.email === '' || !inputValues.password === '') {
            return Notiflix.Report.init('Заполните все поля ввода')
        };
     
        const loginUser = {
            email: inputValues.email,
            password: inputValues.password
        };
        dispatch(LogIn(loginUser))
    };

    const values = {
        email: '',
        password: '',
    };
        
    const validationSchema = Yup.object({
        email: Yup.string().email(),
        password: Yup.string(),
    });
    
    return (
        <Box sx={{ p: '40px', height: '100%', }}>
            <Formik
                initialValues={values}
                onSubmit={(values, { resetForm }) => { getLoginIformation(values); resetForm() }}
                validationSchema={validationSchema}
            >
                <Form >
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        width: '30vw',
                        ml: 'auto',
                        mr: 'auto',
                        p: '30px',
                    }}>
                        <Field component={TextField} variant='standard' name="email" label='Email' type="email" disabled={false} margin="normal" />
                        <Field component={TextField} variant='standard' name="password" label='Password' type="password" disabled={false} margin="normal" />
                        <Box sx={{ ml: 'auto', }}>
                            <Button variant="outlined" color="primary" type="submit" >Log In</Button>
                        </Box>
                    </Box>
                </Form>
            </Formik>
        </Box>
    );
};
