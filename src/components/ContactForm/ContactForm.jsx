import * as Yup from 'yup';
import { useAddContactMutation, useGetContactsQuery } from 'redux/Contacts/api';
import Notiflix from 'notiflix';
import Button from '@mui/material/Button';
import { TextField } from 'formik-mui';
import { Form, Formik, Field } from 'formik';
import { Box } from '@mui/material';

export function ContactForm() {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const getValues = inputValues => {
    if (inputValues.name === '' || inputValues.number === '') {
      return;
    } else if (
      contacts.find(contact => {
        return contact.name === inputValues.name;
      })
    ) {
      return Notiflix.Report.info(`${inputValues.name} is already in contacts`);
    } else {
      const contact = {
        name: inputValues.name,
        number: inputValues.number,
      };
      addContact(contact);
      inputValues.name = '';
      inputValues.number = '';
    }
  };

  const values = {
    name: '',
    number: '',
  };

  const phoneSchema = Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(5)
    .required('A phone number is required');

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    number: phoneSchema,
  });

  return (
    <Formik
      initialValues={values}
      onSubmit={getValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '100%',
            ml: 'auto',
            mr: 'auto',
          }}
        >
          <Field
            component={TextField}
            name="name"
            label="name"
            id="standard-basic"
            variant="standard"
            disabled={false}
            margin="normal"
          />
          <Field
            component={TextField}
            name="number"
            label="number"
            id="standard-basic"
            variant="standard"
            disabled={false}
            margin="normal"
          />
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'please wait...' : 'add contact'}
            </Button>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
}
